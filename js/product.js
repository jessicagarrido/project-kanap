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