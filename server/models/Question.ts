import mongoose from 'mongoose';

const { Document, Schema, models, model } = mongoose;


export interface IQuestion extends Document {
    text: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    choices: {
      a: { type: String, required: true },
      b: { type: String, required: true },
      c: { type: String, required: true },
      d: { type: String, required: true }
    },
    correctAnswer: { type: String, enum: ['a', 'b', 'c', 'd'], required: true },
    game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }
}

const QuestionSchema: Schema = new Schema<IQuestion>(
    {
        text    : { type: String, required: true },
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
        choices : {
          a: { type: String, required: true },
          b: { type: String, required: true },
          c: { type: String, required: true },
          d: { type: String, required: true }
        },
        correctAnswer: { type: String, enum: ['a', 'b', 'c', 'd'], required: true },
        game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }
    },
    {
        timestamps: true,
    }
);

export default models.Question || model<IQuestion>('Question', QuestionSchema);
