import Multer from "multer"

const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');     
    },
    filename: (req, file, cb) => {

      cb(null, `${new Date().getTime()}-${file.originalname}`); 
    },
  });
  
export const upload = Multer({ storage });