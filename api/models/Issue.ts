import { Schema, model } from 'mongoose';

const IssueSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, enum: ['infrastructure', 'sanitation', 'utilities', 'safety', 'environment'], required: true },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    status: { type: String, enum: ['pending', 'acknowledged', 'in_progress', 'resolved', 'rejected'], default: 'pending' },
    location: {
      address: { type: String, default: '' },
      coordinates: { type: [Number], default: [0, 0] }
    },
    reporter: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' }
    },
    assignedTo: { type: String },
    department: { type: String },
    images: [{ type: String }],
    resolvedAt: { type: Date },
    feedback: {
      rating: { type: Number },
      comment: { type: String }
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default model('Issue', IssueSchema);


