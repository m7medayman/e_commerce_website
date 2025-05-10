export class EditProductView {
    constructor() {
        this.container = document.getElementById('container');

    }

    render(product) {
        if (!product) {
            this.container.innerHTML = '<p>Error: Product not found.</p>';
            return;
        }

        const form = `
        <h3 class='my-3 text-center'>Edit Product</h3>
            <form id="editProductForm">
                <div class="d-flex justify-content-around align-items-center mb-3 flex-wrap">
                    <div class="col-10 col-md-5">
                        <label for="name" class="form-label">Product Name</label>
                        <input type="text" class="form-control" id="name" value="${product.name}" required>
                    </div>
                    <div class="col-10 col-md-5">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" required>${product.description}</textarea>
                    </div>
                </div>
                <div class="d-flex justify-content-around align-items-center mb-3 flex-wrap">
                    <div class="col-10 col-md-5">
                        <label for="price" class="form-label">Price</label>
                        <input type="number" class="form-control" id="price" min="0.01" step="0.01" value="${product.price}" required>
                    </div>
                    <div class="col-10 col-md-5">
                        <label for="stock" class="form-label">Stock</label>
                        <input type="number" class="form-control" id="stock" value="${product.stock}" required>
                    </div>
                </div>
                <div class="d-flex justify-content-around align-items-center mb-3 flex-wrap">
                    <div class="col-10 col-md-5">
                        <label for="category" class="form-label">Category</label>
                        <input type="text" class="form-control" id="category" value="${product.category}" required>
                    </div>
                    <div class="col-10 col-md-5">
                        <label for="discount" class="form-label">Discount (%)</label>
                        <input type="number" class="form-control" id="discount" min="0" max="100" value="${product.discount}">
                    </div>
                </div>
                <div class="d-flex justify-content-around align-items-center mb-3 flex-wrap">
                    <div class="col-10 col-md-5">
                        <label class="form-label">Existing Images</label>
    <div id="existingImages" class="d-flex gap-2 flex-wrap mb-2">
    <img src="${product.detailedImages[0]}" width="100" class="rounded border">
    </div>

    <label for="imageUpload" class="form-label">Upload New Images</label><br>
    <button type="button" id="uploadTrigger" class="btn btn-dark mb-2">Upload Images</button>
    <input type="file" id="imageUpload" accept="image/*" multiple style="display: none;">
    <div id="previewContainer" class="d-flex gap-2 flex-wrap"></div></div>
                    <div class="col-10 col-md-5">
                        <label for="measurement" class="form-label">Measurement</label>
                        <input type="text" class="form-control" id="measurement" value="${product.measurement
            }" required>
                    </div>
                </div>
                <div class="d-flex justify-content-around align-items-center my-5">
                    <button type="submit" class="btn btn-dark">Save Changes</button>
                    <a href="index.html" class="btn btn-danger">Cancel</a>
                </div>
            </form>`;
        this.container.innerHTML = form;
        const imageInput = document.getElementById('imageUpload');
        const previewContainer = document.getElementById('previewContainer');
        const triggerBtn = document.getElementById('uploadTrigger');

        // Create a hidden input to hold new images (base64)
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'newImagesBase64';
        hiddenInput.id = 'newImagesBase64';
        document.getElementById('editProductForm').appendChild(hiddenInput);

        triggerBtn.addEventListener('click', () => {
            imageInput.click();
        });

        imageInput.addEventListener('change', () => {
            const files = Array.from(imageInput.files);
            if (files.length === 0) {
                //keep existing images
                return;
            }
            previewContainer.innerHTML = '';
            const base64Images = [];

            const promises = files.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        base64Images.push(e.target.result);

                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.width = 100;
                        img.classList.add('rounded', 'border');
                        previewContainer.appendChild(img);

                        resolve();
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then(() => {
                hiddenInput.value = JSON.stringify(base64Images);
            });
        });

    }
}