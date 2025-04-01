import User from '../../../models/user.js';

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, dateOfBirth, gender, email, address, role } = req.body;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if email is being changed and if it already exists
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                fullName,
                dateOfBirth,
                gender,
                email,
                address,
                role
            },
            { new: true, runValidators: true }
        ).select('-__v');

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

export default updateUser;
