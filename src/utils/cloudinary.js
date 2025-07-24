import { v2 as cloudinary } from "cloudinary";

import fs from "fs"







// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});







const uploadonCloudinary = async (localfilepath) => {
    try {

        if (!localfilepath) {
            return null
        }
        console.log("🕒 Local Time (ISO):", new Date().toISOString())
        //upload the file on cloudinary
        const response = await cloudinary.uploader
            .upload(
                localfilepath,
                {
                    resource_type: "auto"
                }
            )
        // file has been uploaded successfully

        console.log(response.url)
        console.log("hello");

        fs.unlinkSync(localfilepath)
        return response

    } catch (error) {
        fs.unlinkSync(localfilepath)// remove the locally saved 
        // temperary saved file as the upload peration failed 
        console.log(error);

    }




}

export { uploadonCloudinary }



