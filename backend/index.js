const express = require('express');
const app = express();
const UserRouter = require('./routers/UserRouter');
const cors = require('cors');

const port = 5000;


//middleware
app.use(cors({
    origin: ['http://localhost:3000', ''],
}));
app.use(express.json());

app.use('/user', UserRouter);

//end point
app.get('/', (req, res) => {
    res.send('response from express');
});

//add
app.get('/add', (req, res) => {
    res.send('response from add');
});

//getall 
app.get('/getall', (req, res) => {
    res.send('response from getall');
});

//delete
app.get('/delete', (req, res) => {
    res.send('response from delete');
});



// starting the server
app.listen(port, () => {
    console.log('server started');
});