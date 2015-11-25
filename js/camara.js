// JavaScript Document
//Declaro objeto global
var miapp = {
	botonhacerfoto:"",
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
    	
    	/* Almaceno la referencia al elemento type button con id grabareditar de formularioeditar y le registro un detector para el evento 'onclick'*/
		miapp.botonhacerfoto = document.getElementById('hacerfoto');
		miapp.botonhacerfoto.addEventListener('click', miapp.hacerFoto);
    	
    	/* Almaceno la referencia al elemento type button con id grabareditar de formularioeditar y le registro un detector para el evento 'onclick'*/
		var botoneditar = document.getElementById('grabareditar');
		botoneditar.addEventListener('click', miapp.modificaritem);				
    },
    
    hacerFoto: function(){
    	/*
    	 *La función camera.getPicture abre la aplicación predeterminada de cámara del dispositivo que permite a los usuarios, tomar fotografías.
    	 * Si hay exito ejecuta la función  onSuccess() y si falla onFail()
    	 */
    	navigator.camera.getPicture(miapp.onSuccess, miapp.onFail, { quality: 50,destinationType: Camera.DestinationType.FILE_URI });
    },
	
	
	onSuccess: function(image){	
		//Esta función se ejecuta si no ha habido problemas al tomar la fotografía y se le pasa los datosd e la imagen	
		/*
			 * El método getTime() me devuelde el número de mm desde 1970/01/01
			 * Lo voy a utilizar, junto con el string "img_" para generar una clave para el elemento que voy a almacenar
			 */ 
		var currentDate = new Date();
		var time = currentDate.getTime();
		var key = time;
		//Almaceno en  un objeto todos los datos del item a grabar
		var img_datos = {
		    titulo: "",
		    descripcion: "",
		    imagen: image		
		};
		
		/*
		* Con el método JSON.stringify() convierto el objeto javascript a una cadena JSON
		* Y llamo al método setItem() para crear un item
		*/
		localStorage.setItem(key, JSON.stringify(img_datos));
		//para 2 $('#deviceImage').prop('src', miapp.dataURL);
		$('#deviceImage').prop('src', image);
		var id=document.getElementById('idrecord');
		//Asigno el id al campo del formulario para despues modificarlo
		id.value =key;
		//Cierro la ventana modal donde se encuentra el formulario de modificación
		$('#modificacionModal').modal('show');
		
	},
	
	//Esta función se ejecuta al hacer click en el botón Modificar de formularioeditar
    modificaritem: function(){
		//Almaceno en variables el contenido de los campos id y datos de la imagen del item a modificar del formulario formularioeditar
		//En el elemento idrecord he almacenado el id del item a modificar
		var id = document.getElementById('idrecord').value;		
		var imagensrc = document.getElementById('deviceImage').src;
		//Almaceno las referencias al titulo y la descripción del formulario de modificación
		var mitituloeditar = document.getElementById('tituloeditar');
		var midescripcioneditar = document.getElementById('descripcioneditar');
	
		//Almaceno en  un objeto todos los datos del item a modificar
		var miimg_datos = {
		    titulo: mitituloeditar.value,
		    descripcion: midescripcioneditar.value,
		    imagen: imagensrc		
		};
		
		/*
		* Con el método JSON.stringify() convierto el objeto javascript a una cadena JSON
		* Y llamo al método set.Item() para actualizar el item
		*/
		localStorage.setItem(id, JSON.stringify(miimg_datos));
		
		mitituloeditar.value = "";
		midescripcioneditar.value = "";
		$('#modificacionModal').modal('hide');
	},
	
	onFail: function(message) {
	    alert('Failed because: ' + message);
	}
			
	};
miapp.initialize();
