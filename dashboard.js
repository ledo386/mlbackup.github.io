// ==========================
// CARGAR HISTORIAL
// ==========================

function loadHistory(){

  const table =
  document.getElementById(
    "historyTable"
  );

  if(!table) return;

  const backups =
  JSON.parse(
    localStorage.getItem("backups")
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
    localStorage.getItem("alerts")
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

// ==========================
// CARGAR USUARIOS (ADMIN)
// ==========================

function loadUsers(){

  const table =
  document.getElementById(
    "usersTable"
  );

  if(!table) return;

  table.innerHTML = "";

  for(let i = 0; i < localStorage.length; i++){

    const key =
    localStorage.key(i);

    if(
      key === "loggedUser" ||
      key === "theme" ||
      key === "backups" ||
      key === "alerts" ||
      key === "restores"
    ){
      continue;
    }

    try{

      const user =
      JSON.parse(
        localStorage.getItem(key)
      );

      if(
        user &&
        user.username
      ){

        table.innerHTML += `

          <tr>

            <td>${user.username}</td>

            <td>${user.company}</td>

            <td>${user.country}</td>

            <td>${user.plan}</td>

          </tr>

        `;

      }

    }catch(error){

      console.log("Error");

    }

  }

}

loadHistory();

loadAlerts();

loadUsers();
