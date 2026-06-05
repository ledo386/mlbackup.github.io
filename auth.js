// REGISTRO
const registerForm =
document.getElementById("registerForm");

if(registerForm){

  registerForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("registerUsername").value;

    // Verificar si ya existe
    if(localStorage.getItem(username)){

      alert("Ese usuario ya existe.");

      return;

    }

    const user = {

      username: username,

      password:
      document.getElementById("registerPassword").value,

      company:
      document.getElementById("registerCompany").value,

      country:
      document.getElementById("registerCountry").value,

      plan:"Ninguno"

    };

    // Guardar usuario

    localStorage.setItem(

      username,

      JSON.stringify(user)

    );

    // Inicializar estructuras
    localStorage.setItem(
      "backups_" + username,
      JSON.stringify([])
    );

    localStorage.setItem(
      "alerts_" + username,
      JSON.stringify([])
    );

    localStorage.setItem(
      "restores_" + username,
      JSON.stringify([])
    );

    alert("Cuenta creada correctamente.");

    window.location.href =
    "./login.html";

  });

}

// LOGIN
const loginForm =
document.getElementById("loginForm");

if(loginForm){

  loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("loginUsername").value;

    const password =
    document.getElementById("loginPassword").value;

    // ADMIN
    if(

      username === "admin" &&
      password === "Admin123!"

    ){

      localStorage.setItem(

        "loggedUser",

        "admin"

      );

      // Limpiar usuario gestionado anterior
      localStorage.removeItem("managedUser" );

      window.location.href = "./admin.html";
      
      return;

    }

    // CLIENTE
    const user =
    JSON.parse(
      localStorage.getItem(username)
    );

    if(user && user.password === password){

      localStorage.setItem("loggedUser",username);

      // Limpiar managedUser
      localStorage.removeItem("managedUser");

      alert("Inicio de sesión correcto.");

      // VERIFICAR PLAN
      if(user.plan && user.plan !== "Ninguno"){

        // Usuario con plan

        window.location.href =
        "./client-dashboard.html";

      }else{

        // Usuario sin plan

        alert(
          "Debes contratar un plan para acceder al panel."
        );

        window.location.href =
        "./index.html#planes";

      }

    }else{

      alert(
        "Usuario o contraseña incorrectos."
      );

    }

  });

}

// ====================
// LOGOUT
// ====================

function logout(){

  localStorage.removeItem(
    "loggedUser"
  );

  localStorage.removeItem(
    "managedUser"
  );

  window.location.href =
  "./index.html";

}
