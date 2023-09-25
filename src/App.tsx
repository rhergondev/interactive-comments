import { UsersProvider } from "./contexts/userContext";
import { CommentsProvider } from "./contexts/commentContext";
import { CommentsContainer } from "./components/CommentsContainer";
import { UserManager } from "./components/UserManager";
import styled from "styled-components";

export function App() {
  return (
    <UsersProvider>
      <UserManager />
      <AnnotationContainer className="annotation-class">
        <h1>Notes:</h1>
        <p>Swap freely between users to test out the application</p>
        <p>
          Comments are sorted by number of likes, feel free to add or subtract
          likes to see this functionality
        </p>
        <p>
          Replies are sorted by date, the now tag lasts 60 seconds, the page is
          not setup to reload a component after the time tag changes but it will
          change with the normal use of the page
        </p>
        <p>
          Visit the Readme file or the source code in Github for additional
          information on the app
        </p>
        <LinkContainer>
          <a href="https://github.com/rhergon/interactive-comments/tree/main/src">
            Source in Github
          </a>
          <a href="https://github.com/rhergon/interactive-comments/tree/main#readme">
            Readme
          </a>
        </LinkContainer>
      </AnnotationContainer>
      <CommentsProvider>
        <CommentsContainer />
      </CommentsProvider>
    </UsersProvider>
  );
}

const AnnotationContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  left: 1rem;
  width: 21rem;
  padding-block: 1.4rem;
  padding-inline: 0.5rem;
  @media (max-width: 1400px) {
    display: none;
  }
`;
const LinkContainer = styled.div`
  align-self: center;
  width: 100%;
  display: flex;
  justify-content: space-around;

  & a {
    width: 9rem;
    text-align: center;
    border: 2px solid #8e8e9f;
    border-radius: 0.5rem;
    line-height: 2.5rem;

    padding-inline: 0.5rem;
    color: #8e8e9f;
    text-decoration: none;

    &:hover {
      background-color: #8e8e9f;
      color: hsl(228, 33%, 97%);
    }
  }
`;
