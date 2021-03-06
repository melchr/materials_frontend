const materialIndex = "http://localhost:3000/api/v1/materials"
const categoryIndex = "http://localhost:3000/api/v1/categories"

document.addEventListener('DOMContentLoaded', () => {
    getMaterials()

})

    const createMaterialForm = document.querySelector("#create-material-form")
    createMaterialForm.addEventListener("submit", (e) => createFormHandler(e))

    const materialContainer = document.querySelector('#material-container')
    materialContainer.addEventListener('click', e => {
        const id = parseInt(e.target.closest('[data-id]').dataset.id)
        const material = Material.findById(id)
        document.querySelector('#edit-material').innerHTML = material.renderPatchForm()
        // delete-button click HAS to be in the material-container click because it is only visible once that material container is clicked.
        // therefore, clicking edit is the only way clicking delete will appear. i cannot have the delete button without rendering the edit form.
        const deleteContainer = document.getElementById("delete-button")
        deleteContainer.addEventListener('click', e => {
            deleteMaterial(id)
        })
        console.log(material)
        document.querySelector('#edit-material').addEventListener('submit', e => updateForm(e))
    })

function getMaterials() {
    fetch(materialIndex) //get request
    .then(response => response.json())
    .then(materials => {
        materials.data.forEach(material => {
            let newMaterial = new Material(material, material.attributes)

            document.querySelector('#material-container').innerHTML += newMaterial.renderMaterialCard()

        })
        // want to create category cards, where each resource populates in each category card once added //
    })
}

function createFormHandler(e) { 
    e.preventDefault()
    const nameInput = document.querySelector('#input-name').value
    const descriptionInput = document.querySelector('#input-description').value
    const urlInput = document.querySelector('#input-url').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetch(nameInput, descriptionInput, urlInput, categoryId)
}

function updateForm(e) {
    e.preventDefault()
    const id = parseInt(e.target.closest('[data-id]').dataset.id)
    const material = Material.findById(id)
    const name = e.target.querySelector('#input-name').value
    const description = e.target.querySelector('#input-description').value
    const url = e.target.querySelector('#input-url').value
    const category_id = parseInt(e.target.querySelector('#categories').value)
    patchMaterial(material, name, description, url, category_id)
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
}

function patchMaterial(material, name, description, url, category_id) {
    const patchJSON = {name, description, url, category_id}
    fetch(`http://localhost:3000/api/v1/materials/${material.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(patchJSON),
    })
    .then(response => response.json())
    .then(material => {console.log(material)
    })
}

function deleteMaterial(id) {
    fetch(`${materialIndex}/${id}`, {
        method: "DELETE"
    })
}