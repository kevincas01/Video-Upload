import VideoController from "../controller/VideoController";
import { auth } from "../middleware/authorization";

import BaseRoutes from "./BaseRouter";
import { Request, Response } from "express";
import multer, { Multer } from 'multer';


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

class VideoRoutes extends BaseRoutes {
    routes():void{

        this.router.get('/', auth,  VideoController.getComments);
        
        this.router.get('/:videoId', auth, VideoController.getComments);
        this.router.post('/comment/:videoId', auth, VideoController.createComment);

    }
}
export default new VideoRoutes().router
