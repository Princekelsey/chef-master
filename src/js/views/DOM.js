export const selectors = {
        searchBtn: document.querySelector('.search'),
        userInput: document.querySelector('.search__field'),
        resultList: document.querySelector('.results__list'),
        results: document.querySelector('.results'),
        pageBtn: document.querySelector('.results__pages'),
        recipeRender: document.querySelector('.recipe'),
        shoppingList: document.querySelector('.shopping__list'),
        likeSymbol: document.querySelector('.likes__field'),
        likesList: document.querySelector('.likes__list'),
};

// controls the spinning loading
export const loading = parent => {
    const spinner = `
        <div class="loader"> 
            <svg> 
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', spinner);
};

// clear the spinning loading
export const clearLoading = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}