class ReviewModel {
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