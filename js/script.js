//Communication avec le serveur 
//Récupération des données de l'API

fetch("http://localhost:3000/api/products") // Permet de se connecter à l'API
.then((data) => {
    return data.json() // Permet de convertir la donnée
}) 
.then( (jsonItems) => { // Affichage des canapés
    for (let kanap of jsonItems) {
        document.querySelector("#items").innerHTML += 
        `<a href="./product.html?id=${kanap._id}">          
            <article>
                <img src="${kanap.imageUrl}"" alt="${kanap.altTxt}">
                <h3 class="productName">${kanap.name}</h3>
                <p class="productDescription">${kanap.description}</p>
            </article>
        </a>`;
    }    
})
.catch((error) => {
    console.log(error)
})