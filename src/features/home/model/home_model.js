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
    getProducts() {
        const products = [
            {
                imageUrl: './assets/images/test_product_img.png',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 5
            },
            {
                imageUrl: './assets/images/test_product_img.png',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',

                rating: 3
            },
            {
                imageUrl: './assets/images/test_product_img.png',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 0
            },
            {
                imageUrl: './assets/images/test_product_img.png',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 1
            },
            {
                imageUrl: './assets/images/test_product_img.png',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 20,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 2
            },

            {
                imageUrl: 'https://via.placeholder.com/300x200?text=Loveseat+Sofa',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 5
            },
            {
                imageUrl: 'https://via.placeholder.com/300x200?text=Loveseat+Sofa',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 5
            },
            {
                imageUrl: 'https://via.placeholder.com/300x200?text=Loveseat+Sofa',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 5
            },
            {
                imageUrl: 'https://via.placeholder.com/300x200?text=Loveseat+Sofa',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 5
            },
            {
                imageUrl: 'https://via.placeholder.com/300x200?text=Table+Lamp',
                altText: 'Table Lamp',
                isNew: true,
                discountPct: 20,
                isFavorite: true,
                title: 'Table Lamp',
                price: '$24.99',
                originalPrice: null,
                rating: 4
            },
            // …add as many as you like…
        ];
        return products;
    }
}