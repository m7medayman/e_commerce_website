export class WishlistModel {
  static STORAGE_KEY = 'wishlists';

  static getAll() {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
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