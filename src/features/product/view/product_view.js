export class ProductView {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
    }
  
    render(product) {
      if (!product) {
        this.container.innerHTML = "<p>Product not found.</p>";
        return;
      }
  
      this.container.innerHTML = `
        <div class="container">
        <div class="row">
            <div class="col-md-6 p-5 d-flex flex-column align-items-center">
                <div class="main-img border mb-3">
                    <img class="w-100" src="${product.img}" alt="">
                </div>
                <div class="imgs-details d-none m-2 d-md-flex w-100 d-flex justify-content-between">
                    <img  src="${product.img}" alt="">
                    <img  src="${product.img}" alt="">
                    <img  src="${product.img}" alt="">
                </div>
            </div>
            <div class="col-md-6 p-5">
                <div class="rating mb-3">
                    <i class="fas fa-star text-dark"></i>
                    <i class="fas fa-star text-dark"></i>
                    <i class="fas fa-star text-dark"></i>
                    <i class="fas fa-star text-dark"></i>
                    <i class="fas fa-star text-dark"></i>
                    <span>11 Reviews</span>
                </div>
                <div class="product-name fw-bold fs-3 mb-3">
                    ${product.name}
                </div>
                <div class="product-description mb-3">
                ${product.description}
                                </div>
                <div class="product-price mb-3">
                    <span class="fw-bold fs-3 mx-2">${product.price}</span> 
                    <span class="discount fs-3 ">${product.discount}</span>
                </div>
                
                <div class="product-measurements mb-3">
                    <div class="fw-bold mb-2">Measurements</div>
                    <div class="measurements_value text-dark"> ${product.measurements}</div>
            </div>
            
            <div class="d-flex">
                <div class=" d-flex justify-content-between" >
                    <input type="number"  class="form-control text-center quantity" value="1" min="1">
                </div>

                <button class="btn-outline-primary wishBtn mb-3"> <span><i class="far fa-heart"></i></span> Wishlist</button>
            </div>
            <button class="btn-primary"> Add To Cart</button>
        </div>
    </div>
      `;
    }
  }
  