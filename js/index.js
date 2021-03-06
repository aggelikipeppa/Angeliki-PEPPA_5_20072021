main ();

async function main() {
    const articles = await getArticles() /*pour attendre que la promesse est resolu*/
    for (article of articles) {
        displayArticle(article)
    }  
}

function getArticles() {
    return fetch("http://localhost:3000/api/teddies")
        .then(function(response) {
            return response.json()

        })
        .then(function(articles) {
            return articles
        })
        .catch(function(error) {
            alert(error)
        })
}

function displayArticle(article) {
    let articleCard = document.createElement("div");
    document.querySelector(".products").appendChild(articleCard);
    articleCard.classList.add("product");

    let articleLink = document.createElement("a");
    articleCard.appendChild(articleLink);
    articleLink.href = `produit.html?id=${article._id}`;
    articleLink.classList.add("product-link");

    let articleImgDiv = document.createElement("div");
    articleLink.appendChild(articleImgDiv);
    articleImgDiv.classList.add("product-img");

    let articleImg = document.createElement("img");
    articleImgDiv.appendChild(articleImg);
    articleImg.src =  article.imageUrl;

    let articleInfoDiv = document.createElement("div");
    articleLink.appendChild(articleInfoDiv);
    articleInfoDiv.classList.add("product-details");

    let articleTitle = document.createElement("div");
    articleInfoDiv.appendChild(articleTitle);
    articleTitle.classList.add("product-title");
    articleTitle.innerHTML = article.name;

    let articlePrice = document.createElement("div");
    articleInfoDiv.appendChild(articlePrice);
    articlePrice.classList.add("product-price");
    articlePrice.textContent = `${article.price / 100}.00 €`;
}




