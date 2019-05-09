import axios from 'axios';

// get recipe by id
export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe () {
        const key = 'f76a287e47b7d1f6dd4a5de8c840b875';
        
        try{
            const result = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.publisher = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch(err){
            console.log(err)
        }
    }

    // calculate cooking time
    calcCookTime () {
        const numOfIng = this.ingredients.length;
        const periods = Math.ceil(numOfIng / 3);
        this.time = periods * 15;
    }

    calNumOfServing () {
        this.serving = 4;
    }

    // update servings according to add or reduce
    updateServing (type) {
        const newSer = type === 'reduce' ? this.serving - 1 : this.serving + 1;

        this.ingredients.forEach(el => {
            el.count *= newSer/this.serving
        });
        this.serving = newSer;
    }

    // Edith ingredients content
    changeIngredient () {
        const oldUnits = ['tablespoons', 'tablespoon', 'ounces', 
        'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const newUnits = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound' ];
        const allUnits = [...newUnits, 'kg', 'g']

        
        const newIngredient = this.ingredients.map(cur => {
            // replace the old units with the new unit
            let ingredient = cur.toLowerCase();
            oldUnits.forEach((curUnit, i) => {
                ingredient = ingredient.replace(curUnit, newUnits[i]);
            });
            
            // remove the parentheses
            ingredient = ingredient.replace(/ *\([^]*\) */g, ' ');

            // convert ingredients into count, unit and ingredient
            const arrayIng = ingredient.split(' ');
            const unitIndex = arrayIng.findIndex(element => allUnits.includes(element));

            let ingObject;

            if (unitIndex > -1) {
                // there is a unit
                let count;
                const counter = arrayIng.slice(0, unitIndex);
                if (counter.length === 1) {
                    count = eval(arrayIng[0].replace('-', '+'));
                } else {
                    count = eval(arrayIng.slice(0, unitIndex).join('+'))
                };
                ingObject = {
                    count,
                    unit: arrayIng[unitIndex],
                    ingredient: arrayIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrayIng[0], 10)){
                // there is no unit but first element is a no 
                ingObject = {
                    count: parseInt(arrayIng[0], 10),
                    unit: ' ',
                    ingredient: arrayIng.slice(1).join(' '),
                }
            } else if (unitIndex === -1) {
                // there is no unit
                ingObject = {
                    count: 1,
                    unit: ' ',
                    ingredient
                }
            }

            return ingObject;

        });
        this.ingredients = newIngredient;
        
    }

    
};


