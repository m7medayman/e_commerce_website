import { ProductModel } from '../../../core/models/product_model.js';

export class ShopModel {
    getProducts() {
        const products = [];
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
                rating: product.rate
            })
        })
        return products;
    }
}