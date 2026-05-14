function buyPlan(planName){

  const loggedUser = localStorage.getItem("loggedUser");

  if(!loggedUser){

    alert("Debes iniciar sesión para comprar un plan.");

    window.location.href = "login.html";

    return;

  }

  if(loggedUser === "admin"){

    alert("El administrador no puede comprar planes.");

    return;

  }

  let user = JSON.parse(localStorage.getItem(loggedUser));

  if(user.plan){

    alert("Ya tienes un plan contratado.");

    return;

  }

  user.plan = planName;

  localStorage.setItem(loggedUser, JSON.stringify(user));

  let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  purchases.push({
    username: user.username,
    company: user.company,
    country: user.country,
    plan: planName
  });

  localStorage.setItem("purchases", JSON.stringify(purchases));

  alert("Plan comprado correctamente.");

}
