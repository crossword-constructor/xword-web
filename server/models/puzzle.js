import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const Puzzle = new mongoose.Schema({
  editor: { type: String },
  title: { type: String },
  author: { type: String },
  publisher: { type: String },
  clues: [
    {
      position: { type: String },
      answer: { type: ObjectId, ref: "Answer" },
      clue: { type: ObjectId, ref: "Clue" }
    }
  ],
  date: { type: String },
  dimensions: {
    rows: { type: Number },
    columns: { type: Number }
  },
  board: []
});

export default mongoose.model("Puzzle", Puzzle);
