export class OrdersView {
    constructor() {
        this.app = document.getElementById('container');
    }

    render(model) {
        const orders = model.map((order, index) => {
            return `<tr class="text-center align-middle">
                <th scope="row">${order.orderId || (index + 1)}</th>
                <td><img src="${order.productImage}" alt="${order.productName}" width="50px" height="50px" class="rounded"/></td>
                <td>${order.productName}</td>
                <td>${order.price}</td>
                <td>${order.deliveryTime}</td>
            </tr>`;
        }).join('');

        const container = `<table class="table text-center mt-5 table-hover">
            <thead>
                <tr class="table-dark text-white">
                    <th scope="col">Order Number</th>
                    <th scope="col">Product Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Delivery Time</th>
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
                    overflow: hidden; /* عشان الزوايا المتقاطعة تتقطع مع الـ tbody */
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