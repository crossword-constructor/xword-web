import Joi from "joi";
import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
// import { signUp, signIn } from "../schemas";
import { attemptSignIn, signOut } from "../auth";
import { Puzzle } from "../models";

export default {
  Query: {
    puzzle: (root, args, context, info) => {
      console.log(args);
      return {
        id: "1",
        title: "hello",
        date: "2/15/1942",
        author: "me",
        publisher: "dsfdsf",
        editor: "dfsdf"
      };
      // return {

      // }
    },
    puzzles: (root, args, context, info) => {
      console.log("getting puzzle");
      console.log(args.month);
      console.log(args.year);
      let regex = new RegExp(
        `^(${args.month})(\/)([0-9]|[0-2][0-9]|(3)[0-1])(\/)(${args.year})`
      );
      console.log(regex);
      return Puzzle.find({ date: regex })
        .select("date title author")
        .then(puzzles => {
          console.log("puzzles: ", puzzles);
          return puzzles;
        });
    }
  }
};
