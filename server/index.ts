import express, {Express, Request, Response} from 'express'

import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "./db";

import cors from 'cors'

import AuthenticateRouter from "./routes/AuthenticateRouter";

import FeedRouter from './routes/FeedRouter';
import VideoRouter from './routes/VideoRouter';
const app:Express = express();

app.use(cors());
app.listen(3005)


app.use(express.json())

//Users Route
app.use('/authenticate',AuthenticateRouter)


//Feed Route
app.use('/feed',FeedRouter)

app.use('/video',VideoRouter)
