// ====================
// REGISTRO
// ====================

const registerForm = document.getElementById("registerForm");

if(registerForm){

  registerForm.addEventListener("submit", function(e){

    e.preventDefault();

    const user = {

      username:
      document.getElementById("registerUsername").value,

      password:
      document.getElementById("registerPassword").value,

      company:
      document.getElementById("registerCompany").value,

      country:
      document.getElementById("registerCountry").value,

      plan:null

    };

    localStorage.setItem(
      user.username,
      JSON.stringify(user)
    );

    alert("Cuenta creada correctamente.");

    window.location.href = "login.html";

  });

}

// ====================
// LOGIN
// ====================

const loginForm = document.getElementById("loginForm");

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

      window.location.href = "admin.html";

      return;

    }

    const user =
    JSON.parse(localStorage.getItem(username));

    if(user && user.password === password){

      localStorage.setItem(
        "loggedUser",
        username
      );

      alert("Inicio de sesión correcto.");

      window.location.href = "index.html";

    }else{

      alert("Usuario o contraseña incorrectos.");

    }

  });

}
