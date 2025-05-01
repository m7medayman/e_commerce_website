export class HomeModel {
    constructor() {
        this.images = [
            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },
            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },

            { url: 'assets/images/carousalTestIimg.png', description: 'Image 1' },
        ];
    }
    getImages() {
        // get local storage data
        return this.images;
    }
    setImages(images) {
        this.images = images;
    }
    getProducts() {
        return localStrorage.getProducts();
    }


}