export class CouponCode{
    constructor(){}
    render(){
        return`
        <div>
                    <h3>Have a coupon?</h3>
                    <p>Add your code for an instant cart discount</p>
                    <div class="border rounded d-flex justify-content-between col-md-5 col-10 p-2 " id='coupon'>
                        <input type="text" placeholder="Coupon code" id="coupon-code-input" class='form-control '> 
                        <button class='btn btn-primary' id='apply-coupon'>Apply</button>
                    </div>
                    <div id="coupon-message" class="text-success mt-2"></div>
                </div>
            </div>

        </div>
        `;
    }
}