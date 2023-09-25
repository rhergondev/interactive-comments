import styled from "styled-components";
import { useUserContext } from "../contexts/userContext";
import { useEffect, useRef, useState } from "react";
import { useCommentsContext } from "../contexts/commentContext";

interface ReplyFormProps {
  isShown: string;
  commentId: string;
  replyToUsr: number;
  hideAfterPublish: () => void;
}

export function ReplyForm({
  isShown = "",
  replyToUsr = 0,
  commentId = "",
  hideAfterPublish = () => {},
}: ReplyFormProps) {
  const userContext = useUserContext();
  const commentsContext = useCommentsContext();
  const [textAreaContent, setTextAreaContent] = useState("");

  const textAreaRef = useRef(null);

  const getUsrReplyToName = () => {
    const userName =
      replyToUsr !== 0 ? userContext?.getUser(replyToUsr)?.usrName : "";
    if (userName) {
      setTextAreaContent(`@${userName} `);
    }
  };

  useEffect(() => {
    getUsrReplyToName();
  }, [replyToUsr]);

  const handleTextAreaChange = (event) => {
    setTextAreaContent(event.target.value);
  };

  const moveCaretToEnd = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.setSelectionRange(element.value.length, element.value.length);
    }
  };

  const publishReply = () => {
    if (textAreaRef.current.value.length > 0 && textAreaRef.current.value) {
      commentsContext?.addComment(
        userContext?.user?.usrId,
        textAreaRef.current.value,
        commentId
      );
      setTextAreaContent("");
    }
    hideAfterPublish();
  };

  const checkAvatar = () => {
    return userContext?.user?.usrAvatar.includes("/avatars")
      ? userContext?.user?.usrAvatar
      : `/avatars/${userContext?.user?.usrAvatar}`;
  };

  useEffect(() => {
    if (isShown !== "display-none") {
      textAreaRef.current.focus();
      moveCaretToEnd(textAreaRef.current);
    }
  }, [isShown]);
  return (
    <Container>
      <img src={checkAvatar()} />
      <textarea
        value={textAreaContent}
        onChange={handleTextAreaChange}
        ref={textAreaRef}
        placeholder="Add a comment..."
      />
      <button onClick={publishReply}>Send</button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 9rem;
  background-color: #fff;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  border-radius: 0.5rem;

  & img {
    height: 2.5rem;
  }

  & textarea {
    width: 100%;
    color: hsl(211, 10%, 45%);
    border: 1px solid hsl(223, 19%, 93%);
    border-radius: 0.5rem;
    padding: 1rem;
    resize: none;
    caret-color: hsl(238, 40%, 52%);
    p & :active {
      border-color: hsl(238, 40%, 52%);
    }
  }
  & button {
    min-width: 6.5rem;
    height: 2.5rem;
    margin-bottom: auto;
    background-color: hsl(238, 40%, 52%);
    color: #fff;
    text-transform: uppercase;
    border-radius: 0.5rem;
  }
`;
