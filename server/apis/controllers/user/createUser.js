import User from '../../../models/user.js';

const createUser = async (req, res) => {
    try {
        const { fullName, dateOfBirth, gender, email, address, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const user = await User.create({
            fullName,
            dateOfBirth,
            gender,
            email,
            address,
            role: role || 'user'
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
};

export default createUser;
