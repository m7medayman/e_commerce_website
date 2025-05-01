export class CarouselComponent {
    constructor(images) {
        this.images = images; // Array of image objects { url, description }
    }

    render() {
        if (!this.images || !this.images.length) {
            return '<p>No images available for the carousel.</p>';
        }

        const carouselId = 'dynamicCarousel';

        // Create carousel item elements
        const carouselItems = this.images.map((image, index) => {
            const activeClass = index === 0 ? 'active' : '';
            return `
                <div class="carousel-item ${activeClass}" style="background-image: url('${image.url}') ">
                    <div class="carousel-caption d-none d-md-block">
                        <p>${image.description}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Create carousel indicator buttons
        const carouselIndicators = this.images.map((_, index) => {
            const activeClass = index === 0 ? 'active' : '';
            return `
                <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" class="${activeClass}"
                    aria-current="${activeClass ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
            `;
        }).join('');

        // Construct full carousel HTML
        const carouselHtml = `
            <div class="container">
                <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${carouselItems}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    <div class="carousel-indicators">
                        ${carouselIndicators}
                    </div>
                </div>
            </div>
        `;

        return carouselHtml;
    }
}
