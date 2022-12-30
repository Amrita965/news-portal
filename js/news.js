const loadNewsCategory = async () => {
  try {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategory(data.data.news_category);
  } catch (err) {
    window.alert('Unable to load data. Please wait a moment and try again.');
  }
}

const displayNewsCategory = newsCategories => {
  const newsCategoryContainer = document.getElementById('news-category-container');
  let n = 1;
  newsCategories.forEach(category => {
    const input = createHTMLElement('input', { type: 'radio', class: 'btn-check', name: 'btnradio', id: `btnradio${n}`, autocomplete: 'off' });
    if (n == 1) {
      setAttributes(input, { checked: '' });
    }
    const label = createHTMLElement('label', { class: 'btn btn-outline-primary rounded-0', for: `btnradio${n}`, onclick: `loadNews('${category.category_id}', '${category.category_name}')` });
    label.innerText = `${category.category_name}`
    newsCategoryContainer.appendChild(input);
    newsCategoryContainer.appendChild(label);
    n++;
  });
}

const loadNews = async (categoryId, categoryName) => {
  loader(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  displayAllNews(data.data, categoryName);

}

const displayAllNews = (allNews, categoryName) => {
  allNews.sort((first, second) => (first.total_view < second.total_view) ? 1 : -1);
  const totalItems = allNews.length;
  setElementContentById('total-items-found', `${totalItems} items found for category ${categoryName}`);
  const newsContainer = getElementById('news-container');
  newsContainer.textContent = '';
  allNews.forEach(news => {
    console.log(news);
    const newsDiv = createHTMLElement('div');
    setAttributes(newsDiv, { class: 'col' });
    newsDiv.innerHTML = `
        <div class="card mb-3 news-card" data-bs-toggle="modal" data-bs-target="#news-detail-modal" onclick="loadNewsDetail('${news._id}')" title="Click here for detailed news." style="cursor: pointer;">
          <div class="row g-0">
            <div class="col-md-4 p-3">
                <img src="${news.image_url}" class="img-fluid rounded-start" alt="">
            </div>
              <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 300) + '...'}</p>
                    <div class="row justify-content-evenly g-3">
                      <div class="col-lg-4 col-8 d-flex align-items-center">
                      <div>
                        <img src="${news.author.img}" alt="author" style="width: 50px; height: 50px;" class="rounded-circle">
                      </div>
                      <div class="ms-2">
                        <h6 class="m-0">${news.author.name === 'system' || news.author.name === null || news.author.name === "" ? 'No author found' : news.author.name}</h6>
                        <p class="m-0">${news.author.published_date === null ? 'No date found' : news.author.published_date}</p>
                      </div>
                      </div>
                      <div class="col-lg-4 col-4 d-flex align-items-center justify-content-center">
                        <div class="me-1"><i class="fa-regular fa-eye"></i></div>
                        <div><h5 class="m-0">${(news.total_view ? news.total_view : "0") + 'K'}</h5></div>
                      </div>
                      <div class="col-lg-4 col-12 d-flex align-items-center justify-content-center">
                      <div>
                        <i class="fa-regular fa-star-half-stroke me-2"></i><i class="fa-regular fa-star me-2"></i><i class="fa-regular fa-star me-2"></i><i class="fa-regular fa-star me-2"></i><i class="fa-regular fa-star"></i>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        `
    newsContainer.appendChild(newsDiv);
  });
  loader(false);
}

const loadNewsDetail = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetailInModal(data.data[0]);
  } catch (err) {
    window.alert('Unable to load data. Please wait a moment and try again.');
  }

}

const displayNewsDetailInModal = (news) => {
  setElementContentById('news-thumbnail', news.title);
  setAttributes(getElementById('news-img'), { src: news.image_url });
  setElementContentById('news-details', news.details);
  setElementContentById('author-name', `Author name: ${news.author.name === 'system' || news.author.name === null || news.author.name === "" ? 'No author found' : news.author.name}`)
  setElementContentById('published-date', `Published Date: ${news.author.published_date === null ? 'No date found' : news.author.published_date}`);
}

loadNewsCategory();
loadNews('01', 'Breaking News');