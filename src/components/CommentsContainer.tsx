// @ts-nocheck
import styled from "styled-components";

import { useCommentsContext } from "../contexts/commentContext";
import { useEffect, useState } from "react";

import { Comment } from "./Comment";
import { ReplyForm } from "./ReplyForm";
import { useUserContext } from "../contexts/userContext";

export function CommentsContainer() {
  const commentsContext = useCommentsContext();
  const userContext = useUserContext();
  const [containerKey, setContainerKey] = useState(0);
  // Not the most optimal way but I made de mistake of not sending the user through the Props Injection therefore when the user changes on the context the App does not get reloaded, by forcing a Key on the container I get around that problem

  useEffect(() => {
    setContainerKey((prevKey: number) => prevKey + 1);
  }, [userContext?.user]);

  const sortComments = (comments: Comment[]) => {
    return comments.sort((a: Comment, b: Comment) => b.likeCount - a.likeCount);
  };
  return (
    <Container key={containerKey}>
      {sortComments(commentsContext.comments).map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
      <ReplyForm
        isShown={"display-none"}
        replyToUsr={0}
        commentId={""}
        hideAfterPublish={() => {}}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-inline: auto;
  margin-top: 7rem;
  max-width: 675px;
`;
