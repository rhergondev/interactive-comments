import styled from "styled-components";
import { useCommentsContext } from "../contexts/commentContext";

import minus from "../img/icons/icon-minus.svg";
import plus from "../img/icons/icon-plus.svg";

interface LikesCounterProps {
  commentLikeCount: number;
  commentId: string;
}

export function LikesCounter({
  commentLikeCount,
  commentId,
}: LikesCounterProps) {
  const commentsContext = useCommentsContext();
  return (
    <LikesContainer className="ctr-likes">
      <CounterButton onClick={() => commentsContext.addLikes(commentId)}>
        <img src={plus} alt="Image of a plus sign" />
      </CounterButton>
      <CounterText>{commentLikeCount}</CounterText>
      <CounterButton onClick={() => commentsContext.removeLikes(commentId)}>
        <img src={minus} alt="Image of a minus sign" />
      </CounterButton>
    </LikesContainer>
  );
}

const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100px;
  width: 40px;
  min-width: 40px;
  border-radius: 10px;
`;

const CounterButton = styled.button``;

const CounterText = styled.p``;
