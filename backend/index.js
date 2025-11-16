const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const UserRouter = require('./routers/UserRouter');
const BrokenRouter = require('./routers/BrokenRouter');
const OrphanRouter = require('./routers/OrphanRouter');

const app = express();
const PORT = 5000;

// =============================
//  Middleware
// =============================
app.use(cors({
    origin: ['http://localhost:3000'],
}));
app.use(express.json());

// =============================
//  Database Connection
// =============================
mongoose.connect('mongodb://127.0.0.1:27017/major_project')
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('DB Error:', err));

// =============================
//  Routers
// =============================
app.use('/user', UserRouter);
app.use('/broken', BrokenRouter);
app.use('/orphan', OrphanRouter);

// =============================
//   Default Routes
// =============================
app.get('/', (req, res) => {
    res.send('Major Project Backend Running...');
});

// =============================
//   Start Server
// =============================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
