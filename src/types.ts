export interface Comment {
  id: number;
  content: string;
  replyingTo: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies: Array<Comment> | null;
}

export interface Request {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  comments: Array<Comment> | null;
}

export interface User {
  image: string;
  name: string;
  username: string;
}
