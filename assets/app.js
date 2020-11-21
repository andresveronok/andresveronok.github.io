function Usuario(usuario, contrasenia, email,nombre, apellido){
    this.usuario = usuario;
    this.contrasenia = contrasenia;
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido; 
}

function Tarjeta(nombreTarjeta, tipoTarjeta,numeroTarjeta, fechaVencimiento, codigo){
    this.nombreTarjeta = nombreTarjeta;
    this.tipoTarjeta = tipoTarjeta;
    this.numeroTarjeta = numeroTarjeta;
    this.fechaVencimiento = fechaVencimiento;
    this.codigo = codigo;
}

function Compra(cantidad, items, total){
    this.cantidad = cantidad;
    this.items = items;
    this.total = total;
}

var arrayUsuario = []
var arrayTarjeta = [];
var arrayCompra = [];
var arrayItems = [];
var arrayPeliculas = [];
var peliSeleccionada = "";
var peliBuscar = "";

var cantidad = 1;
var resultado = 0;
var precio = 300
var total = $("#total");

Array.prototype.random = function () { return this[Math.floor((Math.random()*this.length))]; } 

var urls = [];

for (let i = 0; i < 7; i++){
    var numero = [4125654, 1884431, 1772240, 6466002, 1979376, 2381941, 6967644, 1431045, 1637725, 1270797, 1270797, 5884052, 6823368, 4154796, 7286456, 6857112, 7343762, ].random();
    numero = "tt"+numero
    var key = "&apikey=a2b820e3";
    urls.push("http://www.omdbapi.com/?i=" + numero + key)
}



$("#bt-registrarse").on("click", registrarse);

function registrarse(evento){
    evento.preventDefault();
    let agregarEmail = $("<div class=form-group id=email-group><input type=email id=email class=form-control placeholder= Email name=email required></input></div>");
    let agregarRepetirEmail = $("<div class=form-group id=remail-group><input id=remail type=email class=form-control placeholder= 'Repita su email' name=email required></input></div>");
    let agregarTerminos = $("<div class='custom-control custom-radio'><input id=terminos name=terminosCondiciones type=radio class=custom-control-input required><label class='custom-control-label text-white' for=terminos>Acepto términos y condiciones</label></input></div>")
    let agregarBoton =$("<button id='bt-siguiente' type=submit class='btn btn-primary'><i class='fas fa-chevron-circle-right'></i> Siguiente</button>");
    let registro = $("#form-contrasenia");
    $("#bt-ingresar").remove();
    $("#bt-registrarse").remove();
    registro.after(agregarEmail);
    agregarEmail.after(agregarRepetirEmail);
    agregarRepetirEmail.after(agregarTerminos);
    agregarTerminos.after(agregarBoton);

}

$("#form-registro").on("submit", registrar);

function registrar(evento){
    evento.preventDefault();
    let usuario = $("#nombre").val();
    let contrasenia = $("#contrasenia").val();
    let email = $("#email").val();

    if (email == $("#remail").val()){
        arrayUsuario.push(new Usuario(usuario,contrasenia,email));
        console.log(arrayUsuario)

        let guardarUsuarioJSON = JSON.stringify(arrayUsuario);
        localStorage.setItem("usuario", guardarUsuarioJSON);

        let cargarUsuarioJSON = localStorage.getItem("usuario");
        arrayUsuario = JSON.parse(cargarUsuarioJSON);
        $("#cuenta").text(arrayUsuario[0].usuario);
        location.href="index.html"
    }else{
        $("#msg-error").remove()
        $("#form-registro").append("<div id='msg-error' class='alert alert-danger' role=alert>'El email ingresado no es valido.'</div>")
    }

}

$("#bt-ingresar").on("click", ingresar);

function ingresar(){
    let cargarUsuarioJSON = localStorage.getItem("usuario");
    arrayUsuario = JSON.parse(cargarUsuarioJSON);
    $("#cuenta").text(arrayUsuario[0].usuario);

    usuario = $("#nombre").val();
    let contrasenia = $("#contrasenia").val();

    for(let i=0; i<= arrayUsuario.length - 1; i++){
        if(usuario == arrayUsuario[i].usuario && contrasenia == arrayUsuario[i].contrasenia){
            let guardarUsuarioJSON = JSON.stringify(arrayUsuario);
            sessionStorage.setItem("usuario", guardarUsuarioJSON);

            location.href="index.html"
            break;
        }else{
            $("#msg-error").remove()
            $("#form-registro").append("<div id='msg-error' class='alert alert-danger' role=alert>'Nombre de usuario o contraseña incorrectas.'</div>")
        }
    }
}



