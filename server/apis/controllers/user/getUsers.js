import User from '../../../models/user.js';

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-__v');
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

export default getUsers;
