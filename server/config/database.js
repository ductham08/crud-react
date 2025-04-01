import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const dbUrl = process.env.DATABASE_URL;
        const dbName = process.env.DATABASE_NAME;
        const dbUrlWithCorrectDB = dbUrl.includes(`/${dbName}`) ? dbUrl : `${dbUrl}/${dbName}`;
            
        await mongoose.connect(dbUrlWithCorrectDB);
        console.log('Connected to MongoDB database:', mongoose.connection.db.databaseName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB; 