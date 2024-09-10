import React from 'react';
import styled from '@emotion/styled';
import { Clue } from './Clue';
import { ClueAnswerPair } from '../ts-types';
// import

interface CluesProps {
  clues: Record<string, ClueAnswerPair>;
  currentClues: [string, string];
  selectClue: (pair: ClueAnswerPair) => void;
  direction: string;
  isPlaying: boolean;
}
export const Clues = ({
  clues,
  currentClues,
  selectClue,
  direction,
  isPlaying,
}: CluesProps) => {
  return (
    <Wrapper>
      <Container>
        <Title>Across</Title>
        <ScrollContainer>
          <div>
            {Object.keys(clues)
              .filter((clue) => clues[clue].position.indexOf('A') > -1)
              .map((clue) => (
                <Clue
                  key={clues[clue].position}
                  isPlaying={isPlaying}
                  isHighlighted={
                    currentClues[0] === clue && direction === 'across'
                  }
                  isSecondaryHighlight={
                    currentClues[0] === clue && direction === 'down'
                  }
                  selectClue={() => selectClue(clues[clue])}
                  position={clues[clue].position}
                  text={clues[clue].clue.text}
                />
              ))}
          </div>
        </ScrollContainer>
      </Container>
      <Container>
        <Title>Down</Title>
        <ScrollContainer>
          <div>
            {Object.keys(clues)
              .filter((clue) => clues[clue].position.indexOf('D') > -1)
              .map((clue) => (
                <Clue
                  key={clues[clue].position}
                  isPlaying={isPlaying}
                  isHighlighted={
                    currentClues[1] === clue && direction === 'down'
                  }
                  isSecondaryHighlight={
                    currentClues[1] === clue && direction === 'across'
                  }
                  selectClue={() => selectClue(clues[clue])}
                  position={clues[clue].position}
                  text={clues[clue].clue.text}
                />
              ))}
          </div>
        </ScrollContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  /* height: 100%; */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: minmax(20px, 1fr);
  grid-auto-rows: 1fr 1fr;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  /* height: 100%; */
  max-height: 100vh;
  overflow: hidden;
`;

const Title = styled.div`
  width: 100%;
  font-size: calc(var(--s-2) * 2);
  padding: var(--s-1);
  margin-bottom: var(--s-2);
  background: #333;
  color: white;
`;

const ScrollContainer = styled.div`
  overflow-y: scroll;
`;
