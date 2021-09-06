let panier = document.querySelector(".cart-panier__recap");
let articleLocalStorage  = JSON.parse(localStorage.getItem("produit"));
let i = 0
//Validation du formulaire
let listeId = ['nom', 'prenom', 'email','adresse', 'ville'];
let formValid = document.querySelector('.btn-purchase');
    
formValid.addEventListener('click', checkFormAndPostRequest);

main();

function main() {
    addToCart();
    updateCartTotal(articleLocalStorage);
}

function addToCart() {
    let test = document.querySelector(".width-to-empty-cart");
    let cartPanier = document.querySelector(".cart-panier");
    let emptyPanier = document.querySelector(".if-empty-cart");

    // Si le tableau copié du localStorage contient au moins un objet, on affiche le panier et on supprime le message d'erreur.
    if (localStorage.getItem("produit")) {
        cartPanier.style.display = "flex";
        cartPanier.style.flexDirection = "column";
        cartPanier.style.justifyContent = "space-around";
        emptyPanier.style.display = "none";
      }
    
    //On crée des div dans lequels on va ajouter les donnés du tableau, pour les objets qui sont deja dans le LocalStorage
    for (let article in articleLocalStorage) {
        let cartRow = document.createElement("div");
        panier.insertBefore(cartRow, test);
        cartRow.classList.add("cart-panier__recap__row", "product-row");

        let articleName = document.createElement("div");
        cartRow.appendChild(articleName);
        articleName.classList.add("cart-panier__recap__title");
        articleName.innerHTML = articleLocalStorage[article].name;

        let articleColor = document.createElement("div");
        cartRow.appendChild(articleColor);
        articleColor.classList.add("cart-panier__recap__title", "title-color");
        articleColor.innerHTML = articleLocalStorage[article].color;

        let articleQuantity = document.createElement("div");
        cartRow.appendChild(articleQuantity);
        articleQuantity.classList.add("cart-panier__recap__title", "title-quantity");
        articleQuantity.innerHTML = articleLocalStorage[article].quantity;

        let articlePrice = document.createElement("div");
        cartRow.appendChild(articlePrice);
        articlePrice.classList.add("cart-panier__recap__title","data-price","price");
        // Affichage du prix avec le formatage €
        articlePrice.innerHTML = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(articleLocalStorage[article].price * articleLocalStorage[article].quantity);

        
        let index = document.createElement("div")
        cartRow.appendChild(index);
        index.innerHTML = i++;
        index.style.display ='none';
        //Ajoute le bouton supprimer

        let newElementButton = document.createElement('div');
        cartRow.appendChild(newElementButton);
        newElementButton.classList.add("cart-panier__recap__title", "panier-button");

        let button = document.createElement('input');
        button.id = 'bouton-supprimer';
        button.type = 'button';
        button.value = 'Supprimer'
        newElementButton.appendChild(button);  

        //Fonction pour supprimer la ligne du produit

        function removeCartItem () {
            let articleLocalStorage = JSON.parse(localStorage.getItem("produit"));
            let position = index.innerHTML;
            
            articleLocalStorage.splice(position,1);
            localStorage.setItem("produit", JSON.stringify(articleLocalStorage));
            
console.log(articleLocalStorage)
            articleName.remove();
            articleColor.remove();
            articleQuantity.remove();
            articlePrice.remove();
            newElementButton.remove();
            index.remove();
            

            updateCartTotal(articleLocalStorage)
           }
        button.addEventListener('click', removeCartItem)
   }
}

function updateCartTotal(articleLocalStorage) {
    let total = 0;
    let priceOfQuantity = document.querySelectorAll(".price");
    
    for (let k=0; k<articleLocalStorage.length; k++) {
        total = total + (articleLocalStorage[k].price) * (articleLocalStorage[k].quantity); 
    }

    let totalPrice = document.querySelector(".total");
    totalPrice.innerText = `Total : ` + total.toLocaleString('fr-FR') + '€';
    localStorage.setItem("totalPriceConfirmation", total);
    console.log(totalPrice)
};


//fonction qui met la première lettre en majuscule

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//fonction de validation du formulaire et envoie à l'API



function checkFormAndPostRequest(event) {
    event.preventDefault();
    let allValid = true;
    for (i=0; i < listeId.length; i++) {
        let verif = document.getElementById(listeId[i]);
        let bigVerif = document.getElementById('big' + capitalizeFirstLetter(listeId[i]));
        let nameValid = /^[a-zA-Zéèîï][a-zéèêàçîï]+([-'\s][a-zA-Zéèîï][a-zéèêàçîï]+)?$/;
        let adressValid = /^([0-9]+)+[\s][a-zA-Zéèîï][a-zéèêàçîï]+([-'\s][a-zA-Zéèîï][a-zéèêàçîï]+)?$/;
        let mailValid = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        
        //si le champs est vide

        if(verif.validity.valueMissing) {
            event.preventDefault();
            bigVerif.textContent = 'Champ manquant';
            bigVerif.style.color = 'red';
            allValid = false;

         // si le format de données n'est pas correct 

        } else if ((listeId[i] == 'nom' || listeId[i] == 'prenom' || listeId[i] == 'ville') && nameValid.test(verif.value) == false) {
            event.preventDefault();
            bigVerif.textContent = 'Format incorrect';
            bigVerif.style.color = 'red';
            allValid = false;
        } else if (listeId[i] == 'adresse' && adressValid.test(verif.value) == false) {
            event.preventDefault();
            bigVerif.textContent = 'Format incorrect';
            bigVerif.style.color = 'red';
            allValid = false;
        } else if (listeId[i] == 'email' && mailValid.test(verif.value) == false) {
            event.preventDefault();
            bigVerif.textContent = 'Format incorrect';
            bigVerif.style.color = 'red';
            allValid = false;
        };
    }

    if (allValid == true) {

        let contactForm = {
            lastName : document.getElementById(listeId[0]).value,
            firstName : document.getElementById(listeId[1]).value,
            email : document.getElementById(listeId[2]).value,
            address : document.getElementById(listeId[3]).value,
            city : document.getElementById(listeId[4]).value, 
        }

        let produitPost = [];
        for (let i=0;i<panier.length; i++) {
            produitPost.push(panier[i].id)
            
        }

        let objetPost = {
            contact : contactForm,
            products : produitPost
        }
        
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objetPost)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            localStorage.setItem('order', JSON.stringify(data));
            window.location.href = './confirmation.html';
        }).catch(err => {
            console.log('err', err);
            alert("Serveur non disponible");
        })
    }
}