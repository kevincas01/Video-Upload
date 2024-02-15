export interface VideoInformation{
    videoid:    number    ;
    title:  string;
    totalLikes: number;
    description: string  ;
    videoLink: string;
    thumbnailLink: string;
    datePosted: Date;
    tag: string[];
    comments: Comment[];
    user: { name: string };
}