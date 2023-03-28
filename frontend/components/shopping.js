const shoppingTableBodyElement = document.getElementById('shopping-table-body')
const shoppingListDevElement = document.getElementById('shopping-list-dev')
const shoppingItemNameInputElement = document.getElementById('shopping-item-name-input')
const shoppingItemAddButtonElement = document.getElementById('shopping-item-add-button')

async function loadShoppingList() {
    // const response = await fetch('http://localhost:8080/api/shopping')
    const response = await fetch('https://home-h0r102.vercel.app/api/shopping')
    const responseBody = await response.json()
    const shoppingList = responseBody.shoppingList

    while (shoppingTableBodyElement.firstChild) {
        shoppingTableBodyElement.removeChild(shoppingTableBodyElement.firstChild)
    }

    while (shoppingListDevElement.firstChild) {
        shoppingListDevElement.removeChild(shoppingListDevElement.firstChild)
    }

    shoppingList.forEach((shoppingItem) => {
        // old
        const nameTdElement = document.createElement('td')
        nameTdElement.innerText = shoppingItem.name

        const createdAtTdElement = document.createElement('td')
        createdAtTdElement.innerText = shoppingItem.createdAt

        const trElement = document.createElement('tr')
        trElement.appendChild(nameTdElement)
        trElement.appendChild(createdAtTdElement)

        shoppingTableBodyElement.appendChild(trElement)

        // new 
        const inputElement = document.createElement('input')
        inputElement.type = "checkbox"
        inputElement.classList.add("shopping-item-checkbox")
        inputElement.id = shoppingItem.name
        const labelElement = document.createElement('label')
        labelElement.innerText = shoppingItem.name
        labelElement.classList.add("shopping-item-label")
        labelElement.htmlFor = shoppingItem.name
        const devElement = document.createElement('dev')
        devElement.appendChild(inputElement)
        devElement.appendChild(labelElement)
        shoppingListDevElement.appendChild(devElement)

    })
    console.log(responseBody)
}

async function registerShoppingItem() {
    const name = shoppingItemNameInputElement.value

    const requestBody = {
        name: name
    }

    await fetch('https://home-h0r102.vercel.app/api/shopping', {
        method: 'POST',
        body: JSON.stringify(requestBody)
    })

    await loadShoppingList()

    shoppingItemNameInputElement.value = ""
}

async function main() {
    shoppingItemNameInputElement.addEventListener('input', (event) => {
        const inputValue = event.target.value
        const isInvalidInput = inputValue.length < 1 || 30 < inputValue.length
        shoppingItemAddButtonElement.disabled = isInvalidInput
    })

    shoppingItemAddButtonElement.addEventListener('click', registerShoppingItem)
    await loadShoppingList()
}

main()
