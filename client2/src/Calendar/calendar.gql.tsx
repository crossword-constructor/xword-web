import { gql } from '@apollo/client';
export const FETCH_PUZZLES = gql`
  query PuzzlesByMonth($month: Int!, $year: Int!) {
    getPuzzlesByMonth(month: $month, year: $year) {
      id
      author
      title
      date
      width
      board {
        text
        style
      }
    }
  }
`;
