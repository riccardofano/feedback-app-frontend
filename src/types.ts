export interface Comment {
  id: number;
  idRequest: number;
  idParent: number | null;
  content: string;
  replyingTo: string | null;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies: Array<Comment>;
}

export type Request = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  comments: Array<Comment>;
};

export type SimpleRequest = Omit<Request, "comments"> & {
  commentAmount: number;
};

export interface User {
  image: string;
  name: string;
  username: string;
}
