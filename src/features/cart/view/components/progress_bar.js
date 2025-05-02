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
      
            const textClass = isCompleted ? "fw-5 text-success" :(isCurrent)?'fw-5 text-dark': "text-muted";
            const wrapperClass =  isCompleted ? "completed" :(isCurrent)?'current': "";
                
            return ` 
            <div class="${index !== 0 ? 'd-none d-md-flex' : 'd-flex'} align-items-center ${wrapperClass}">
            <span class="rounded-circle ${circleClass} text-center fs-5 active pt-1"
                style="width: 42px; height: 42px;">${circleContent}</span>
            <p class="pt-2 mx-2 ${textClass}">${item}</p>
        </div>
            `;
        }).join('');

        const progressHtml = `<div class=" d-flex justify-content-around ">
        ${items}
        </div>`;
        return progressHtml;

    }
}