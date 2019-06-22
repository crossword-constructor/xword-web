import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
// import { signUp, signIn } from "../schemas";
// import { attemptSignIn, signOut } from "../auth";
import { Puzzle } from '../models';

export default {
  Query: {
    puzzle: (root, args, context, info) => {
      console.log(args.id);
      return Puzzle.findById(args.id)
        .select('-clues._id')
        .populate({ path: 'clues.clue', select: 'text' })
        .populate({ path: 'clues.answer', select: 'text' })
        .lean()
        .then(puzzle => {
          console.log('HELLO');
          console.log(puzzle.clues[puzzle.clues.length - 1]);
          // console.log(
          //   puzzle.clues.forEach((clue, i) => {
          //     if (!clue) {
          //       return console.log('NO CLUE AT ', i);
          //     }
          //     console.log(clue);
          //   })
          // );
          // let formattedClues = [];
          // Why is .map() not working on mongoose array???
          // puzzle.clues.forEach(clueObj => {
          //   formattedClues.push({
          //     clue: clueObj.clue.text.toString(),
          //     answer: clueObj.answer.text.toString(),
          //     position: clueObj.position,
          //   });
          // });
          // console.log(puzzle.clues);
          // puzzle.clues = formattedClues;
          return puzzle;
        });
      // return {

      // }
    },
    puzzles: (root, args, { req }, info) => {
      console.log('user: ', req.user);
      let regex = new RegExp(
        `^(${args.month})(\/)([0-9]|[0-2][0-9]|(3)[0-1])(\/)(${args.year})`
      );
      return Puzzle.find({ date: regex })
        .select('date title author')
        .then(puzzles => {
          return puzzles;
        });
    },
  },
};
