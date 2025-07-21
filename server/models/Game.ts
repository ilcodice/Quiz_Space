// models/Game.ts
import mongoose from 'mongoose';

const { Document, Schema, models, model } = mongoose;

export interface IGame extends Document {
    mode: string;
    name: string;
    user_id: mongoose.Types.ObjectId;
    start_time: Date;
    end_time: Date;
    max_players: number;
    difficulty: string;
    startDate: string;
    score: number;
}

const GameSchema: Schema = new Schema<IGame>(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String },
        mode: { type: String },
        start_time: { type: Date, required: true },
        end_time: { type: Date },
        max_players: { type: Number, default: 1 },
        difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
        startDate: { type: String, required: true },
    },  
    {
        timestamps: true,
    }
);

export default models.Game || model<IGame>('Game', GameSchema);