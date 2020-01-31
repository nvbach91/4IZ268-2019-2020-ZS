const token = new URL(window.location).hash.split('&').filter(function(el) {
    if (el.match('access_token') !== null) return true
})[0].split('=')[1]

$(function() {


    //Start player setup
    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
            name: 'quiz-player',
            getOAuthToken: cb => {
                cb(token)
            }
        })

        // Error handling
        player.addListener('initialization_error', ({
            message
        }) => {
            console.error(message)
        })
        player.addListener('authentication_error', ({
            message
        }) => {
            console.error(message)
        })
        player.addListener('account_error', ({
            message
        }) => {
            console.error(message)
        })
        player.addListener('playback_error', ({
            message
        }) => {
            console.error(message)
        })

        // Playback status updates
        player.addListener('player_state_changed', state => {
            console.log(state)
        })

        // Ready
        player.addListener('ready', ({
            device_id
        }) => {
            console.log('Ready with Device ID', device_id)
            sessionStorage.setItem("device", device_id)
            //Choose this device to allow play in Browser
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player',
                type: 'PUT',
                contentType: "application/json",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                data: JSON.stringify({
                    device_ids: [sessionStorage.getItem("device")]
                }),
                success: function(data) {}
            })
        })



        // Not Ready
        player.addListener('not_ready', ({
            device_id
        }) => {
            console.log('Device ID has gone offline', device_id)
        })

        // Connect to the player!
        player.connect()

    }
    //End player setup

    //Variable setting
    var ids = [$("#option1"), $("#option2"), $("#option3"), $("#option4")]
    var winstrike = $("#winstrike")
    var score = $("#score")
    var infospace = $("#infospace")
    var playlists = [$("#playlist1"), $("#playlist2"), $("#playlist3"), $("#playlist4"), $("#playlist5")]
    var baseURL = 'https://api.spotify.com/v1'
    var headerToken = {
        'Authorization': 'Bearer ' + token
    }

    //End variable setting 

    //Greetings
    $.ajax({
        url: baseURL + '/me',
        type: 'GET',
        headers: headerToken,
        success: function(data) {
            sayInfo("Hello " + data.display_name, "black")
        }
    })



    //function to make score = 0
    function zeroScore() {
        winstrike.empty()
        score.empty()

        winstrike.append("0")
        score.append("0")
    }

    /*
    Start control section
    */

    $("#slider").slider({
        max: 100,
        min: 0,
        value: 100,
        change: function() {
            $.ajax({
                url: baseURL + '/me/player/volume?volume_percent=' + Math.round($("#slider").slider("option", "value")),
                type: 'PUT',
                contentType: "application/json",
                headers: headerToken,
                data: JSON.stringify({
                    device_id: sessionStorage.getItem("device")
                }),
                success: function(data) {
                    sayInfoFade("Volume set to " + Math.round($("#slider").slider("option", "value")), "#1db954", 1, 1000)
                }
            })
        }
    })
    //play
    function play() {
        $.ajax({
            url: baseURL + '/me/player/play',
            type: 'PUT',
            contentType: "application/json",
            headers: headerToken,
            data: JSON.stringify({
                device_id: sessionStorage.getItem("device")
            }),
            success: function(data) {
                sayInfoFade("PLAY", "#1db954", 1, 1000)
            }
        })
    }
    //pause
    function pause() {
        $.ajax({
            url: baseURL + '/me/player/pause',
            type: 'PUT',
            contentType: "application/json",
            headers: headerToken,
            data: JSON.stringify({
                device_id: sessionStorage.getItem("device")
            }),
            success: function(data) {
                sayInfoFade("PAUSE", "#1db954", 1, 1000)
            }
        })
    }

    function next() {
        $.ajax({
            url: baseURL + '/me/player/next',
            type: 'POST',
            contentType: "application/json",
            headers: headerToken,
            data: JSON.stringify({
                device_id: sessionStorage.getItem("device")
            })
        }).done(() => {
            setOption()
        })
    }
    
    $("#play").click(function(event) {
        play()
    })


    $("#pause").click(function(event) {
        pause()
    })


    $("#next").click(function(event) {
        winstrikeZero()
        sayInfoFade("NEXT", "#1db954", 1, 1000)
        next()
    })

    // Add Music to "Liked Song" playlist
    $("#add").click(function(event) {
        $.ajax({
            url: baseURL + '/me/player/currently-playing',
            type: 'GET',
            headers: headerToken
        }).done((data) => {
            console.log(data.item.id)
            $.ajax({
                url: baseURL + '/me/tracks',
                type: 'PUT',
                contentType: "application/json",
                headers: headerToken,
                data: JSON.stringify({
                    ids: [data.item.id]
                })
            })
        }).done(() => {
            sayInfoFade("Song added <br>to you playlist", "#1db954", 1, 2000)
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
    $("#load-playlist").click(function(event) {
        //Shuffle on
        sayInfo("Loading", "black", 0, 1000)
        $.ajax({
            url: baseURL + '/me/player/shuffle?state=true',
            type: 'PUT',
            headers: headerToken
        }).done(() => {
            var playlist = document.getElementById("playlist-uri").value
            document.getElementById("playlist-uri").value = ""
            if (playlist === "") {
                playlist = sessionStorage.getItem("playlist")
            }
            $.ajax({
                url: baseURL + '/me/player/play',
                type: 'PUT',
                contentType: "application/json",
                headers: headerToken,
                data: JSON.stringify({
                    context_uri: playlist
                }),
            }).done(() => {
                zeroScore()
                sayInfoFade("Loaded", "black", 0, 1000)
                setOption()
            })
        })

    })

        
    //--

    for( i = 0 ; i < 5 ; i++ ){
        let cb = (i) => function(){
            for ( k = 0 ; k < 5 ; k++){
                if ( i === k ){
                    playlists[i].css("background-color", "#126b31")
                }else{
                    playlists[k].css("background-color", "#1db954")
                }
            }
            console.log(i + "," + playlists[i].text())
            switch(i){
                case 0: sessionStorage.setItem("playlist", "spotify:playlist:37i9dQZF1DX4UtSsGT1Sbe"); break
                case 1: sessionStorage.setItem("playlist", "spotify:playlist:6vI3xbpdPYYJmicjBieLcr"); break
                case 2: sessionStorage.setItem("playlist", "spotify:playlist:37i9dQZF1DWWEJlAGA9gs0"); break
                case 3: sessionStorage.setItem("playlist", "spotify:playlist:1DX76Nhh8s4CAlRVkDQA9M"); break
                case 4: sessionStorage.setItem("playlist", "spotify:playlist:2GtB2AgdIxtPXOjiywjvjt"); break
            }

        }
        playlists[i].click(cb(i))
    }


    // function playlistColorSet(k) {
    //     for (i = 0; i < 5; i++) {
    //         if (i === k) {
    //             playlists[k].css("background-color", "#126b31")
    //         } else {
    //             playlists[i].css("background-color", "#1db954")
    //         }
    //     }
    // }


    // playlists[0].click(function(event) {
    //     playlistColorSet(0)
    //     sessionStorage.setItem("playlist", "spotify:playlist:37i9dQZF1DX4UtSsGT1Sbe")

    // })
    // playlists[1].click(function(event) {
    //     playlistColorSet(1)
    //     sessionStorage.setItem("playlist", "spotify:playlist:6vI3xbpdPYYJmicjBieLcr")
    // })
    // playlists[2].click(function(event) {
    //     playlistColorSet(2)
    //     sessionStorage.setItem("playlist", "spotify:playlist:37i9dQZF1DWWEJlAGA9gs0")
    // })
    // playlists[3].click(function(event) {
    //     playlistColorSet(3)
    //     sessionStorage.setItem("playlist", "spotify:playlist:1DX76Nhh8s4CAlRVkDQA9M")
    // })
    // playlists[4].click(function(event) {
    //     playlistColorSet(4)
    //     sessionStorage.setItem("playlist", "spotify:playlist:2GtB2AgdIxtPXOjiywjvjt")
    // })


    /*
    End playlist section
    */

    /*
    Start option section
    */
    /*
    Set option to choose.
    1. Getting info about playback
    2. Get playing artist
    3. Get related artist
    */
    function setOption() {

        setTimeout(function() {
        $.ajax({
                url: baseURL + '/me/player',
                type: 'GET',
                contentType: "application/json",
                headers: headerToken
            })
            .done((data1) => {
                console.log("data1")
                temp2 = data1
                console.log(data1)
                sessionStorage.setItem("option1", data1.item.artists[0].name)
                sessionStorage.setItem("artistID", data1.item.artists[0].id)
                $.ajax({
                    url: 'https://api.spotify.com/v1/artists/' + data1.item.artists[0].id + '/related-artists',
                    type: 'GET',
                    contentType: "application/json",
                    headers: headerToken
                })
                .done((data2) => {
                    var temp1 = data2
                    console.log("data2")
                    console.log(data2)
                    for (i = 0; i < 3; i++) {
                        sessionStorage.setItem("option" + (i + 2), data2.artists[i].name)
                    }
    
                    t = Math.floor(Math.random() * 4)
                    for (i = 0; i < 4; i++) {
    
                        ids[i].empty()
    
                        t = (t === 4) ? 0 : t
                        ids[i].append(sessionStorage.getItem("option" + (t + 1)))
                        if (t === 0) {
                            sessionStorage.setItem("rightOption", i)
                        }
    
                        t++
    
                    }
    
                })

            })
        }, 1000)

    }


    // function setOption() {

    //   setTimeout(function() {

    //     $.ajax({
    //       url: baseURL + '/me/player',
    //       type: 'GET',
    //       contentType: "application/json",
    //       headers: headerToken,
    //       success: function(data) {
    //         sessionStorage.setItem("option1", data.item.artists[0].name)
    //         sessionStorage.setItem("artistID", data.item.artists[0].id)
    //         $.ajax({
    //           url: 'https://api.spotify.com/v1/artists/' + sessionStorage.getItem("artistID") + '/related-artists',
    //           type: 'GET',
    //           contentType: "application/json",
    //           headers: headerToken,
    //           success: function(data) {
    //             sessionStorage.setItem("option2", data.artists[0].name)
    //             sessionStorage.setItem("option3", data.artists[1].name)
    //             sessionStorage.setItem("option4", data.artists[2].name)


    //             t = Math.floor(Math.random() * 4)
    //             for (i = 0; i < 4; i++) {


    //               ids[i].empty()

    //               t = (t === 4) ? 0 : t
    //               ids[i].append(sessionStorage.getItem("option" + (t + 1)))
    //               if (t === 0){
    //                 sessionStorage.setItem("rightOption", i)
    //               }

    //               t++

    //             }
    //           }
    //         })
    //       }
    //     })
    //   }, 1000)

    // }

    function scoreInc() {
        var temp = Number.parseInt(score.text())
        score.empty()
        score.append(temp + 1)
    }

    function winstrikeInc() {
        var temp = Number.parseInt(winstrike.text())
        winstrike.empty()
        winstrike.append(temp + 1)
    }

    function winstrikeZero() {
        winstrike.empty()
        winstrike.append(0)
    }

    function sayNice() {
        infospace.empty()
        infospace.css("color", "green")
        infospace.append("NICE")
        infospace.fadeIn(100).fadeOut(1000)
        setTimeout(function() {
            infospace.empty()
        }, 1300)




    }

    function sayInfoFade(message, color, i, o) {
        infospace.empty()
        infospace.css("color", color)
        infospace.append(message)
        infospace.fadeIn(i).fadeOut(o)
        setTimeout(function() {
            infospace.empty()
        }, i + o)
    }

    function sayInfo(message, color) {
        infospace.empty()
        infospace.css("color", color)
        infospace.append(message)

    }

    function sayWrong() {
        infospace.empty()
        infospace.css("color", "red")
        infospace.append("WRONG")
        infospace.fadeIn(300).fadeOut(1000)
        setTimeout(function() {
            infospace.empty()
        }, 1300)




    }

    for (i = 0; i < 4; i++) {
        let cb = (i) => function(){
            showRightPic()
            console.log(ids[i].text())
            console.log(sessionStorage.getItem("option" + (i + 1)))
            if (ids[i].text() === sessionStorage.getItem("option1")) {
                scoreInc()
                winstrikeInc()
                sayNice()
                ids[i].css("border", "6px solid #1db954")
                setTimeout(function() {
                    ids[i].css("border", "6px solid #191414")
                    next()
                }, 1300)
            } else {
                winstrikeZero()
                sayWrong()
                ids[i].css("border", "6px solid #a51717")
                console.log(ids[sessionStorage.getItem("rightOption")])
                ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #1db954")
                setTimeout(function() {
                    ids[i].css("border", "6px solid #191414")
                    ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #191414")
                    next()
                }, 1300)
            }
        }
        ids[i].click(cb(i))
    }


    // ids[0].click(function(event) {
    //     showRightPic()
    //   console.log(ids[0].text())
    //   console.log(sessionStorage.getItem("option1"))
    //   if (ids[0].text() === sessionStorage.getItem("option1")) {
    //     scoreInc()
    //     winstrikeInc()
    //     sayNice()


    //     ids[0].css("border", "6px solid #1db954")
    //     setTimeout(function() {
    //       ids[0].css("border", "6px solid #191414")

    //       next()
    //     }, 1300)



    //   } else {
    //     winstrikeZero()
    //     sayWrong()

    //     ids[0].css("border", "6px solid #a51717")
    //     ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #1db954")
    //     setTimeout(function() {
    //       ids[0].css("border", "6px solid #191414")
    //       ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #191414")
    //       next()
    //     }, 1300)


    //   }

    // })
    // ids[1].click(function(event) {
    //     showRightPic()
    //   if (ids[1].text() === sessionStorage.getItem("option1")) {
    //     scoreInc()
    //     winstrikeInc()
    //     sayNice()

    //     ids[1].css("border", "6px solid #1db954")
    //     setTimeout(function() {
    //       ids[1].css("border", "6px solid #191414")
    //       next()
    //     }, 1300)


    //   } else {
    //     winstrikeZero()
    //     sayWrong()

    //     ids[1].css("border", "6px solid #a51717")
    //     ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #1db954")
    //     setTimeout(function() {
    //       ids[1].css("border", "6px solid #191414")
    //       ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #191414")
    //       next()
    //     }, 1300)


    //   }
    // })
    // ids[2].click(function(event) {
    //     showRightPic()
    //   if (ids[2].text() === sessionStorage.getItem("option1")) {
    //     scoreInc()
    //     winstrikeInc()
    //     sayNice()

    //     ids[2].css("border", "6px solid #1db954")
    //     setTimeout(function() {
    //       ids[2].css("border", "6px solid #191414")
    //       next()
    //     }, 1300)


    //   } else {
    //     winstrikeZero()
    //     sayWrong()

    //     ids[2].css("border", "6px solid #a51717")
    //     ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #1db954")
    //     setTimeout(function() {
    //       ids[2].css("border", "6px solid #191414")
    //       ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #191414")
    //       next()
    //     }, 1300)


    //   }
    // })
    // ids[3].click(function(event) {
    //     showRightPic()
    //   if (ids[3].text() === sessionStorage.getItem("option1")) {
    //     scoreInc()
    //     winstrikeInc()
    //     sayNice()

    //     ids[3].css("border", "6px solid #1db954")
    //     setTimeout(function() {
    //       ids[3].css("border", "6px solid #191414")
    //       next()
    //     }, 1300)


    //   } else {
    //     winstrikeZero()
    //     sayWrong()

    //     ids[3].css("border", "6px solid #a51717")
    //     ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #1db954")
    //     setTimeout(function() {
    //       ids[3].css("border", "6px solid #191414")
    //       ids[sessionStorage.getItem("rightOption")].css("border", "6px solid #191414")
    //       next()
    //     }, 1300) 

    //   }
    // })
    //Show album poster with name
    function showRightPic() {
        $.ajax({
            url: baseURL + '/me/player/currently-playing',
            type: 'GET',
            headers: headerToken,
        }).done((data) => {
            var temp = data
            console.log(data)
            return $.ajax({
                url: baseURL + '/tracks/' + temp.item.id,
                type: 'GET',
                headers: headerToken
                }).done((data) => {
                    var temp = data
                    $('#poster').empty()
                        $('<img />')
                            .attr('src', "" + temp.album.images[1].url + "")
                            .attr('alt', data.album.name)
                            .attr('id', "poster-img")
                            .width(data.album.images[1].height).height(data.album.images[1].width)
                            .appendTo($('#poster'))
                        $("#poster-img").animate({
                            opacity: 0,
                        }, 4000, function() {
                            // Animation complete.
                        })
                })
        })
    }




    /*
    End option section
    */



})