let input = document.getElementById("recherche_principale_input");

input.addEventListener("keyup" , event => {
    let substring = input.value;
    if (substring.length >= 3){
        researchByKeyWord = true;
        newRecipesByKeyword = findSubstringInRecipes(recipes, substring); 
        if(newRecipesByKeyword.length == 0){
            divRecipes.style.display = "none";
            divNotFound.style.display = "block";
        }else{
            divRecipes.style.display = "flex";
            divNotFound.style.display = "none";

            if(researchByfiltre == false){
                displayData(newRecipesByKeyword);
            }else{
                displayData(intersection(newRecipes, newRecipesByKeyword));
            } 
        }
       
    }
    if(substring.length == 0){
        divRecipes.style.display = "flex";
        divNotFound.style.display = "none";

        researchByKeyWord = false;
        newRecipesByKeyword = [];
        displayData(newRecipes);
    }
});

function findSubstringInRecipes(recipes, substring){
    let newRecipesByKeyword = [];
    //Recherche dans le titre , la description et le tableau d'ingredients
    newRecipesByKeyword = recipes.filter( recipe => recipe.name.toLowerCase().includes(substring.toLowerCase())  || recipe.description.toLowerCase().includes(substring.toLowerCase())
    || recipe.ingredients.findIndex(ingred => ingred.ingredient.toLowerCase().includes(substring.toLowerCase())) != -1
    ); 

    return newRecipesByKeyword;
} 

function intersection(filtredRecipes,KeywordRecipes){
    let intersection = [];
    intersection = filtredRecipes.filter(filtredRecipe => 
        KeywordRecipes.some(keywordRecipe => keywordRecipe.name == filtredRecipe.name)
    );
    return intersection;
}