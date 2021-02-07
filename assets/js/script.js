document.getElementById('search-button').addEventListener('click', () => {
    const mealInput = document.getElementById('food-name').value;
    createMealLink(mealInput);
})

const createMealLink = mealName => {
    const createUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    fetch(createUrl)
        .then(res => res.json())
        .then(data => getFoodNames(data.meals))
}

    

const getFoodNames = foodsArray => {
    const foodContainer = document.getElementById('food-container');
    
    if (foodsArray === null) {
        const unKnownFood = `
            <h1 class="unknown">UnKnown Food Name</h1>
        `;
        foodContainer.innerHTML = unKnownFood;
    } else {
        foodsArray.forEach(food => {
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food-content';
    
            const foodInfo = `
                <img onclick="displayFoodDetail('${food.strMeal}')" class="food-img" src="${food.strMealThumb}"/>
                <h3 class="food-title">${food.strMeal}</h3>
            `;
            foodDiv.innerHTML = foodInfo;
            foodContainer.appendChild(foodDiv);
        });
    }

    document.getElementById('food-name').value = '';
}

const displayFoodDetail = foodName => {
    const detailUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

    fetch(detailUrl)
        .then(response => response.json())
        .then(data => {
            const dataFind = data.meals;
            const detailDiv = document.createElement('div');
            const foodDetails = document.getElementById('food-details');
           
            const foodDetailsInfo = `
                <img class="detail-img" src="${dataFind[0].strMealThumb}"/>
                <h3 class="detail-title" >${dataFind[0].strMeal}</h3>
                <h5 class="detail-sub">Ingredients</h5>
                <ul class="ingredients">
                    <li>${dataFind[0].strIngredient1}</li>
                    <li>${dataFind[0].strIngredient2}</li>
                    <li>${dataFind[0].strIngredient3}</li>
                    <li>${dataFind[0].strIngredient4}</li>
                    <li>${dataFind[0].strIngredient5}</li>
                    <li>${dataFind[0].strIngredient6}</li>
                </ul>
            `;
            detailDiv.innerHTML = foodDetailsInfo;
            foodDetails.appendChild(detailDiv);
        })
}