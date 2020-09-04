const materialIndex = "http://localhost:3000/api/v1/materials"

document.addEventListener('DOMContentLoaded', () => {
    getMaterials()
})

function getMaterials() {
    fetch(materialIndex) //get request
    .then(response => response.json())
    .then(materials => {
        materials.data.forEach(material => {
    
            const materialMarkup = `
            <div data-id=${material.id}>
                <h3>${material.attributes.name}</h3>
                <p><small><a href="${material.attributes.url}">${material.attributes.url}</a></small></p>
                <p>${material.attributes.description}</p>
                <button data-id=${material.id}>edit</button>
            </div>
            <br><br>`

            document.querySelector('#material-container').innerHTML += materialMarkup
        })
    })
}