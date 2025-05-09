import { OrdersModel } from '../model/orders_model.js';
import { OrdersView } from '../view/orders_view.js';
import { UserModel } from '../../../../core/models/user_model.js'; // استيراد UserModel للتحقق من المستخدم

export class OrdersController {
    constructor() {
        this.view = new OrdersView();
    }

    init() {
        // جلب userId بتاع المستخدم المسجّل (هنفترض إنه في localStorage)
        const currentUserId = localStorage.getItem('auth_user_id');
        if (!currentUserId) {
            console.error('لم يتم العثور على مستخدم مسجّل');
            this.view.render([]); // عرض جدول فاضي لو مفيش مستخدم
            return;
        }

        // التحقق إن المستخدم seller
        const user = UserModel.getById(currentUserId);
        if (!user || user.role !== 'seller') {
            console.error('المستخدم ليس بائعًا');
            this.view.render([]); // عرض جدول فاضي لو المستخدم مش seller
            return;
        }

        // تهيئة OrdersModel بـ sellerId
        this.model = new OrdersModel(currentUserId);
        this.data = this.model.getBySellerId();
        this.view.render(this.data);
    }
}