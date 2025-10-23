import { z } from 'zod';
import { 
  USERNAME_REQUIRED_MESSAGE,
  USERNAME_MIN_LENGTH_MESSAGE,
  USERNAME_INVALID_MESSAGE
} from '@/constants/errorMessages';

/**
 * Schema de validación para nombre de usuario usando Zod
 * Valida longitud mínima y caracteres permitidos
 */
export const usernameSchema = z
  .string({
    required_error: USERNAME_REQUIRED_MESSAGE,
  })
  .min(1, { message: USERNAME_REQUIRED_MESSAGE })
  .min(3, { message: USERNAME_MIN_LENGTH_MESSAGE })
  .max(20, { message: 'El nombre de usuario no puede tener más de 20 caracteres' })
  .regex(
    /^[a-zA-Z0-9_]+$/,
    { message: USERNAME_INVALID_MESSAGE }
  );

/**
 * Función helper para validar username y retornar error si existe
 * @param username - El username a validar
 * @returns El mensaje de error o null si es válido
 */
export const validateUsername = (username: string): string | null => {
  try {
    usernameSchema.parse(username);
    return null; // Username válido
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || USERNAME_INVALID_MESSAGE;
    }
    return USERNAME_INVALID_MESSAGE;
  }
};

/**
 * Función helper para verificar si un username es válido
 * @param username - El username a validar
 * @returns true si es válido, false si no lo es
 */
export const isValidUsername = (username: string): boolean => {
  return usernameSchema.safeParse(username).success;
};