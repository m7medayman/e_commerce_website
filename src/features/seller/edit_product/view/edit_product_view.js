export class EditProductView {
    constructor() {
        this.container = document.getElementById('edit_product');
       
    }

    render(product) {
        if (!product) {
            this.container.innerHTML = '<p>Error: Product not found.</p>';
            return;
        }

        const form = `
            <form id="editProductForm">
                <div class="d-flex justify-content-around align-items-center mb-2 flex-wrap">
                    <div class="col-10 col-md-5">
                        <label for="name" class="form-label">Product Name</label>
                        <input type="text" class="form-control" id="name" value="${product.name}" required>
                    </div>
                    <div class="col-10 col-md-5">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" required>${product.description}</textarea>
                    </div>
                </div>
                <div class="d-flex justify-content-around align-items-center mb-2 flex-wrap">
                    <div class="col-10 col-md-5">
                        <label for="price" class="form-label">Price</label>
                        <input type="number" class="form-control" id="price" min="0.01" step="0.01" value="${product.price}" required>
                    </div>
                    <div class="col-10 col-md-5">
                        <label for="stock" class="form-label">Stock</label>
                        <input type="number" class="form-control" id="stock" value="${product.stock}" required>
                    </div>
                </div>
                <div class="d-flex justify-content-around align-items-center mb-2 flex-wrap">
                    <div class="col-10 col-md-5">
                        <label for="category" class="form-label">Category</label>
                        <input type="text" class="form-control" id="category" value="${product.category}" required>
                    </div>
                    <div class="col-10 col-md-5">
                        <label for="discount" class="form-label">Discount (%)</label>
                        <input type="number" class="form-control" id="discount" min="0" max="100" value="${product.discount}">
                    </div>
                </div>
                <div class="d-flex justify-content-around align-items-center mb-2 flex-wrap">
                    <div class="col-10 col-md-5">
                        <label for="image" class="form-label">Image URL</label>
                        <input type="url" class="form-control" id="image" value="${product.detailedImages[0] }" required">
                    </div>
                    <div class="col-10 col-md-5">
                        <label for="measuarment" class="form-label">Measurement</label>
                        <input type="text" class="form-control" id="measuarment" value="${product.measuarment
                            }" required>
                    </div>
                </div>
                <div class="d-flex justify-content-around align-items-center my-3">
                    <button type="submit" class="btn btn-dark">Save Changes</button>
                    <a href="index.html" class="btn btn-danger">Cancel</a>
                </div>
            </form>`;
        this.container.innerHTML = form;
    }
}