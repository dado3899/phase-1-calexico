// Challenge #1
// Fetch menu items http://localhost:3000/menu. 
const cart = document.querySelector("#number-in-cart")

fetch("http://localhost:3000/menu")
.then(r => r.json())
// for each through menu
.then(menu => {
    console.log(menu)
    menu.forEach((item)=>{
        addToMenu(item)
    })
    // When the page loads, display the first menu item. 
    displayMenuItem(menu[0])
})

// create span element with name
function addToMenu(item){
    const span = document.createElement("span")
    const menu_items = document.querySelector("#menu-items")
    span.textContent = item.name
    // append it to the #menu-items div.
    menu_items.append(span)
    // Challenge #3
    // When the user clicks on the menu items on the left, 
    // Add click event listener to menu-items
    span.addEventListener("click", ()=>{
        displayMenuItem(item)
    })
}


// Challenge #2
function displayMenuItem(item){
// Query Select image, name, description, and price. (in #dish)
    const image = document.querySelector("#dish-image")
    const name = document.querySelector("#dish-name")
    const description = document.querySelector("#dish-description")
    const price = document.querySelector("#dish-price")
    // const cart = document.querySelector("#number-in-cart")
// set the contents to the meny item
    image.src = item.image
    name.textContent = item.name
    description.textContent = item.description
    price.textContent = item.price
    cart.textContent = item.number_in_bag
    
}



// Challenge #4 (NO PERSISTANCE)
// The user should be able to add the menu items to their cart.
// Form to add to cart
// Do some math and add item to number in cart 
const form = document.querySelector("#cart-form")
form.addEventListener('submit',(e)=>submitHandler(e))
function submitHandler(e){
    e.preventDefault()
    cart.textContent = parseInt(cart.textContent) + parseInt(e.target["cart-amount"].value)
}