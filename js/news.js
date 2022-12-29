const loadNewsCategory = async() => {
    // try {
        const url = 'https://openapi.programming-hero.com/api/news/categories';
        const res = await fetch(url);
        const data = await res.json();
        displayNewsCategory(data.data.news_category);
    // } catch(err) {
    //     window.alert("Error:", err);
    // }
}

const displayNewsCategory = newsCategories => {
    const newsCategoryContainer = document.getElementById('news-category-container');
    let n = 1;
    newsCategories.forEach(category => {
        const input = createHTMLElement('input', { type: 'radio', class: 'btn-check', name: 'btnradio', id: `btnradio${n}`, autocomplete: 'off'});
        if(n == 1) {
          setAttributes(input, { checked: '' });
        }
        const label = createHTMLElement('label', {class: 'btn btn-outline-primary rounded-0', for: `btnradio${n}`, onclick: `loadNews('${category.category_id}')`});
        label.innerText = `${category.category_name}`
        newsCategoryContainer.appendChild(input);
        newsCategoryContainer.appendChild(label);
        n++;
        
    });
    
}

/* <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
<label class="btn btn-outline-primary" for="btnradio1">Radio 1</label> */

const loadNews = async(categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayAllNews(data.data);

}

const displayAllNews = allNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4 p-3">
                    <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${news.title}</h5>
                      <p class="card-text">${news.details.slice(0, 300) + '...'}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
        `
        newsContainer.appendChild(newsDiv);
        console.log(news);
    });
}

loadNewsCategory();
loadNews('01');