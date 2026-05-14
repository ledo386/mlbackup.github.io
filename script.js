const form = document.getElementById("contactForm");

if(form){

  form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Mensaje enviado correctamente.");

    form.reset();

  });

}

// =========================
// DARK MODE
// =========================

const themeToggle =
document.getElementById("themeToggle");

// CARGAR TEMA GUARDADO

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "dark"){

  document.body.classList.add("dark");

  if(themeToggle){
    themeToggle.innerHTML = "☀️";
  }

}else{

  if(themeToggle){
    themeToggle.innerHTML = "🌙";
  }

}

// CAMBIAR TEMA

if(themeToggle){

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    // GUARDAR

    if(document.body.classList.contains("dark")){

      localStorage.setItem("theme", "dark");

      themeToggle.innerHTML = "☀️";

    }else{

      localStorage.setItem("theme", "light");

      themeToggle.innerHTML = "🌙";

    }

  });

}

/* SCROLL ANIMATIONS */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

  reveals.forEach((element) => {

    const windowHeight = window.innerHeight;

    const revealTop = element.getBoundingClientRect().top;

    const revealPoint = 100;

    if(revealTop < windowHeight - revealPoint){

      element.classList.add("active");

    }

  });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// =========================
// USER MENU
// =========================

const userArea =
document.getElementById("userArea");

const loggedUser =
localStorage.getItem("loggedUser");

if(userArea && loggedUser){

  let adminButton = "";

  if(loggedUser === "admin"){

    adminButton = `
      <a href="admin.html">
        Panel admin
      </a>
    `;

  }

  userArea.innerHTML = `

    <div class="user-menu">

      <div class="user-profile">

        <span>👤</span>

        <span>${loggedUser}</span>

      </div>

      <div class="user-dropdown">

        ${adminButton}

        <button onclick="logout()">
          Cerrar sesión
        </button>

      </div>

    </div>

  `;

}

function logout(){

  localStorage.removeItem("loggedUser");

  alert("Sesión cerrada.");

  window.location.href = "index.html";

}

// =========================
// SMOOTH SCROLL NAVBAR
// =========================

document.querySelectorAll('a[href*="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e){

    const href = this.getAttribute("href");

    // Solo si estamos YA en index

    if(
      window.location.pathname.includes("index.html") ||
      window.location.pathname === "/"
    ){

      const targetId = href.split("#")[1];

      const target =
      document.getElementById(targetId);

      if(target){

        e.preventDefault();

        target.scrollIntoView({
          behavior:"smooth"
        });

      }

    }

  });

});

// =========================
// SMOOTH SCROLL BETWEEN PAGES
// =========================

window.addEventListener("load", () => {

  // Si hay hash (#servicios etc)

  if(window.location.hash){

    // Obtener id sin #

    const targetId =
    window.location.hash.substring(1);

    // Buscar elemento

    const target =
    document.getElementById(targetId);

    if(target){

      // Subir arriba primero

      window.scrollTo(0,0);

      // Esperar un poco para evitar salto automático

      setTimeout(() => {

        target.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });

      }, 200);

    }

  }

});
// =========================
// LOGO DINÁMICO
// =========================

const siteLogo =
document.getElementById("siteLogo");

function updateLogo(){

  if(!siteLogo) return;

  if(document.body.classList.contains("dark")){

    // LOGO CLARO

    siteLogo.src = "logoMLBoscuro.png";

    // Ajuste visual

    siteLogo.style.transform = "scale(1)";

  }else{

    // LOGO OSCURO

    siteLogo.src = "logoMLBclaro.png";

    // Tamaño normal

    siteLogo.style.transform = "scale(1)";

  }

}

// Ejecutar al cargar

updateLogo();

// Ejecutar al cambiar tema

if(themeToggle){

  themeToggle.addEventListener("click", () => {

    setTimeout(updateLogo, 50);

  });

}

// =========================
// SHOW / HIDE PASSWORD
// =========================

function togglePassword(inputId, element){

  const input =
  document.getElementById(inputId);

  if(input.type === "password"){

    input.type = "text";

    element.innerHTML = "👁";

  }else{

    input.type = "password";

    element.innerHTML = "👁️";

  }

}
