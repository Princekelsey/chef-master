import axios from 'axios';

// search  for recipes 
export default class Searchrecipes {
    constructor(querry){
        this.querry = querry
    }
    async getSearchResult() {
        const key = 'f76a287e47b7d1f6dd4a5de8c840b875';
        try{
            const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.querry}`);
            this.searchResult = result.data.recipes
            // console.log(this.searchResult)
        }catch(error){
            console.log(error);
        }
        
    
    }
}



