const form = document.getElementById("contactForm");

if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Mensaje enviado correctamente.");
    form.reset();
  });
}

// MENÚ USUARIO
const userArea = document.getElementById("userArea");
const loggedUser = localStorage.getItem("loggedUser");

if(userArea){

  // sin login
  if(!loggedUser){
    userArea.innerHTML = `<a href="./login.html" class="login-button">Iniciar sesión</a>`;
  }

  // con login
  else{
    let dashboardButton = "";

    // admin
    if(loggedUser === "admin"){
      dashboardButton = `<a href="./admin.html">Panel Admin</a>`;
    }

    // cliente
    else{
      dashboardButton = `<a href="./client-dashboard.html">Mi Panel</a>`;
    }

    // menú
    userArea.innerHTML = `
    
      <div class="user-menu">

        <div class="user-profile">
          <span>👤</span>
          <span>${loggedUser}</span>
        </div>

        <div class="user-dropdown">
          ${dashboardButton}
          <button onclick="logout()">Cerrar sesión</button>
        </div>

      </div>`;
  }
}

// REGISTRO
const registerForm = document.getElementById("registerForm");

if(registerForm){
  registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;

    // verificar si usuario ya existe
    if(localStorage.getItem(username)){
      alert("Ese usuario ya existe.");
      return;
    }

    const user = {
      username: username,
      password: document.getElementById("registerPassword").value,
      company: document.getElementById("registerCompany").value,
      country: document.getElementById("registerCountry").value,
      plan: "Ninguno"
    };

    // guardar usuario
    localStorage.setItem(username, JSON.stringify(user));

    // crear estructuras panel cliente
    localStorage.setItem("backups_" + username, JSON.stringify([]));
    localStorage.setItem("alerts_" + username, JSON.stringify([]));
    localStorage.setItem("restores_" + username, JSON.stringify([]));

    alert("Cuenta creada correctamente.");
    window.location.href = "./login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if(loginForm){
  loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // ADMIN
    if(username === "admin" && password === "123"){
      localStorage.setItem("loggedUser","admin");

      // limpiar usuario gestionado anterior
      localStorage.removeItem("managedUser");
      window.location.href = "./admin.html";
      return;
    }

    // CLIENTE
    const user = JSON.parse(localStorage.getItem(username));

    if(user && user.password === password){
      localStorage.setItem("loggedUser",username);

      // limpiar managedUser
      localStorage.removeItem("managedUser");
      alert("Inicio de sesión correcto.");

      // verificar plan contratado
      if(user.plan && user.plan !== "Ninguno"){

        // usuario con plan
        window.location.href = "./client-dashboard.html";
      }else{

        // usuario sin plan
        alert("Debes contratar un plan para acceder al panel.");
        window.location.href = "./index.html#planes";
      }
      
    }else{
      alert("Usuario o contraseña incorrectos.");
    }
  });
}

// LOGOUT
function logout(){
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("managedUser");
  alert("Sesión cerrada.");
  window.location.href = "./index.html";
}
