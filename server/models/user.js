import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    role: { 
        type: String, 
        required: true, 
        enum: ['admin', 'manager', 'user', 'guest'],
        default: 'user' 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User; 