$("#buscador").on("change", capturarNombre);

function capturarNombre(){
    peliBuscar = $("#buscador").val().toLowerCase();
    peliBuscar = peliBuscar.split(' ').join('+')
    $.ajax({
            url: "http://www.omdbapi.com/?t=" + peliBuscar + "&apikey=a2b820e3",
            type: "GET",
            dataType: "json"
        }).done(function(resultadoJson){
            $(".movie-img").attr("src", resultadoJson.Poster);
            $("#plot").text(resultadoJson.Plot)
            $("#title").text(resultadoJson.Title)
            $("#actor").text("Actores: " + resultadoJson.Actors)
            $("#ranking").text("Ranking: " + resultadoJson.imdbRating)

        }).fail( function(xhr, status, error) {  
            console.log(xhr);
            console.log(status);
            console.log(error);
        }) 
}


function mostrar(urls){

    if (urls.length > 0){
        $.ajax({
                    url: urls.pop(),
                    type: "GET",
                    dataType: "json"
                }).done(function(resultadoJson){
                    if (resultadoJson.Poster != undefined && resultadoJson.Poster != "N/A" && resultadoJson.Plot != "N/A"){
                            switch(urls.length){
                                case 6:
                                    $("#peli1").attr("src", resultadoJson.Poster);
                                    arrayPeliculas.push(resultadoJson);
                                    break;
                                case 5:
                                    $("#peli2").attr("src", resultadoJson.Poster);
                                    arrayPeliculas.push(resultadoJson);
                                    break;
                                case 4:
                                    $("#peli3").attr("src", resultadoJson.Poster);
                                    arrayPeliculas.push(resultadoJson);
                                    break;
                                case 3:
                                    $("#peli4").attr("src", resultadoJson.Poster);
                                    arrayPeliculas.push(resultadoJson);
                                    break;
                                case 2:
                                    $("#peli5").attr("src", resultadoJson.Poster);
                                    arrayPeliculas.push(resultadoJson);
                                    break;
                                case 1:
                                    $("#peli6").attr("src", resultadoJson.Poster);
                                    arrayPeliculas.push(resultadoJson);
                                    break;
                                case 0:
                                    $(".movie-img").attr("src", resultadoJson.Poster);
                                    $("#plot").text(resultadoJson.Plot)
                                    $("#title").text(resultadoJson.Title)
                                    $("#actor").text("Actores: " + resultadoJson.Actors)
                                    $("#ranking").text("Ranking: " + resultadoJson.imdbRating)
                                    arrayPeliculas.push(resultadoJson);
                                    break;
                            }
                    }
                    mostrar(urls)
            
                }).fail( function(xhr, status, error) {  
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                })

            }  
        console.log(arrayPeliculas)
}
// De izquierda a derecha
mostrar(urls)

$("#peli1").on("click", agrandarPelicula)

function agrandarPelicula(){
    $(".movie-img").attr("src", arrayPeliculas[0].Poster);
    $("#plot").text(arrayPeliculas[0].Plot)
    $("#title").text(arrayPeliculas[0].Title)
    $("#actor").text("Actores: " + arrayPeliculas[0].Actors)
    $("#ranking").text("Ranking: " + arrayPeliculas[0].imdbRating)
}
$("#peli2").on("click", agrandarPelicula2)

function agrandarPelicula2(){
    $(".movie-img").attr("src", arrayPeliculas[1].Poster);
    $("#plot").text(arrayPeliculas[1].Plot)
    $("#title").text(arrayPeliculas[1].Title)
    $("#actor").text("Actores: " + arrayPeliculas[1].Actors)
    $("#ranking").text("Ranking: " + arrayPeliculas[1].imdbRating)
}

$("#peli3").on("click", agrandarPelicula3)

function agrandarPelicula3(){
    $(".movie-img").attr("src", arrayPeliculas[2].Poster);
    $("#plot").text(arrayPeliculas[2].Plot)
    $("#title").text(arrayPeliculas[2].Title)
    $("#actor").text("Actores: " + arrayPeliculas[2].Actors)
    $("#ranking").text("Ranking: " + arrayPeliculas[2].imdbRating)
}

$("#peli4").on("click", agrandarPelicula4)

