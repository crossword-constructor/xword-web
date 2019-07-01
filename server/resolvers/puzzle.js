import { generateResponse } from '../utils';
import { Puzzle, User, UserPuzzle } from '../models';

export default {
  Query: {
    playablePuzzle: async (root, args, { req }, info) => {
      if (!req.user.isAdmin) {
        // @todo save error objects as constans somewhere
        return {
          success: false,
          message: 'You must be an admin to view this page',
          code: '403',
        };
      }
      const { _id } = args;
      let user;
      let error;
      let puzzle;
      let userPuzzle;
      try {
        [user, puzzle] = await Promise.all([
          User.findById(req.user._id).populate('solvedPuzzles'),
          Puzzle.findById(_id)
            .select('-clues._id')
            .populate({ path: 'clues.clue', select: 'text' })
            .populate({ path: 'clues.answer', select: 'text' })
            .lean(),
        ]);
        userPuzzle = user.solvedPuzzles.filter(sp => {
          return sp.puzzle.toString() === _id;
        })[0];
        if (!userPuzzle) {
          userPuzzle = await UserPuzzle.create({
            puzzle: _id,
            board: puzzle.board.map(row =>
              row.map(cell => (cell === '#BlackSquare#' ? cell : ''))
            ),
            user: user._id,
            time: 0,
          });
        }
      } catch (err) {
        /** @todo handle mongo error */
        error = err;
      }
      return generateResponse(
        { playablePuzzle: { puzzle, userPuzzle } },
        error
      );
    },

    puzzles: async (root, args, { req }, info) => {
      let error;
      let puzzles;
      if (!req.user.isAdmin) {
        return {
          success: false,
          message: 'You must be an admin to view this page',
          code: '403',
        };
      }
      const { month, year } = args;
      let regex = new RegExp(
        `^(${month})(\/)([0-9]|[0-2][0-9]|(3)[0-1])(\/)(${year})`
      );

      try {
        puzzles = await Puzzle.find({ date: regex }).select(
          'date title author'
        );
      } catch (err) {
        /** @todo handle mongo error */
        error = err;
      }
      return generateResponse({ puzzles: puzzles }, error);
    },
  },
};
