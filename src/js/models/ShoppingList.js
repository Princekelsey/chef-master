import uniqid from 'uniqid';

export default class ShoppingList {
    constructor(){
        this.items = []
    }

    // add new item to the shopping list
    addItem (count, unit, ingredient) {
        const item = {
            id : uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }

    // delete item from the shopping list
    deleteItem (id) {
        const index = this.items.findIndex(element => element.id === id);
        this.items.splice(index, 1);
    }

    // update the count
    updateCount (id, newCount) {
        this.items.find(element => element.id === id).count = newCount;
    }
}