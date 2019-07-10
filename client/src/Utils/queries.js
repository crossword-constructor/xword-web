import gql from 'graphql-tag';

export const GET_PROFILE = gql`
  {
    profileInfo {
      success
      message
      user {
        _id
        name
        username
        solvedPuzzles {
          _id
          board
          updatedAt
          puzzle {
            _id
            date
          }
        }
        solvedPuzzleStats {
          total
          solved
          revealed
        }
      }
    }
  }
`;

export const SOLVED_PUZZLES = gql`
  query getSolvedPuzzles($cursor: String) {
    getSolvedPuzzles(cursor: $cursor) {
      success
      message
      solvedPuzzles {
        _id
        board
        puzzle {
          _id
          date
        }
        updatedAt
      }
    }
  }
`;

export const FETCH_PUZZLES = gql`
  query Puzzles($month: String, $year: String) {
    puzzles(month: $month, year: $year) {
      success
      message
      puzzles {
        _id
        # author
        # title
        date
      }
    }
  }
`;

export const TODAYS_PUZZLE = gql`
  query TodaysPuzzle($date: String!) {
    todaysPuzzle(date: $date) {
      success
      message
      puzzle {
        _id
        title
        date
        editor
        author
      }
    }
  }
`;

export const GET_PUZZLE = gql`
  query PlayablePuzzle($puzzleId: ID!) {
    playablePuzzle(_id: $puzzleId) {
      success
      message
      playablePuzzle {
        puzzle {
          _id
          title
          author
          date
          publisher
          board
          clues {
            answer {
              _id
              text
            }
            clue {
              _id
              text
            }
            position
          }
        }
        userPuzzle {
          _id
          board
          revealedCells
          isRevealed
          isSolved
          time
        }
      }
    }
  }
`;
