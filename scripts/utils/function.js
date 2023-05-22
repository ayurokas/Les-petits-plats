//Remplissage liste ingredients
function remplirListeingredientsByIngred(ingredients){
    ulIngredients.innerHTML = "";
    ingredients.forEach(ingredient => {
        let li = document.createElement("li");
        li.innerHTML = ingredient;
        li.addEventListener("click",e => {
            createTag(li.textContent  + " " , "ingredients");
            //Màj des recettes 
            newRecipes = filterRecipesByIngredient(newRecipes, li.textContent);
            if(researchByKeyWord == false){
                displayData(newRecipes);
            }else{
                displayData(intersection(newRecipes, newRecipesByKeyword));
            }
        })
        ulIngredients.appendChild(li);
    })
}
//Remplissage liste appareils
function remplirListeAppareilsByAppareils(appareils){
    ulAppareils.innerHTML = "";
    appareils.forEach(apapreil => {
        let li = document.createElement("li");
        li.innerHTML = apapreil;
        li.addEventListener("click",e => {
            createTag(li.textContent  + " " , "appareils");
            //Màj des recettes
            newRecipes = filterRecipesByAppliance(newRecipes, li.textContent);
            if(researchByKeyWord == false){
                displayData(newRecipes);
            }else{
                displayData(intersection(newRecipes, newRecipesByKeyword));
            }
        })
        ulAppareils.appendChild(li);
    });
}

//Remplissage liste ustensiles
function remplirListeUstensilsByUstens(ustenils){
    ulUstensils.innerHTML = "";
   ustenils.forEach(ustensil => {
        let li = document.createElement("li");
        li.innerHTML = ustensil;
        li.addEventListener("click",e => {
            createTag(li.textContent  + " " , "ustensils");
            //Màj des recettes
            newRecipes = filterRecipesByUstensil(newRecipes, li.textContent);
            if(researchByKeyWord == false){
                displayData(newRecipes);
            }else{
                displayData(intersection(newRecipes, newRecipesByKeyword));
            }
        })
        ulUstensils.appendChild(li);
    });
}


//Remplissage des diférentes liste à partir des recettes
function remplirListeingredients(recipes){
    ulIngredients.innerHTML = "";
    let ingredients = getIngredients(recipes);
    ingredients.sort((a,b) => {
        return (a.localeCompare(b));
    }
    );
    sortedIngredients = ingredients;
    ingredients.forEach(ingredient => {
        let li = document.createElement("li");
        li.innerHTML = ingredient;
        li.addEventListener("click",e => {
            createTag(li.textContent  + " " , "ingredients");
            //divListes[0].style.display = "none";
            //btns[0].style.display = "block";
            //Màj des recettes
            newRecipes = filterRecipesByIngredient(newRecipes, li.textContent);
            if(researchByKeyWord == false){
                displayData(newRecipes);
            }else{
                displayData(intersection(newRecipes, newRecipesByKeyword));
            }
           
        })
        ulIngredients.appendChild(li);
    })
}

//Remplissage liste appareils
function remplirListeAppareils(recipes){
    ulAppareils.innerHTML = "";
    let appareils = getAppareils(recipes);
    appareils.sort((a,b) => {
        return (a.localeCompare(b));
    });
    sortedAppareils = appareils;
    appareils.forEach(apapreil => {
        let li = document.createElement("li");
        li.innerHTML = apapreil;
        li.addEventListener("click",e => {
            createTag(li.textContent  + " " , "appareils");
            //divListes[1].style.display = "none";
            //btns[1].style.display = "block";
            //Màj des recettes
            newRecipes = filterRecipesByAppliance(newRecipes, li.textContent);
            if(researchByKeyWord == false){
                displayData(newRecipes);
            }else{
                displayData(intersection(newRecipes, newRecipesByKeyword));
            }
        })
        ulAppareils.appendChild(li);
    });
}

//Remplissage liste ustensiles
function remplirListeUstensils(recipes){
    ulUstensils.innerHTML = "";
    let ustensils = getUstensils(recipes);
    ustensils.sort((a,b) => {
        return (a.localeCompare(b));
    });
    sortedUstensils = ustensils;
   ustensils.forEach(ustensil => {
        let li = document.createElement("li");
        li.innerHTML = ustensil;
        li.addEventListener("click",e => {
            createTag(li.textContent  + " " , "ustensils");
            //divListes[2].style.display = "none";
            //btns[2].style.display = "block";
            //Màj des recettes
            newRecipes = filterRecipesByUstensil(newRecipes, li.textContent);
            if(researchByKeyWord == false){
                displayData(newRecipes);
            }else{
                displayData(intersection(newRecipes, newRecipesByKeyword));
            }
        })
        ulUstensils.appendChild(li);
    });
}

function getIngredients(recipes) {
    let allIngredients = [];
    recipes.forEach(recipe => {
        let ingredients = recipe.ingredients;
        ingredients.forEach(ingredient => {
            if(allIngredients.length == 0){
                allIngredients.push(ingredient.ingredient);
            }
            else{
                let result = allIngredients.findIndex(ingred => ingred.toLowerCase() == ingredient.ingredient.toLowerCase());
                if(result == -1){
                    allIngredients.push(ingredient.ingredient);
                }
            }
        });
    });
    return (allIngredients); 
}

function getUstensils (recipes) {
    let allUstensils = [];
    recipes.forEach(recipe => {
        let ustensils = recipe.ustensils;
        ustensils.forEach(ustensil => {
            if(allUstensils.length == 0){
                allUstensils.push(ustensil);
            }else{
                let result  = allUstensils.findIndex(ustens => ustens.toLowerCase() == ustensil.toLowerCase());
                if(result == -1){
                    allUstensils.push(ustensil);
                }
            }
        })
    });
    return (allUstensils);
}

function getAppareils(recipes){
    let allAppareils = [];
    recipes.forEach(recipe => {
        if(allAppareils.length == 0){
            allAppareils.push(recipe.appliance);
        }else{
            let result = allAppareils.findIndex(appareil => appareil.toLowerCase() == recipe.appliance.toLocaleLowerCase());
            if(result == -1){
                allAppareils.push(recipe.appliance);
            }
        }
    });
    return (allAppareils);
}

function getIngredientsAppareilsUstensils(recipes){
    let all = {};
    let allIngredients = [];
    let allUstensils = [];
    let allAppareils = [];

    recipes.forEach(recipe => {
        let ingredients = recipe.ingredients;
        ingredients.forEach(ingredient => {
            if(allIngredients.length == 0){
                allIngredients.push(ingredient.ingredient);
            }
            else{
                let result = allIngredients.findIndex(ingred => ingred.toLowerCase() == ingredient.ingredient.toLowerCase());
                if(result == -1){
                    allIngredients.push(ingredient.ingredient);
                }
            }
        });
        let ustensils = recipe.ustensils;
        ustensils.forEach(ustensil => {
            if(allUstensils.length == 0){
                allUstensils.push(ustensil);
            }else{
                let result  = allUstensils.findIndex(ustens => ustens.toLowerCase() == ustensil.toLowerCase());
                if(result == -1){
                    allUstensils.push(ustensil);
                }
            }
        })
        
        if(allAppareils.length == 0){
            allAppareils.push(recipe.appliance);
        }else{
            let result = allAppareils.findIndex(appareil => appareil.toLowerCase() == recipe.appliance.toLocaleLowerCase());
            if(result == -1){
                allAppareils.push(recipe.appliance);
            }
        }
        
        all.ustensils = allUstensils;
        all.appareils = allAppareils;
        all.ingredients = allIngredients;
        
    });

    return all;
}
