var loggedIn = false;

function addComment() {
  if (!loggedIn) {
    alert("Debes iniciar sesión para dejar un comentario.");
    return;
  }

  var username = document.getElementById("username").value;
  var comment = document.getElementById("comment").value;

  if (username && comment) {
    var commentsSection = document.getElementById("commentsSection");
    var commentDiv = document.createElement("div");
    commentDiv.classList.add("card", "mb-2");
    commentDiv.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${username}</h5>
        <p class="card-text">${comment}</p>
      </div>
    `;
    commentsSection.appendChild(commentDiv);

    // Limpiar campos después de agregar comentario
    document.getElementById("username").value = "";
    document.getElementById("comment").value = "";
  } else {
    alert("Por favor, ingresa un nombre de usuario y un comentario.");
  }
}

// Simular inicio de sesión
function login() {
  var username = document.getElementById("loginUsername").value;
  if (username) {
    loggedIn = true;
    document.getElementById("username").value = username;
    closeLoginModal();
  }
}

// Simular creación de cuenta
function createAccount() {
  var username = prompt("Ingrese un nombre de usuario para crear su cuenta:");
  if (username) {
    loggedIn = true;
    document.getElementById("username").value = username;
  }
}

function openLoginModal() {
  var loginModal = document.getElementById("loginModal");
  loginModal.style.display = "block";
}

function closeLoginModal() {
  var loginModal = document.getElementById("loginModal");
  loginModal.style.display = "none";
}

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("loginPassword");
  var passwordIcon = document.getElementById("passwordIcon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.classList.remove("fa-eye");
    passwordIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    passwordIcon.classList.remove("fa-eye-slash");
    passwordIcon.classList.add("fa-eye");
  }
}

function createAccount() {
  var username = document.getElementById("createUsername").value;
  var password = document.getElementById("createPassword").value;

  // Verificar si la contraseña cumple con los requisitos mínimos
  var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("La contraseña debe contener al menos 1 mayúscula, 1 número, 1 carácter especial y tener una longitud mínima de 8 caracteres.");
    return;
  }

  // Resto de la lógica para crear la cuenta...
}

document.addEventListener("DOMContentLoaded", function() {
  // Verificar si el usuario ha iniciado sesión o creado una cuenta
  var isLoggedIn = false; // Cambia esto según tu lógica de inicio de sesión
  var hasCreatedAccount = false; // Cambia esto según tu lógica de creación de cuenta

  if (!isLoggedIn && !hasCreatedAccount) {
    document.getElementById("commentBtn").style.display = "none";
  }
});

// Función para guardar el estado de inicio de sesión
function setLoggedInState(isLoggedIn) {
  localStorage.setItem('isLoggedIn', isLoggedIn);
}

// Función para obtener el estado de inicio de sesión
function getLoggedInState() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Función para guardar el estado de creación de cuenta
function setCreatedAccountState(hasCreatedAccount) {
  localStorage.setItem('hasCreatedAccount', hasCreatedAccount);
}

// Función para obtener el estado de creación de cuenta
function getCreatedAccountState() {
  return localStorage.getItem('hasCreatedAccount') === 'true';
}