export default {
  MutationResponse: {
    __resolveType(mutationResponse, context, info) {
      if (mutationResponse.playablePuzzle) {
        return 'PlayablePuzzleResponse';
      } else if (mutationResponse.user) {
        return 'AuthenticationResponse';
      }
    },
  },

  QueryResponse: {
    __resolveType(queryResponse, context, info) {
      if (queryResponse.username) {
        return 'ProfileInfoResponse';
      }
    },
  },
};
