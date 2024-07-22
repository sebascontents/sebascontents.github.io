// Función para realizar la búsqueda
function performSearch() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  var searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  if (searchTerm.length > 1) {
    // Aquí puedes realizar la búsqueda en tus datos y obtener los resultados
    // En este ejemplo, solo se simulan resultados estáticos
    var data = [
      {title: "Resultado 1", url: "Hola"},
      {title: "Resultado 2", url: "#"},
      {title: "Resultado 3", url: "#"}
    ];

    data.forEach(function(item) {
      if (item.title.toLowerCase().includes(searchTerm)) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = item.url;
        a.textContent = item.title;
        li.appendChild(a);
        searchResults.appendChild(li);
      }
    });
  }
}