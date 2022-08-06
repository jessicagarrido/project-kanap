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

        // Suppression d'un élément du panier
        document.querySelectorAll('.deleteItem').forEach(function(canap) {
          canap.addEventListener('click', function() {
            let id = canap.closest('article').getAttribute('data-id')
            let color = canap.closest('article').getAttribute('data-color')

            let oldCart = JSON.parse(localStorage.getItem("panier"))
            let newCart = []

            oldCart.forEach(function(element) {
              if(element.id == id && element.color == color) {

              } else {
                newCart.push(element)
              }
            })

            localStorage.setItem('panier', JSON.stringify(newCart))
            canap.closest('article').remove()
            refreshPriceAndQtt()
          }) 
        })
