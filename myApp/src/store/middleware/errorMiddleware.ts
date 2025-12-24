import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { showErrorAlert } from '../../utils/alert';

/**
 * Middleware for handling API errors
 * Shows Ionic Alert on errors
 */
export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload;
    
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error && typeof error === 'object') {
      // 1. Check network errors (backend unavailable)
      if ('status' in error) {
        if (error.status === 'FETCH_ERROR') {
          errorMessage = '❌ Failed to connect to server.\nMake sure backend is running.';
        } else if (error.status === 'PARSING_ERROR') {
          errorMessage = '❌ Error parsing server response.';
        } else if (error.status === 'TIMEOUT_ERROR') {
          errorMessage = '⏱️ Request timed out.\nPlease try again.';
        }
      }
      
      // 2. Check API errors from backend
      if ('data' in error) {
        const errorData = error.data;
        
        if (Array.isArray(errorData)) {
          // Array of validation errors
          errorMessage = errorData.join('\n');
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
      }
    }

    // Show Ionic Alert
    if (typeof window !== 'undefined') {
      // Use setTimeout to avoid blocking Redux
      setTimeout(() => {
        showErrorAlert(errorMessage);
      }, 0);
    }

    console.error('API Error:', action.payload);
    console.error('Error message:', errorMessage);
  }

  return next(action);
};

