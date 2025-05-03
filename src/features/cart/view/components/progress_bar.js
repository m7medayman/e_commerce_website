export class ProgressBar {
    constructor(currentCheckout) {
        this.currentCheckout = currentCheckout;
    }
    ProgressBarItems = [
        'Shopping Cart',
        'Checkout details',
        'Order complete'
    ];
    render() {
        if (!this.currentCheckout) {
            return `<p class='text-center'> No current checkout is done </p>`;
        }
        const items = this.ProgressBarItems.map((item, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < this.currentCheckout;
            const isCurrent = stepNumber === this.currentCheckout;

            let circleClass = "text-center fs-5 pt-1";
            let circleContent = stepNumber;

            if (isCompleted) {
                circleClass += " bg-success text-white";
                circleContent = "✔";
            } else if (isCurrent) {
                circleClass += " bg-dark text-white";
            } else {
                circleClass += " bg-light text-muted border";
            }

            const textClass = isCompleted ? "fw-5 text-success" : (isCurrent) ? 'fw-5 text-dark' : "text-muted";
            const wrapperClass = isCompleted ? "completed" : (isCurrent) ? 'current' : "";

            return ` 
            <div class="d-flex align-items-center ${wrapperClass}">
            <span class="rounded-circle ${circleClass} text-center fs-5 active pt-1"
                style="width: 42px; height: 42px;">${circleContent}</span>
            <p class="pt-2 mx-2 ${textClass}">${item}</p>
        </div>
            `;
        }).join('');
        const currentStep = this.ProgressBarItems[this.currentCheckout - 1];
        const smallScreenView = `
            <div class="d-block d-md-none text-center my-2">
                <div class="d-inline-flex align-items-center justify-content-center text-center">
                    <span class="rounded-circle bg-dark text-white text-center me-2 fs-5 pt-1" style="width: 40px; height: 40px;">${this.currentCheckout}</span>
                    <span class="fw-5">${currentStep}</span>
                </div>
            </div>
        `;

    // Full progress bar for medium and up
    const fullDesktopView = `
        <div class="d-none d-md-flex justify-content-around">
            ${items}
        </div>
    `;

    return smallScreenView + fullDesktopView;
}

    //     const progressHtml = `<div class=" d-flex justify-content-around ">
    //     ${items}
    //     </div>`;
    //     return progressHtml;

    // }
}