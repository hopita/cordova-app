// JavaScript Document
//Declaro objeto global
var miapp = {
	//variable que va a almacenar una referencia al elemento con id media
	miVideo:"",
	//Variable que va a almacenar una referencia al elemento con id foto
	miFoto:"",
	//Variable que va a almacenar los datos de la imagen
	dataURL:"",
	//Variable que va a almacenar una referencia al elemento con id canvas
	micanvas:"",
	//Variable que va a almacenar el contexto del lienzo
	micontexto:"",
	cameraAPIOptions: {},

	
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
        
		
		miapp.cameraAPIOptions.destinationType= 1;
		navigator.camera.getPicture(miapp.onSuccess, miapp.onFail, miapp.cameraAPIOptions);		
    },
    
	onFail: function(message) {
			alert("Error getting picture/image: " + message);
	},
	
	onSuccess: function(image){
		
		
		alert("This is the NATIVE URI: " + image);
		miapp.dataURL = image;

		
		/*
			 * El método getTime() me devuelde el número de mm desde 1970/01/01
			 * Lo voy a utilizar, junto con el string "img_" para generar una clave para el elemento que voy a almacenar
			 */ 
		var currentDate = new Date();
		var time = currentDate.getTime();
		var key = "img_" + time;
		var img_id= key;
		//Almaceno en  un objeto todos los datos del item a grabar
		var img_datos = {
		    titulo: "",
		    descripcion: "",
		    imagen: miapp.dataURL		
		};
		
		/*
			 * Con el método JSON.stringify() convierto el objeto javascript a una cadena JSON
			 * Y llamo al método setItem() para crear un item
			 */
		localStorage.setItem(img_id, JSON.stringify(img_datos));
		//para 2 $('#deviceImage').prop('src', miapp.dataURL);
		$('#deviceImage').prop('src', "data:image/jpeg;base64," + image);

	}
			
	};
miapp.initialize();
