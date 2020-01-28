const token = new URL(window.location).hash.split('&').filter(function(el) { if(el.match('access_token') !== null) return true; })[0].split('=')[1];
option1 = "";

$( function() {

    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
        name: 'quiz-player',
        getOAuthToken: cb => { cb(token); }
    });
    
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        sessionStorage.setItem("device",device_id);
        //Choose this device to allow play in Browser
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player',
            type: 'PUT',
            contentType: "application/json",
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            data: JSON.stringify({ device_ids: [sessionStorage.getItem("device")] }),
            success: function(data) {
                console.log(data);
            }
        })
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });
    
    // Connect to the player!
    player.connect();

    

    };


    /*
    Start control section
    */


    //play
    function play(){
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/play',
            type: 'PUT',
            contentType: "application/json",
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            data: JSON.stringify({ device_id: sessionStorage.getItem("device") }),
            success: function(data) {
                console.log(data);
            }
        })
    }
    //pause
    function pause(){
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/pause',
            type: 'PUT',
            contentType: "application/json",
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            data: JSON.stringify({ device_id: sessionStorage.getItem("device") }),
            success: function(data) {
                console.log(data);
            }
        })
    }
    function next(){
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/next',
            type: 'POST',
            contentType: "application/json",
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            data: JSON.stringify({ device_id: sessionStorage.getItem("device")}),
            success: function(data) {
                console.log(data);
            }
        })
    }
    $( "#play" ).click( function( event ) {
        play();
    })


    $( "#pause" ).click( function( event ) {
        pause();
    })


    $( "#next" ).click( function( event ) {
        next();
    })
    
    // Add Music to "Liked Song" playlist
    $( "#add" ).click( function( event ) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            type: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            success: function(data) {
                console.log(data.item.id)
                $.ajax({
                    url: 'https://api.spotify.com/v1/me/tracks',
                    type: 'PUT',
                    contentType: "application/json",
                    headers: {
                        'Authorization' : 'Bearer ' + token,
                    },
                    data: JSON.stringify({ids:[data.item.id]}),
                    success: function(data) {
                        console.log(data)
                    }
                })
            }
        })
    })
    // --
    /*
    End control section
    */

    /*
    Begin playlist section
    */

    // Load playlist
    $( "#load-playlist" ).click( function( event ) {
        //Shuffle on
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/shuffle?state=true',
            type: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            success: function(data) {
                console.log(data);
            }
        })
        
        var playlist = document.getElementById("playlist-uri").value;
        if(playlist === ""){
            playlist = sessionStorage.getItem("playlist");
        }
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/play',
            type: 'PUT',
            contentType: "application/json",
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            data: JSON.stringify( { context_uri : playlist } ),
            success: function(data) {
                console.log(data);
            }
        })
    })
    //--
    
    $( "#playlist1" ).click( function( event ){
        sessionStorage.setItem("playlist","spotify:playlist:37i9dQZF1DX4UtSsGT1Sbe")
        setOption();
    })
    $( "#playlist2" ).click( function( event ){
        sessionStorage.setItem("playlist","spotify:playlist:6vI3xbpdPYYJmicjBieLcr")
    })
    $( "#playlist3" ).click( function( event ){
        sessionStorage.setItem("playlist","spotify:playlist:37i9dQZF1DWWEJlAGA9gs0")
    })


    /*
    End playlist section
    */

    /*
    Start option section
    */
    function setOption(){
        getOption();
        $("#option1").append(sessionStorage.getItem("option1"))
        $("#option2").append(sessionStorage.getItem("option2"))
        $("#option3").append(sessionStorage.getItem("option3"))
        $("#option4").append(sessionStorage.getItem("option4"))
    }

    // Getting related artist
    function getOption(){
        
        artistID = 0;
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player',
            type: 'GET',
            contentType: "application/json",
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            success: function(data, option) {
                option1 = data.item.artists[1].name
                window.artistID = data.item.artists[1].id
            }
        })
        console.log(option1)
        $.ajax({
            url: 'https://api.spotify.com/v1/artists/' + sessionStorage.getItem("artistID") + '/related-artists',
            type: 'GET',
            contentType: "application/json",
            headers: {
                'Authorization' : 'Bearer ' + token,
            },
            success: function(data) {
                sessionStorage.setItem("option2", data.artists[0].name)
                sessionStorage.setItem("option3", data.artists[1].name)
                sessionStorage.setItem("option4", data.artists[2].name)
            }
        })

    }



    /*
    End option section
    */



})