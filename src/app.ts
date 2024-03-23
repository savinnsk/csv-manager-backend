import Express from "express"
import { routes } from "./routes";
import cors from "cors";    


const app = Express()

app.use(Express.json());
app.use(cors());


app.use("/api",routes)

app.listen(3000,()=>{
    console.log("🚀 application stated at port:3000")
})