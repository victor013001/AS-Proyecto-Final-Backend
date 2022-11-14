import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API prestamos',
        status: 'OK'
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})