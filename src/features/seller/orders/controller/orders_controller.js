import { OrdersModel } from "../model/orders_model.js";
import { OrdersView } from "../view/orders_view.js";

export class OrdersController {
    constructor() {
    }
    init() {
        this.model = new OrdersModel();
        this.view = new OrdersView();
        this.data = this.model.getBySellerId();
        this.view.render(this.data);
    }
}