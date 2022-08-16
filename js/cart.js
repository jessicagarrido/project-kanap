const cart = JSON.parse(localStorage.getItem("panier")); // On récupère le panier depuis le localStorage
if(cart != null) {
  refreshPriceAndQtt()

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

        // Modification d'un élément du panier
        document.querySelectorAll('.itemQuantity').forEach(function(canap) {
          canap.addEventListener('change', function() {
            let id = canap.closest('article').getAttribute('data-id')
            let color = canap.closest('article').getAttribute('data-color')

            let oldCart = JSON.parse(localStorage.getItem("panier"))
            let newCart = []

            oldCart.forEach(function(element) {
              if(element.id == id && element.color == color) {
                element.qtt = Number(canap.value)
              } 
              newCart.push(element)
            })

            localStorage.setItem('panier', JSON.stringify(newCart))
            refreshPriceAndQtt()
          }) 
        })

    });
});
}

function refreshPriceAndQtt() {
  
  let panier = JSON.parse(localStorage.getItem("panier"))

  let qtt = document.querySelector('#totalQuantity')
  let price = document.querySelector('#totalPrice')

  qtt.textContent = 0 // Affichage du nombre d'article
  price.textContent = 0  // Affichage du prix total

    panier.forEach(function (item) {
      fetch(`http://localhost:3000/api/products/${item.id}`)
      .then(response => response.json())
      .then(function (kanap) {
        // Modification de la quantité
        qtt.textContent = Number(qtt.textContent) + item.qtt
  
        // Modification du prix total
        price.textContent = Number(price.textContent) + (item.qtt*kanap.price)
      })
    })

}

// Bloquer l'envoi du formulaire par défault
document.querySelector('.cart__order__form').addEventListener('submit', function(event) {
  event.preventDefault()
})

document.querySelector('#order').addEventListener('click', function() {
  let form = document.querySelector('.cart__order__form')
  
  let user = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value
  }

  //REGEXP
  let RegExpName = /^[a-zA-Z ]*$/ // Pour prénom, nom et ville
  let RegExpAddress = /^\s*\S+(?:\s+\S+){2}/ // Pour adresse
  let RegExpEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/ // Pour E-mail
  let permission = true

  if(user.firstName == '') {
    document.querySelector('#firstNameErrorMsg').textContent = 'Veuillez renseigner ce champs'
    permission = false
  } else if (!RegExpName.test(user.firstName)) {
    document.querySelector('#firstNameErrorMsg').textContent = 'Veuillez renseigner correctement ce champs'
    permission = false
  } else {
    document.querySelector('#firstNameErrorMsg').textContent = ''
  }

  if(user.lastName == '') {
    document.querySelector('#lastNameErrorMsg').textContent = 'Veuillez renseigner ce champs'
    permission = false
  } else if (!RegExpName.test(user.lastName)) {
    document.querySelector('#lastNameErrorMsg').textContent = 'Veuillez renseigner correctement ce champs'
    permission = false
  } else {
    document.querySelector('#lastNameErrorMsg').textContent = ''
  }

  if(user.address == '') {
    document.querySelector('#addressErrorMsg').textContent = 'Veuillez renseigner ce champs'
    permission = false
  } else if (!RegExpAddress.test(user.address)) {
    document.querySelector('#addressErrorMsg').textContent = 'Veuillez renseigner correctement ce champs'
    permission = false
  } else {
    document.querySelector('#addressErrorMsg').textContent = ''
  }

  if(user.city == '') {
    document.querySelector('#cityErrorMsg').textContent = 'Veuillez renseigner ce champs'
    permission = false
  } else if (!RegExpName.test(user.city)) {
    document.querySelector('#cityErrorMsg').textContent = 'Veuillez renseigner correctement ce champs'
    permission = false
  } else {
    document.querySelector('#cityErrorMsg').textContent = ''
  }

  if(user.email == '') {
    document.querySelector('#emailErrorMsg').textContent = 'Veuillez renseigner ce champs'
    permission = false
  } else if (!RegExpEmail.test(user.email)) {
    document.querySelector('#emailErrorMsg').textContent = 'Veuillez renseigner correctement ce champs'
    permission = false
  } else {
    document.querySelector('#emailErrorMsg').textContent = ''
  }

  // SOUMISSION DU FORMULAIRE


  if(permission) {

    let cart = JSON.parse(localStorage.getItem("panier"))
    let products = []

    cart.forEach(kanap => {
      products.push(kanap.id)
    })

    if(products.length != 0) {
      fetch('http://localhost:3000/api/products/order', { 
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contact: user,
            products: products
          })
        })
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear()
          document.location.href = 'confirmation.html?orderId=' + data.orderId
        })
        .catch(error => console.log(error))
      }
    } else {
      alert('Ajouter un produit à votre panier avant de soumettre votre commande !')
    }
    
})