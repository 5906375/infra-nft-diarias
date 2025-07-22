import multer from "multer";
const storage = multer.memoryStorage(); // usando buffer para IPFS
const upload = multer({ storage });
export default upload;
