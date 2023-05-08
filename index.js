import { menuArray } from "./data.js";
console.log(menuArray);

const menuContainer = document.getElementById("menu-container")
const orderContainer = document.getElementById('order-container')
const orderItems = document.getElementById('order-items');
const closeFormBtn = document.getElementById('close-form-btn')
const orderForm = document.getElementById('pay-form');
const totalPrice = document.getElementById('total-price');

menuArray.forEach((meal) => {
    menuContainer.innerHTML +=
        `
    <div class="meal">
        <div class="meal-inner">
            <p class="meal-emoji">${meal.emoji}</p>
            <div>
                <p class="meal-name">${meal.name}</p>
                <p class="meal-ingredients">${meal.ingredients}</p>
                <p class="meal-price">$${meal.price}</p>
            </div>
        <div class="meal-details">
            <button class="btn-add" data-add="${meal.id}">+</button>
        </div>
        </div>
    </div>
    `
})


document.addEventListener('click', function (e) {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeFromOrder(e.target.dataset.remove)
    } else if (e.target.id == 'btn-complete') {
        orderForm.style.display = 'block';
    }
})

function handleAddClick(itemId) {
    menuArray[itemId].quantity += 1;
    renderOrder()
}

function removeFromOrder(itemId) {
    menuArray[itemId].quantity -= 1;
    renderOrder()

}

function renderOrder() {
    let totalCost = 0;
    orderItems.innerHTML = ``;
    menuArray.forEach((item) => {
        if (item.quantity > 0) {
            totalCost += item.price * item.quantity
            orderItems.innerHTML +=
                `
                    <div class="order-item">
                        <div class="order-item-info">
                            <p>${item.quantity}</p>
                            <h3>${item.name}</h3>
                            <button data-remove="${item.id}">-</button>
                        </div>
                        <h3 class="item-price">£${item.quantity * item.price}</p>
                    </div>  
                `
        }
        if (totalCost == 0) {
            orderContainer.style.display = 'none';
        } else {
            orderContainer.style.display = 'block';
            totalPrice.innerHTML = `£${totalCost}`;
        }

    })
}

closeFormBtn.addEventListener('click', function(){
    orderForm.style.display = 'none'
})



// javascript