export class CartSummary{
    constructor(subtotal, selectedShipping = 'free' , discount=0) {
        this.subtotal = subtotal;
        this.selectedShipping = selectedShipping;
        this.discount=discount;
        this.shippingOptions = [
          { key: 'free', label: 'Free shipping', cost: 0 },
          { key: 'express', label: 'Express shipping', cost: 15 },
          { key: 'pickUp', label: 'Pick Up', cost: 21 }
        ];
      }
    render(){
        const selected = this.shippingOptions.find(opt => opt.key === this.selectedShipping);
        const shippingCost = selected ? selected.cost : 0;
    
        const total = (this.subtotal + shippingCost) - this.discount;
        this.optionsHtml= this.shippingOptions.map(option=>{
            return`
            <div class="border p-3 m-2 d-flex justify-content-between">
                        <div> <input type="radio" name="shipping" value='${option.key}'  ${option.key === this.selectedShipping ? 'checked' : ''}/>
                            <label>${option.label}</label>
                        </div>
                        <span>${option.cost > 0 ? `+$${option.cost.toFixed(2)}` : '$0.00'}</span>
                    </div>
            `;
        }).join('');


        return`
        <div class=" border p-4 order-md-1 order-2">
                    <h5>Cart Summary</h5>
                    ${this.optionsHtml}
                    <div class="d-flex justify-content-between border-bottom">
                        <p>SubTotal</p>
                        <p>$${this.subtotal.toFixed(2)}</p>
                    </div>
                   
                    <div class="d-flex justify-content-between mt-3 mb-1">
                        <h4>Total</h4>
                        <h4>$${total.toFixed(2)}</h4>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary col-10 ">Checkout</button>
                    </div>

                </div>`;
    }
}