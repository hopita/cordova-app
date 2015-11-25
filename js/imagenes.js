//Declaro objeto global
var miapp = {
	mitituloeditar:"",
	midescripcioneditar:"",	

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
		/* Almaceno la referencia al elemento type button con id eliminartodos y le registro un detector para el evento 'onclick'*/
		var mibotoneliminartodos = document.getElementById('eliminartodos');
		mibotoneliminartodos.addEventListener('click', miapp.eliminarTodos);
		
		//Almaceno las referencias al titulo y la descripción del formulario de modificación
		miapp.mitituloeditar = document.getElementById('tituloeditar');
		miapp.midescripcioneditar = document.getElementById('descripcioneditar');
		
		/* Almaceno la referencia al elemento type button con id alta y le registro un detector para el evento 'onclick'*/
		var mibotonalta = document.getElementById('alta');
		mibotonalta.addEventListener('click', miapp.seleccionaimagen);
		
		/* Almaceno la referencia al elemento type button con id grabareditar de formularioeditar y le registro un detector para el evento 'onclick'*/
		var botoneditar = document.getElementById('grabareditar');
		botoneditar.addEventListener('click', miapp.modificaritem);
		
		//El evento hide.bs.modal se lanza cuando la ventana(en este caso de alta) se cierra.
		$('#modificacionModal').on('hidden.bs.modal',miapp.mostrar);
		
		/* Ejecuto la función mostrar()*/
		if (localStorage.length > 0){
			miapp.mostrar();
		}		
    },
    
    seleccionaimagen: function(){		
<<<<<<< HEAD
    	/*
    	 *La función camera.getPicture abre la aplicación predeterminada de cámara del dispositivo que permite a los usuarios, ene ste caso seleccionar una imagen del album de fotografías.
    	 * Si hay exito ejecuta la función  onSuccess() y si falla onFail()
    	 */
=======
>>>>>>> a598e3fa1685f21863a5ca2f72fe11a36e296a8a
		navigator.camera.getPicture(miapp.onSuccess, miapp.onFail, { quality: 50,sourceType: Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true });
	},
	
	
<<<<<<< HEAD
	//Esta función se ejecuta cuando no ha habido errores con la cámara y se le pasa como parámetro los datos de la fotografía.
	onSuccess: function(image){	
		/**
		 * He tenido que utilizar el plugin FilePath para solucionar el problema de la ruta de archivos.
		 * Con la opción Camera.PictureSourceType.PHOTOLIBRARY, el sistema no encontraba la ruta de las imágenes para mostrarlas.
		 * Este plugin convierte la URI en formato content://... en una ruta completa
		 */
=======
	//Esta función se ejecuta cuando no ha habido errores con la cámara
	onSuccess: function(image){	
		//converts the URI in 'content://...' format into full file path
>>>>>>> a598e3fa1685f21863a5ca2f72fe11a36e296a8a
		window.FilePath.resolveNativePath(image, function(result) {
		    // onSuccess code
		    image = 'file://' + result;
		    /*
			 * El método getTime() me devuelde el número de mm desde 1970/01/01
			 * Lo voy a utilizar, junto con el string "img_" para generar una clave para el elemento que voy a almacenar
			 */ 
			
		    var currentDate = new Date();
<<<<<<< HEAD
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
			
			//Llamo a la función que me da los datos para mostrarlos en el formulario de modificación
			miapp.dameitem(key);
			
			//Abro la ventana con el formulario de modificación
			$('#modificacionModal').modal('show');
		
		  }, function (error) {
		    console.log("Error en FilePath.resolveNativePath");
		  });
		
			
		
=======
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
		miapp.dameitem(key);
		$('#modificacionModal').modal('show');
		
		  }, function (error) {
		    console.log("Error en FilePath.resolveNativePath");
		  });
		
			
		
