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
      return "puzzle 1237396278";
    }
  }
};
