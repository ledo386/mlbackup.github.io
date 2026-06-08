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
    userArea.innerHTML = ` <a href="./login.html" class="login-button">Iniciar sesión</a> `;
  }

  // con login
  else{
    const dashboardButton = "";

    // admin
    if(loggedUser === "admin"){
      dashboardButton = <a href="./admin.html">Panel Admin</a>;
    }

    // cliente
    else{
      dashboardButton = <a href="./client-dashboard.html">Mi Panel</a>;
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

// LOGOUT
function logout(){
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("managedUser");
  alert("Sesión cerrada.");
  window.location.href = "./index.html";
}
