import { z } from 'zod';
import { 
  PASSWORD_REQUIRED_MESSAGE, 
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_WEAK_MESSAGE 
} from '@/constants/errorMessages';
/**
 * Schema de validación para contraseña usando Zod
 * Valida longitud mínima
 */
export const passwordSchema = z
  .string({
    required_error: PASSWORD_REQUIRED_MESSAGE,
  })
  .min(1, { message: PASSWORD_REQUIRED_MESSAGE })
  .min(8, { message: PASSWORD_MIN_LENGTH_MESSAGE })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    { message: PASSWORD_WEAK_MESSAGE }
  );

/**
 * Schema simple para contraseña (solo longitud mínima)
 * Útil cuando no quieres aplicar todas las reglas
 */
export const passwordSimpleSchema = z
  .string({
    required_error: PASSWORD_REQUIRED_MESSAGE,
  })
  .min(1, { message: PASSWORD_REQUIRED_MESSAGE })
  .min(8, { message: PASSWORD_MIN_LENGTH_MESSAGE });

/**
 * Función helper para validar contraseña y retornar error si existe
 * @param password - La contraseña a validar
 * @param useStrongValidation - Si true, valida fortaleza (mayúsculas, minúsculas, números)
 * @returns El mensaje de error o null si es válida
 */
export const validatePassword = (
  password: string,
  useStrongValidation: boolean = false
): string | null => {
  try {
    const schema = useStrongValidation ? passwordSchema : passwordSimpleSchema;
    schema.parse(password);
    return null; // Contraseña válida
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || PASSWORD_MIN_LENGTH_MESSAGE;
    }
    return PASSWORD_MIN_LENGTH_MESSAGE;
  }
};

/**
 * Función helper para verificar si una contraseña es válida
 * @param password - La contraseña a validar
 * @param useStrongValidation - Si true, valida fortaleza
 * @returns true si es válida, false si no lo es
 */
export const isValidPassword = (
  password: string,
  useStrongValidation: boolean = false
): boolean => {
  const schema = useStrongValidation ? passwordSchema : passwordSimpleSchema;
  return schema.safeParse(password).success;
};