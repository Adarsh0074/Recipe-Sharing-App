document.getElementById("recipe-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("recipe-name").value;
    const ingredients = document.getElementById("ingredients").value;
    const category = document.getElementById("category").value;
    const steps = document.getElementById("steps").value;
    const recipe = { name, ingredients, category, steps };
    
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    displayRecipes();
});

function displayRecipes(filter = "All") {
    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.innerHTML = "";
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes = filter === "All" ? recipes : recipes.filter(r => r.category === filter);
    
    recipes.forEach(recipe => {
        const div = document.createElement("div");
        div.className = "recipe-card";
        div.innerHTML = `<h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>`;
        recipeContainer.appendChild(div);
    });
}

document.getElementById("filter").addEventListener("change", function() {
    displayRecipes(this.value);
});

document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

displayRecipes();