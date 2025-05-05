import { ProductModel } from '../../../../core/models/product_model.js';
import { ProductFormView } from '../view/product_form_view.js';

export class ProductFormController {
  constructor() {
    this.view = new ProductFormView();
    this.view.bindSubmit(this.handleSubmit.bind(this));
  }

  handleSubmit(form, formData) {
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    const productData = {
      name: formData.get('productName'),
      description: formData.get('description'),
      category: formData.get('productCategory'),
      price: parseFloat(formData.get('productPrice')),
      stock: parseInt(formData.get('productStock')),
      detailedImages: formData.get('imageUrl').split(','),
      measuarment: formData.get('productMeasurement'),
      discount: parseFloat(formData.get('productDiscount')) || 0,
      sellerId: 'seller-1'
    };
    ProductModel.add(productData);
    this.view.resetForm();
  }
}