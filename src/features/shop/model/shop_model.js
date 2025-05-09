import { ProductModel } from '../../../core/models/product_model.js';
// In shop_model.js
export class ShopModel {
    getProducts(filters = {}) {
        let products = [];
        ProductModel.getAll().forEach((product) => {
            const finalPrice = (product.price - (product.price * product.discount) / 100).toFixed(2);

            products.push({
                id: product.productId,
                imageUrl: product.detailedImages[0],
                altText: product.name,
                isNew: true,
                discountPct: product.discount,
                isFavorite: false,
                title: product.name,
                price: `${finalPrice}`,
                originalPrice: `$${product.price}.00`,
                rating: product.rate,
                category: product.category // Make sure category is included
            });
        });

        // Apply filters if any
        if (filters.category && filters.category !== 'all') {
            products = products.filter(product => product.category === filters.category);
        }

        if (filters.priceRange) {
            switch (filters.priceRange) {
                case 'under50':
                    products = products.filter(product => parseFloat(product.price) < 50);
                    break;
                case '50to100':
                    products = products.filter(product =>
                        parseFloat(product.price) >= 50 && parseFloat(product.price) <= 100);
                    break;
                case '100to200':
                    products = products.filter(product =>
                        parseFloat(product.price) > 100 && parseFloat(product.price) <= 200);
                    break;
                case 'over200':
                    products = products.filter(product => parseFloat(product.price) > 200);
                    break;
            }
        }

        return products;
    }

    getCategories() {
        // Extract unique categories from all products
        const categories = [];
        const categorySet = new Set();

        ProductModel.getAll().forEach(product => {
            if (product.category && !categorySet.has(product.category)) {
                categorySet.add(product.category);
                categories.push(product.category);
            }
        });

        return categories;
    }
}