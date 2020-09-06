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

    static findById(id) {
        return this.all.find(material => material.id === id)
    }


    renderPatchForm() {
        return `
            <form data-id=${this.id} >
                <h3>Edit the Resource</h3>

                <label>Name</label>
                <input id='input-name' type="text" name="name" value="${this.name}" class="input-name">
                <br><br>

                <label>Description</label>
                <textarea id='input-description' name="description" rows="8" cols="80" value="">${this.description}</textarea>
                <br><br>

                <label>URL</label>
                <input id='input-url' type="text" name="url" value="${this.url}" class="input-text">
                <br><br>

                <label>Category</label>
                <select id="categories" name="categories" value="${this.category.name}">
                    <option value="1">Criminal Justice Reform</option>
                    <option value="2">Bail Funds</option>
                    <option value="3">Clothing</option>
                    <option value="4">Organizations</option>
                    <option value="5">Mutual Aid</option>
                    <option value="6">Fundraisers</option>
                    <option value="7">Petitions</option>
                    <option value="8">Articles</option>
                    <option value="9">Artists</option>
                    <option value="10">Instagram</option>
                </select>
                <br><br>

                <input id='edit-button' type="submit" name="submit" value="Edit Syllabus" class="submit">
            </form> `
  }
}

Material.all = []