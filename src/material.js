class Material {
    constructor(material, materialAttributes) {
        this.id = material.id
        this.name = materialAttributes.name
        this.description = materialAttributes.description
        this.url = materialAttributes.url
        this.category = materialAttributes.category
        Material.all.push(this)
    }

    renderMaterialCard() {
        return `
            <div data-id=${this.id}>
            <h3>${this.name}</h3>
            <p>${this.description}</p>
            <p><small><a href="${this.url}">${this.url}</a></small></p>
            <p>${this.category.title}</p>
            <button data-id=${this.id}>edit</button>
            </div>
            <br><br>`
    }

}

Material.all = []