import FeedController from "../controller/FeedController";
import { auth } from "../middleware/authorization";

import BaseRoutes from "./BaseRouter";


class FeedRoutes extends BaseRoutes {
    routes():void{

        this.router.get('/', auth, FeedController.getVideos);
        this.router.post('/', auth, FeedController.postVideo);
        this.router.get('/users', auth, FeedController.getUsers);

    }
}
export default new FeedRoutes().router
