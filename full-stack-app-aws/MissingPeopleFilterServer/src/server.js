import express from 'express';
import bodyParser from 'body-parser';
import {router as filteredImagesRoute} from "./routes/filteredImagesRoute.js"
import {router as authRoute} from "./routes/authRoutes.js"
import { requiresAuth } from './middleware/requiresAuthMiddleware.js';
import cors from 'cors';



  // Init the Express application
const app = express();

app.use(cors())

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.use("/auth", authRoute)
  app.use("/filteredImages", cors(), requiresAuth(), filteredImagesRoute)
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server`);
  });
