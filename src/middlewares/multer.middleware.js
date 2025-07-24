import multer from "multer";

import path from "path"

//reusable file name generator
const generateUniqueName = (file) => {
    const ext = path.extname(file.originalname);// this extracts the ext only 
    const name = path.basename(file.originalname, ext);// this extract the file name without extension
    return `${name}-${Date.now()}${ext}`;
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/avatar')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})
// console.log("multer");

const ProductImgstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/productImg')
    },
    filename: function (req, file, cb) {
        cb(null, generateUniqueName(file))
    }
})






export const upload = multer({ storage: storage })

export const uploadProductImg = multer({ storage: ProductImgstorage })