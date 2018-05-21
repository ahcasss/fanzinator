
var divMenu;
var divPaginas;
var contadorImagen;
var cantidadImagenes;
var reader;
var inputImagenes;
var paginas;
var orden;
var btnOrdenLectura;
var btnOrdenImpresion;
var btnImprimir;
var solapaMenu;
var solapa;

function init(){

  divMenu = document.getElementById("div-menu");

  divPaginas = document.getElementById("div-paginas");

  reader = new FileReader();
  reader.onloadend = readerImagenLoadEnd;

  inputImagenes = document.getElementById("input-imagenes");
  inputImagenes.onchange = () =>{ cargarImagen(inputImagenes); };

  orden = "lectura";
  btnOrdenImpresion = document.getElementById("btn-orden-impresion");
  btnOrdenImpresion.onclick = ordenarImpresion;
  btnOrdenLectura = document.getElementById("btn-orden-lectura");
  btnOrdenLectura.onclick = ordenarLectura;

  btnImprimir = document.getElementById("btn-imprimir");
  btnImprimir.onclick = imprimir;

  solapaMenu = document.getElementById("solapaMenu");
  solapa = document.getElementById("solapa");
  solapa.addEventListener("mouseenter", () => {
    agregarClase(solapaMenu,"abierto");
  });
  solapaMenu.addEventListener("mouseleave",() => {
    quitarClase(solapaMenu,"abierto");
  });

}

function cargarImagen(input){

	if (!input.files)
    return;

  if (!input.files[0])
    return;

  paginas = [];

  contadorImagen = 0;
  cantidadImagenes = input.files.length;

  reader.readAsDataURL(input.files[0]);
}

function readerImagenLoadEnd(e){

  var img = document.createElement("img");

  img.src = e.target.result;
  img.className = "pagina";

  paginas.push({
    "img":img,
    "indice":contadorImagen
  });

  ++contadorImagen;

  if(contadorImagen < cantidadImagenes)
    reader.readAsDataURL(inputImagenes.files[contadorImagen]);
  else{
    ordenar();
  }
}

function limpiarPaginas(){

  while(divPaginas.firstElementChild){
    divPaginas.removeChild(divPaginas.firstElementChild);
  }
}

function ordenar(){

  if(orden == "impresion"){
    ordenarImpresion();
    return;
  }

  if(orden =="lectura"){
    ordenarLectura();
  }
}

function ordenarImpresion(){

  var carilla;
  var a;
  var izquierda;
  var derecha;

  btnOrdenLectura.disabled = false;
  btnOrdenImpresion.disabled = true;

  orden = "impresion";

  limpiarPaginas();

  izquierda = 0;
  derecha = paginas.length-1;
  while(izquierda < derecha){

    if(i % 2 == 0){
      carilla = document.createElement("div");
      carilla.className = "carilla";
      divPaginas.appendChild(carilla);
    }

    if(a){
      carilla.appendChild(paginas[izquierda].img);
      carilla.appendChild(paginas[derecha].img);
    }
    else{
      carilla.appendChild(paginas[derecha].img);
      carilla.appendChild(paginas[izquierda].img);
    }

    izquierda++;
    derecha--;

    a = !a;
  }

}

function ordenarLectura(){

  var carilla;

  btnOrdenLectura.disabled = true;
  btnOrdenImpresion.disabled = false;

  orden = "lectura";

  limpiarPaginas();

  for(i = 0; i < paginas.length; i++){

    if(i % 2 == 0){
      carilla = document.createElement("div");
      carilla.className = "carilla";
      divPaginas.appendChild(carilla);
    }

    carilla.appendChild(paginas[i].img);
  }
}

function imprimir(){

  var ordenPre = orden;

  agregarClase(solapaMenu," oculto");
  quitarClase(divPaginas,"marco");

  ordenarImpresion();

  print();

  if(ordenPre == "lectura"){
    ordenarLectura();
  }

  quitarClase(solapaMenu," oculto");
  agregarClase(divPaginas,"marco");
}

function quitarClase(element,className){
  element.className = element.className.replace(className,"");
}

function agregarClase(element,className){
  element.className += " "+className;
}

init();
