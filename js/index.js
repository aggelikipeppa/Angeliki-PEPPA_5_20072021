main ();

async function main() {
    const articles = await getArticles() /*pour attend que la promesse est resolu*/
    for (article of articles) {
        displayArticle(article)
    }  
}

async function getArticles() {
    try {
        const response = await fetch("http://localhost:3000/api/teddies");
        const articles = await response.json();
        return articles;
    } catch (error) {
        alert(error);
    }
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




