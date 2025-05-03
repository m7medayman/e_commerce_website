
export class ReviewModel {
  static STORAGE_KEY = 'reviews';

  static getAll() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  }

  static getByProductId(productId) {
    return this.getAll().filter(review => review.productId === productId);
  }

  static add({ productId, userId, rating, comment }) {
    const reviews = this.getAll();
    const review = {
      reviewId: generateUUID(),
      productId,
      userId,
      rating: parseInt(rating),
      comment,
      createdAt: new Date().toISOString()
    };
    reviews.push(review);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
    return review;
  }

  static delete(reviewId) {
    const reviews = this.getAll().filter(review => review.reviewId !== reviewId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
  }
}
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}