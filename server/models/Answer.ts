import mongoose from 'mongoose';

const { Document, Schema, models, model } = mongoose;



export interface IAnswer extends Document {
    user_id: mongoose.Types.ObjectId;
    question_id: mongoose.Types.ObjectId;
    game_id: mongoose.Types.ObjectId;
    selected_choice_id: mongoose.Types.ObjectId;
    taken_time: number;
    score: number;
    answers: Array<{
        question_id: mongoose.Types.ObjectId;
        choice_id: mongoose.Types.ObjectId;
        is_correct: boolean;
      }>;
}

const AnswerSchema: Schema = new Schema<IAnswer>(
    {
        user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        game_id: {type: Schema.Types.ObjectId, ref: 'Game', required: true},
        question_id: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
        taken_time: {type: Number, required: true},
        score: {type: Number, required: true},
        answers: [{
            question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
            choice_id: { type: Schema.Types.ObjectId, ref: 'Choice', required: true },
            is_correct: { type: Boolean, required: true }
          }]
    },
    {
        timestamps: true,
    }
);

export default models.Answer || model<IAnswer>('Answer', AnswerSchema);