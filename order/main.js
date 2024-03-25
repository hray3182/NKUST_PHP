let menu = [
    {
        "name": "奶茶",
        "price": 0,
        "quantity": 0
    },
    {
        "name": "炸雞",
        "price": 0,
        "quantity": 0
    },
    {
        "name": "薯條",
        "price": 0,
        "quantity": 0
    },
]

let menuHtml = ""
menu.forEach((item) => {
    menuHtml += `
    <tr class="item">
        <td class="item-name">${item.name}</td>
        <td><input class="item-price outline-none text-center bg-transparent border-2 rounded-lg mt-1"value=${item.price}></td>
        <td>
            <input class="item-quantity bg-transparent text-center outline-none border-2 rounded-lg"  value="${item.quantity}" min="0" data-name="${item.name}" class="quantity">
        </td>
    </tr>
    `
})

const tbody = document.querySelector("tbody")
tbody.innerHTML = menuHtml



document.addEventListener("DOMContentLoaded", () => {
    const member = document.querySelector("#member")
    const orderDetial = document.querySelector("#order-detial")
    const checkButton = document.querySelector("#checkout")
    let itemsHtml = document.querySelectorAll(".item")
    const addNewItem = document.querySelector("#add-new-item")

    function handleAddNewItemButtonClick(e) {
        e.preventDefault()
        const newItemName = document.querySelector("#new-item").value
        menu.push({
            "name": newItemName,
            "price": 0,
            "quantity": 0
        })
        const newItemHtml = `
        <tr class="item">
            <td class="item-name">${newItemName}</td>
            <td><input class="item-price outline-none text-center bg-transparent border-2 rounded-lg mt-1" value=${0}></td>
            <td>
                <input class="item-quantity bg-transparent text-center outline-none border-2 rounded-lg"  value="${0}" min="0" data-name="${newItemName}" class="quantity">
            </td>
        </tr>
        `

        tbody.innerHTML += newItemHtml
        itemsHtml = document.querySelectorAll(".item")
    }


    function handleCheckoutButtonClick(e) {
        e.preventDefault()
        let total = 0
        let orderDetialHtml = `<p>親愛的顧客，您點的是：</p>`
        itemsHtml.forEach((item) => {
            const name = item.querySelector(".item-name").textContent
            const price = item.querySelector(".item-price").value
            const quantity = item.querySelector(".item-quantity").value
            const index = menu.findIndex((item) => item.name === name)
            menu[index].price = price
            menu[index].quantity = quantity
            
            if (quantity > 0) {
                orderDetialHtml += `<p>${name} ${price}元 x ${quantity}</p>`
            }
        })
        
        
        menu.forEach((item) => {
            total += item.price * item.quantity
        })
        
        if (member.checked) {
            oldTotal = total
            total = (total * 0.8).toFixed(0)
            orderDetialHtml += `<p>會員折扣 8折：${oldTotal}元 -> ${total}元</p>`
            orderDetialHtml += `<p>總金額：${total}元</p>`
        }else {
            
            orderDetialHtml += `<p>總金額：${total}元</p>`
        }
        if (total == 0 ) {
            orderDetialHtml = `<p>您尚未點餐</p>`
        }
        orderDetial.classList.remove("hidden")

        orderDetial.innerHTML = orderDetialHtml
    }



    checkButton.addEventListener("click", (e) => handleCheckoutButtonClick(e))
    addNewItem.addEventListener("click", (e) => handleAddNewItemButtonClick(e))

})

