const materialIndex = "http://localhost:3000/api/v1/materials"
const categoryIndex = "http://localhost:3000/api/v1/categories"

document.addEventListener('DOMContentLoaded', () => {
    getMaterials()

    const createMaterialForm = document.querySelector("#create-material-form")

    createMaterialForm.addEventListener("submit", (e) => createFormHandler(e))



})

function getMaterials() {
    fetch(materialIndex) //get request
    .then(response => response.json())
    .then(materials => {
        materials.data.forEach(material => {

            let newMaterial = new Material(material)
            //creating new instance of material class

            render(material)
        })
        // want to create category cards, where each resource populates in each category card once added //
    })
}

function render(material) {
    const materialMarkup = `
    <div data-id=${material.id}>
        <h3>${material.attributes.name}</h3>
        <p>${material.attributes.description}</p>
        <p><small><a href="${material.attributes.url}">${material.attributes.url}</a></small></p>
        <p>${material.attributes.category.title}</p>
        <button data-id=${material.id}>edit</button>
    </div>
    <br><br>`
    document.querySelector('#material-container').innerHTML += materialMarkup
}

function createFormHandler(e) { //grabs all values of materials submitted by user
    e.preventDefault()
    const nameInput = document.querySelector('#input-name').value
    const descriptionInput = document.querySelector('#input-description').value
    const urlInput = document.querySelector('#input-url').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetch(nameInput, descriptionInput, urlInput, categoryId)
}

function postFetch(name, description, url, category_id) {
    const bodyData = {name, description, url, category_id}
    fetch(materialIndex, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(material => {
        const materialData = material.data
        const materialMarkup = `
        <div data-id=${material.id}>
            <h3>${materialData.attributes.name}</h3>
            <p>${materialData.attributes.description}</p>
            <p><small><a href="${materialData.attributes.url}">${materialData.attributes.url}</a></small></p>
            <p>${materialData.attributes.category.title}</p>
            <button data-id=${material.id}>edit</button>
        </div>
        <br><br>`
        document.querySelector('#material-container').innerHTML += materialMarkup
    })

    //patch or delete request
    
}