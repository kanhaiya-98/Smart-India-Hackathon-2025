import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'department_officer', 'field_worker'], default: 'field_worker' },
    department: { type: String },
    avatar: { type: String },
    phone: { type: String },
    bio: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    lastLogin: { type: Date },
    issuesAssigned: { type: Number, default: 0 },
    issuesResolved: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model('User', UserSchema);


