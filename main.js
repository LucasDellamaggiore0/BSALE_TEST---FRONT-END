const d = document

//! Llamado con fetch para traer todos los productos
async function getProducts() {
    let data = await fetch('https://bsale-apib.herokuapp.com/')
    let dataJSON = await data.json()
    let dataArray = await dataJSON.products
    return dataArray
}

//! Llamado con fectch para traer todas las categorías

async function getCategories() {
    await fetch('https://bsale-apib.herokuapp.com/categories')
        .then(res => res.json())
        .then(data => renderSelectCategories(data.categories))
}

async function getProductsByCategory(id) {
    let data = await fetch(`https://bsale-apib.herokuapp.com/?category=${id}`)
    let dataJSON = await data.json()
    let dataArray = await dataJSON.products
    // return dataArray
    d.getElementById('cards-container').innerHTML = ""
    renderProducts(dataArray)
}

async function searchProducts(name) {
    let data = await fetch(`https://bsale-apib.herokuapp.com/?name=${name}`)
    let dataJSON = await data.json()
    let dataArray = await dataJSON.products
    return dataArray
}


async function renderSelectCategories(categories) {
    const selectCategories = d.getElementById('categories')
    const allProducts = await getProducts()
    for (let i = 0; i < categories.length; i++) {
        const categorySelect = d.createElement('option')
        categorySelect.id = categories[i].id
        categorySelect.value = categories[i].id
        categorySelect.textContent = categories[i].name
        selectCategories.appendChild(categorySelect)
    }
    selectCategories.addEventListener('change', (event) => {
        if (event.target.value === 'all') {
            d.getElementById('cards-container').innerHTML = ""
            renderProducts(allProducts)
        } else {
            getProductsByCategory(event.target.value)
        }
    })
}

function renderSearchProducts() {
    d.getElementById('input-search').addEventListener('keyup', async (e) => {
        let products = await searchProducts(e.target.value)
        d.getElementById('cards-container').innerHTML = ""
        renderProducts(products)
    })
}

function renderProducts(products) {
    for (let i = 0; i < products.length; i++) {
        const productName = d.createElement('h3')
        productName.textContent = products[i].name

        const productImg = d.createElement('img')
        productImg.src = products[i].url_image

        const productPrice = d.createElement('p')
        productPrice.textContent = "$" + products[i].price

        const divContainer = d.getElementById('cards-container')


        const cardContainer = d.createElement('div')
        cardContainer.className = 'product-card'
        cardContainer.appendChild(productName)
        cardContainer.appendChild(productImg)
        cardContainer.appendChild(productPrice)
        divContainer.appendChild(cardContainer)
    }

}

//! Renderizado de productos en el front

async function init() {
    let allProducts = await getProducts()
    renderProducts(allProducts)
    await getCategories()
    // const inputSearch = d.getElementById('input-search')
    // inputSearch.addEventListener('change',async (e) => {
    //     e.preventDefault()
    //     let inputContent = e.target.value
    //     let data = await searchProducts(inputContent)
    //     d.getElementById('cards-container').innerHTML = ""
    //     renderProducts(data)
    //     // console.log(inputContent)
    // })
    renderSearchProducts()
}

init()

