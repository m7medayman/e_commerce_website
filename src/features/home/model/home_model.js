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
}