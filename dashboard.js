// TARGET USER
const dashboardUser = localStorage.getItem("managedUser") || localStorage.getItem("loggedUser");

// CARGAR USUARIOS
function loadUsers() {
  const table = document.getElementById("usersTable");
  if (!table) return;
  table.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key === "loggedUser" || key === "theme" || key === "managedUser") {
      continue;
    }

    try {
      const user = JSON.parse(localStorage.getItem(key));

      if (user && user.username) {
        table.innerHTML += `

          <tr>
            
            <td>${user.username}</td>
            <td>${user.company}</td>
            <td>${user.country}</td>
            <td>${user.plan}</td>
            
            <td>
              <button class="gest-button" onclick="manageUser('${user.username}')">Gestionar</button>
            </td>
          
          </tr>`;
      }

    } catch (error) {
      console.log("Error");
    }
  }
}

// GESTIONAR USUARIO
function manageUser(username) {
  localStorage.setItem("managedUser", username);
  window.location.href = "./dashboard.html";
}

// HISTORIAL
function loadHistory() {
  const table = document.getElementById("historyTable");
  if (!table) return;

  // backups
  const backups = JSON.parse(localStorage.getItem("backups_" + dashboardUser)) || [];

  // restauraciones
  const restores = JSON.parse(localStorage.getItem("restores_" + dashboardUser)) || [];

  // construir historial
  const history = [];

  // añadir backups
  backups.forEach(backup => {
    history.push({
      date: backup.date,
      type: backup.type,
      status: backup.status,
      size: backup.size
    });
  });

  // añadir restauraciones
  restores.forEach(restore => {
    history.push({
      date: restore.date,
      type: "Restauración",
      status: restore.status,
      size: "-"
    });
  });

  // ordenar según más reciente
  history.sort((a, b) => {
    return (new Date(b.date) - new Date(a.date));
  });

  // crear tabla
  table.innerHTML = "";
  history.forEach(item => {
    table.innerHTML += `

      <tr>
        <td>${item.date}</td>
        <td>${item.type}</td>
        <td>${item.status}</td>
        <td>${item.size}</td>
      </tr>`;
  });
}

// ALERTAS
function addAlert(message){
  const targetUser = localStorage.getItem("managedUser") || localStorage.getItem("loggedUser");
  const alerts = JSON.parse(localStorage.getItem("alerts_" + targetUser)) || [];

  alerts.push({
    message:message,
    date:new Date().toLocaleString()
  });

  localStorage.setItem("alerts_" + targetUser,JSON.stringify(alerts));
}

function loadAlerts() {
  const container = document.getElementById("alertsContainer");
  if (!container) return;
  const alerts = JSON.parse(localStorage.getItem("alerts_" + dashboardUser)) || [];
  container.innerHTML = "";

  alerts.reverse().forEach(alert => {
    container.innerHTML += `
      <div class="alert-box">
        <strong>${alert.message}</strong>
        <p>${alert.date}</p>
      </div>`;
  });
}

// ALMACENAMIENTO
function loadStorage() {
  const usedElement = document.getElementById("storageUsed");
  const limitElement = document.getElementById("storageLimit");
  const fillElement = document.getElementById("storageFill");

  if (!usedElement || !limitElement || !fillElement) {
    return;
  }

  // usuario
  const userData = JSON.parse(localStorage.getItem(dashboardUser));
  if (!userData) return;

  // límite según plan
  let limitGB = 500;

  if (userData.plan === "Plan Profesional") {
    limitGB = 5120;
  }

  if (userData.plan === "Plan Empresarial") {
    limitGB = Infinity;
  }

  // cacular uso
  const backups = JSON.parse(localStorage.getItem("backups_" + dashboardUser)) || [];
  let usedGB = 0;
  
  backups.forEach(backup => {
    const sizeMB = parseInt(backup.size);
    usedGB += sizeMB / 1024;
  });
  
  usedGB = usedGB.toFixed(1);

  // actualizar texto
  usedElement.innerHTML = usedGB + " GB";

  if (limitGB === Infinity) {
    limitElement.innerHTML = "/ Ilimitado";
    fillElement.style.width = "35%";
  } else {
    limitElement.innerHTML = "/ " + limitGB + " GB";
    const percentage = (usedGB / limitGB) * 100;
    fillElement.style.width = percentage + "%";
  }
}

loadUsers();
loadHistory();
loadAlerts();
loadStorage();
