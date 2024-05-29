// scripts.js

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
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      photoName: "pizzas/prosciutto.jpg",
    },
  ];



    const pizzasContainer = document.querySelector(".pizzas");

    pizzaData.forEach(pizza => {
      const listItem = document.createElement("li");
      listItem.classList.add("col-md-4", "mb-4");
      listItem.innerHTML = `
        <div class="card">
          <img src="${pizza.photoName}" class="card-img-top" alt="${pizza.name}">
          <div class="card-body">
            <h3>${pizza.name}</h3>
            <p class="card-text">${pizza.ingredients}</p>
            <a href="pizza_details.html?name=${encodeURIComponent(pizza.name)}" class="btn">View Recipe</a>
          </div>
        </div>
      `;
      pizzasContainer.appendChild(listItem);
    });

    
  });
