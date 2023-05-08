import { recipeFactory } from '../factories/recipeFactory.js'

async function getRecipes() {
	try {
		const response = await fetch('../datas/recipes.json')
		const recipes = await response.json()
		return recipes
	} catch (err) {
		console.error(err)
	}
}

// création et affichage des cards recette via la recipeFactory
function displayRecipes(recipes) {
	const recipesSection = document.getElementById('recipes')
	recipesSection.innerHTML = ''

	recipes.forEach((recipe) => {
		let recipeModel = recipeFactory(recipe)
		const recipeCardDOM = recipeModel.getRecipeCardDOM()
		recipesSection.appendChild(recipeCardDOM)
	})
}
let recipes;

async function init() {
  recipes = await getRecipes();
  displayRecipes(recipes);
}

init()
