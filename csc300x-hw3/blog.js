document.addEventListener('DOMContentLoaded', function () {
    const restaurants = document.querySelectorAll('.restaurant');

    restaurants.forEach(function (restaurant) {
        const dishes = restaurant.querySelectorAll('.dish');

        dishes.forEach(function (dish) {
            const image = dish.querySelector('img');
            const description = dish.querySelector('.dish-description');

            image.addEventListener('click', function () {
                dishes.forEach(function (d) {
                    d.querySelector('.dish-description').style.display = 'none';
                    d.querySelector('img').style.width = '175px';
                });

                description.style.display = 'block';
                image.style.width = '235px';
            });
        });
    });

    function addToMealPlan(dishName, dishCost) {
        const listItem = document.createElement('li');
        listItem.dataset.cost = dishCost;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = dishName;
        listItem.appendChild(nameSpan);

        const priceSpan = document.createElement('span');
        priceSpan.textContent = ' - $' + dishCost.toFixed(2);
        listItem.appendChild(priceSpan);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', removeFromMealPlan);
        listItem.appendChild(removeButton);

        document.getElementById('meal-list').appendChild(listItem);

        updateTotalCost(dishCost);
    }

    function removeFromMealPlan(event) {
        const listItem = event.target.closest('li');
        const cost = parseFloat(listItem.dataset.cost);
        listItem.remove();
        updateTotalCost(-cost);
    }

    function updateTotalCost(amount = 0) {
        const totalCostElement = document.getElementById('total-cost');
        let totalCost = parseFloat(totalCostElement.textContent.substring(1));
        totalCost += amount;
        totalCostElement.textContent = '$' + totalCost.toFixed(2);
    }

    const dishImages = document.querySelectorAll('#recommendations .dish img');
    dishImages.forEach(function (img) {
        img.addEventListener('click', function () {
            const dishContainer = img.closest('.dish');
            const dishDescription = dishContainer.querySelector('.dish-description').textContent;
            const dishName = dishDescription.split('Price:')[0].trim();
            const pricePart = dishDescription.split('Price:')[1];
            const dishCost = parseFloat(pricePart.split('$')[1].trim());
            addToMealPlan(dishName, dishCost);
        });
    });

    const addAnotherOrderButton = document.getElementById('add-another-order');
    addAnotherOrderButton.addEventListener('click', function () {
        const mealList = document.getElementById('meal-list');
        const clonedItem = mealList.lastElementChild.cloneNode(true);
        mealList.appendChild(clonedItem);
        clonedItem.querySelector('button').addEventListener('click', removeFromMealPlan);
        updateTotalCost(parseFloat(clonedItem.dataset.cost));
    });

});
