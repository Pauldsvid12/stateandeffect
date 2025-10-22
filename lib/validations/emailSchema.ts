import { z } from 'zod';
import { EMAIL_REQUIRED_MESSAGE, EMAIL_INVALID_MESSAGE } from '@/constants/errorMessages';
//Schema de validacion para correo usando Zod
export const emailSchema = z
  .string({
    required_error: EMAIL_REQUIRED_MESSAGE,
  })
  .min(1, { message: EMAIL_REQUIRED_MESSAGE })
  .email({ message: EMAIL_INVALID_MESSAGE });

/**
 * @param email - El email a validar
 * @returns El mensaje de error o null si es válido
 */
export const validateEmail = (email: string): string | null => {
  try {
    emailSchema.parse(email);
    return null; // Email válido
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || EMAIL_INVALID_MESSAGE;
    }
    return EMAIL_INVALID_MESSAGE;
  }
};
/**
 * @param email email a validar
 * @returns true si es válido y false si no
 */
export const isValidEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};