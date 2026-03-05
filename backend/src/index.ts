import express from 'express';
 import dotenv from 'dotenv';
import userRouter from './Routes/UserRouter'
import projectRoute from "./Routes/ProjectRouter"
dotenv.config();


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;



app.use('/api/user', userRouter)
app.use("/api/project", projectRoute )

app.listen(PORT, () => {
  console.log(`Server is running on port  http://localhost:${PORT}`);
});
