// Write your code here...
document.addEventListener("DOMContentLoaded",() => {
    const itemInCart = document.querySelector("#number-in-cart")
    const dish = document.querySelector("#dish")
    const total = document.createElement("div")
    total.textContent = 0
    dish.appendChild(total)

    let currentId = 1
    let allData = []
    fetch("http://localhost:3000/menu")
    .then(r => r.json())
    .then(data => {
        allData = data
        menuList()
        populateMenu(data[0])
    })

    function menuList(){
        const menu = document.querySelector("#menu-items")
        menu.innerHTML = ""
        allData.forEach((menuItem)=>{
            // console.log(menuItem)
            const span = document.createElement("span")
            span.textContent = menuItem.name
            menu.appendChild(span)
            span.addEventListener("click",()=>{
                populateMenu(menuItem)
                currentId = menuItem.id
            })
        })
        // console.log(menu)
    }
    function populateMenu(menuItem){
        // const dish = document.querySelector("#dish")
        const image = document.querySelector("#dish-image")
        const name = document.querySelector("#dish-name")
        const description = document.querySelector("#dish-description")
        const price = document.querySelector("#dish-price")
        // const total = document.createElement("div")
        total.textContent = menuItem.number_in_bag*menuItem.price
        // dish.appendChild(total)
        name.textContent = menuItem.name
        description.textContent = menuItem.description
        price.textContent = menuItem.price
        image.src = menuItem.image
        itemInCart.textContent = menuItem.number_in_bag

    }

    const cartForm = document.querySelector("#cart-form")
    cartForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        console.log(event.target["cart-amount"].value)
        let textInt = parseInt(itemInCart.textContent)
        textInt += parseInt(event.target["cart-amount"].value)
        // itemInCart.textContent = parseInt(itemInCart.textContent)+parseInt(event.target["cart-amount"].value)
        itemInCart.textContent = textInt
        fetch(`http://localhost:3000/menu/${currentId}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({number_in_bag:textInt})
        })
        .then(r=>r.json())
        .then(data=>{
            allData[currentId-1] = data
            total.textContent = data.price * data.number_in_bag
            menuList()
        })
    })


})