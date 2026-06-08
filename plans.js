// TARGET USER
const targetUser = localStorage.getItem("managedUser") || localStorage.getItem("loggedUser");

// COMPRA DE PLANES
function buyPlan(planName){

  // verificar login
  const loggedUser = localStorage.getItem("loggedUser");

  if(!loggedUser){
    alert("Debes iniciar sesión para contratar un plan.");
    window.location.href = "./login.html";
    return;
  }

  // si es admin
  if(loggedUser === "admin"){
    alert("La cuenta de administrador no puede contratar planes.");
    return;
  }

  // obtener usuario comprador
  const user = JSON.parse(localStorage.getItem(loggedUser));

  // confirmación de compra
  let confirmMessage = `¿Deseas contratar el ${planName}?`;

  // si ya tiene plan
  if(user.plan && user.plan !== "Ninguno"){

    // mismo plan
    if(user.plan === planName){
      alert("Ya tienes contratado este plan.");
      return;
    }

    confirmMessage = `Actualmente tienes contratado el ${user.plan}.\n\n` + `¿Deseas cancelarlo y cambiar al ${planName}?`;
  }

  const confirmed = confirm(confirmMessage);

  if(!confirmed){
    return;
  }

  // actualizar plan
  user.plan = planName;
  localStorage.setItem(loggedUser, JSON.stringify(user));

  // inicializar datos
  if(!localStorage.getItem("backups_" + loggedUser)){
    localStorage.setItem("backups_" + loggedUser, JSON.stringify([]));
  }

  if(!localStorage.getItem("alerts_" + loggedUser)){
    localStorage.setItem("alerts_" + loggedUser, JSON.stringify([]));
  }

  if(!localStorage.getItem("restores_" + loggedUser)){
    localStorage.setItem("restores_" + loggedUser, JSON.stringify([]));
  }

  alert(`${planName} contratado correctamente.`);
  window.location.href = "./client-dashboard.html";
}

// CANCELAR PLAN
function cancelPlan(){

  const loggedUser = localStorage.getItem("loggedUser");

  if(!loggedUser){
    alert("Debes iniciar sesión.");
    return;
  }

  // si es admin
  if(loggedUser === "admin"){
    alert("La cuenta administrador no tiene plan.");
    return;
  }

  const user = JSON.parse(
    localStorage.getItem(loggedUser));

  // sin plan
  if(!user.plan || user.plan === "Ninguno"){
    alert("No tienes ningún plan contratado.");
    return;
  }

  // confirmar
  const confirmed = confirm(`¿Deseas cancelar el ${user.plan}?`);

  if(!confirmed){
    return;
  }

  // actualizar plan
  const oldPlan = user.plan; user.plan = "Ninguno"; localStorage.setItem(loggedUser, JSON.stringify(user));

  // confirmación final
  alert("Plan cancelado correctamente.");
}

// INFORMACIÓN DE PLAN
function loadCurrentPlan(){
  const planElement = document.getElementById("currentPlan");

  if(!planElement){
    return;
  }

  const loggedUser = localStorage.getItem("loggedUser");

  if(!loggedUser || loggedUser === "admin"){
    planElement.innerHTML = "Sin información";
    return;
  }

  const user = JSON.parse(localStorage.getItem(loggedUser));
  planElement.innerHTML = user.plan;
}
