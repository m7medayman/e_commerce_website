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