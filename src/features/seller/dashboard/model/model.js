import { UserModel } from "../../../../core/models/user_model.js";

export class DashboardModel {
    constructor() {
      this.stats = {
        totalOrders: { value: '$2,107', change: '+3% from last month' },
        revenue: { value: '$77.21', label: 'AVG. Order Value' },
        lifetimeValue: { value: '$653', change: '+2% from last month' }
      };
      this.products = [
        { name: 'Red Tape Shoes for Men', stock: '110 Stocks Remaining', img: '../assets/buf.jpg' },
        { name: 'Fasttrack FS1 Pro Smartwatch', stock: '75 Stocks Remaining', img: '../assets/carousalTestIimg.png' },
        { name: 'Larvia Fashion Men\'s Shirt', stock: '45 Stocks Remaining', img: '../assets/product1.png' }
      ];
      this.chartData = {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        data: [50, 60, 70, 65, 80, 75, 90, 85]
      };
    }
  
    getStats() {
      return this.stats;
    }
  
    getProducts() {
      return this.products;
    }
  
    getChartData() {
      return this.chartData;
    }
    getProfile(sellerId) {
      
      return  UserModel.getById(sellerId) || { name: 'Unknown', email: 'unknown@example.com' };
    }
  }