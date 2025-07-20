import mongoose from 'mongoose';

const { Document, Schema, models, model } = mongoose;

export interface IChoice extends Document {
        question_id: mongoose.Types.ObjectId;
        // choices: Array;
        choice_text: string;
        is_correct: boolean;
}

const ChoiceSchema: Schema = new Schema<IChoice>(
    {
        question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
        // choices: { type: Array, required: true },
        choice_text: { type: String, required: true },
        is_correct: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);

export default models.Choice || model<IChoice>('Choice', ChoiceSchema);
