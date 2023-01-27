import type { Comment } from "../types";

export function countComments(comments: Array<Comment>): number {
  if (!comments) {
    return 0;
  }
  return comments.reduce((acc, comment) => acc + countReplies(comment) + 1, 0);
}

function countReplies(comment: Comment): number {
  if (!comment.replies) {
    return 0;
  }

  return countComments(comment.replies);
}
