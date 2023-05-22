

function filterRecipesByAppliance(recipes, appliance){
    let newRecipes = [];
    newRecipes = recipes.filter(recipe => recipe.appliance.toLowerCase() == appliance.toLowerCase());
    return newRecipes;
}

function filterRecipesByIngredient(recipes, ingredient){
    let newRecipes = [];
   recipes.forEach(recipe => {
    if(recipe.ingredients.findIndex(ingred => ingred.ingredient.toLowerCase() == ingredient.toLowerCase()) != -1){
        newRecipes.push(recipe);
    }
   });
   return newRecipes; 
}

function filterRecipesByUstensil(recipes, ustensil){
    let newRecipes = [];
    recipes.forEach(recipe => {
     if(recipe.ustensils.findIndex(eltUstensil => eltUstensil.toLowerCase() == ustensil.toLowerCase()) != -1){
         newRecipes.push(recipe);
     }
    });
    return newRecipes; 
}
