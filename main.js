const d = document

//! Petición con fetch para traer todos los productos
async function getProducts() {
    let data = await fetch('https://bsale-apib.herokuapp.com/')
    let dataJSON = await data.json()
    let dataArray = await dataJSON.products
    return dataArray
}

//! Petición con fectch para traer todas las categorías

async function getCategories() {
    await fetch('https://bsale-apib.herokuapp.com/categories')
        .then(res => res.json())
        .then(data => renderSelectCategories(data.categories))
}


//! Petición con fectch para traer el detalle de cada producto a traves de su id
async function getProductsByCategory(id) {
    let data = await fetch(`https://bsale-apib.herokuapp.com/?category=${id}`)
    let dataJSON = await data.json()
    let dataArray = await dataJSON.products
    d.getElementById('cards-container').innerHTML = ""
    renderProducts(dataArray)
}

//! Petición con fectch para la búsqueda de productos a traves de su nombre
async function searchProducts(name) {
    let data = await fetch(`https://bsale-apib.herokuapp.com/?name=${name}`)
    let dataJSON = await data.json()
    let dataArray = await dataJSON.products
    return dataArray
}

//! Función encargada del renderizado de categorias en el select
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

//! Función encargada de renderizar los productos a través de la barra de búsqueda de manera dinámica
function renderSearchProducts() {
    d.getElementById('input-search').addEventListener('keyup', async (e) => {
        let products = await searchProducts(e.target.value)
        d.getElementById('cards-container').innerHTML = ""
        renderProducts(products)
    })
}

//! Función encargada de renderizar los productos
function renderProducts(products) {
        for (let i = 0; i < products.length; i++) {
            //! Creación de nodos para luego insertarlos en el DOM
            const productName = d.createElement('h3')
            productName.textContent = products[i].name

            const productImg = d.createElement('img')
            productImg.src = products[i].url_image

            const productPrice = d.createElement('p')
            productPrice.textContent = "$" + products[i].price

            const divContainer = d.getElementById('cards-container')

            const cardContainer = d.createElement('div')
            
            //! Agregado de nodos a sus respectivos padres
            cardContainer.className = 'product-card'
            cardContainer.appendChild(productName)
            cardContainer.appendChild(productImg)
            cardContainer.appendChild(productPrice)
            divContainer.appendChild(cardContainer)
        }
}


//! Función inicializadora
async function init() {
    let allProducts = await getProducts()
    renderProducts(allProducts)
    await getCategories()
    renderSearchProducts()
}

init()

