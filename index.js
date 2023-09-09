import express from 'express';
import router from './src/routes/validateRoute.js'; 
import cors from 'cors'
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});