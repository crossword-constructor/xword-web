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
