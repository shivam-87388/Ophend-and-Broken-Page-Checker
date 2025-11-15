require('dotenv').config();
const express = require('express');
const app = express();
const UserRouter = require('./routers/UserRouter');
const SitemapRouter = require('./routers/SitemapRouter');
const OpenedRouter = require('./routers/OpenedRouter'); 
const BrokenRouter = require('./routers/BrokenRouter');
const cors = require('cors');

const port = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

// middleware
app.use(cors({
  origin: [corsOrigin],
}));
app.use(express.json());

// routers
app.use('/user', UserRouter);
app.use("/api", SitemapRouter);
app.use("/api", OpenedRouter);   
app.use("/api", BrokenRouter);  

// endpoints
app.get('/', (req, res) => {
  res.send('response from express');
});

app.get('/add', (req, res) => {
  res.send('response from add');
});

app.get('/getall', (req, res) => {
  res.send('response from getall');
});

app.get('/delete', (req, res) => {
  res.send('response from delete');
});

// start server
app.listen(port, () => {
  console.log(' Server started on port', port);
});
