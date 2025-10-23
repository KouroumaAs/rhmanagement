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

  // Get frontend URL from environment
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  // Create verification URL with matricule directly
  const verificationUrl = `${frontendUrl}/verify?qr=${matricule}`;

  console.log('🔍 Génération QR code avec matricule:', matricule);
  console.log('🌐 URL de vérification:', verificationUrl);

  // Generate QR code with verification URL
  return QRCode.toDataURL(verificationUrl, {
    errorCorrectionLevel: 'H',  // High error correction
    type: 'image/png',
    quality: 1,
    margin: 1,
    width: 300,
    color: {
      dark: '#000000',  // QR code color
      light: '#FFFFFF'  // Background color
    }
  });
};

// Method to mark as printed
badgeSchema.methods.markAsPrinted = async function (): Promise<void> {
  this.status = 'IMPRIME';
  this.printDate = new Date();
  await this.save();
};

export default mongoose.model<IBadge>('Badge', badgeSchema);