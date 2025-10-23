/**
 * Error Handling Utilities
 * Central location for error handling helpers
 */

import { ApiError, handleApiError as apiErrorHandler } from '../services/api';

// Re-export for convenience
export { ApiError, apiErrorHandler as handleApiError };

/**
 * Format error message for display to user
 * Handles ApiError, Error, and unknown error types
 */
export function formatErrorMessage(error: any): string {
  if (error instanceof ApiError) {
    return error.getUserMessage();
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return "Une erreur inattendue est survenue";
}

/**
 * Check if error is an authentication error (401)
 */
export function isAuthError(error: any): boolean {
  return error instanceof ApiError && error.status === 401;
}

/**
 * Check if error is a permission error (403)
 */
export function isPermissionError(error: any): boolean {
  return error instanceof ApiError && error.status === 403;
}

/**
 * Check if error is a not found error (404)
 */
export function isNotFoundError(error: any): boolean {
  return error instanceof ApiError && error.status === 404;
}

/**
 * Check if error is a validation error (400, 422)
 */
export function isValidationError(error: any): boolean {
  return error instanceof ApiError && (error.status === 400 || error.status === 422);
}

/**
 * Check if error is a server error (5xx)
 */
export function isServerError(error: any): boolean {
  return error instanceof ApiError && error.status >= 500 && error.status < 600;
}

/**
 * Get validation errors from API response
 * Returns an object mapping field names to error messages
 */
export function getValidationErrors(error: any): Record<string, string> {
  if (!(error instanceof ApiError) || !error.data?.errors) {
    return {};
  }

  const errors: Record<string, string> = {};

  if (Array.isArray(error.data.errors)) {
    error.data.errors.forEach((err: any) => {
      if (err.field && err.message) {
        errors[err.field] = err.message;
      }
    });
  }

  return errors;
}

/**
 * Log error to console with proper formatting
 */
export function logError(context: string, error: any): void {
  console.group(`❌ Error in ${context}`);

  if (error instanceof ApiError) {
    console.error('Status:', error.status);
    console.error('Message:', error.message);
    console.error('Data:', error.data);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  } else {
    console.error('Unknown error:', error);
  }

  console.groupEnd();
}

/**
 * Example usage in components:
 *
 * import { formatErrorMessage, isAuthError, logError } from '@/src/utils/errors';
 *
 * try {
 *   await someApiCall();
 * } catch (error) {
 *   logError('MyComponent', error);
 *
 *   if (isAuthError(error)) {
 *     router.push('/login');
 *   }
 *
 *   toast({
 *     variant: "destructive",
 *     description: formatErrorMessage(error),
 *   });
 * }
 */
