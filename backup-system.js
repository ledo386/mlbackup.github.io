const currentUser = localStorage.getItem("loggedUser");

// ==========================
// BACKUP MANUAL
// ==========================

function runBackup(){

  const backups =
  JSON.parse(
    localStorage.getItem("backups_" + currentUser)
  ) || [];

  const newBackup = {

    date:
    new Date().toLocaleString(),

    type:"Manual",

    status:"Completado",

    size:
    Math.floor(Math.random()*5000)
    + " MB"

  };

  backups.push(newBackup);

  localStorage.setItem(
    "backups_" + currentUser,
    JSON.stringify(backups)
  );

  addAlert(
    "Copia manual completada"
  );

  loadHistory();

  alert(
    "Copia de seguridad completada."
  );

}

// ==========================
// BACKUP AUTOMÁTICO
// ==========================

function automaticBackup(){

  const backups =
  JSON.parse(
    localStorage.getItem("backups_" + currentUser)
  ) || [];

  backups.push({

    date:
    new Date().toLocaleString(),

    type:"Automático",

    status:"Completado",

    size:
    Math.floor(Math.random()*5000)
    + " MB"

  });

  localStorage.setItem(
    "backups_" + currentUser,
    JSON.stringify(backups)
  );

  addAlert(
    "Backup automático ejecutado"
  );

}

// Cada 60 segundos

setInterval(() => {

  automaticBackup();

}, 60000);

// ==========================
// RESTAURAR BACKUP
// ==========================

function restoreBackup(){

  const restores =
  JSON.parse(
    localStorage.getItem("restores_" + currentUser)
  ) || [];

  restores.push({

    date:
    new Date().toLocaleString(),

    status:
    "Restauración completada"

  });

  localStorage.setItem(
    "restores_" + currentUser,
    JSON.stringify(restores)
  );

  addAlert(
    "Sistema restaurado correctamente"
  );

  alert(
    "Datos restaurados correctamente."
  );

}
