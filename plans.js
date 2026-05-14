// =========================
// COMPRA DE PLANES
// =========================

function buyPlan(planName){

  // Usuario conectado

  const loggedUser =
  localStorage.getItem("loggedUser");

  if(!loggedUser){

    alert(
      "Debes iniciar sesión para contratar un plan."
    );

    window.location.href =
    "./login.html";

    return;

  }

  // Admin no puede comprar

  if(loggedUser === "admin"){

    alert(
      "La cuenta de administrador no puede contratar planes."
    );

    return;

  }

  // Obtener usuario

  const user =
  JSON.parse(localStorage.getItem(loggedUser));

  // Confirmación

  let confirmMessage =
  `¿Deseas contratar el ${planName}?`;

  // Si ya tiene uno

  if(
    user.plan &&
    user.plan !== "Ninguno"
  ){

    confirmMessage =
    `Ya tienes contratado el ${user.plan}.\n\n¿Deseas cancelarlo y cambiar al ${planName}?`;

  }

  const confirmed =
  confirm(confirmMessage);

  if(!confirmed){
    return;
  }

  // Actualizar plan

  user.plan = planName;

  // Guardar usuario actualizado

  localStorage.setItem(
    loggedUser,
    JSON.stringify(user)
  );

  alert(
    `${planName} contratado correctamente.`
  );

}

// =========================
// CANCELAR PLAN
// =========================

function cancelPlan(){

  const loggedUser =
  localStorage.getItem("loggedUser");

  if(!loggedUser){

    alert("Debes iniciar sesión.");

    return;

  }

  const user =
  JSON.parse(localStorage.getItem(loggedUser));

  if(
    !user.plan ||
    user.plan === "Ninguno"
  ){

    alert("No tienes ningún plan contratado.");

    return;

  }

  const confirmed =
  confirm(
    `¿Deseas cancelar el ${user.plan}?`
  );

  if(!confirmed){
    return;
  }

  user.plan = "Ninguno";

  localStorage.setItem(
    loggedUser,
    JSON.stringify(user)
  );

  alert("Plan cancelado correctamente.");

}
