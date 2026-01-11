import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFactCheck extends Document {
  statement: string;
  verdict: 'True' | 'False' | 'Misleading' | 'Unverified';
  explanation: string;
  source?: string;
}

const FactCheckSchema: Schema = new Schema({
  statement: { type: String, required: true },
  verdict: { type: String, required: true },
  explanation: { type: String, required: true },
  source: String,
}, { timestamps: true });

const FactCheck: Model<IFactCheck> = mongoose.models.FactCheck || mongoose.model<IFactCheck>('FactCheck', FactCheckSchema);
export default FactCheck;
