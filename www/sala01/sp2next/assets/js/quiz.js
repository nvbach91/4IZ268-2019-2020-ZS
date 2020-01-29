const token = new URL(window.location).hash.split('&').filter(function(el) {
    if (el.match('access_token') !== null) return true;
  })[0].split('=')[1];
  
  $(function() {
    //Start player setup
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'quiz-player',
        getOAuthToken: cb => {
          cb(token);
        }
      });
  
      // Error handling
      player.addListener('initialization_error', ({
        message
      }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({
        message
      }) => {
        console.error(message);
      });
      player.addListener('account_error', ({
        message
      }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({
        message
      }) => {
        console.error(message);
      });
  
      // Playback status updates
      player.addListener('player_state_changed', state => {
        console.log(state);
      });
  
      // Ready
      player.addListener('ready', ({
        device_id
      }) => {
        console.log('Ready with Device ID', device_id);
        sessionStorage.setItem("device", device_id);
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
      });
  
  
  
      // Not Ready
      player.addListener('not_ready', ({
        device_id
      }) => {
        console.log('Device ID has gone offline', device_id);
      });
  
      // Connect to the player!
      player.connect();
  
    };
    //End player setup;
  
    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      success: function(data) {
        sayInfo("Hello " + data.display_name, "black")
      }
    })
  
    //Variable setting
    ids = [$("#option1"), $("#option2"), $("#option3"), $("#option4")]
    winstrike = $("#winstrike")
    score = $("#score")
    infospace = $("#infospace")
    playlists = [$("#playlist1"), $("#playlist2"), $("#playlist3"), $("#playlist4"), $("#playlist5")]
  
    //End variable setting   
  
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
      change: function() {
        $.ajax({
          url: 'https://api.spotify.com/v1/me/player/volume?volume_percent=' + Math.round($("#slider").slider("option", "value")),
          type: 'PUT',
          contentType: "application/json",
          headers: {
            'Authorization': 'Bearer ' + token,
          },
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
        url: 'https://api.spotify.com/v1/me/player/play',
        type: 'PUT',
        contentType: "application/json",
        headers: {
          'Authorization': 'Bearer ' + token,
        },
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
        url: 'https://api.spotify.com/v1/me/player/pause',
        type: 'PUT',
        contentType: "application/json",
        headers: {
          'Authorization': 'Bearer ' + token,
        },
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
        url: 'https://api.spotify.com/v1/me/player/next',
        type: 'POST',
        contentType: "application/json",
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        data: JSON.stringify({
          device_id: sessionStorage.getItem("device")
        }),
        success: function(data) {
  
          setOption()
        }
      })
    }
    $("#play").click(function(event) {
      play();
    })
  
  
    $("#pause").click(function(event) {
      pause();
    })
  
  
    $("#next").click(function(event) {
      winstrikeZero();
      sayInfoFade("NEXT", "#1db954", 1, 1000)
      next();
    })
  
    // Add Music to "Liked Song" playlist
    $("#add").click(function(event) {
      $.ajax({
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function(data) {
          console.log(data.item.id)
          $.ajax({
            url: 'https://api.spotify.com/v1/me/tracks',
            type: 'PUT',
            contentType: "application/json",
            headers: {
              'Authorization': 'Bearer ' + token,
            },
            data: JSON.stringify({
              ids: [data.item.id]
            }),
            success: function() {
              sayInfoFade("Song added <br>to you playlist", "#1db954", 1, 2000)
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
    $("#load-playlist").click(function(event) {
      //Shuffle on
      sayInfo("Loading", "black", 0, 1000)
      $.ajax({
        url: 'https://api.spotify.com/v1/me/player/shuffle?state=true',
        type: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
  
      var playlist = document.getElementById("playlist-uri").value;
      if (playlist === "") {
        playlist = sessionStorage.getItem("playlist");
      }
      $.ajax({
        url: 'https://api.spotify.com/v1/me/player/play',
        type: 'PUT',
        contentType: "application/json",
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        data: JSON.stringify({
          context_uri: playlist
        }),
        success: function() {
          zeroScore()
          sayInfoFade("Loaded", "black", 0, 1000)
          setOption()
        }
      })
    })
    //--
  
    playlists[0].click(function(event) {
      playlists[0].css("background-color", "#126b31")
      playlists[1].css("background-color", "#1db954")
      playlists[2].css("background-color", "#1db954")
      playlists[3].css("background-color", "#1db954")
      playlists[4].css("background-color", "#1db954")
  
      sessionStorage.setItem("playlist", "spotify:playlist:37i9dQZF1DX4UtSsGT1Sbe")
  
    })
    playlists[1].click(function(event) {
      playlists[0].css("background-color", "#1db954")
      playlists[1].css("background-color", "#126b31")
      playlists[2].css("background-color", "#1db954")
      playlists[3].css("background-color", "#1db954")
      playlists[4].css("background-color", "#1db954")
  
      sessionStorage.setItem("playlist", "spotify:playlist:6vI3xbpdPYYJmicjBieLcr")
    })
    playlists[2].click(function(event) {
      playlists[0].css("background-color", "#1db954")
      playlists[1].css("background-color", "#1db954")
      playlists[2].css("background-color", "#126b31")
      playlists[3].css("background-color", "#1db954")
      playlists[4].css("background-color", "#1db954")
  
      sessionStorage.setItem("playlist", "spotify:playlist:37i9dQZF1DWWEJlAGA9gs0")
    })
    playlists[3].click(function(event) {
      playlists[0].css("background-color", "#1db954")
      playlists[1].css("background-color", "#1db954")
      playlists[2].css("background-color", "#1db954")
      playlists[3].css("background-color", "#126b31")
      playlists[4].css("background-color", "#1db954")
  
      sessionStorage.setItem("playlist", "spotify:playlist:1DX76Nhh8s4CAlRVkDQA9M")
    })
    playlists[4].click(function(event) {
      playlists[0].css("background-color", "#1db954")
      playlists[1].css("background-color", "#1db954")
      playlists[2].css("background-color", "#1db954")
      playlists[3].css("background-color", "#1db954")
      playlists[4].css("background-color", "#126b31")
  
      sessionStorage.setItem("playlist", "spotify:playlist:2GtB2AgdIxtPXOjiywjvjt")
    })
  
  
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
          url: 'https://api.spotify.com/v1/me/player',
          type: 'GET',
          contentType: "application/json",
          headers: {
            'Authorization': 'Bearer ' + token,
          },
          success: function(data, option) {
            sessionStorage.setItem("option1", data.item.artists[0].name)
            sessionStorage.setItem("artistID", data.item.artists[0].id)
            $.ajax({
              url: 'https://api.spotify.com/v1/artists/' + sessionStorage.getItem("artistID") + '/related-artists',
              type: 'GET',
              contentType: "application/json",
              headers: {
                'Authorization': 'Bearer ' + token,
              },
              success: function(data) {
                sessionStorage.setItem("option2", data.artists[0].name)
                sessionStorage.setItem("option3", data.artists[1].name)
                sessionStorage.setItem("option4", data.artists[2].name)
  
                ids[0].empty()
                ids[1].empty()
                ids[2].empty()
                ids[3].empty()
  
                t = Math.floor(Math.random() * 4);
                for (i = 0; i < 4; i++) {
  
                  t = (t === 4) ? 0 : t;
                  ids[i].append(sessionStorage.getItem("option" + (t + 1)))
                  t++;
  
                }
              }
            })
          }
        })
      }, 1000)
  
    }
  
    function scoreInc() {
      var temp = Number.parseInt(score.text());
      score.empty()
      score.append(temp + 1)
    }
  
    function winstrikeInc() {
      var temp = Number.parseInt(winstrike.text());
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
  
  
    ids[0].click(function(event) {
      console.log(ids[0].text())
      console.log(sessionStorage.getItem("option1"))
      if (ids[0].text() === sessionStorage.getItem("option1")) {
        scoreInc()
        winstrikeInc()
        sayNice()
        next()
  
        ids[0].css("border", "6px solid #1db954")
        setTimeout(function() {
          ids[0].css("border", "6px solid #191414")
        }, 1000)
  
      } else {
        winstrikeZero()
        sayWrong()
        next()
        ids[0].css("border", "6px solid #a51717")
        setTimeout(function() {
          ids[0].css("border", "6px solid #191414")
        }, 1000)
      }
  
    })
    ids[1].click(function(event) {
      if (ids[1].text() === sessionStorage.getItem("option1")) {
        scoreInc()
        winstrikeInc()
        sayNice()
        next()
        ids[1].css("border", "6px solid #1db954")
        setTimeout(function() {
          ids[1].css("border", "6px solid #191414")
        }, 1000)
      } else {
        winstrikeZero()
        sayWrong()
        next()
        ids[1].css("border", "6px solid #a51717")
        setTimeout(function() {
          ids[1].css("border", "6px solid #191414")
        }, 1000)
      }
    })
    ids[2].click(function(event) {
      if (ids[2].text() === sessionStorage.getItem("option1")) {
        scoreInc()
        winstrikeInc()
        sayNice()
        next()
        ids[2].css("border", "6px solid #1db954")
        setTimeout(function() {
          ids[2].css("border", "6px solid #191414")
        }, 1000)
      } else {
        winstrikeZero()
        sayWrong()
        next()
        ids[2].css("border", "6px solid #a51717")
        setTimeout(function() {
          ids[2].css("border", "6px solid #191414")
        }, 1000)
      }
    })
    ids[3].click(function(event) {
      if (ids[3].text() === sessionStorage.getItem("option1")) {
        scoreInc()
        winstrikeInc()
        sayNice()
        next()
        ids[3].css("border", "6px solid #1db954")
        setTimeout(function() {
          ids[3].css("border", "6px solid #191414")
        }, 1000)
      } else {
        winstrikeZero()
        sayWrong()
        next()
        ids[3].css("border", "6px solid #a51717")
        setTimeout(function() {
          ids[3].css("border", "6px solid #191414")
        }, 1000)
      }
    })
  
  
  
  
    /*
    End option section
    */
  
  
  
  })