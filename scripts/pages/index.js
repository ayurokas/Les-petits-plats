// La variable filteredRecipes est initialisée avec toutes les recettes au début
let filteredRecipes = recipes;

// Fonction pour obtenir tous les ingrédients
function getAllIngredients() {
    const ingredients = filteredRecipes.map(recipe => recipe.ingredients.map(obj => obj.ingredient));
    const uniqueArray = [...new Set(ingredients.flat())];

    return uniqueArray;
}

// Fonction pour obtenir tous les appareils
function getAllAppareils() {
    const appareils = filteredRecipes.map(recipe => recipe.appliance);
    const uniqueArray = [...new Set(appareils)];

    return uniqueArray;
}

// Fonction pour obtenir tous les ustensiles
function getAllUstensiles() {
    const ustensiles = filteredRecipes.map(recipe => recipe.ustensils);
    const uniqueArray = [...new Set(ustensiles.flat())];

    return uniqueArray;
}

// Fonction pour créer les éléments de filtre (ingrédients, appareils, ustensiles)
function createFilterItems(id, items) {
    const dropdown = document.getElementById(`${id}-dropdown`);
    const filterItems = document.createElement("ul");
    filterItems.setAttribute("class", "filter-items");
    dropdown.innerHTML = '';

    dropdown.appendChild(filterItems);
    items.forEach(item => {
        const li = document.createElement("li");
        li.onclick = function () {
            const results = searchRecipes(item);
            displayRecipes(results);
            displayTag(item, id);
            if (id === 'ingredient') {
                createFilterItems('ingredient', getAllIngredients());
            } else if (id === 'appareil') {
                createFilterItems('appareil', getAllAppareils());
            } else {
                createFilterItems('ustensile', getAllUstensiles());
            }
        };
        li.innerText = item;
        li.className = id;
        filterItems.appendChild(li);
    });
}

// Fonction pour rechercher des recettes en fonction d'un mot-clé
function searchRecipes(keyword) {
    keyword = keyword.toLowerCase().trim();

    const filteredArray = [];

    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const name = recipe.name.toLowerCase();

        let ingredients = '';
        for (let j = 0; j < recipe.ingredients.length; j++) {
            ingredients += recipe.ingredients[j].ingredient.toLowerCase() + ' ';
        }

        const description = recipe.description.toLowerCase();

        if (name.includes(keyword) || ingredients.includes(keyword) || description.includes(keyword)) {
            filteredArray.push(recipe);
        }
    }

    filteredRecipes = filteredArray;

    return filteredArray;
}

// Fonction pour afficher les recettes
function displayRecipes(recipes) {
    const recipesSection = document.querySelector('.recipes');
    const noRecipe = document.querySelector('.no-recipe');
    recipesSection.innerHTML = '';
    noRecipe.className = 'no-recipe hidden';

    if (recipes.length === 0) {
        noRecipe.className = 'no-recipe visible';
    } else {
        recipes.forEach(recipe => {
            const recipeModel = new recipeFactory(recipe);
            const recipeCard = recipeModel.createRecipeCard();
            recipesSection.appendChild(recipeCard);
        });
    }
}

function searchIngredients(keyword) {
    keyword = keyword.toLowerCase().trim();
    const ingredients = getAllIngredients();

    const filteredIngredients = ingredients.map(i => i.toLowerCase()).filter(i => i.includes(keyword));

    return filteredIngredients;
}

function searchAppareils(keyword) {
    keyword = keyword.toLowerCase().trim();
    const appareils = getAllAppareils();

    const filteredAppareils = appareils.map(a => a.toLowerCase()).filter(a => a.includes(keyword));

    return filteredAppareils;
}

function searchUstensiles(keyword) {
    keyword = keyword.toLowerCase().trim();
    const ustensiles = getAllUstensiles();

    const filteredUstensiles = ustensiles.map(u => u.toLowerCase()).filter(u => u.includes(keyword));

    return filteredUstensiles;
}

