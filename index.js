const materialIndex = "http://localhost:3000/api/v1/materials"

document.addEventListener('DOMContentLoaded', () => {
    getMaterials()
})

function getMaterials() {
    fetch(materialIndex)
    .then(response => response.json())
    .then(materials => {
        console.log(materials)
    })
}