let newRecipes = recipes;
let newRecipesByKeyword = [];
let researchByKeyWord = false;
let researchByfiltre = false;

//DOM elements
let ulIngredients = document.getElementById("liste_ingredients");
let ulAppareils = document.getElementById("liste_appareils");
let ulUstensils= document.getElementById("liste_ustensils");
let ulTags = document.getElementById("liste_tags");
let btns = document.querySelectorAll("button");
let divListes = document.querySelectorAll(".liste");  
let divNotFound = document.getElementById("not-found");
let divRecipes = document.getElementById("recipes");
//Liste des ingredients, ustensils et appareils
let sortedIngredients = [];
let sortedAppareils = [];
let sortedUstensils = [];

//Recherche à partir des input dans les filtres (ingredients, ustensils, appareils)
document.querySelectorAll(".input-filtre").forEach(input => input.addEventListener("keyup", e => {
   let substring  = input.value;
   if (input.getAttribute("data-type") == "ingred"){
        let newIngred = sortedIngredients.filter(ingredient => ingredient.toLowerCase().includes(substring.toLowerCase()));
        remplirListeingredientsByIngred(newIngred);
   } else if (input.getAttribute("data-type") == "appareil"){
        let newApp = sortedAppareils.filter(appareil => appareil.toLowerCase().includes(substring.toLowerCase()));
        remplirListeAppareilsByAppareils(newApp);
   }else{
    let newUst = sortedUstensils.filter(ustensil => ustensil.toLowerCase().includes(substring.toLowerCase()));
    remplirListeUstensilsByUstens(newUst);
   }
    
})
);

//Création d'un tag selon le type (ingredient , appareil, ustensil)
function createTag(contenu , type){
    researchByfiltre = true;
    let li = document.createElement("li");
    li.innerHTML = contenu;
    li.classList.add(type);
    ulTags.appendChild(li);
    let i = document.createElement("i");
    i.classList.add("fas","fa-times");
    //Suppression d'un tag
    i.addEventListener("click", e => {
        e.target.parentElement.remove();
        //parcourir la liste des tags et re-filtrer les recettes
        let ulTags = document.getElementById("liste_tags");
        let li = ulTags.children;
        newRecipes = recipes;
        if(li.length !=0 ){
            for(let i = 0 ; i< li.length ; i++){
                if(li[i].className == "ingredients"){
                    newRecipes = filterRecipesByIngredient(newRecipes, li[i].textContent.trim());
                }
                else if(li[i].className == "ustensils"){
                    newRecipes = filterRecipesByUstensil(newRecipes, li[i].textContent.trim());
                }
                else{
                    newRecipes = filterRecipesByAppliance(newRecipes, li[i].textContent.trim());
                }
            }
            displayData(newRecipes);
        }else{
            researchByfiltre = false;
            if(researchByKeyWord == false){
                displayData(recipes);
            }else{
                displayData(newRecipesByKeyword);
            }
        }
        

    });
    li.append(i);
}


function displayRecipes(recipes){
    document.getElementById("recipes").innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        document.getElementById("recipes").appendChild(recipeCardDOM);
    });
}


function displayData(newRecipes) {
  
    remplirListeingredients(newRecipes);
    remplirListeAppareils(newRecipes);
    remplirListeUstensils(newRecipes);
    displayRecipes(newRecipes);
}

//1er affichage
displayData(newRecipes);