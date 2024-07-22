function addComment() {
  var username = document.getElementById("username").value;
  var comment = document.getElementById("comment").value;

  // Lógica para agregar el comentario (puedes personalizar según tus necesidades)
  var commentElement = document.createElement("div");
  commentElement.innerHTML = "<strong>" + username + ":</strong> " + comment;
  document.getElementById("commentsSection").appendChild(commentElement);
}