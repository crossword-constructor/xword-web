import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { useWorkspaceContext } from '../WorkspaceContext';
import { FIND_MATCHING_WORDS } from '../construct.gql';
export const Fill = () => {
  const {
    state: { playableBoard, selection },
  } = useWorkspaceContext();
  // could add current word to reducer state?
  const currentWord = selection.currentCells
    .map((cell) =>
      !playableBoard[cell[0]][cell[1]].guess
        ? '_'
        : playableBoard[cell[0]][cell[1]].guess
    )
    .join('');

  const { data } = useQuery(FIND_MATCHING_WORDS, {
    variables: { search: currentWord },
    skip: currentWord.length < 3 || currentWord.indexOf('_') === -1,
  });
  if (currentWord.length < 3) return <div></div>;
  return (
    <Container>
      <ol>
        {data?.findMatchingWords?.map((wordData: any) => (
          <li>
            <WordAndScore>
              <div>{wordData.text}</div>
              <div>{wordData.score}</div>
            </WordAndScore>
          </li>
        ))}
      </ol>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const WordAndScore = styled.li`
  width: 80%;
  max-width: 250px;
  display: flex;
  justify-content: space-between;
`;
