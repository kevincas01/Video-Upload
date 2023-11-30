import { Router } from "express"

interface BRouter{
    routes(): void
}

abstract class BaseRoutes implements BRouter{
    public router: Router;

    constructor(){
        this.router = Router()
        this.routes()
    }
    
    abstract routes(): void 
}

export default BaseRoutes;