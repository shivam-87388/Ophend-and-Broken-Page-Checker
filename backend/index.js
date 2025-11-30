const express = require('express');
const app = express();
const UserRouter = require('./routers/UserRouter');
const BrokenRouter = require('./routers/BrokenRouter');
const OrphanRouter = require('./routers/OrphanRouter');
const SitemapRouter  = require('./routers/SitemapRouter');
const cors = require('cors');

const port = 5000;

// middleware
app.use(cors({
    origin: ['http://localhost:3000'],
}));
app.use(express.json());

// Correct routes
app.use('/broken', BrokenRouter);
app.use('/orphan', OrphanRouter);
app.use('/sitemap', SitemapRouter);

// test route
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// start server
app.listen(port, () => {
    console.log('server started');
});
