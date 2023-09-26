const apiKey="dad060e5a17445f1889b6e75c2dc7234"
const apiUrl="https://newsapi.org/v2/everything?q="

const cardsContainer=document.getElementById("cards-container");
window.addEventListener("load",()=>fetchNews("india"));

function reload(){
    window.location.reload()
}

async function fetchNews(query){

    cardsContainer.innerHTML=`<h1 class="loading-text">Loading....</h1>`

    const res=await fetch(`${apiUrl}${query}&apiKey=${apiKey}`);
    const data=await res.json()


    console.log(data.articles)

    dataBlind(data.articles)
}

function dataBlind(articles){
    const templateNewsCard=document.getElementById("template-news-card");
    cardsContainer.innerHTML=""

    articles.forEach(article => {

        if (!article.urlToImage) return ;
        

        const cardsClone=templateNewsCard.content.cloneNode(true);

        fillDataInCard(cardsClone,article)
        cardsContainer.appendChild(cardsClone)
    
    });
}

function fillDataInCard(cardsClone,article){
    const newsImg=cardsClone.querySelector("#newsImg")
    const newsTitle=cardsClone.querySelector("#news-title");
    const newsSource=cardsClone.querySelector("#news-source");
    const newsDesc=cardsClone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title
    newsDesc.innerHTML=article.description
    
    const data= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    
    newsSource.innerHTML=`${article.source.name} .${data}`;


    cardsClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });

}

let currentActiveNav=null;

function navItemClick(id){
    fetchNews(id);

    const navItem=document.getElementById(id);
    currentActiveNav?.classList.remove("active");
    currentActiveNav=navItem;
    currentActiveNav.classList.add("active")
}

const newsInput=document.getElementById("news-input");
const searchButton=document.getElementById("search-button");

searchButton.addEventListener("click",()=>{
    const query=newsInput.value;
    console.log(query)

    if (!query){
        return;
    }

    fetchNews(query);
    currentActiveNav?.classList.remove("active");
    currentActiveNav=null;

})


