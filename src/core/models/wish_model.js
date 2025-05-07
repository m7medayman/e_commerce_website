export class WishlistModel {
  static STORAGE_KEY = 'wishlists';

  static getAll() {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [
        { name: 'Tray Table', price: '$150000.00', action: 'Add to Cart' },
        { name: 'Sofa', price: '$45.00', action: 'Add to Cart' },
        { name: 'Armchair', price: '$25.00', action: 'Add to Cart' },
        { name: 'Pillow', price: '$10.00', action: 'Add to Cart' }
    ];
  }

  static getByUserId(userId) {
      const wishlists = this.getAll();
      return wishlists.find(w => w.userId === userId) || { userId, items: [] };
  }

  static addItem(userId, item) {
      let wishlist = this.getByUserId(userId);
      if (!wishlist.items.find(i => i.id === item.id)) {
          wishlist.items.push(item);
      }
      const allWishlists = this.getAll();
      const existingIndex = allWishlists.findIndex(w => w.userId === userId);
      if (existingIndex > -1) {
          allWishlists[existingIndex] = wishlist;
      } else {
          allWishlists.push(wishlist);
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allWishlists));
  }

  static removeItem(userId, itemId) {
      let wishlist = this.getByUserId(userId);
      wishlist.items = wishlist.items.filter(i => i.id !== itemId);
      const allWishlists = this.getAll();
      const existingIndex = allWishlists.findIndex(w => w.userId === userId);
      if (existingIndex > -1) {
          allWishlists[existingIndex] = wishlist;
      } else {
          allWishlists.push(wishlist);
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allWishlists));
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}