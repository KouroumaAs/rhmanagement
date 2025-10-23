import mongoose, { Schema } from 'mongoose';
import { IBadge } from '../types';
import QRCode from 'qrcode';

const badgeSchema = new Schema<IBadge>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, "L'employé est requis"],
    },
    status: {
      type: String,
      enum: ['EN_ATTENTE', 'IMPRIME'],
      default: 'EN_ATTENTE',
    },
    qrCode: {
      type: String,
      required: true,
      unique: true,
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    printDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// QR code is now set explicitly when creating badge (using employee matricule)
// No automatic generation needed

// Method to generate QR code image
badgeSchema.methods.generateQRCodeImage = async function (): Promise<string> {
  // Ensure employee is populated
  if (!this.populated('employee')) {
    await this.populate('employee');
  }
  const employee = this.employee as any;

  // Get matricule
  const matricule = employee?.matricule || this.qrCode;

  // Generate frontend verification URL
  const frontendUrl = process.env.FRONTEND_URL || 'http://192.168.100.171:3000';
  const verificationUrl = `${frontendUrl}/verify?qr=${matricule}`;

  console.log('🔍 Génération QR code avec URL:', verificationUrl);

  // Generate QR code with full URL for verification
  return QRCode.toDataURL(verificationUrl);
};

// Method to mark as printed
badgeSchema.methods.markAsPrinted = async function (): Promise<void> {
  this.status = 'IMPRIME';
  this.printDate = new Date();
  await this.save();
};

export default mongoose.model<IBadge>('Badge', badgeSchema);