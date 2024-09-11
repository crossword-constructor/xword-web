import { gql } from '@apollo/client';

export const FIND_MATCHING_WORDS = gql`
  query findMatchingWords($search: String!) {
    findMatchingWords(search: $search) {
      text
      score
      wordListId
    }
  }
`;
