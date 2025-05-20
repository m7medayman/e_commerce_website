export class ProductsView {
    constructor() {
        this.app = document.getElementById('container');
    }

    render(model, searchTerm = '') {
        const products = model.map((product, index) => {
            return `<tr class="text-center align-middle">
              <th scope="row">${index + 1}</th>
              <td><img src="${product.detailedImages[0]}" alt="${product.name}" width="80px" height="80px" class="rounded"/></td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.stock!=0?product.stock:'Out of Stock'}</td>
              <td>${product.category}</td>
              <td>${product.discount}</td>
              <td><span class="edit-icon" data-id="${product.productId}"><i class="fa-solid fa-pen text-primary"></i></span></td>
              <td><span class="delete-icon" data-id="${product.productId}"><i class="fa-solid fa-trash text-danger"></i></span></td>
          </tr>`;
        }).join('');

        const container = `<table class="table text-center mt-5 table-hover rounded">
          <thead style="border-radius: 10px !important; ">
              <tr class="table-dark text-white">
                  <th scope="col">#</th>
                  <th scope="col"> Image</th>
                  <th scope="col"> Name</th>
                  <th scope="col"> Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Category</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
              </tr>
          </thead>
          <tbody id="products-table-body">
          ${model.length > 0 ? products : `<tr class="text-center no-products"><td colspan="9">There is no products to show it</td></tr>`}
          </tbody>
      </table>`;

        this.app.innerHTML = `
          <div class="d-flex justify-content-around my-3 table-responsive">
             <div class="w-50">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input type="text" id="searchInput" placeholder="Search about product here..."  value='${searchTerm}' class="form-control">
                    </div>
                </div>
              <button class="btn btn-dark" id="add_button">Add New Product</button>
          </div>
          <div id="products">${container}</div>
      `;
        document.getElementById("searchInput").addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = model.filter(product => product.name.toLowerCase().includes(searchTerm));
            this.updateProductsTable(filteredProducts);
        });
    }
    updateProductsTable(filteredProducts) {
        const tableBody = document.getElementById("products-table-body");
        tableBody.innerHTML = filteredProducts.map((product, index) => {
            return `<tr class="text-center align-middle">
              <th scope="row">${index + 1}</th>
              <td><img src="${product.detailedImages[0]}" alt="${product.name}" width="80px" height="80px" class="rounded"/></td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.stock}</td>
              <td>${product.category}</td>
              <td>${product.discount}</td>
              <td><span class="edit-icon" data-id="${product.productId}"><i class="fa-solid fa-pen text-primary"></i></span></td>
              <td><span class="delete-icon" data-id="${product.productId}"><i class="fa-solid fa-trash text-danger"></i></span></td>
          </tr>`;
        }).join('');
    }
}