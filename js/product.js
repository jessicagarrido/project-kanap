// Récupération des informations des produits dans l'url

let params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
.then( data => data.json())
.then( kanap => {

    document.querySelector(".item__img").innerHTML += `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;
    document.querySelector("#title").innerHTML += `${kanap.name}`;
    document.querySelector("#description").innerHTML += `${kanap.description}`;
    document.querySelector("#price").innerHTML += `${kanap.price}`;

    // Choisir les différents coloris   
    for(let i = 0; i < kanap.colors.length; i++){
        document.querySelector("#colors").innerHTML += `<option value = ${kanap.colors[i]}>${kanap.colors[i]}</option>`;
    } 
});

//Stockage des valeurs dans le panier 

document.querySelector('#addToCart').addEventListener('click', () => { // On a séléctionné l'id pour lui ajouter un évènement dessus

    
    let product = { // On crée une variable qui va stocker les informations saisies par l'utilisateur
        id: productId,
        color: document.querySelector('#colors').value,
        qtt: Number(document.querySelector('#quantity').value),
    }

    // condition ? true : false
    // Ici je ne comprends pas ce qu'on a fait ...
    
    let panier = JSON.parse(localStorage.getItem('panier')) == null ? [] : JSON.parse(localStorage.getItem('panier')) // ??
    let newPanier = [] // On crée une variable contenant un tableau vide
    let isProductInTheCart = false // ??

    // Ici je voudrais que l'image du produit choisi ainsi que ses informations
    //s'affichent dans la page panier 

    let img = document.querySelector(".item__img") 

    if(product.color != '' && product.qtt > 0) { // si la couleur ou quantité n'est pas saisie

        panier.forEach(item => { // on exécute une fonction pour chaque élément du produit
            if(item.id == product.id && item.color == product.color) {
                item.qtt += product.qtt
                isProductInTheCart = true
            }
            newPanier.push(item) //On ajoute le tableau vide (qui maintenant est rempli par item?)
        });
        
        if(JSON.parse(localStorage.getItem('panier')) == null || isProductInTheCart == false) {
            newPanier.push(product)
        }

        localStorage.setItem('panier', JSON.stringify(newPanier))
        window.location.href = "cart.html" // On nous rédirige vers la page panier

    } else {
        alert('Veuillez remplir les champs requis')
    }   

})