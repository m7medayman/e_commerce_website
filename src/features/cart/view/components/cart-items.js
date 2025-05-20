export class CartItem {
  constructor(item, index) {
    this.item = item;
    this.index = index;
  }

  render() {
    const { name, quantity, price, url } = this.item;
    const itemSubtotal = (price * quantity).toFixed(2);
    return `
    <div class="d-flex justify-content-between align-items-center border-bottom py-3">
        <div class="d-flex gap-2 align-items-center">
          <img src="${url}" alt="${name}" width="80" height="80" class="rounded">
          <div>
            <h6>${name}</h6>
            <div class="removed" data-action="remove" data-index="${this.index}">
              ✖ <span class="d-none d-md-inline">Remove</span>
            </div>
            </div>
        </div>
        <div class="d-flex gap-3 align-items-center border p-1 rounded mx-5 ">
         <span class="change hover-pointer" data-action="decrease" data-index="${this.index}">−</span>
          <span id="quatity">${quantity}</span>
         <span class="change hover-pointer" data-action="increase" data-index="${this.index}">+</span>
         </div>
       <div class="col-md-2 ">$${price.toFixed(2)}</div>
      <div class="fw-bold  col-md-2 d-none d-md-block ">$${itemSubtotal}</div>
      </div>
    `;
  }
}
