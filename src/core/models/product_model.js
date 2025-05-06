export class ProductModel {
  static STORAGE_KEY = 'products';

  static getAll() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  }

  static getById(productId) {
    return this.getAll().find(product => product.productId === productId);
  }

  static add({ name, description, price, detailedImages, category, stock, sellerId, measures, rate, numberOfReviews, discount }) {
    const products = this.getAll();
    if (discount > 100 || discount < 0) {
      throw new Error('Discount must be between 0 and 100');
    };
    const product = {
      productId: generateUUID(),
      name,
      description,
      price: parseFloat(price),
      detailedImages, // array of images strings image urls  
      category,
      stock: parseInt(stock),
      sellerId,
      measures, //string 10 15 20
      rate: parseInt(rate) || 0,
      discount: parseInt(discount) || 0,
      numberOfReviews: parseInt(numberOfReviews) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(product);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    return product;
  }

  static update(productId, updates) {
    const products = this.getAll();
    const product = products.find(p => p.productId === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, updates, { updatedAt: new Date().toISOString() });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    return product;
  }

  static delete(productId) {
    const products = this.getAll().filter(product => product.productId !== productId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }
}
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