>>>>>>> a598e3fa1685f21863a5ca2f72fe11a36e296a8a

	},

	//Esta función se ejecuta al hacer click en el botón Modificar de formularioeditar
   modificaritem: function(){
		//Almaceno en variables el contenido de los campos id y datos de la imagen del item a modificar del formulario formularioeditar
		//En el elemento idrecord he almacenado el id del item a modificar
		var id = document.getElementById('idrecord').value;		
		var imagensrc = document.getElementById('deviceImage').src;
		
		//Almaceno en  un objeto todos los datos del item a modificar
		var miimg_datos = {
		    titulo: miapp.mitituloeditar.value,
		    descripcion: miapp.midescripcioneditar.value,
		    imagen: imagensrc
		
		};
		
		/*
		* Con el método JSON.stringify() convierto el objeto javascript a una cadena JSON
		* Y llamo al método set.Item() para actualizar el item
		*/
		localStorage.setItem(id, JSON.stringify(miimg_datos));
		
		//Cierro la ventana modal donde se encuentra el formulario de modificación
		$('#modificacionModal').modal('hide');
		
		//Ejecuto mostrar() para actualizar el listado.
		miapp.mostrar();
	},
	
	/*
	 * Esta función se ejecuta al hacer click sobre el botón editar del listado.
	 * Se le pasa como parámetro el id de la imagen a modificar
	 * Muestra en el formuario los datos del item a modificar
	 */	
  	dameitem: function(clave){
  		console.log("clave " + clave);
  		
		//Almaceno las referencias a los diferentes campos de formularioeditar
		//El elemento idrecord es un campo de tipo hidden donde almacenaré el id de la imagen, para posteriormente grabarla
		var id=document.getElementById('idrecord');
		var cajaimagen = document.getElementById('cajaimagen');
		
		/*
		 * Llamo al método get.Item() para obtener el valor del item a modificar
		* Con el método JSON.parse() analizo el string devuelto como JSON y lo almaceno en un objeto
		*/
		var valor = localStorage.getItem(clave);
		var datos = JSON.parse(valor);
		
		//Asigno estos datos a los campos del formulario para mostrarlos
		id.value =clave;
		miapp.mitituloeditar.value = datos.titulo;
		miapp.midescripcioneditar.value = datos.descripcion;
		cajaimagen.innerHTML = '<img id="deviceImage" class="img-responsive" src="' + datos.imagen + '" >';
	},

   /*
    * Esta función se ejecuta al cargar la página y cada vez que se modifica un item o se da un alta de un nuevo item.
    * Se encarga de recuperar los items y pintarlos en pantalla
    */
   mostrar: function(){
   		//Almaceno la referencia al elemento donde se va mostrar el listado y lo limpio
		var cajadatos = document.getElementById('cajadatos');
		cajadatos.innerHTML = "";
		
		 //En esta variable creo el html del listado, no lo hago directamente sobre cajadatos porque no genera bien el <ul>
		var texto='<ul class="list-group">';
		//En este bucle recupero los items y los almaceno en la variable texto
		for (var f = 0; f < localStorage.length; f++){
			var clave = localStorage.key(f);
			var valor = localStorage.getItem(clave);
			var datos = JSON.parse(valor);
			
			
			texto += '<li class="list-group-item"><div class="col-sm-2"><img  class="" src="' + datos.imagen  + '" ></div><div class="col-sm-10"><h2 class="h4">' +  datos.titulo + '</h2>' + datos.descripcion + '</div><div class="botones col-sm-10"><button type="button" data-id-imagen-modificar="'+ clave + '" class="modificar" data-toggle="modal" data-target="#modificacionModal"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button class="eliminar" data-id-imagen-eliminar="' + clave + '" type="button"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></li>';
			
		}
		texto += '</ul>';
		//Pinto el listado en patalla
		cajadatos.innerHTML = texto;
		
		/* Almaceno la referencia a los elementos type button con class modificar del listado de imágenes y les registro un detector para el evento 'onclick'*/
    	var mibotomodificar = document.getElementsByClassName('modificar');
		
		for (var i = 0; i < mibotomodificar.length; i++) {
    		mibotomodificar[i].addEventListener('click',function(e){ 
    			console.log(this.dataset.idImagenModificar);
		    	miapp.dameitem(this.dataset.idImagenModificar); //And create a function that handles this.		    	
			});		
    		
		}

		/* Almaceno la referencia a los elementos type button con class eliminar del listado de imágenes y les registro un detector para el evento 'onclick'*/
    	var mibotoeliminar = document.getElementsByClassName('eliminar');
    	for (var i = 0; i < mibotoeliminar.length; i++) {
    		mibotoeliminar[i].addEventListener('click',function(e){ 
    			console.log(this.dataset.idImagenEliminar);
		    	miapp.eliminar(this.dataset.idImagenEliminar); //And create a function that handles this.		    	
			});
    		
		}
	},
	
	//Esta función se ejecuta al hacer click en el botón eliminar de cada item, elimina el item selecionado
   eliminar: function(clave){
	
		if (confirm('¿Va a eliminar un item, está seguro?')){
			localStorage.removeItem(clave);
		}
		miapp.mostrar();
	},
	
	//Esta función se ejecuta al hacer click en el botom 'Eliminar todos'
   eliminarTodos: function(){
   	
		if (confirm('Va a eliminar todos los items,Está seguro?')){
			//Guardo el total de items en esta variable porque tengo que recorrer el bucle tantas veces como items hay antes de eliminar ninguno
			var totalInicial = localStorage.length;
			
			for (var f = 0; f < totalInicial; f++){
				
				//En cada iteración se elimina el primer item
				var clave = localStorage.key(0);
				
				localStorage.removeItem(clave);
			}
			miapp.mostrar();
		}
	}
	
};
miapp.initialize();