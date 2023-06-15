let filteredRecipes = recipes;

// Fonction pour récupérer tous les ingrédients
function getAllIngredients() {
  const ingredients = filteredRecipes.flatMap(recipe => recipe.ingredients.map(obj => obj.ingredient));
  const uniqueArray = [...new Set(ingredients)];

  return uniqueArray;
}

// Fonction pour récupérer tous les appareils
function getAllAppareils() {
  const appareils = filteredRecipes.map(recipe => recipe.appliance);
  const uniqueArray = [...new Set(appareils)];

  return uniqueArray;
}

// Fonction pour récupérer tous les ustensiles
function getAllUstensiles() {
  const ustensiles = filteredRecipes.flatMap(recipe => recipe.ustensils);
  const uniqueArray = [...new Set(ustensiles)];

  return uniqueArray;
}

//----------------------- FILTRE ---------------------------------------------------
// Fonction pour créer les éléments de filtre
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

//----------------------------------------------------------------------------------

//----------------------- RECHERCHE -----------------------------------------------
// Fonction pour effectuer une recherche de recettes en fonction d'un mot-clé
function searchRecipes(keyword) {
  keyword = keyword.toLowerCase().trim();

  // Filtrer les recettes en fonction du mot-clé
  const filteredArray = filteredRecipes.filter(recipe => {
    const name = recipe.name.toLowerCase();
    const ingredients = recipe.ingredients.map(i => i.ingredient.toLowerCase()).join(' ');
    const description = recipe.description.toLowerCase();
    return (
      name.includes(keyword) ||
      ingredients.includes(keyword) ||
      description.includes(keyword)
    );
  });

  filteredRecipes = filteredArray;

  return filteredArray;
}

// Afficher les recettes filtrées
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

// Fonction pour effectuer une recherche d'ingrédients en fonction d'un mot-clé
function searchIngredients(keyword) {
  keyword = keyword.toLowerCase().trim();
  const ingredients = getAllIngredients();

  const filteredIngredients = ingredients
    .map(i => i.toLowerCase())
    .filter(i => i.includes(keyword));

  return filteredIngredients;
}

// Fonction pour effectuer une recherche d'appareils en fonction d'un mot-clé
function searchAppareils(keyword) {
  keyword = keyword.toLowerCase().trim();
  const appareils = getAllAppareils();

  const filteredAppareils = appareils
    .map(a => a.toLowerCase())
    .filter(a => a.includes(keyword));

  return filteredAppareils;
}

// Fonction pour effectuer une recherche d'ustensiles en fonction d'un mot-clé
function searchUstensiles(keyword) {
  keyword = keyword.toLowerCase().trim();
  const ustensiles = getAllUstensiles();

  const filteredUstensiles = ustensiles
    .map(u => u.toLowerCase())
    .filter(u => u.includes(keyword));

  return filteredUstensiles;
}

//------------------------------------------------------------------------------

//----------------------- TAG---------------------------------------------------
// Afficher un tag correspondant à un filtre sélectionné
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
//-------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('#search-input');
  const ingredientInput = document.getElementById('ingredient-input');
  const appareilInput = document.getElementById('appareil-input');
  const ustensileInput = document.getElementById('ustensile-input');
  const filterItems = document.querySelectorAll('ul.filter-items li');
  const ingredientArrow = document.getElementById('ingredient-arrow');
  const appareilArrow = document.getElementById('appareil-arrow');
  const ustensileArrow = document.getElementById('ustensile-arrow');

  searchInput.addEventListener('keyup', function (event) {
    const keyword = event.target.value.trim();

    if (keyword.length >= 3) {
      const results = searchRecipes(keyword);
      displayRecipes(results);
    } else if (keyword.length < 3) {
      filteredRecipes = recipes;
      displayRecipes(recipes);
    }
  });

  // Événement de recherche d'ingrédients
  ingredientInput.addEventListener('keyup', function (event) {
    const keyword = event.target.value.trim();

    if (keyword.length >= 3) {
      const results = searchIngredients(keyword);
      createFilterItems('ingredient', results);
    } else if (keyword.length < 3) {
      createFilterItems('ingredient', getAllIngredients());
    }
  });

  // Événement de recherche d'appareils
  appareilInput.addEventListener('keyup', function (event) {
    const keyword = event.target.value.trim();

    if (keyword.length >= 3) {
      const results = searchAppareils(keyword);
      createFilterItems('appareil', results);
    } else if (keyword.length < 3) {
      createFilterItems('appareil', getAllAppareils());
    }
  });

  // Événement de recherche d'ustensiles
  ustensileInput.addEventListener('keyup', function (event) {
    const keyword = event.target.value.trim();

    if (keyword.length >= 3) {
      const results = searchUstensiles(keyword);
      createFilterItems('ustensile', results);
    } else if (keyword.length < 3 || event.target.value === '') {
      createFilterItems('ustensile', getAllUstensiles());
    }
  });

  // Événement pour réinitialiser les filtres d'ingrédients
  ingredientArrow.addEventListener('click', () => {
    createFilterItems('ingredient', getAllIngredients());
  });

  // Événement pour réinitialiser les filtres d'appareils
  appareilArrow.addEventListener('click', () => {
    createFilterItems('appareil', getAllAppareils());
  });

  // Événement pour réinitialiser les filtres d'ustensiles
  ustensileArrow.addEventListener('click', () => {
    createFilterItems('ustensile', getAllUstensiles());
  });

  document.addEventListener('click', function (event) {
    if (event.target.matches('img.x-icon')) {
      var selectedFilter = event.target.closest('.selected-filter');
      selectedFilter.parentNode.removeChild(selectedFilter);
    }
  });
});

// Gestion de la suppression des tags
const selectedFilters = document.querySelector('.selected-filters');

selectedFilters.addEventListener('DOMNodeRemoved', () => {
  if (selectedFilters.children.length === 1) {
    displayRecipes(recipes);
    filteredRecipes = recipes;
    createFilterItems('ingredient', getAllIngredients());
    createFilterItems('appareil', getAllAppareils());
    createFilterItems('ustensile', getAllUstensiles());
  }
});

// Initialisation de la page
function init() {
  createFilterItems('ingredient', getAllIngredients());
  createFilterItems('appareil', getAllAppareils());
  createFilterItems('ustensile', getAllUstensiles());
  displayRecipes(recipes);
}

init();
