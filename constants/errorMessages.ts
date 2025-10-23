/**
 * Mensajes de error user-friendly para validación de formularios
 * Centralizados para mantener consistencia en toda la aplicación
 */

// ============================================
// MENSAJES DE ERROR PARA EMAIL
// ============================================
export const EMAIL_REQUIRED_MESSAGE = 'El correo es requerido';
export const EMAIL_INVALID_MESSAGE = 'Correo electrónico inválido';

// ============================================
// MENSAJES DE ERROR PARA PASSWORD
// ============================================
export const PASSWORD_REQUIRED_MESSAGE = 'La contraseña es requerida';
export const PASSWORD_MIN_LENGTH_MESSAGE = 'La contraseña debe tener al menos 8 caracteres';
export const PASSWORD_WEAK_MESSAGE = 'La contraseña debe contener mayúsculas, minúsculas y números';
export const PASSWORDS_DONT_MATCH_MESSAGE = 'Las contraseñas no coinciden';

// ============================================
// MENSAJES DE ERROR PARA USERNAME
// ============================================
export const USERNAME_REQUIRED_MESSAGE = 'El nombre de usuario es requerido';
export const USERNAME_MIN_LENGTH_MESSAGE = 'El nombre de usuario debe tener al menos 3 caracteres';
export const USERNAME_INVALID_MESSAGE = 'El nombre de usuario solo puede contener letras, números y guiones bajos';

// ============================================
// MENSAJES DE ERROR GENERALES
// ============================================
export const GENERAL_LOGIN_ERROR = 'Correo o contraseña incorrectos';
export const GENERAL_REGISTER_ERROR = 'Error al registrar. Por favor, intenta de nuevo';
export const NETWORK_ERROR = 'Error de conexión. Por favor, intenta de nuevo';

// ============================================
// MENSAJES DE ÉXITO
// ============================================
export const EMAIL_VALID_MESSAGE = 'Correo electrónico válido';
export const LOGIN_SUCCESS_MESSAGE = 'Inicio de sesión exitoso';
export const REGISTER_SUCCESS_MESSAGE = 'Registro exitoso. Bienvenido a Spotify';