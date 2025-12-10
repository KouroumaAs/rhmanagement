/**
 * Types pour la vérification QR Code
 */

export interface EmployeeVerificationData {
  matricule: string;
  prenom?: string;
  nom?: string;
  status?: 'ACTIF' | 'SUSPENDU' | 'TERMINE' | 'BLOQUE';
  telephone?: string;
  fonction?: string;
  dateFinContrat?: string;
}

export interface VerificationResult {
  verified: boolean;
  message: string;
  employee?: EmployeeVerificationData;
}

export interface QRScanResult {
  getText: () => string;
}
