import { ProductModel } from '../../../core/models/product_model.js';
export class HomeModel {
    constructor() {
        this.images = [
            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },
            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },
        ];
    }
    getImages() {
        return this.images;
    }
    getThreeImageSection() {
        return [
            {
                title: 'Living Room',
                url: '#',
                img: 'assets/images/panner1.png'
            },
            {
                title: 'Bed Room',
                url: '#',
                img: 'assets/images/panner2.png'
            },
            {
                title: 'kitchen',
                url: '#',
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
        const products = [];
        ProductModel.getAll().forEach((product) => {
            products.push({
                imageUrl: product.detailedImages[0],
                altText: product.name,
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: product.name,
                price: `$${product.price}.00`,
                originalPrice: `$${product.price + 100}.00`,
                rating: product.rate
            })
        })
        return products;
    }
}