function agrandarPelicula4(){
    $(".movie-img").attr("src", arrayPeliculas[3].Poster);
    $("#plot").text(arrayPeliculas[3].Plot)
    $("#title").text(arrayPeliculas[3].Title)
    $("#actor").text("Actores: " + arrayPeliculas[3].Actors)
    $("#ranking").text("Ranking: " + arrayPeliculas[3].imdbRating)
}

$("#peli5").on("click", agrandarPelicula5)

function agrandarPelicula5(){
    $(".movie-img").attr("src", arrayPeliculas[4].Poster);
    $("#plot").text(arrayPeliculas[4].Plot)
    $("#title").text(arrayPeliculas[4].Title)
    $("#actor").text("Actores: " + arrayPeliculas[4].Actors)
    $("#ranking").text("Ranking: " + arrayPeliculas[4].imdbRating)
}

$("#peli6").on("click", agrandarPelicula6)

function agrandarPelicula6(){
    $(".movie-img").attr("src", arrayPeliculas[5].Poster);
    $("#plot").text(arrayPeliculas[5].Plot)
    $("#title").text(arrayPeliculas[5].Title)
    $("#actor").text("Actores: " + arrayPeliculas[5].Actors)
    $("#ranking").text("Ranking: " + arrayPeliculas[5].imdbRating)
}

$("#btn-compra").on("click", compra)

function compra(){ 
   $.ajax({
        url: "carrito.html",
        type:'GET',
        success: function(data){
            let titulo = $("#title").html()
            $('.cuerpo-principal').replaceWith(data)
            $("#peli").text(titulo);
            $("#cantidad").html(cantidad);
           resultado = resultado + precio
            $("#total").html("$" + resultado);
            $("#comprasPadre").on("click", eliminarItem);

            function eliminarItem(evento){
                if(evento.target.classList.contains("eliminar")){
//                  var restarPrecio = evento.target.parentNode.nextSibling.innerHTML;
//                  resultado = resultado - restarPrecio;
                    $("#total").html("0");

                    var eliminar = evento.target.parentNode.parentNode;
                    $(eliminar).remove();
                    cantidad = cantidad - 1;
                    $("#cantidad").html(cantidad);        
                }
            }
            
            $("#datosComprador").on("submit", datosComprador);

            function datosComprador(evento){
                evento.preventDefault();
                console.log(arrayUsuario);
            
                var nombre = $("#firstName").val();
                var apellido = $("#lastName").val();
            
                var tipoTarjeta = $("#credit:checked")
                if(tipoTarjeta == true){
                    tipoTarjeta = "credito";
                }else {
                    tipoTarjeta = "debito";
                }
                
                var nombreTarjeta = $("#cc-name").val();
                var numeroTarjeta = $("#cc-number").val();
                var fechaVencimiento = $("#cc-expiration").val();
                var codigo = $("#cc-cvv").val();
            
                var item = $("li .item");
                for (var i = 0; i < item.length; i++){
                    arrayItems.push(item[i].innerHTML);
                }
            
                let cargarUsuarioJSON = localStorage.getItem("usuario");
                arrayUsuario = JSON.parse(cargarUsuarioJSON);
                console.log(arrayUsuario);
                
                arrayCompra.push(new Compra(cantidad, arrayItems, resultado));
                arrayTarjeta.push(new Tarjeta(nombreTarjeta, tipoTarjeta, numeroTarjeta, fechaVencimiento, codigo));
                arrayUsuario.push(nombre, apellido,arrayTarjeta, arrayCompra)
            
                let guardarUsuarioJSON = JSON.stringify(arrayUsuario);
                localStorage.setItem("usuario", guardarUsuarioJSON );
            
            }
        }
  });
}

var comprasPadre = $("#comprasPadre");

function item(texto1,texto2,precio){

    var agregarLi = $("<li></li>");
    var agregarDiv = $("<div></div>");
    var agregarH6 = $("<h6></h6>").append(document.createTextNode(texto1));
    var agregarSmall = $("<small></small>").append(document.createTextNode(texto2));
    var agregarSpan = $("<span></span>").append(document.createTextNode(precio));

    agregarLi.addClass("list-group-item d-flex justify-content-between lh-condensed");
    agregarH6.addClass("my-0 item");
    agregarSmall.addClass("text-danger eliminar");
    agregarSpan.addClass("text-muted");
    
    agregarDiv.append(agregarH6, agregarSmall);
    agregarLi.append(agregarDiv, agregarSpan);
    comprasPadre.append(agregarLi);
}

