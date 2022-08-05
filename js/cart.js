const cart = JSON.parse(localStorage.getItem("panier")); // On récupère le panier depuis le localStorage

cart.forEach(function (item) {
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((response) => response.json())
    .then(function (kanap) {

      // Affichage d'une ligne du panier
      document.querySelector("#cart__items").innerHTML += `
        <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
            <div class="cart__item__img">
            <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${kanap.name}</h2>
                <p>${item.color}</p>
                <p>${kanap.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.qtt}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
        </article>
        `;
