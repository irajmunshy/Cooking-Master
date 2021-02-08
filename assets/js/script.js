document.getElementById('search-button').addEventListener('click', () => {
    const foodInput = document.getElementById('food-name').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodInput}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayFoods(data.meals))
})


const displayFoods = foods => {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerText = '';

    const foodContent = document.createElement('div');
    foodContent.className = 'food-content';

    if (foods === null) {
        const unKnownName = `
            <h1 class="unknown">Sorry!</h1>
            <h2 class="unknown">UnKnown Food Name</h2>
        `;

        foodContainer.innerHTML = unKnownName;
    } else {
        foods.forEach(food => {
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food-info';
    
            const foodInfo = `
                    <img onclick="getFoodDetail('${food.strMeal}')" class="food-img" src="${food.strMealThumb}"/>
                    <p class="food-title">${food.strMeal}</p>  
                `;
            foodDiv.innerHTML = foodInfo;
            foodContent.appendChild(foodDiv);
    
        });
        foodContainer.appendChild(foodContent);
    }

    document.getElementById('food-name').value = '';
}


const getFoodDetail = foodName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayDetail(data.meals[0]))
}


const displayDetail = detail => {
    const foodDetails = document.getElementById('food-details');
    foodDetails.innerText = '';

    const detailDiv = document.createElement('div');
    detailDiv.className = 'details-content';

    const foodDetailsInfo = `
            <img class="detail-img" src="${detail.strMealThumb}"/>
            
            <div class="details-info">
                <h3 class="detail-title" >${detail.strMeal}</h3>
                <h5 class="detail-sub">Ingredients</h5>
                <ul id="ingredients" class="ingredients"></ul>
            </div>
        `;
    detailDiv.innerHTML = foodDetailsInfo;
    foodDetails.appendChild(detailDiv);

    const ingredientName = document.getElementById('ingredients');
    for (let i = 1; i <= 20; i++) {
        if (detail[`strIngredient${i}`] === "") {
            break;
        } else {
            const li = document.createElement('li');
            li.innerText = detail[`strIngredient${i}`]; 
            ingredientName.appendChild(li);
        }
    }
}




