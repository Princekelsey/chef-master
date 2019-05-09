// Global app controller
import Searchrecipes from './models/Search';
import Recipe from './models/Recipes';
import ShoppingList from './models/ShoppingList';
import Likes from './models/Likes';
import * as view from './views/searchView';
import * as viewRecipe from './views/recipeView';
import * as viewShoppingList from './views/shoppingView';
import * as viewLike from './views/likeView';
import {selectors, loading, clearLoading} from './views/DOM';

// global state of the app
const state = {};

// set the search and display rule (Search Controller)
const  searchControl = async () => {
    // get the querry input value
    const querry = view.inputData();
    if (querry) {
        // create a new search recipe object and add it to the global state of the app
        state.newSearch = new Searchrecipes(querry);
        // prepare UI
        view.inputForm();
        view.clearDisplay();
        viewRecipe.clearRecipe();
        loading(selectors.results);
        
        try{
            // search for recipe
            await state.newSearch.getSearchResult();
            // Display result to UI after getting result from the API
            clearLoading();
            view.displayResult(state.newSearch.searchResult)
        
        } catch(err){
            alert(err);
            clearLoading()
        }
        
    }
}
// event to the submit button
selectors.searchBtn.addEventListener('submit', event => {
    event.preventDefault();
    searchControl();
});

// control the page button
selectors.pageBtn.addEventListener('click', event => {
    const button = event.target.closest('.btn-inline');
    if (button) {
        const nextPage = parseInt(button.dataset.goto, 10);
        view.clearDisplay();
        view.displayResult(state.newSearch.searchResult, nextPage);
    }
})

// get individual recipe (Recipe Controller)
const recipeControl = async () => {
    // get id from the url
    const id = window.location.hash.replace('#', '');

    if (id) {
        //implent changes to UI
        viewRecipe.clearRecipe();
        loading(selectors.recipeRender);
        
        // add selected 
        if (state.newSearch){
            view.selected(id)
        }
        // Create a new recipe oblect in the app global state
        state.newRecipe = new Recipe(id);
        
        try{
            // get the new recipe data and present the ingredients
        await state.newRecipe.getRecipe();
        state.newRecipe.changeIngredient()

        // calculate the cooking time and serving
        state.newRecipe.calcCookTime();
        state.newRecipe.calNumOfServing();

        // display result to UI
        clearLoading();
        viewRecipe.recipeDisplay(state.newRecipe, state.newLike.isLiked(id))
        
        } catch(err){
            alert(err)
        }
        
    }
};

// control the shopping list (Shoopping list controller)
const controlShoppingList = () => {
    if (!state.newList) {
        state.newList = new ShoppingList();
    };
    state.newRecipe.ingredients.forEach(elemet => {
        const item = state.newList.addItem(elemet.count, elemet.unit, elemet.ingredient);
        viewShoppingList.displayShoppingList(item);
    })
};

// control the likes (Likes controller)
//testing

const controlLikes = () => {
    if (!state.newLike) {
        state.newLike = new Likes();
    };
    const newId = state.newRecipe.id
    if (!state.newLike.isLiked(newId)) {
        const liked = state.newLike.addLike(newId,state.newRecipe.title,
            state.newRecipe.publisher,state.newRecipe.image);
            viewLike.toggleLike(true);
            viewLike.displayLiked(liked)
            
    } else {
        state.newLike.deleteLike(newId);
        viewLike.toggleLike(false)
        viewLike.deleteLikeItem(newId)
    };
    viewLike.showLikedMenu(state.newLike.numOfLikes())
}

// store the like data even after page refresh and restore it
window.addEventListener('load', () => {
    state.newLike = new Likes();
    state.newLike.getData();
    viewLike.showLikedMenu(state.newLike.numOfLikes());
    state.newLike.likes.forEach(like => viewLike.displayLiked(like))
})

// add delete and update shopping list item and event
selectors.shoppingList.addEventListener('click', event => {
    // delete item from global state and UI
    const id = event.target.closest('.shopping__item').dataset.itemid;
    if (event.target.matches('.shopping__delete, .shopping__delete *')){
        state.newList.deleteItem(id);
        viewShoppingList.deleteShoppingList(id);
        
        // update count in the global state
    } else if (event.target.matches('.shopping__count-value')) {
        const newValue = parseFloat(event.target.value, 10);
        if (newValue > 1) {
        state.newList.updateCount(id, newValue) 
        }
        
    }
})

// add event listener to get id
let event = ['hashchange', 'load']
event.forEach(e => window.addEventListener(e, recipeControl));

// event listener to the + , - and likes button
selectors.recipeRender.addEventListener('click', event =>{
        // decrease the serving
    if(event.target.matches('.btn-decrease, .btn-decrease *')){
        if (state.newRecipe.serving > 1) {
            state.newRecipe.updateServing('reduce');
            viewRecipe.updaterecipe(state.newRecipe);
        }
        
        // increase the servings
    } else if(event.target.matches('.btn-increase, .btn-increase *')){
        state.newRecipe.updateServing('increase');
        viewRecipe.updaterecipe(state.newRecipe);
        
        // add to shopping list
    } else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlShoppingList();

        // add to likes
    } else if (event.target.matches('.recipe__love, recipe__love *')) {
        controlLikes();
    }
});

// image slider
let slideImages = document.querySelectorAll('.slide'),
    arrowRight = document.querySelector('#arrow-right'),
    arrowLeft = document.querySelector('#arrow-left')
    

const auto = true;
const intervalTime = 5000;
let slideInterval;

// get the next slide image
const next = () => {
    const current = document.querySelector('.act');
    current.classList.remove('act');
    if (current.nextElementSibling) {
        current.nextElementSibling.classList.add('act');
    } else {
        slideImages[0].classList.add('act');
    };
    setTimeout(()=> current.classList.remove('act'))
};

// get the previous slide image
const prev = () => {
    const current = document.querySelector('.act');
    current.classList.remove('act');
    if (current.previousElementSibling) {
        current.previousElementSibling.classList.add('act');
    } else {
        slideImages[slideImages.length - 1].classList.add('act');
    };
    setTimeout(()=> current.classList.remove('act'))
};

arrowRight.addEventListener('click', () => {
    next();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(next, intervalTime); 
    }
});
arrowLeft.addEventListener('click', () => {
    prev();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(next, intervalTime); 
    }
});

if (auto) {
      slideInterval = setInterval(next, intervalTime)   
   }




