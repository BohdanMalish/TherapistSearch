/**
 * Utility for displaying alerts
 * Uses Ionic Alert for beautiful error display
 */
export const showErrorAlert = async (message: string) => {
  // Dynamic import of Ionic Alert
  const { alertController } = await import('@ionic/core');
  
  const alert = await alertController.create({
    header: 'Error',
    message: message,
    buttons: ['OK'],
    cssClass: 'error-alert',
  });

  await alert.present();
};

export const showSuccessAlert = async (message: string) => {
  const { alertController } = await import('@ionic/core');
  
  const alert = await alertController.create({
    header: 'Success',
    message: message,
    buttons: ['OK'],
    cssClass: 'success-alert',
  });

  await alert.present();
};

