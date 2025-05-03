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
                imageUrl: 'assets/images/carousalTestIimg.png',
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
                discountPct: 20,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 2
            },

            {
                imageUrl: 'assets/images/carousalTestIimg.png',
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
                discountPct: 20,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 2
            },

            {
                imageUrl: 'assets/images/carousalTestIimg.png',
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
                discountPct: 20,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 2
            },

            {
                imageUrl: 'assets/images/carousalTestIimg.png',
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
                discountPct: 20,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 2
            },

            {
                imageUrl: 'assets/images/carousalTestIimg.png',
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
                discountPct: 20,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 2
            },

            {
                imageUrl: 'assets/images/carousalTestIimg.png',
                altText: 'Grey Loveseat Sofa',
                isNew: true,
                discountPct: 50,
                isFavorite: false,
                title: 'Loveseat Sofa',
                price: '$199.00',
                originalPrice: '$400.00',
                rating: 5
            },
        ];
        return products;
    }
}