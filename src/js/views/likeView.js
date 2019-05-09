import {selectors} from './DOM';
import {titleLength} from './searchView';

// toggle the like symbol
export const toggleLike = isLiked => {
    const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`)
};

// display like menu
export const showLikedMenu = numOfLikes => {
    selectors.likeSymbol.style.visibility = numOfLikes > 0 ? 'visible' : 'hidden';
};

// display liked items
export const displayLiked = like => {
    const htmlMarkup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${titleLength(like.title)}</h4>
                <p class="likes__author">${like.publisher}</p>
            </div>
        </a>
    </li>
    
    `;
    selectors.likesList.insertAdjacentHTML('beforeend', htmlMarkup);
}

// delete liked items
export const deleteLikeItem = id => {
    const element = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if (element) {
        element.parentElement.removeChild(element)
    }
}
//href="img/icons.svg#icon-heart-outlined