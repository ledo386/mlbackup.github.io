// =========================
// TARGET USER
// =========================

const targetUser =
localStorage.getItem("managedUser")
||
localStorage.getItem("loggedUser");

// =========================
// COMPRA DE PLANES
// =========================

function buyPlan(planName){

  // =========================
  // VERIFICAR LOGIN
  // =========================

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

  // =========================
  // ADMIN NO PUEDE COMPRAR
  // =========================

  if(loggedUser === "admin"){

    alert(
      "La cuenta de administrador no puede contratar planes."
    );

    return;

  }

  // =========================
  // OBTENER USUARIO
  // =========================

  const user =
  JSON.parse(
    localStorage.getItem(loggedUser)
  );

  // =========================
  // CONFIRMACIÓN
  // =========================

  let confirmMessage =
  `¿Deseas contratar el ${planName}?`;

  // Si ya tiene plan

  if(

    user.plan &&
    user.plan !== "Ninguno"

  ){

    // Mismo plan

    if(user.plan === planName){

      alert(
        "Ya tienes contratado este plan."
      );

      return;

    }

    confirmMessage =

    `Actualmente tienes contratado el ${user.plan}.\n\n` +

    `¿Deseas cancelarlo y cambiar al ${planName}?`;

  }

  const confirmed =
  confirm(confirmMessage);

  if(!confirmed){

    return;

  }

  // =========================
  // ACTUALIZAR PLAN
  // =========================

  user.plan = planName;

  localStorage.setItem(

    loggedUser,

    JSON.stringify(user)

  );

  // =========================
  // INICIALIZAR DATOS
  // =========================

  if(
    !localStorage.getItem(
      "backups_" + loggedUser
    )
  ){

    localStorage.setItem(

      "backups_" + loggedUser,

      JSON.stringify([])

    );

  }

  if(
    !localStorage.getItem(
      "alerts_" + loggedUser
    )
  ){

    localStorage.setItem(

      "alerts_" + loggedUser,

      JSON.stringify([])

    );

  }

  if(
    !localStorage.getItem(
      "restores_" + loggedUser
    )
  ){

    localStorage.setItem(

      "restores_" + loggedUser,

      JSON.stringify([])

    );

  }

  // =========================
  // ALERTA DE SISTEMA
  // =========================

  const alerts =
  JSON.parse(

    localStorage.getItem(
      "alerts_" + loggedUser
    )

  ) || [];

  alerts.push({

    message:
    "Plan contratado: " + planName,

    date:
    new Date().toLocaleString()

  });

  localStorage.setItem(

    "alerts_" + loggedUser,

    JSON.stringify(alerts)

  );

  // =========================
  // CONFIRMACIÓN FINAL
  // =========================

  alert(

    `${planName} contratado correctamente.`

  );

  // =========================
  // REDIRECCIÓN
  // =========================

  window.location.href =
  "./client-dashboard.html";

}

// =========================
// CANCELAR PLAN
// =========================

function cancelPlan(){

  const loggedUser =
  localStorage.getItem("loggedUser");

  if(!loggedUser){

    alert(
      "Debes iniciar sesión."
    );

    return;

  }

  // =========================
  // ADMIN NO
  // =========================

  if(loggedUser === "admin"){

    alert(
      "La cuenta administrador no tiene plan."
    );

    return;

  }

  // =========================
  // OBTENER USUARIO
  // =========================

  const user =
  JSON.parse(
    localStorage.getItem(loggedUser)
  );

  // =========================
  // SIN PLAN
  // =========================

  if(

    !user.plan ||

    user.plan === "Ninguno"

  ){

    alert(
      "No tienes ningún plan contratado."
    );

    return;

  }

  // =========================
  // CONFIRMAR
  // =========================

  const confirmed =
  confirm(

    `¿Deseas cancelar el ${user.plan}?`

  );

  if(!confirmed){

    return;

  }

  // =========================
  // GUARDAR PLAN
  // =========================

  const oldPlan =
  user.plan;

  user.plan = "Ninguno";

  localStorage.setItem(

    loggedUser,

    JSON.stringify(user)

  );

  // =========================
  // ALERTA
  // =========================

  const alerts =
  JSON.parse(

    localStorage.getItem(
      "alerts_" + loggedUser
    )

  ) || [];

  alerts.push({

    message:
    "Plan cancelado: " + oldPlan,

    date:
    new Date().toLocaleString()

  });

  localStorage.setItem(

    "alerts_" + loggedUser,

    JSON.stringify(alerts)

  );

  // =========================
  // CONFIRMACIÓN
  // =========================

  alert(
    "Plan cancelado correctamente."
  );

  // =========================
  // REDIRECCIÓN
  // =========================

  window.location.href =
  "./index.html#planes";

}

// =========================
// INFORMACIÓN DE PLAN
// =========================

function loadCurrentPlan(){

  const planElement =
  document.getElementById(
    "currentPlan"
  );

  if(!planElement){

    return;

  }

  const loggedUser =
  localStorage.getItem("loggedUser");

  if(
    !loggedUser ||
    loggedUser === "admin"
  ){

    planElement.innerHTML =
    "Sin información";

    return;

  }

  const user =
  JSON.parse(
    localStorage.getItem(loggedUser)
  );

  planElement.innerHTML =
  user.plan;

}
