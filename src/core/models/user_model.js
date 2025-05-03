function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export class UserModel {
    static STORAGE_KEY = 'users';

    static getAll() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        /*[{
         userId: "user-1",
            email:" gsdfgdsf@dsdfg.com",
            password :"fs*****", // In production, hash the password
            role, // 'customer', 'seller', or 'admin'
            name ,
            address: address || null,
            phone: phone || null,
            createdAt: "",
            updatedAt: ""

    }]*/
    }

    static getById(userId) {
        return this.getAll().find(user => user.userId === userId);
          /*{
         userId: "user-1",
            email:" gsdfgdsf@dsdfg.com",
            password :"fs*****", // In production, hash the password
            role, // 'customer', 'seller', or 'admin'
            name ,
            address: address || null,
            phone: phone || null,
            createdAt: "",
            updatedAt: ""

    }*/
    }

    static getByEmail(email) {
        return this.getAll().find(user => user.email === email);
          /*{
         userId: "user-1",
            email:" gsdfgdsf@dsdfg.com",
            password :"fs*****", // In production, hash the password
            role, // 'customer', 'seller', or 'admin'
            name ,
            address: address || null,
            phone: phone || null,
            createdAt: "",
            updatedAt: ""

    }*/
    }

    static add({ email, password, role, name, address, phone }) {
        const users = this.getAll();
        if (this.getByEmail(email)) {
            throw new Error('Email already exists');
        }
        if (!['customer', 'seller', 'admin'].includes(role)) {
            throw new Error('Invalid role');
        }
        const user = {
            userId: generateUUID(),
            email,
            password, // In production, hash the password
            role, // 'customer', 'seller', or 'admin'
            name,
            address: address || null,
            phone: phone || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        users.push(user);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
        return user;
          /*{
         userId: "user-1",
            email:" gsdfgdsf@dsdfg.com",
            password :"fs*****", // In production, hash the password
            role, // 'customer', 'seller', or 'admin'
            name ,
            address: address || null,
            phone: phone || null,
            createdAt: "",
            updatedAt: ""

    }*/
    }

    static update(userId, updates) {
        const users = this.getAll();
        const user = users.find(u => u.userId === userId);
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, updates, { updatedAt: new Date().toISOString() });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
        return user;
          /*{
         userId: "user-1",
            email:" gsdfgdsf@dsdfg.com",
            password :"fs*****", // In production, hash the password
            role, // 'customer', 'seller', or 'admin'
            name ,
            address: address || null,
            phone: phone || null,
            createdAt: "",
            updatedAt: ""

    }*/
    }

    static delete(userId) {
        const users = this.getAll().filter(user => user.userId !== userId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
        return `User with ID ${userId} deleted successfully`;
    }
}

// UserModel.add({email:"sasdgsdf",role:"customer"});
// //email password 