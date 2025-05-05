export class AdminModel {
  static getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  static addUser(user) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  static deleteUser(userId) {
    const users = this.getUsers().filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
  }

  static updateUser(updatedUser) {
    const users = this.getUsers().map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(users));
  }

  static getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }

  static addProduct(product) {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  static deleteProduct(productId) {
    const products = this.getProducts().filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
  }

  static updateProduct(updatedProduct) {
    const products = this.getProducts().map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    localStorage.setItem('products', JSON.stringify(products));
  }
}



