if(
  localStorage.getItem("loggedUser")
  !==
  "admin"
){
  window.location.href =
  "./login.html";
}

// ==========================
// TARGET USER
// ==========================

const dashboardUser =
localStorage.getItem("managedUser")
||
localStorage.getItem("loggedUser");

// ==========================
// CARGAR USUARIOS
// ==========================

function loadUsers(){

const table =
document.getElementById("usersTable");

if(!table) return;

table.innerHTML = "";

for(let i = 0; i < localStorage.length; i++){

const key =
localStorage.key(i);

if(
key === "loggedUser" ||
key === "theme" ||
key === "managedUser"
){
continue;
}

try{

const user =
JSON.parse(
localStorage.getItem(key)
);

if(user && user.username){

table.innerHTML += `

<tr>

  <td>${user.username}</td>
  
  <td>${user.company}</td>
  
  <td>${user.country}</td>
  
  <td>${user.plan}</td>
  
  <td>
  
    <button class="gest-button" onclick="manageUser('${user.username}')">
      Gestionar
    </button>
  
  </td>

</tr>

`;

}

}catch(error){

console.log("Error");

}

}

}

// ==========================
// GESTIONAR USUARIO
// ==========================

function manageUser(username){

localStorage.setItem(
"managedUser",
username
);

window.location.href =
"./dashboard.html";

}

// ==========================
// HISTORIAL
// ==========================

function loadHistory(){

const table =
document.getElementById(
"historyTable"
);

if(!table) return;

const backups =
JSON.parse(
localStorage.getItem(
"backups_" + targetUser
)
) || [];

table.innerHTML = "";

backups.reverse().forEach(backup => {

table.innerHTML += `

<tr>

<td>${backup.date}</td>

<td>${backup.type}</td>

<td>${backup.status}</td>

<td>${backup.size}</td>

</tr>

`;

});

}

// ==========================
// ALERTAS
// ==========================

function loadAlerts(){

const container =
document.getElementById(
"alertsContainer"
);

if(!container) return;

const alerts =
JSON.parse(
localStorage.getItem(
"alerts_" + dashboardUser
)
) || [];

container.innerHTML = "";

alerts.reverse().forEach(alert => {

container.innerHTML += `

<div class="alert-box">

<strong>${alert.message}</strong>

<p>${alert.date}</p>

</div>

`;

});

}

loadUsers();
loadHistory();
loadAlerts();
