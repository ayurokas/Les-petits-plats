
function recipeFactory(data) {
    const {id, name, servings, ingredients, time, description, appliance, ustensils } = data;

    function getRecipeCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("class","carte");

        const divImg = document.createElement("div");
        divImg.setAttribute("class","carte_img");
        let nameimg = name.replaceAll(" ","_");
        const img = document.createElement( 'img' );
        divImg.appendChild(img);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        article.appendChild(divImg);
        article.appendChild(getCardBody());
       
        return (article);
    }
    function getCardBody(){
        const divBody = document.createElement("div");
        divBody.setAttribute("class","carte_body");

        const divTitle = document.createElement("div");
        divTitle.setAttribute("class","carte_title");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const spanTime = document.createElement("span");
        spanTime.setAttribute("class","time");
        const i = document.createElement("i");
        i.classList.add("far");
        i.classList.add("fa-clock");
        spanTime.appendChild(i);
        spanTime.innerHTML += time + "mn";
        divTitle.appendChild(h2);
        divTitle.appendChild(spanTime);

        const divInfos = document.createElement("div");
        divInfos.setAttribute("class","carte_infos");
        const p = document.createElement("p");
        p.setAttribute("class","carte_description");
        p.textContent = description;
        divInfos.appendChild(getIngredientsDOM());
        divInfos.appendChild(p);

        divBody.appendChild(divTitle);
        divBody.appendChild(divInfos);
        return divBody;
    }

    function getIngredientsDOM(){
        const ul = document.createElement("ul");
        ul.setAttribute("class","carte_ingredients");
        ingredients.forEach(element => {
            const li = document.createElement("li");
            li.setAttribute("class","carte_ingredient");
            li.textContent = element.ingredient;
            if(element.hasOwnProperty("quantity")){
                li.textContent += " : " + element.quantity;
            }
            if(element.hasOwnProperty("unit")){
                li.textContent += " " + element.unit;
            }

            ul.appendChild(li);
        });

        return ul;
    }

    return{getRecipeCardDOM};
}