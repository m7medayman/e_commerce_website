export class ThreeImageSection {
    constructor(item1, item2, item3) {
        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
    }
    /*
     
    {
    title: 'Living Room',
    url: '#',
    img: 'assets/images/panner1.png'
    }
     */
    render() {
        const threeImageSection = `
        <div >
            <!-- row with normal left padding and no right padding -->
            <div class="row g-4 ps-3 pe-0">

                <!-- ========== Living Room (big) ========== -->
                <div class="col-12 col-lg-8">
                    <div class="category-panel">
                        <div>
                            <h2 class="fw-bold">${this.item1.title}</h2>
                            <a href="${this.item1.url}" class="big-link">Shop Now <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <img src="${this.item1.img}" alt="Living Room" class="panel-img ms-auto" />
                    </div>
                </div>

                <!-- ========== Right side (two small panels) ========== -->
                <div class="col-12 col-lg-4 d-flex flex-column">
                    <!-- Bedroom -->
                    <div class="category-panel mb-4">
                        <div>
                            <h4 class="fw-bold mb-1">${this.item2.title}</h4>
                            <a href="${this.item2.url}" class="big-link">Shop Now <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <img src="${this.item2.img}" alt="Bedroom" class="panel-img ms-auto sm-img" />
                    </div>

                    <!-- Kitchen -->
                    <div class="category-panel mb-4">
                        <div>
                            <h4 class="fw-bold mb-1">${this.item3.title}</h4>
                            <a href="${this.item3.url}" class="big-link">Shop Now <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <img src="${this.item3.img}" alt="Bedroom" class="panel-img ms-auto sm-img" />
                    </div>

                </div>
            </div>

        </div>`;
        return threeImageSection;
    }
}