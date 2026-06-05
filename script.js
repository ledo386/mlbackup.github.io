const form = document.getElementById("contactForm");

if(form){

  form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Mensaje enviado correctamente.");

    form.reset();

  });

}

// USER MENU
let userArea =
document.getElementById("userArea");

let loggedUser =
localStorage.getItem("loggedUser");

if(userArea){

  // SIN LOGIN
  if(!loggedUser){

    userArea.innerHTML = `

      <a href="./login.html"
      class="login-button">

        Iniciar sesión

      </a>

    `;

  }

  // CON LOGIN
  else{

    let dashboardButton = "";

    // ADMIN
    if(loggedUser === "admin"){

      dashboardButton = `

        <a href="./admin.html">

          Panel Admin

        </a>

      `;

    }

    // CLIENTE
    else{

      dashboardButton = `

        <a href="./client-dashboard.html">

          Mi Panel

        </a>

      `;

    }

    // MENÚ
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

      </div>

    `;

  }

}

// LOGOUT
function logout(){
  
  localStorage.removeItem("loggedUser");
  
  localStorage.removeItem("managedUser");

  alert("Sesión cerrada.");

  window.location.href = "./index.html";

}
