export class CartModel {
    constructor() {
     this.items=[
      { id: 1, name: 'Tray Table', price: 19.00, quantity: 2 ,url:'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600'},
      { id: 2, name: 'Tray Table', price: 19.00, quantity: 2 ,url:'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600'},
      { id: 3, name: 'Table Lamp',price: 39.00, quantity: 1 ,url:'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=600'}
    ];
    }
    getCartItems(){
        return this.items;
    }

    getSubtotal() {
      return this.items.reduce((sum, p) => sum + p.price * p.quantity, 0);
    }
    updateQuantity(index, change) {
      this.items[index].quantity = Math.max(1, this.items[index].quantity + change);
    }
    removeItem(index) {
      this.items.splice(index, 1);
    }

}