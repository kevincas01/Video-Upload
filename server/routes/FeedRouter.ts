import FeedController from "../controller/FeedController";
import { auth } from "../middleware/authorization";

import BaseRoutes from "./BaseRouter";
import { Request, Response } from "express";
import multer, { Multer } from 'multer';


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

class FeedRoutes extends BaseRoutes {
    routes():void{

        this.router.get('/', auth,  FeedController.getVideoPreviews);
        this.router.get('/users', auth, FeedController.getUsers);
        this.router.post('/post', auth, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), FeedController.postVideo);

    }
}
export default new FeedRoutes().router
