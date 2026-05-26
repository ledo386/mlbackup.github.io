const states = [

  "Sistema operativo",

  "Espacio de almacenamiento bajo",

  "Error temporal de conexión",

  "Backup completado correctamente",

  "Monitorización activa",

  "Servidor estable"

];

// ==========================
// GENERAR ALERTAS
// ==========================

function generateAlert(){

  const alerts =
  JSON.parse(
    localStorage.getItem("alerts")
  ) || [];

  const randomState =
  states[
    Math.floor(
      Math.random()*states.length
    )
  ];

  alerts.push({

    message:randomState,

    date:
    new Date().toLocaleString()

  });

  localStorage.setItem(
    "alerts",
    JSON.stringify(alerts)
  );

  loadAlerts();

}

// Cada 45 segundos

setInterval(() => {

  generateAlert();

}, 45000);
