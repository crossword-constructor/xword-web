import { gql } from '@apollo/client';
export const GET_PUZZLE = gql`
  query PlayablePuzzle($puzzleId: ID!) {
    playablePuzzle(id: $puzzleId) {
      puzzle {
        id
        title
        author
        date
        width
        publisher
        board {
          text
          style
        }
        clues {
          answer {
            id
            text
          }
          clue {
            id
            text
          }
          position
        }
      }
      userPuzzle {
        id
        board {
          text
          style
        }
        revealedCells
        isRevealed
        isSolved
        time
      }
    }
  }
`;
