
// buscador
//ejecutando funciones

document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

//Declarar variaables
bars_search = document.getElementById("ctn-bars-search");
cover_ctn_search = document.getElementById("cover-ctn-search");
inputSearch = document.getElementById("buscar_1");
box_search = document.getElementById("datos_buscador");

// funcion mostrar el buscador

function mostrar_buscador(){
    bars_search.style.top="100px";
    bars_search.style.transition="all 300ms linear";
    cover_ctn_search.style.display="block";
    inputSearch.focus();
    if(inputSearch.value === ""){
        box_search.style.display = "none";
    }

}
// funcion ocultar el buscador
function ocultar_buscador(){
    bars_search.style.top="-100px";
    cover_ctn_search.style.display="none";
    cover_ctn_search.transition="all 200ms linear";
    inputSearch.value="";
    box_search.style.display="none";
}
document.getElementById("buscar_1").addEventListener("keyup",buscador_interno);
//creando filtrado de busqueda
function buscador_interno(){

    filter= inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");

    for(i=0; i<li.length; i++){

        a= li[i].getElementsByTagName("a")[0];

        textValue=a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
            box_search.style.display ="block";
            if(inputSearch.value === ""){
                box_search.style.display = "none";
            }
        }else{
            li[i].style.display = "none";
        }
    }

}
