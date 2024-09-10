import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface ClueProps {
  isHighlighted: boolean;
  isSecondaryHighlight: boolean;
  selectClue: () => void;
  position: string;
  text: string;
  isPlaying: boolean;
}
export const Clue = ({
  isHighlighted,
  isSecondaryHighlight,
  selectClue,
  position,
  text,
  isPlaying,
}: ClueProps) => {
  const clueRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (clueRef.current && (isHighlighted || isSecondaryHighlight)) {
      // @TODO we can't set behavior smooth...only the down column will scroll.'
      // if (isSecondaryHighlight) {
      //   setTimeout(() => {
      //     console.log('scrolling secondary');
      clueRef.current.scrollIntoView();
      //   }, 260);
      // } else if (isHighlighted) {
      //   console.log('scrolling primary');
      //   clueRef.current.scrollIntoView({ behavior: 'smooth' });
      // }
    }
  }, [isHighlighted, isSecondaryHighlight]);

  return (
    <Container $highlight={isHighlighted}>
      <SecondaryHighlight $secondaryHighlight={isSecondaryHighlight} />
      <ClueText
        role="button"
        tabIndex={-1}
        onClick={selectClue}
        onKeyDown={selectClue}
        $isHidden={!isPlaying}
      >
        <span style={{ fontWeight: 600 }}>{position}</span> {text}
      </ClueText>
    </Container>
  );
};

interface ContainerProps {
  $highlight: boolean;
}
const Container = styled.li<ContainerProps>`
  padding: 5px;
  /* font-size: var(--s0); */
  background-color: ${({ $highlight }) => {
    if ($highlight) return 'rgb(99, 167, 255)';
    return 'inherit';
  }};
  display: flex;
  cursor: pointer;
`;

interface ClueTextProps {
  $isHidden: boolean;
}
const ClueText = styled.div<ClueTextProps>`
  max-width: var(--s5);
  background: ${({ $isHidden }) => ($isHidden ? 'inherit' : '#999')};
  color: 'black';
  transition: 0.2s;
  //
`;

interface SecondaryHighlightProps {
  $secondaryHighlight: boolean;
}
const SecondaryHighlight = styled.div<SecondaryHighlightProps>`
  min-width: 10px;
  margin-right: 4px;
  background: ${({ $secondaryHighlight }) =>
    $secondaryHighlight ? 'rgb(99, 167, 255)' : 'inherit'};
`;
// .clue {
//   padding: 5px;
//   /* font-size: var(--s0); */
//   display: flex;
//   cursor: pointer;
// }

// .clueText {
//   max-width: var(--s5);
//   background: inherit;
//   color: var(--black);
//   transition: 0.2s;
// }

// .hiddenClueText {
//   composes: clueText;
//   background: #999;
//   color: #999;
//   border-radius: 3px;
// }

// .highlighted {
//   composes: clue;
//   background: rgb(99, 167, 255);
// }

// .secondaryNoHighlight {
//   min-width: 10px;
//   margin-right: 4px;
//   /* border: 1px solid red; */
// }

// .secondaryHighlight {
//   composes: secondaryNoHighlight;
//   background: rgb(99, 167, 255);
// }
