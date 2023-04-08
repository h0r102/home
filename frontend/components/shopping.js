const shoppingListDevElement = document.getElementById('shopping-list-dev')
const shoppingItemNameInputElement = document.getElementById('shopping-item-name-input')
const shoppingItemAddButtonElement = document.getElementById('shopping-item-add-button')
const bDeleteCheckedItems = document.getElementById('delete-checked-items')
const bSetAllItemsChecked = document.getElementById('set-all-items-checked')
const bUnsetAllItemsChecked = document.getElementById('unset-all-items-checked')

async function loadShoppingList() {
    const response = await fetch(`${API_ROOT}/shopping`)
    const shoppingList = await response.json()

    while (shoppingListDevElement.firstChild) {
        shoppingListDevElement.removeChild(shoppingListDevElement.firstChild)
    }

    shoppingList.forEach((shoppingItem) => {
        const inputElement = document.createElement('input')
        inputElement.type = "checkbox"
        inputElement.classList.add("shopping-item-checkbox")
        const labelElement = document.createElement('label')
        labelElement.innerText = shoppingItem.name
        labelElement.classList.add("shopping-item-label")
        labelElement.htmlFor = shoppingItem.name
        const devElement = document.createElement('dev')
        devElement.classList.add('shopping-item')
        devElement.id = shoppingItem._id
        devElement.appendChild(inputElement)
        devElement.appendChild(labelElement)
        shoppingListDevElement.appendChild(devElement)
    })
}

async function registerShoppingItem() {
    const name = shoppingItemNameInputElement.value

    const requestBody = {
        name: name
    }

    console.log(JSON.stringify(requestBody))
    await fetch(`${API_ROOT}/shopping/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => console.log(response))
        .then(data => console.log(data))

    await loadShoppingList()

    shoppingItemNameInputElement.value = ""
}


async function deleteShoppingItems() {
    const ids = getCheckedShoppingItems()
    const requestBody = {
        ids: ids
    }
    console.log(JSON.stringify(requestBody))
    await fetch(`${API_ROOT}/shopping/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => console.log(response))
        .then(data => console.log(data))

    await loadShoppingList()
}

function getCheckedShoppingItems() {
    let ids = []
    const checkboxes = document.getElementsByClassName('shopping-item-checkbox')
    Array.prototype.forEach.call(checkboxes, (checkbox) => {
        if (checkbox.checked) {
            const shoppingItemElement = checkbox.parentElement
            const id = shoppingItemElement.id
            ids.push(id)
        }
    });
    return ids
}

async function setAllShoppingItemsChecked() {
    let ids = []
    const checkboxes = document.getElementsByClassName('shopping-item-checkbox')
    Array.prototype.forEach.call(checkboxes, (checkbox) => {
        checkbox.checked = true
    });
}

async function unsetAllShoppingItemsChecked() {
    let ids = []
    const checkboxes = document.getElementsByClassName('shopping-item-checkbox')
    Array.prototype.forEach.call(checkboxes, (checkbox) => {
        checkbox.checked = false
    });
}

async function main() {
    shoppingItemNameInputElement.addEventListener('input', (event) => {
        const inputValue = event.target.value
        const isInvalidInput = inputValue.length < 1 || 30 < inputValue.length
        shoppingItemAddButtonElement.disabled = isInvalidInput
    })

    shoppingItemAddButtonElement.addEventListener('click', registerShoppingItem)
    bDeleteCheckedItems.addEventListener('click', deleteShoppingItems)
    bSetAllItemsChecked.addEventListener('click', setAllShoppingItemsChecked)
    bUnsetAllItemsChecked.addEventListener('click', unsetAllShoppingItemsChecked)
    await loadShoppingList()
}

main()
