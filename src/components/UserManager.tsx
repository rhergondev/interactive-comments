import { useUserContext } from "../contexts/userContext";
import styled from "styled-components";
import { UserCard } from "./UserCard";
import ReactIcon from "/softwareIcons/physics.png";
import TypeScriptIcon from "/softwareIcons/typescript.png";
import SassIcon from "/softwareIcons/sass.png";

export function UserManager() {
  const userContext = useUserContext();
  return (
    <Container>
      <WrittenInContainer className="annotation-class">
        <p>Written In:</p>
        <img src={ReactIcon} alt="React JS Icon" />
        <img src={TypeScriptIcon} alt="Typescript Icon" />
        <img src={SassIcon} alt="Sass Icon" />
      </WrittenInContainer>

      <ButtonsContainer>
        {userContext?.users.map((user) => {
          return (
            <UserCard
              key={user.usrId}
              usrAvatar={user.usrAvatar}
              usrName={user.usrName}
              usrId={user.usrId}
            />
          );
        })}
      </ButtonsContainer>
      <PortfolioContainer className="annotation-class">
        <a href="/">Back to Landing Page</a>
      </PortfolioContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: hsl(223, 19%, 93%);
  justify-content: space-around;
  z-index: 500;
`;

const ButtonsContainer = styled.div`
  margin-inline: auto;
  max-width: 730px;
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
`;

const WrittenInContainer = styled.div`
  height: 2.25rem;
  position: absolute;
  left: 1rem;
  padding-block: 1.4rem;
  padding-inline: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #8e8e9f;
  border-radius: 0.5rem;
  & img {
    height: 2rem;
  }

  @media (max-width: 1400px) {
    display: none;
  }
`;

const PortfolioContainer = styled.div`
  position: absolute;
  height: 3rem;
  right: 1rem;
  border: 2px solid #8e8e9f;
  border-radius: 0.5rem;
  &:hover {
    background-color: #8e8e9f;

    & a {
      color: hsl(228, 33%, 97%);
    }
  }
  & a {
    height: 100%;
    width: 100%;
    overflow: hidden;
    line-height: 2.5rem;
    padding-block: 1.4rem;
    padding-inline: 0.5rem;
    color: #8e8e9f;
    text-decoration: none;
  }

  @media (max-width: 1400px) {
    display: none;
  }
`;
