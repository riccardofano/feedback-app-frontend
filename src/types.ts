export interface Comment {
  id: number;
  content: string;
  replyingTo: string | null;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies: Array<Comment>;
}

export interface Request {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  comments: Array<Comment>;
}

export interface User {
  image: string;
  name: string;
  username: string;
}
