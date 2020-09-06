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
            let newMaterial = new Material(material, material.attributes)
            //creating new instance of material class, goes to constructor and gets pushed into an array
            document.querySelector('#material-container').innerHTML += newMaterial.renderMaterialCard()
        })
        // want to create category cards, where each resource populates in each category card once added //
    })
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
        let newMaterial = new Material(materialData, materialData.attributes)
        
        document.querySelector('#material-container').innerHTML += newMaterial.renderMaterialCard()
    })

    //patch or delete request
    
}