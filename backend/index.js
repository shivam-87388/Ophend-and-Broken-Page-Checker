require('dotenv').config();
const express = require('express');
const app = express();
const UserRouter = require('./routers/UserRouter');
const SitemapRouter = require('./routers/SitemapRouter');
const OrphanedRouter = require('./routers/OrphanedRouter');
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
app.use("/api", OrphanedRouter);
app.use("/api", BrokenRouter);

// start server
app.listen(port, () => {
  console.log(' Server started on port', port);
});
