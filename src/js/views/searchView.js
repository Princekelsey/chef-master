import {selectors} from './DOM';


// get the user input
export const inputData = () => selectors.userInput.value;

// control the length of the title to be displayed using reduce method
/*const titleLength = (title, wordLimit = 17) => {
    const newTitle = [];
    if (title.length > wordLimit) {
        title.split(' ').reduce((pre, current) => {
            if (pre + current.length <= wordLimit) {
                newTitle.push(current)
            }
            return pre + current.length
        }, 0);
        return `${newTitle.join(' ')}...`
    };
    return title

}; */

// using forEach method to control the length of the title to be displayed
export const titleLength = (title, wordLimit = 17) => {
    const newTitle = [];
    let count = 0;
    if (title.length > wordLimit) {
        title.split(' ').forEach(cur => {
            if (count + cur.length <= wordLimit) {
                newTitle.push(cur);
                count+=cur.length;
            }
            return count; 
        });
        return `${newTitle.join(' ')}...`   
    };
    return title;
}


// display result for each recipe
const displayRecipe = recipe => {
 // html element
 const htmlMarkup = 
 `
        <li>
        <a class="results__link " href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${titleLength(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
        </li>
 
 ` ;
selectors.resultList.insertAdjacentHTML('beforeend', htmlMarkup);

};

// create page button
const pageButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
    </button>
`

// adding pagination
const dispalyPageButton = (page, displaySize, lengthPerPage) => {
    const numOfPages = Math.ceil(displaySize/lengthPerPage);
    let button;
    switch (true) {
        case (page === 1 && numOfPages > 1) :
        button = pageButton(page, 'next');
            break;
        case (page < numOfPages) :
        button = `
            ${pageButton(page, 'prev')}
            ${pageButton(page, 'next')}
        `
            break;
        case (page === numOfPages && numOfPages > 1) :
        button = pageButton(page, 'prev')
                break;
        default:
            break;
    };
    selectors.pageBtn.insertAdjacentHTML('afterbegin', button)
};

// loop through all the results and display result in the UI
export const displayResult = (recipes, page = 1, lengthPerPage = 10) => {
    const start = (page - 1) * lengthPerPage;
    const end = page * lengthPerPage;
    recipes.slice(start, end).forEach(displayRecipe);
    dispalyPageButton(page, recipes.length, lengthPerPage)
};

// set the input form to empty
export const inputForm = () => {
    selectors.userInput.value = ''
};

// clear the display result
export const clearDisplay = () => {
    selectors.resultList.innerHTML = ' ';
    selectors. pageBtn.innerHTML = ' '
};

// add selected class to the selected recipe
export const selected = id => {
    const searchArr = Array.from(document.querySelectorAll('.results__link'));
    searchArr.forEach(el => {
        el.classList.remove('selected')
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('selected')
}