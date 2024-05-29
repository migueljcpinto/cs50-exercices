document.addEventListener("DOMContentLoaded", function() {
    const pizzaData = [
      {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        photoName: "pizzas/focaccia.jpg",
      },
      {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        photoName: "pizzas/margherita.jpg",
      },
      {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        photoName: "pizzas/spinaci.jpg",
      },
      {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        photoName: "pizzas/funghi.jpg",
      },
      {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        photoName: "pizzas/salamino.jpg",
      },
      {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, arugula, and burrata cheese",
        photoName: "pizzas/prosciutto.jpg",
      },
    ];

      function findPizzaByName(name) {
        return pizzaData.find(pizza => pizza.name === name);
      }

      // Função para obter parâmetro da URL por nome
  function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function renderPizzaDetails(pizza) {
    const pizzaDetailsContainer = document.getElementById("pizza-details-container");
    if(pizza) {
      pizzaDetailsContainer.innerHTML = `
      <h2 class="text-center">${pizza.name}</h2>
      <img src="${pizza.photoName}" class="img-fluid mb-3" alt="${pizza.name}">
      <h3>Ingredients:</h3>
      <ul>
        <li>${pizza.ingredients}</li>
      </ul>
      `
    } else {
      pizzaDetailsContainer.innerHTML = "<p>Pizza not found!</p>";
    }
  }

  const pizzaName = getParameterByName("name");
  const pizzaDetails = findPizzaByName(pizzaName);


  renderPizzaDetails(pizzaDetails);
});
