"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Admin_1 = require("./src/models/Admin");
const Role_1 = require("./src/models/Role");
const auth_1 = require("./src/utils/auth");
dotenv_1.default.config();
const seedAdmin = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gymwala');
        // Check if role exists
        let superAdminRole = await Role_1.Role.findOne({ name: 'Super Admin' });
        if (!superAdminRole) {
            superAdminRole = await Role_1.Role.create({
                name: 'Super Admin',
                description: 'System administrator with full access',
                permissions: []
            });
            console.log('Created Super Admin Role');
        }
        // Check if admin exists
        const adminExists = await Admin_1.Admin.findOne({ email: 'admin@gymwala.com' });
        if (adminExists) {
            console.log('Super Admin already exists.');
            process.exit(0);
        }
        const passwordHash = await (0, auth_1.hashPassword)('password123');
        await Admin_1.Admin.create({
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@gymwala.com',
            passwordHash,
            role: superAdminRole._id,
            isActive: true
        });
        console.log('Successfully created super admin:');
        console.log('Email: admin@gymwala.com');
        console.log('Password: password123');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};
seedAdmin();
//# sourceMappingURL=seed.js.map