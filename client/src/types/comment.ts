export interface VideoComments{
    commentId:    number    ;
    text:string;
    videoId:number;
    userId:number;
    user: { name: string };
}