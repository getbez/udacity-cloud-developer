import express from "express"
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from "../util/util.js"


export const router = express.Router();

function isValidUrl(stringUrl){
    try{
        new URL(stringUrl);
        return true;
    }
    catch(e){
        console.log(`invalid url ${stringUrl}`,e);
        return false;
    }
}

router.get("/", async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    
    if(!req.query || !req.query.image_url){
        return res.status(400).json({ message: "please provide image_url param"});
    }
    
    let image_url = req.query.image_url;

    if (!isValidUrl(image_url)){
        return res.status(422).json({message: "please provide a valid url"})
    }

    try{
        let outpath = await filterImageFromURL(image_url);
        
        res.on('finish', function(){
            console.info("delete image", outpath);
            deleteLocalFiles([outpath]);
        });
        return res.status(200).sendFile(outpath);
    }
    catch(ex){
        console.error("error processing image",ex);
        return res.status(422).json({message: "error processing image"})
    }
    
});
