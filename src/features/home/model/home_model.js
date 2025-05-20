import { ProductModel } from '../../../core/models/product_model.js';
export class HomeModel {

    constructor() {

        this.images = [
            { url: 'assets/images/carousalTestIimg.png', description: 'Living room' },
            { url: 'assets/images/c1.jpg', description: '' },
            { url: 'assets/images/c2.jpg', description: '' },
            { url: 'assets/images/c3.jpg', description: '' },
            { url: 'assets/images/c4.jpg', description: '' },



        ];
    }
    getImages() {
        return this.images;
    }
    getThreeImageSection() {
        return [
            {
                title: 'Living Room',
                url: 'shop.html',
                img: 'assets/images/panner1.png'
            },
            {
                title: 'Bed Room',
                url: 'shop.html',
                img: 'assets/images/panner2.png'
            },
            {
                title: 'kitchen',
                url: 'shop.html',
                img: 'assets/images/panner3.png'
            }
        ]

    }
    // {
    //     imageUrl: './assets/images/test_product_img.png',
    //     altText: 'Grey Loveseat Sofa',
    //     isNew: true,
    //     discountPct: 50,
    //     isFavorite: false,
    //     title: 'Loveseat Sofa',
    //     price: '$199.00',
    //     originalPrice: '$400.00',
    //     rating: 5
    // },

    getProducts() {
        /**
         * Retrieves an array of products with their discounted prices.
         * 
         * The products' details are as follows:
         * - id: the product's id
         * - imageUrl: the product's image URL
         * - altText: the product's name
         * - isNew: whether the product is new (true) or not (false)
         * - discountPct: the percentage discount on the product
         * - isFavorite: whether the product is in the user's wishlist (true) or not (false)
         * - title: the product's name
         * - price: the product's discounted price
         * - originalPrice: the product's original price
         * - rating: the product's rating (from 0 to 5)
         * 
         * @return {Array} An array of products with their discounted prices.
         */
        /*************  ✨ Windsurf Command ⭐  *************/
        /*******  118317ad-8c3d-45f7-b61f-d52696e00c4b  *******/
        const products = [];
        ProductModel.getAll().forEach((product) => {
            const finalPrice = (product.price - (product.price * product.discount) / 100).toFixed(2);
            if (product.stock > 0) {
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
            }
            // products.push({
            //     id: product.productId,
            //     imageUrl: product.detailedImages[0],
            //     altText: product.name,
            //     isNew: true,
            //     discountPct: product.discount,
            //     isFavorite: false,
            //     title: product.name,
            //     price: `${finalPrice}`,
            //     originalPrice: `$${product.price}.00`,
            //     rating: product.rate
            // })
        })
        return products;
    }
}