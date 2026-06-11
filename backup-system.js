const backupTargetUser = localStorage.getItem("managedUser") || localStorage.getItem("loggedUser");

// BACKUP MANUAL
function runBackup(){
  const backups = JSON.parse(localStorage.getItem("backups_" + backupTargetUser)) || [];

  const newBackup = {
    date: new Date().toLocaleString(),
    type: "Manual",
    status: "Completado",
    size: Math.floor(Math.random()*5000) + " MB"
  };

  backups.push(newBackup);
  localStorage.setItem("backups_" + backupTargetUser, JSON.stringify(backups));
  loadStorage();
  addAlert("Copia manual completada");
  loadHistory();
  alert("Copia de seguridad completada.");
  loadAlerts();
}

// BACKUP AUTOMÁTICO
function automaticBackup(){
  const backups = JSON.parse(localStorage.getItem("backups_" + backupTargetUser)) || [];

  backups.push({
    date: new Date().toLocaleString(),
    type: "Automático",
    status: "Completado",
    size: Math.floor(Math.random()*5000) + " MB"
  });

  localStorage.setItem("backups_" + backupTargetUser, JSON.stringify(backups));
  loadStorage();
  addAlert("Backup automático ejecutado");
  loadHistory();
  loadAlerts();
}

// cada 15 segundos
setInterval(() => {
  automaticBackup();
}, 15000);

// RESTAURAR DATOS
function restoreBackup(){

  const restores = JSON.parse(localStorage.getItem("restores_" + backupTargetUser)) || [];

  restores.push({
    date: new Date().toLocaleString(),
    status: "Restauración completada"
  });

  localStorage.setItem("restores_" + backupTargetUser, JSON.stringify(restores));
  loadHistory();
  addAlert("Sistema restaurado correctamente");
  alert("Datos restaurados correctamente.");
  loadAlerts();
}
