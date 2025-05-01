import { FooterWidget } from '../../../core/common/footer.js';
import { NavBar } from '../../../core/common/nav_bar.js';
import { ProgressBar } from './components/progress_bar.js';
// import { CarouselComponent } from './components/corsaul.js';
export class CartView {
    renderPage() {
        new FooterWidget().render();
        new NavBar().render();

    }
    renderProgress(){
        document.getElementById('progress_bar').innerHTML=new ProgressBar(1).render();
    }

    

}