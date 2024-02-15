export interface VideoPreviewInformation {
    videoid: number;
    title: string;
    totalLikes: number;
    thumbnailLink: string;
    datePosted: Date;
    tag: string[];
    user: { name: string };
  }