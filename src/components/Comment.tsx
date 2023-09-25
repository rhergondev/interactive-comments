import styled from "styled-components";

import { CommentBody } from "./CommentBody";
import { LikesCounter } from "./LikesCounter";

import { Comment } from "../contexts/commentContext";
import { useEffect, useState } from "react";
import { ReplyForm } from "./ReplyForm";

export function Comment({ comment }: { comment: Comment }) {
  const [displayReplies, setDisplayReplies] = useState("display-none");
  const [displayReplyForm, setDisplayReplyForm] = useState("display-none");

  useEffect(() => {
    comment.replies === undefined || comment.replies.length === 0
      ? setDisplayReplies("display-none")
      : setDisplayReplies("display-flex");
  }, [comment]);

  const startReply = () => {
    if (displayReplyForm === "") {
      setDisplayReplyForm("display-none");
    } else {
      setDisplayReplyForm("");
    }
  };

  return (
    <Container>
      <CommentContainer className="ctr-comment-content">
        <LikesCounter
          commentLikeCount={comment.likeCount}
          commentId={comment.id}
        />
        <CommentBody
          commentUser={comment.usrId}
          commentDate={comment.date}
          commentText={comment.text}
          commentID={comment.id}
          toggleReplyForm={startReply}
        />
      </CommentContainer>
      <ReplyFormContainer className={displayReplyForm}>
        <ReplyForm
          isShown={displayReplyForm}
          replyToUsr={comment.usrId}
          commentId={comment.id}
          hideAfterPublish={startReply}
        />
      </ReplyFormContainer>
      <RepliesContainer className={displayReplies}>
        <div></div>
        <div>
          {comment.replies
            ?.sort((a: Comment, b: Comment) => b.date - a.date)
            .map((reply: Comment) => {
              return <Comment key={reply.id} comment={reply}></Comment>;
            })}
        </div>
      </RepliesContainer>
    </Container>
  );
}
const Container = styled.div``;

const CommentContainer = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
  border-radius: 0.5rem;
  @media (max-width: 400px) {
    max-width: 343px;
  }
`;

const ReplyFormContainer = styled.div``;

const RepliesContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
  & > :first-child {
    width: 5rem;
    border: 2.4rem solid hsl(228, 33%, 97%);
    background-color: hsl(223, 19%, 93%);
  }

  & > :last-child {
    width: 100%;
  }
`;
