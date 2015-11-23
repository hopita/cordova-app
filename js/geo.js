var miapp = {
	control:"",
    mapa:"",    // para el objeto google map
    marcador:"",  // para el objeto marker de google map  

    // opciones de posición
    MAXIMUM_AGE: 200, // milisegundos
    TIMEOUT: 300000,
    HIGHACCURACY: true,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        	//Obtengo la ubicación del dispositivo, cada vez que el dispositiov cambia(watchPosition)
    	//Cada 200mls. se ejecutará mostrarMapa(), si al cabo de este tiempo no se obtiene información se ejecuta errores()
            miapp.control = navigator.geolocation.watchPosition(miapp.mostrarMapa, miapp.errores, {
                enableHighAccuracy: miapp.HIGHACCURACY,
                maximumAge: miapp.MAXIMUM_AGE,
                timeout: miapp.TIMEOUT
            });
    },
    
    //Esta función muestra el mapa de google con los datos que se le mandan cada 20mls.
    mostrarMapa: function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var latlng = new google.maps.LatLng(lat, lon);

            if(miapp.mapa) {
                miapp.mapa.panTo(latlng);
                miapp.marcador.setPosition(latlng);
            } else {
                var myOptions = {
                    zoom: 18,
                    center: latlng,

                    // mapTypeID --
                    // ROADMAP muestra la vista por defecto road map
                    // SATELLITE muestra imágenes de satélite Google Earth 
                    // HYBRID muestra una mezcla de la vista por defecto y satélite
                    // TERRAIN muestra un mapa físico basado en información del terreno.
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                miapp.mapa = new google.maps.Map(document.getElementById("mapa"), myOptions);

                miapp.marcador = new google.maps.Marker({
                    position: latlng,
                    title:"Estás aquí"
                });
                miapp.marcador.setMap(miapp.mapa);
            }
        },
        //Esta función se ejecuta si falla el envío de información mediante watchPosition
    errores: function(error) {
           miapp.cancelaPosicion();
            switch(error.code) {
                case error.TIMEOUT:
                    alert('Tiempo de espera de Geolocalización agotado');
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('Posición no disponible');
                    break;
                case error.PERMISSION_DENIED:
                    alert('Permiso de geolocalización denegado');
                    break;
                default:
                    alert('Geolocalización devolvió un error de código desonocido: ' + error.code);
            }
       },
	//Esta función cancela watchPosition
    cancelaPosicion: function() {
            if(miapp.control) navigator.geolocation.clearWatch(miapp.control);
            miapp.control = null;
       }	

};

miapp.initialize();