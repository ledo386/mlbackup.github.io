const monitorUser =
localStorage.getItem("managedUser")
||
localStorage.getItem("loggedUser");

const states = [

"Sistema operativo",

"Espacio bajo",

"Backup completado",

"Conexión estable",

"Monitorización activa",

"Servidor estable"

];

// ==========================
// ALERTAS AUTOMÁTICAS
// ==========================

function generateAlert(){

const targetUser =
localStorage.getItem("managedUser")
||
localStorage.getItem("loggedUser");

const alerts =
JSON.parse(
localStorage.getItem(
"alerts_" + targetUser
)
) || [];

const randomAlert =
states[
Math.floor(
Math.random()*states.length
)
];

alerts.push({

message:randomAlert,

date:
new Date().toLocaleString()

});

localStorage.setItem(

"alerts_" + targetUser,

JSON.stringify(alerts)

);

if(typeof loadAlerts === "function"){

loadAlerts();

}

}

// ==========================
// ALERTAS MANUALES
// ==========================

function addAlert(message){

const targetUser =
localStorage.getItem("managedUser")
||
localStorage.getItem("loggedUser");

const alerts =
JSON.parse(
localStorage.getItem(
"alerts_" + targetUser
)
) || [];

alerts.push({

message:message,

date:
new Date().toLocaleString()

});

localStorage.setItem(

"alerts_" + targetUser,

JSON.stringify(alerts)

);

if(typeof loadAlerts === "function"){

loadAlerts();

}

}

// ==========================
// GENERAR CADA 45s
// ==========================

setInterval(() => {

generateAlert();

}, 45000);
