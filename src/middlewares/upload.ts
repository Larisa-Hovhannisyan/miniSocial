import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir: string = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void {
    cb(null, uploadDir);
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void {
    const ext: string = path.extname(file.originalname);
    const name: string = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + ext);
  }
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only images allowed"));
  } else {
    cb(null, true);
  }
};

export const upload: multer.Multer = multer({ storage, fileFilter });
