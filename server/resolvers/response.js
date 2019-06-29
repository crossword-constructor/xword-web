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
};
