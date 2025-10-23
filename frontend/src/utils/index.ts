import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to French format
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Format datetime to French format
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/**
 * Generate QR code string for employee
 */
export function generateQRCode(matricule: string, type: string): string {
  const year = new Date().getFullYear();
  const typeCode = type.replace("_", "-");
  return `QR-${year}-${matricule}-${typeCode}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number (Guinea format)
 */
export function isValidPhone(phone: string): boolean {
  const regex = /^\+224\s?\d{2,3}\s?\d{3}\s?\d{3,4}$/;
  return regex.test(phone);
}

/**
 * Validate matricule format
 */
export function isValidMatricule(matricule: string): boolean {
  const regex = /^MAT-\d{4}-\d{3}$/;
  return regex.test(matricule);
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  // Remove all spaces and format as +224 XX XXX XXXX
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("+224")) {
    const number = cleaned.substring(4);
    return `+224 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5)}`;
  }
  return phone;
}

/**
 * Check if contract is expired
 */
export function isContractExpired(endDate: string): boolean {
  const end = new Date(endDate);
  const today = new Date();
  return end < today;
}

/**
 * Check if contract expires soon (within 30 days)
 */
export function isContractExpiringSoon(endDate: string): boolean {
  const end = new Date(endDate);
  const today = new Date();
  const daysUntilExpiry = Math.floor((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
}

/**
 * Calculate days until contract expiry
 */
export function daysUntilExpiry(endDate: string): number {
  const end = new Date(endDate);
  const today = new Date();
  return Math.floor((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}

/**
 * Download file from blob
 */
export function downloadFile(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}