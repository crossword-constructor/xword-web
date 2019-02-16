import Joi from "joi";
import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
// import { signUp, signIn } from "../schemas";
import { attemptSignIn, signOut } from "../auth";
import { Puzzle } from "../models";

export default {
  Query: {
    puzzle: (root, args, context, info) => {
      console.log(args.id);
      return Puzzle.findById(args.id)
        .select("date title author board clues")
        .populate({ path: "clues.clue", select: "text -_id" })
        .populate({ path: "clues.answer", select: "text -_id" })
        .lean()
        .then(puzzle => {
          console.log(puzzle);
          let formattedClues = [];
          // Why is .map() not working on mongoose array???
          puzzle.clues.forEach(clueObj => {
            formattedClues.push({
              clue: clueObj.clue.text.toString(),
              answer: clueObj.answer.text.toString(),
              position: clueObj.position
            });
          });
          puzzle.clues = formattedClues;
          return puzzle;
        });
      // return {

      // }
    },
    puzzles: (root, args, context, info) => {
      let regex = new RegExp(
        `^(${args.month})(\/)([0-9]|[0-2][0-9]|(3)[0-1])(\/)(${args.year})`
      );
      return Puzzle.find({ date: regex })
        .select("date title author")
        .then(puzzles => {
          return puzzles;
        });
    }
  }
};