function displayTag(keyword, type) {
    const selectedFilters = document.querySelector('.selected-filters');

    const tag = document.createElement('div');
    tag.className = `selected-filter ${type}`;
    tag.innerText = keyword;
    const xIcon = document.createElement('img');
    xIcon.setAttribute('src', './assets/delete_icon.svg');
    xIcon.setAttribute('alt', 'x icon');
    xIcon.className = 'x-icon';

    tag.appendChild(xIcon);
    selectedFilters.appendChild(tag);
}

// Événement DOMContentLoaded pour exécuter le code une fois que le document est prêt
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('#search-input');
    const ingredientInput = document.getElementById('ingredient-input');
    const appareilInput = document.getElementById('appareil-input');
    const ustensileInput = document.getElementById('ustensile-input');
    const filterItems = document.querySelectorAll('ul.filter-items li');
    const ingredientArrow = document.getElementById('ingredient-arrow');
    const appareilArrow = document.getElementById('appareil-arrow');
    const ustensileArrow = document.getElementById('ustensile-arrow');

    // Gestionnaire d'événement pour la saisie dans le champ de recherche
    searchInput.addEventListener('keyup', function (event) {
        const keyword = event.target.value.trim();

        if (keyword.length >= 3) {
            const results = searchRecipes(keyword);
            displayRecipes(results);
        } else if (keyword.length < 3) {
            displayRecipes(filteredRecipes);
        }
    });

    // Gestionnaire d'événement pour la saisie dans le champ d'ingrédient
    ingredientInput.addEventListener('keyup', function (event) {
        const keyword = event.target.value.trim();

        if (keyword.length >= 3) {
            const results = searchIngredients(keyword);
            createFilterItems("ingredient", results);
        } else if (keyword.length < 3) {
            createFilterItems("ingredient", getAllIngredients());
        }
    });

    // Gestionnaire d'événement pour la saisie dans le champ d'appareil
    appareilInput.addEventListener('keyup', function (event) {
        const keyword = event.target.value.trim();

        if (keyword.length >= 3) {
            const results = searchAppareils(keyword);
            createFilterItems("appareil", results);
        } else if (keyword.length < 3) {
            createFilterItems("appareil", getAllAppareils());
        }
    });

    // Gestionnaire d'événement pour la saisie dans le champ d'ustensile
    ustensileInput.addEventListener('keyup', function (event) {
        const keyword = event.target.value.trim();

        if (keyword.length >= 3) {
            const results = searchUstensiles(keyword);
            createFilterItems("ustensile", results);
        } else if (keyword.length < 3 || event.target.value === "") {
            createFilterItems("ustensile", getAllUstensiles());
        }
    });

    // Gestionnaire d'événement pour le clic sur la flèche d'ingrédient
    ingredientArrow.addEventListener('click', () => {
        createFilterItems("ingredient", getAllIngredients());
    });

    // Gestionnaire d'événement pour le clic sur la flèche d'appareil
    appareilArrow.addEventListener('click', () => {
        createFilterItems("appareil", getAllAppareils());
    });

    // Gestionnaire d'événement pour le clic sur la flèche d'ustensile
    ustensileArrow.addEventListener('click', () => {
        createFilterItems("ustensile", getAllUstensiles());
    });

    // Gestionnaire d'événement pour le clic sur la croix de filtre sélectionné
    document.addEventListener('click', function (event) {
        if (event.target.matches('img.x-icon')) {
            const selectedFilter = event.target.closest('.selected-filter');
            selectedFilter.parentNode.removeChild(selectedFilter);
        }
    });
});

// Événement DOMNodeRemoved pour réinitialiser les filtres si tous les filtres sélectionnés sont supprimés
const selectedFilters = document.querySelector('.selected-filters');

selectedFilters.addEventListener('DOMNodeRemoved', () => {
    if (selectedFilters.children.length === 1) {
        displayRecipes(recipes);
        filteredRecipes = recipes;
        createFilterItems("ingredient", getAllIngredients());
        createFilterItems("appareil", getAllAppareils());
        createFilterItems("ustensile", getAllUstensiles());
    }
});

function init() {
    createFilterItems("ingredient", getAllIngredients());
    createFilterItems("appareil", getAllAppareils());
    createFilterItems("ustensile", getAllUstensiles());
    displayRecipes(recipes);
}

init();
