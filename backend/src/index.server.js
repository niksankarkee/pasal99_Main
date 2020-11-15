const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

// routes
const adminRoutes = require('./routes/admin/auth');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product')

const app = express();

// MongoDB Connection
// mongodb+srv://root:<password>@pasal99.didrs.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@pasal99.didrs.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log('Database Connected');
  });

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
