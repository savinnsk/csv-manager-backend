import {Router , Request , Response} from "express"
import { upload } from "./config/multer"
import { csvHandlerUseCase } from "./usecases/csv-usecase";

const routes = Router()


routes.post("/files", upload.single('csvFile'),(req : Request ,res : Response)=>{
      try {
        return res.status(200).json({ message: "The file was uploaded successfully." });
      } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ message: "An error occurred while uploading the file." });
      }
})

routes.get("/users", async (req: Request, res: Response) => {
    try {
      const query = req.query.q?.toString().toLowerCase();
  
      if (!query) {
        return res.status(400).json({ message: "Search query parameter 'q' is required." });
      }
  
      const searchResults = await csvHandlerUseCase(query)
  
      return res.status(200).json({ data: searchResults }); 
    } catch (error) {
      console.error("Error searching data:", error);
      return res.status(500).json({ message: "Can't find any data to match search." });
    }
  });
  

export {routes} 