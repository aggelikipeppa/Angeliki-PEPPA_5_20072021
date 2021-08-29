//récupération de l'id de la page
//renvoie un objet Location contenant des informations concernant l'URL actuelle du document et fournit des méthodes pour modifier cette URL.Cette propriété peut être utilisée pour changer une autre page.
const queryString_url_id = window.location.search;
//ΓΙΑ ΝΑ ΒΓΑΛΟΥΜΕ ΤΟ ?//
//Retourner la premiere valeur associée au parametre de recherche donné//
//L'opérateur new permet de créer une instance d'un certain type d'objet à partir du constructeur qui existe pour celui-ci (natif ou défini par l'utilisateur).
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
//console.log(id);//

;(async () => {
    const articleId = getArticleId()
    const articleData = await getArticleData(articleId)
    hydratePage(articleData)  //hydrate car au lieu de creer notre div on va prendre ce div et l'hydrater c'est à dire changer son contenu//
     
})()


function getArticleId() {
    return id
}

function getArticleData(articleId) {
    return fetch(`http://localhost:3000/api/teddies/${articleId}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(articleData) {
            return articleData
        })
        .catch(function(error) {
            alert(error)
        })
}


function hydratePage(article) {
    document.querySelector(".img").src = article.imageUrl;
    document.querySelector(".peluche-card__infos__title").innerHTML = article.name;
    document.querySelector(".peluche-card__infos__description").innerText = article.description;
    document.querySelector(".peluche-card__infos__price").textContent = `${article.price / 100}.00 €`;

    //ajout de l'événement: choix de la couleur

    let colorSelect = document.getElementById("color-select");
    for (let i = 0; i < article.colors.length; i++) {//La boucle for pour afficher toutes les options du produit
      let option = document.createElement("option");
      option.innerText = article.colors[i];
      colorSelect.appendChild(option);
    }

    
  const btn_envoyerPanier = document.querySelector(".add-to-cart");//Selection du bouton Ajouter l'article au panier
  const bearNumber = document.querySelector("#bearNum");//choisir la quantite de produit choisir
  
  //Ecouter le bouton et envoyer le panier
  btn_envoyerPanier.addEventListener("click", (event) => {
    if (bearNumber.value > 0 && bearNumber.value < 100) {
        event.preventDefault();   //-----Avec preventDefault quand je click sur le bouton ca doit pas actualiser la page 
        let optionsProduit = {
            idArticle: article._id,
            name : article.name,
            img: article.imageUrl,
            quantity: parseFloat(document.querySelector("#bearNum").value), //La fonction parseFloat() permet de transformer une chaîne de caractères en un nombre flottant après avoir analysée celle-ci (parsing) 
            price: parseFloat(`${article.price / 100}.00 €`),
            color: colorSelect.value
        };
        console.log(optionsProduit)

        //-------------------------------------Le Local Storage-------------------------------
//----------------Stocker la récupération des valeurs du formulaire dans le local storage------

//Déclaration de la variable "articleLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let articleLocalStorage = JSON.parse(localStorage.getItem("produit")); //---JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet javascript

//Fonction fenetre pop up
const popupConfirmation = () =>{
    if(window.confirm( `${article.name} en couleur ${colorSelect.value} a bien été ajouté au panier
Consultez le panier OK ou revenir à l'accueil ANNULER`)){
    window.location.href = "panier.html";  
    }else{
    window.location.href = "index.html";
    }
}

//Fonction ajouter un produit sélectionné dans le localStorage
const ajoutArticleLocalStorage = () => {
    //ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
    articleLocalStorage.push(optionsProduit); 

    //la transformation en format JSON et l'envoyer dans la key "article_in_storage" du localStorage
    localStorage.setItem("produit", JSON.stringify(articleLocalStorage));
};

//s'il y a des produits d'enregistrer dans le local storage
if(articleLocalStorage){
    ajoutArticleLocalStorage();
    popupConfirmation();
}

//s'il n'y a pas de produit d'enregistrer dans le local storage
else{
articleLocalStorage = [];
ajoutArticleLocalStorage();
popupConfirmation();
}
}

}); 

}






