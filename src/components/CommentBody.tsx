import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../contexts/userContext";
import { dateFormat } from "../utils/dateFormater";

import replyIcon from "../img/icons/icon-reply.svg";
import editIcon from "../img/icons/icon-edit.svg";
import deleteIcon from "../img/icons/icon-delete.svg";

import styled from "styled-components";
import { useCommentsContext } from "../contexts/commentContext";

interface CommentBodyProps {
  commentUser: number;
  commentDate: number;
  commentText: string;
  commentID: string;
  toggleReplyForm: () => void;
}

export function CommentBody({
  commentUser,
  commentDate,
  commentText,
  commentID,
  toggleReplyForm,
}: CommentBodyProps) {
  const userContext = useUserContext();
  const commentsContext = useCommentsContext();
  const user = userContext.getUser(commentUser);
  const textRef = useRef(null);
  const [textAreaInactive, setTextAreaInactive] = useState(true);
  const [textAreaContent, setTextAreaContent] = useState(commentText);

  const [isLoggedUser, setIsloggedUser] = useState(false);
  const [updateDisplay, setUpdateDisplay] = useState("display-none");
  const [modalDisplay, setModalDisplay] = useState("hide-modal");

  const deleteComment = () => {
    commentsContext?.deleteComment(commentID);
  };

  const editComment = () => {
    setTextAreaInactive(false);
  };

  const moveCaretToEnd = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.setSelectionRange(element.value.length, element.value.length);
    }
  };

  const clickUpdate = () => {
    commentsContext.modifyComment(commentID, textRef.current.value);
    setTextAreaInactive(true);
  };

  const checkKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      commentsContext.modifyComment(commentID, textRef.current.value);
      setTextAreaInactive(true);
    }
    if (event.key === "Escape") {
      setTextAreaContent(commentText);
      setTextAreaInactive(true);
    }
  };

  const handleCommentChange = (event) => {
    setTextAreaContent(event.target.value);
  };

  const toggleModal = () => {
    modalDisplay === "hide-modal"
      ? setModalDisplay("")
      : setModalDisplay("hide-modal");
  };

  useEffect(() => {
    if (!textAreaInactive) {
      textRef.current.focus();
      moveCaretToEnd(textRef.current);
      setUpdateDisplay("");
    }
    if (textAreaInactive) {
      setUpdateDisplay("display-none");
    }
  }, [textAreaInactive]);

  useEffect(() => {
    if (userContext?.user?.usrId === commentUser) {
      setIsloggedUser(true);
    }
  }, [userContext.user]);

  return (
    <Container>
      <HeaderContainer>
        <img src={user.usrAvatar}></img>
        <UserContainer>
          <strong>{user.usrName}</strong>
          {isLoggedUser ? <p>You</p> : ""}
        </UserContainer>
        <p>{dateFormat(commentDate)}</p>
        {isLoggedUser ? (
          <ButtonContainer>
            <Button
              style={{ color: "hsl(358, 79%, 66%)" }}
              onClick={toggleModal}
            >
              <img src={deleteIcon} alt="Delete icon" />
              Delete
            </Button>
            <Button onClick={editComment}>
              <img src={editIcon} alt="Edit icon" />
              Edit
            </Button>
          </ButtonContainer>
        ) : (
          <Button onClick={toggleReplyForm}>
            <img src={replyIcon} alt="Reply icon" />
            Reply
          </Button>
        )}
      </HeaderContainer>
      <TextContainer>
        <textarea
          ref={textRef}
          disabled={textAreaInactive}
          onKeyDown={checkKeyPress}
          onChange={handleCommentChange}
          value={textAreaContent}
        />
        <button className={updateDisplay} onClick={clickUpdate}>
          Update
        </button>
      </TextContainer>
      <DeleteModal className={modalDisplay}>
        <div onClick={toggleModal}></div>
        <ModalContent>
          <h2>Delete Comment</h2>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone
          </p>
          <div>
            <button onClick={toggleModal}>No, cancel</button>
            <button
              onClick={deleteComment}
              style={{ backgroundColor: "hsl(358, 79%, 66%)" }}
            >
              Yes, delete
            </button>
          </div>
        </ModalContent>
      </DeleteModal>
    </Container>
  );
}

const Container = styled.div`
  padding-right: 0.5rem;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  & img {
    width: 2rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  & textarea {
    resize: none;
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 0.2rem;
    &:enabled {
      border: 1px solid hsl(238, 40%, 52%);
    }
  }
  & button {
    min-width: 6.5rem;
    height: 2.5rem;
    font-size: 0.8rem;
    margin-top: 1rem;
    margin-left: auto;
    margin-bottom: auto;
    background-color: hsl(238, 40%, 52%);
    color: #fff;
    text-transform: uppercase;
    border-radius: 0.5rem;
  }
`;

const Button = styled.button`
  margin-left: auto;

  & img {
    margin-inline: 0.5rem;
    width: 0.875rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
`;

const UserContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  & p {
    text-transform: lowercase;
    color: #fff;
    background-color: hsl(238, 40%, 52%);
    width: 2.25rem;
    text-align: center;
    border-radius: 0.25rem;
    font-size: 13px;
  }
`;

const DeleteModal = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  & > div:first-child {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 10%, 0.25);
  }
`;

const ModalContent = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  width: 400px;
  border-radius: 8px;
  background-color: #fff;
  line-height: 1.5rem;
  & > div {
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & > button {
      height: 100%;
      width: 10rem;
      border-radius: 8px;
      color: #fff;
      text-transform: uppercase;
      background-color: hsl(211, 10%, 45%);
    }
  }
`;
