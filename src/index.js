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
        })
        // want to create category cards, where each resource populates in each category card once added //
    })
}

function createFormHandler(e) { //grabs all values of materials submitted by user
    e.preventDefault()
    const nameInput = document.querySelector('#input-name').value
    const descriptionInput = document.querySelector('#input-description').value
    const urlInput = document.querySelector('#input-url').value
    const categoryTitle = document.querySelector('#categories').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetch(nameInput, descriptionInput, urlInput, categoryTitle, categoryId)
}

function postFetch(name, description, url, title, category_id) {
    console.log(name, description, url, title, category_id)
    const bodyData = {name, description, url, title, category_id}
    // i don't think i have access to the category name here, but i don't really need it?
    // I also don't have access to the data or attributes array/object
    fetch(materialIndex, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(material => {
        console.log(material)
        const materialMarkup = `
        <div data-id=${material.id}>
            <h3>${material.name}</h3>
            <p>${material.description}</p>
            <p><small><a href="${material.url}">${material.url}</a></small></p>
            <button data-id=${material.id}>edit</button>
        </div>
        <br><br>`
        document.querySelector('#material-container').innerHTML += materialMarkup
    })

    //patch or delete request
    
}