
export class CartModel {
  static STORAGE_KEY = 'carts';

  static getAll() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  }

  static getByUserId(userId) {
    return this.getAll().find(cart => cart.userId === userId) || { userId, cartId: generateUUID(), items: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  }

  static addItem(userId, productId, quantity) {
    const carts = this.getAll();
    let cart = this.getByUserId(userId);
    const product = ProductModel.getById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price: product.price });
    }
    cart.updatedAt = new Date().toISOString();

    const cartIndex = carts.findIndex(c => c.userId === userId);
    if (cartIndex >= 0) {
      carts[cartIndex] = cart;
    } else {
      carts.push(cart);
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carts));
    return cart;
  }

  static removeItem(userId, productId) {
    const carts = this.getAll();
    const cart = this.getByUserId(userId);
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.updatedAt = new Date().toISOString();

    const cartIndex = carts.findIndex(c => c.userId === userId);
    if (cartIndex >= 0) {
      carts[cartIndex] = cart;
    } else {
      carts.push(cart);
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carts));
    return cart;
  }

  static clear(userId) {
    const carts = this.getAll().filter(cart => cart.userId !== userId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carts));
  }
}
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}