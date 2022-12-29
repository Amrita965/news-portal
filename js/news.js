const loadNewsCategory = async() => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategory(data.data.news_category);
}

const displayNewsCategory = newsCategories => {
    const newsCategoryContainer = document.getElementById('news-category-container');
    newsCategories.forEach(category => {
        // console.log(category);
        const categoryButton = document.createElement('button');
        categoryButton.setAttribute('type', 'button');
        categoryButton.setAttribute('onclick', ``);
        categoryButton.classList.add(...['btn', 'btn-outline-primary', 'rounded-0']);
        categoryButton.innerText = `${category.category_name}`;
        newsCategoryContainer.appendChild(categoryButton);
        
    });
    
}

loadNewsCategory();