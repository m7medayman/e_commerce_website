export class OrdersView {
    constructor() {
        this.app = document.getElementById('container');
    }

    render(model) {
        const orders = model.map((order, index) => {
            return `<tr class="text-center align-middle">
                <th scope="row">${(index + 1)}</th>
                <td>${order.orderId}</td>
                <td><img src="${order.url}" alt="${order.name}" width="50px" height="50px" class="rounded"/></td>
                <td>${order.name}</td>
                <td>${order.quantity}</td>
                <td>${order.price * order.quantity}</td>

            </tr>`;
        }).join('');

        const container = `<table class="table text-center mt-5 table-hover">
            <thead>
                <tr class="table-dark text-white">
                    <th scope="col">Order Number</th>
                    <th scope="col">Order id</th>
                    <th scope="col">Product Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product quantity</th>
                    <th scope="col">Total Price</th>
                </tr>
            </thead>
            <tbody>
            ${model.length > 0 ? orders : `<tr class="text-center no-orders"><td colspan="5">There are no orders to show</td></tr>`}
            </tbody>
        </table>`;

        this.app.innerHTML = `
            <style>
                .table-img {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 5px;
                }
                .table th, .table td {
                    vertical-align: middle;
                }
                    .table thead {
                    border-radius: 10px;
                    overflow: hidden; 
                }
                .table thead tr:first-child th:first-child {
                    border-top-left-radius: 10px;
                }
                .table thead tr:first-child th:last-child {
                    border-top-right-radius: 10px;
                }
                
            </style>
            <h1 class="mb-4">Seller Orders</h1>
            <div id="orders">${container}</div>
        `;
    }
}