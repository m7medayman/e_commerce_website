import { OrdersModel } from '../model/orders_model.js';
import { OrdersView } from '../view/orders_view.js';
import { UserModel } from '../../../../core/models/user_model.js'; // Import UserModel to verify the user

export class OrdersController {
    constructor() {
        this.view = new OrdersView();
    }

    init() {
        // Retrieve the userId of the logged-in user (assuming it's in localStorage)
        const currentUserId = localStorage.getItem('currentUserId');
        if (!currentUserId) {
            console.error('No logged-in user found');
            this.view.render([]); // Render an empty table if no user is found
            return;
        }

        // Verify that the user is a seller
        const user = UserModel.getById(currentUserId);
        if (!user || user.role !== 'seller') {
            console.error('The user is not a seller');
            this.view.render([]);
            return;
        }

        // Initialize OrdersModel with sellerId
        this.model = new OrdersModel(currentUserId);
        this.data = this.model.getBySellerId();
        this.view.render(this.data);
    }
}