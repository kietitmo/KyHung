import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27018/ky_hung', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('User Service connected to DB');
  } catch (error) {
    console.error('Error connecting to DB', error);
    process.exit(1);
  }
};

export default connectDB;
