import styled from "styled-components";
import { useUserContext } from "../contexts/userContext";
import { useEffect, useState } from "react";

interface UserCardProps {
  usrAvatar: string;
  usrName: string;
  usrId: number;
}

export function UserCard({ usrAvatar, usrName, usrId }: UserCardProps) {
  const userContext = useUserContext();
  const [selected, setSelected] = useState("not-selected");
  useEffect(() => {
    if (userContext?.user?.usrId === usrId) {
      setSelected("selected");
    } else {
      setSelected("not-selected");
    }
  }, [userContext?.user, usrId]);

  return (
    <Container
      onClick={() => {
        userContext.activeUser(usrId);
      }}
      className={selected}
    >
      <img src={usrAvatar} alt={`Avatar for ${usrName}`} />
      <p>{usrName}</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: hsl(239, 57%, 85%);
  }
  & > img {
    height: 2rem;
  }
`;
