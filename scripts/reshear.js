import { recipes } from "./recipes.js";

const checkIfContains = (input, entry) => entry.includes(input);

const research= () => {
    let results = [];
    const input = "thon";
    for(let i = 0; i < recipes.length; i++){      
      if(checkIfContains(input, recipes[i].name)){
        results.push(recipes[i].id);
      } 
    }
}

