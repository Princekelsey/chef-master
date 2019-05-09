import {selectors} from './DOM';
import {Fraction} from 'fractional';


// Format the count to fractional
const convertCount = count => {
    if (count) {
        const new_count = Math.round(count * 10000)/10000
        const [int, decimal] = new_count.toString().split('.').map(cur => parseInt(cur, 10));
        
        if (!decimal) return new_count;

        if (int === 0){
            const frac = new Fraction(new_count);
            return `${frac.numerator}/${frac.denominator}`;
        } else {
            const frac = new Fraction(new_count - int);
            return `${int} ${frac.numerator}/${frac.denominator}`
        }
    } else return '?'
}

// create ingredient items for each selected recipe
const createNewIng = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
    <div class="recipe__count">${convertCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="${ingredient.unit}">g</span>
        ${ingredient.ingredient}
    </div>
    </li>

`;

// render the selected recipe to the UI
export const recipeDisplay = (recipe, isLiked) => { 

    const htmlMarkup = 

`
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">4</span>
                <span class="recipe__info-text"> ${recipe.serving}</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
            </div>

            <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(cur => createNewIng(cur)).join('')}
            </ul>

            <button class="btn-small recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
            </div>

            <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
            </div>

  `;
    
 selectors.recipeRender.insertAdjacentHTML('afterbegin', htmlMarkup)
};

// clear receipe
export const clearRecipe = () => {
    selectors.recipeRender.innerHTML = '';
};

// update recipe content when the + and - button is clicked
export const updaterecipe = recipe => {
    //update the servings on UI
    document.querySelector('.recipe__info-data--people').textContent = recipe.serving;

    // update ingredients
    const newCount = Array.from(document.querySelectorAll('.recipe__count'));
    newCount.forEach((el,i) => {
        el.textContent = convertCount(recipe.ingredients[i].count)
    })
} 