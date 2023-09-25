// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";
import commentData from "../data/comments.json";

interface CommentsContextType {
  comments: Comment[] | undefined;
  addLikes: (commentId: string) => void;
  removeLikes: (commentId: string) => void;
  addComment: (userID: number, commentText: string, commentId: string) => void;
  deleteComment: (commentID: string) => void;
  modifyComment: (commentID: string, commentText: string) => void;
}

export interface Comment {
  id: string;
  date: number;
  usrId: number;
  likeCount: number;
  text: string;
  replies: Comment[] | undefined;
}

interface CommentsProviderProps {
  children: React.ReactNode;
}

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export function useCommentsContext() {
  return useContext(CommentsContext);
}

export const CommentsProvider: React.FC<CommentsProviderProps> = ({
  children,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setComments(commentData.comments);
  }, []);

  const addLikes = (commentId: string) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likeCount: comment.likeCount + 1,
          };
        } else {
          const replies = comment.replies.map((reply) => {
            if (reply.id === commentId) {
              return { ...reply, likeCount: reply.likeCount + 1 };
            } else {
              return reply;
            }
          });
          const newComment = { ...comment, replies: replies };
          return newComment;
        }
      });
    });
  };

  const removeLikes = (commentId: string) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId && comment.likeCount > 0) {
          return {
            ...comment,
            likeCount: comment.likeCount - 1,
          };
        } else {
          const replies = comment.replies.map((reply) => {
            if (reply.id === commentId && reply.likeCount > 0) {
              return { ...reply, likeCount: reply.likeCount - 1 };
            } else {
              return reply;
            }
          });
          const newComment = { ...comment, replies: replies };
          return newComment;
        }
      });
    });
  };

  const addComment = (
    userId: number,
    commentText: string,
    commentId: string
  ) => {
    const createdTimeMinutes = Date.now();
    const newComment = {
      id: Math.random(),
      date: createdTimeMinutes,
      usrId: userId,
      likeCount: 0,
      text: commentText,
      replies: [],
    };
    if (commentId !== "") {
      const parentId = getParentId(commentId);
      setComments((previousComments) => {
        return previousComments.map((comment) => {
          if (comment.id === parentId) {
            const addedReply = [...comment.replies, newComment];
            const modifiedComment = { ...comment, replies: addedReply };
            return modifiedComment;
          }
          return comment;
        });
      });
    } else {
      setComments((previousComments) => {
        return [...previousComments, newComment];
      });
    }
  };

  const getParentId = (commentId: string) => {
    const parent = comments.find((comment) =>
      comment.replies.find((reply) => reply.id === commentId)
    );
    if (parent !== undefined) {
      return parent.id;
    } else {
      return commentId;
    }
  };

  const modifyComment = (commentId: string, commentText: string) => {
    if (commentText) {
      setComments((previousComments) => {
        return previousComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, text: commentText };
          }
          return comment;
        });
      });
    }
  };

  const deleteComment = (commentID: string) => {
    setComments((previousComments) => {
      const firstLevelComments = previousComments.filter(
        (comment) => comment.id !== commentID
      );
      return firstLevelComments.map((FLcomment) => {
        if (FLcomment.replies) {
          FLcomment.replies = FLcomment.replies.filter(
            (reply) => reply.id !== commentID
          );
        }
        return FLcomment;
      });
    });
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        addLikes,
        removeLikes,
        addComment,
        deleteComment,
        modifyComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
