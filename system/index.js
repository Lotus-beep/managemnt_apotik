import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import datarouter from './router/datarouter.js';

const app = express();
const port = 8000;


app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(datarouter);


app.listen(port,()=>{
    console.log("berhasil");
})