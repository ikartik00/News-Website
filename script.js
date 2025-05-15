const API_KEY = "c7873534d870460da46e3565f4ee07b4"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer = document.getElementById("cards-container")
    const newscardtemplate = document.getElementById("template-news-card")
    cardscontainer.innerHTML= ""
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article)
        cardscontainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone, article){
    const news_Img = cardClone.querySelector("#news_Img")
    const news_title = cardClone.querySelector("#news-title")
    const news_source = cardClone.querySelector("#news-source")
    const news_desc = cardClone.querySelector("#news-desc")
    news_Img.src = article.urlToImage;
    news_title.innerHTML = article.title

    news_desc.innerHTML =  article.description

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone : "Asia/Jakarta",
    })
    news_source.innerHTML = `${article.source.name}  ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank")
    })
}

let cursorselect = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id)
    cursorselect?.classList.remove("active")
    cursorselect = navItem;
    cursorselect.classList.add("active")
}

const searchbutton = document.getElementById("searchbutton")
const searchText = document.getElementById("search-text")

searchbutton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    cursorselect?.classList.remove("active")
    cursorselect = null
})
