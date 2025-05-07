export class ProductFormView {
    constructor() {
        this.container = document.getElementById('container');
        this.render();
    }
    render() {
        const html = ` <h2 class="pb-2">Add New Product</h2> 
            <form id="productForm" novalidate>
                <div class="border p-2 rounded my-2">
                    <h4>Product Information</h4>
                    <div class="d-flex justify-content-around align-items-center flex-wrap">
                        <div class="col-10 col-md-5">
                            <label for="pName" class="mb-2">Product Name</label>
                            <input type="text" class="form-control" id="pName" name="productName" placeholder="Enter product name here" required>
                            <div class="invalid-feedback">Product Name is required.</div>
                        </div>
                        <div class="col-10 col-md-5 mb-3">
                            <label for="description" class="mb-2">Product Description</label>
                            <textarea id="description" name="description" rows="3" placeholder="Type your product description here..." class="rounded form-control" required></textarea>
                            <div class="invalid-feedback">Product Description is required.</div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around align-items-center flex-wrap mb-4">
                        <div class="col-10 col-md-5">
                            <label for="category" class="mb-2">Product Category</label>
                            <select id="category" class="rounded form-control" name="productCategory" required>
                                <option value="">Select your Category</option>
                                <option value="living">Living Room</option>
                                <option value="bedroom">Bedroom</option>
                                <option value="kitchen">Kitchen</option>
                                <option value="Bathroom">Bathroom</option>
                            </select>
                            <div class="invalid-feedback">Category is required.</div>
                        </div>
                        <div class="col-10 col-md-5 mb-2">
                          <div class="custom-upload mb-2">
  <button type="button" id="uploadTrigger" class="btn  btn-dark text-white">Upload Images</button>
  <input type="file" id="imageUpload" accept="image/*" multiple style="display: none;">
</div>
<div id="previewContainer" class="d-flex gap-2 flex-wrap mt-2"></div>
                            <div class="invalid-feedback">Product Images is required.</div>
                        </div>
                    </div>
                </div>
                <div class="border rounded p-2 my-2">
    <h4 class="mt-2">Product Management</h4>
    <div class="d-flex justify-content-around align-items-center flex-wrap">
        <div class="col-10 col-md-5">
            <label for="pPrice" class="mb-2">Product Price</label>
            <input type="number" class="form-control" id="pPrice" name="productPrice" placeholder="Enter product price here" required min="1" step='0.1'>
            <div class="invalid-feedback">Product Price is required.</div>
        </div>
        <div class="col-10 col-md-5">
            <label for="pStock" class="mb-2">Product Stock</label>
            <input type="number" class="form-control" id="pStock" name="productStock" placeholder="Enter product stock here" required min="1" >
            <div class="invalid-feedback">Product Stock is required.</div>
        </div>
    </div>
    <div class="d-flex justify-content-around align-items-center flex-wrap my-4">
        <div class="col-10 col-md-5">
            <label for="pMeasurement" class="mb-2">Product Measurement</label>
            <input type="text" class="form-control" id="pMeasurement" name="productMeasurement" placeholder="Enter product measurement here" required>
            <div class="invalid-feedback">Product Measurement is required.</div>
        </div>
        <div class="col-10 col-md-5">
            <label for="pDiscount" class="mb-2">Discount (%)</label>
            <input type="number" class="form-control" id="pDiscount" name="productDiscount" placeholder="Enter discount percentage" min="0" max="100">
            <div class="invalid-feedback">Discount must be between 0 and 100.</div>
        </div>
    </div>
</div>
<div class="text-center mt-2">
    <button type="submit" class="btn btn-dark">Add Product</button>
</div>
</form>`;
        this.container.innerHTML = html;
        this.form = document.getElementById('productForm');
        // this.feedback = document.getElementById('feedback');


        const imageInput = document.getElementById('imageUpload');
const triggerButton = document.getElementById('uploadTrigger');
const previewContainer = document.getElementById('previewContainer');

// Hidden input to store base64 images
const hiddenInput = document.createElement('input');
hiddenInput.type = 'hidden';
hiddenInput.name = 'imagesBase64';
this.form.appendChild(hiddenInput);

// Trigger hidden file input
triggerButton.addEventListener('click', () => {
    imageInput.click();
});

// Handle image selection and preview
imageInput.addEventListener('change', function () {
    const files = Array.from(imageInput.files);
    previewContainer.innerHTML = ''; // clear previous previews
    const base64Images = [];

    const readers = files.map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                base64Images.push(e.target.result);

                // Create preview image
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

    Promise.all(readers).then(() => {
        hiddenInput.value = JSON.stringify(base64Images);
    });
});

    }


        bindSubmit(handler) {
            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(this.form);
                handler(this.form, formData);
            });
        }
        resetForm() {
            this.form.reset();
            this.form.classList.remove('was-validated');
        }

    }
