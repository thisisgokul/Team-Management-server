const express = require('express');
const app = express();
const cors = require('cors');
const mongooseConnect = require('./config/config');
const authRouter = require('./routes/auth-routes');
const userRouter = require('./routes/user-management-routes');
const productRouter = require('./routes/product-management');

const cookieparser = require('cookie-parser');
const port = 5000;

// connect to database 
mongooseConnect();  

// middleware setup
app.use(express.urlencoded({ extended: true, limit: '10mb' }));  // Limit for URL-encoded bodies
app.use(express.json({ limit: '10mb' }));  // Limit for JSON bodies

app.use(cors({
  credentials: true,
  origin: 'https://team-management-frontend-roan.vercel.app'
}));

app.use(cookieparser());


// Routes 
app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', productRouter);

app.listen(port, () => {  
    console.log('server connected to', port);
});

