var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('video', {
    events: {
  
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  

  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", function() {
    player.playVideo();
  });
  
  var pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("click", function() {
    player.pauseVideo();
  });
  
}


var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
window.addEventListener("load", function (evt) {

          
            window.addEventListener("message", funcionQueManejaLosMensajes);

            function funcionQueManejaLosMensajes(evt) {

                var data = evt.data;
				if ((data.type === "set")&&(data.name === "play_pause")) {
                    if (data.value == "parar") {
                        player.pauseVideo();
					} else if (data.value == "seguir") {
                        player.playVideo();
                    }
                }
				
				if ((data.type === "set")&&(data.name === "cambia_idYouTube")) {
                    actualiza4(data.value)
					
                }

				
				if ((data.type === "set")&&(data.name === "actualizar")) {
                    actualiza(data.value)
					
                }
				
				if ((data.type === "set")&&(data.name === "actualizar_tiempo")) {
                    actualiza(data.value)
					
                }
				
				if ((data.type === "set")&&(data.name === "actualizar2")) {
                    actualiza2(data.value)
					
                }
				if ((data.type === "set")&&(data.name === "cambia_volumen")) {
                    actualiza3(data.value)
					
                }
				
                // se maneja un mensaje del tipo update
                else if (data.type === "update") {
				}
            }

            // se agrega una funcion al campo de texto enviar de la pagina html, para que le envie un mensaje a la escena de descartes 
            var contenido = document.getElementById("texto_a_enviar");
            contenido.addEventListener('click', function (evt) {
                window.parent.postMessage({
                    type: "set",
                    name: "t",
                    value: contenido.value
                }, '*');
                window.parent.postMessage({
                    type: "update"
                }, '*');
            });
			
			var contenido2 = document.getElementById("texto_a_enviar2");
            contenido2.addEventListener('click', function (evt) {
                window.parent.postMessage({
                    type: "set",
                    name: "t2",
                    value: contenido2.value
                }, '*');
                window.parent.postMessage({
                    type: "update"
                }, '*');
            });

        });

 <!--  Condicionales que generan los captios progresivamente con el video  -->				
        
        setInterval(function () {
            seg = Math.round(player.getCurrentTime());
			duracion = Math.round(player.getDuration());
			
            Contador.innerHTML = seg;
            document.getElementById("texto_a_enviar").value = seg;
            document.getElementById("texto_a_enviar").click();
			
			Contador2.innerHTML = duracion;
            document.getElementById("texto_a_enviar2").value = duracion;
            document.getElementById("texto_a_enviar2").click();
           
        }, 1000);



        <!--  BOTONES DE reproducción  -->				
        player = document.getElementById("video");

        function playPause() {
            var valor;
            if (player.pausedVideo) {
                player.playVideo();
                valor = "Iniciado";
            } else {
                player.pauseVideo();
                valor = "Pausado";
            }
        }
		function skip(value) {
        player.currentTime += value;
        } 
		
		function actualiza(value) {
        player.seekTo(value);
        }
		
		function actualiza2(value) {
        player.seekTo(value);
        }
		
		function actualiza3(value) {
        player.setVolume(value);
        }
		
		function actualiza4(value) {
        player.loadVideoById(value);
		player.playVideo();
        }