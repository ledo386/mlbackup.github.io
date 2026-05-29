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

function generateAlert(){

const alerts =
JSON.parse(
localStorage.getItem(
"alerts_" + monitorUser
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

function addAlert(message){

const alerts =
JSON.parse(
localStorage.getItem(
"alerts_" + monitorUser
)
) || [];

alerts.push({

message:message,

date:
new Date().toLocaleString()

});

localStorage.setItem(

"alerts_" + monitorUser,

JSON.stringify(alerts)

);

if(typeof loadAlerts === "function"){

loadAlerts();

}

}

localStorage.setItem(

"alerts_" + monitorUser,

JSON.stringify(alerts)

);

if(typeof loadAlerts === "function"){

loadAlerts();

}

}

setInterval(() => {

generateAlert();

}, 45000);
