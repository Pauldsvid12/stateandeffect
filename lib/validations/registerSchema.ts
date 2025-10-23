import { z } from 'zod';
import { emailSchema } from './emailSchema';
import { passwordSimpleSchema } from './passwordSchema';
import { usernameSchema } from './usernameSchema';
import { PASSWORDS_DONT_MATCH_MESSAGE } from '@/constants/errorMessages';

/**
 * Schema completo de validación para el formulario de registro
 * Combina validaciones de email, username y password
 */
export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSimpleSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: PASSWORDS_DONT_MATCH_MESSAGE,
    path: ['confirmPassword'], // El error se mostrará en el campo confirmPassword
  }
);

/**
 * Tipo inferido del schema para TypeScript
 */
export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Función helper para validar el formulario completo
 * @param formData - Los datos del formulario a validar
 * @returns Objeto con errores por campo o null si todo es válido
 */
export const validateRegisterForm = (formData: RegisterFormData): {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
} | null => {
  try {
    registerSchema.parse(formData);
    return null; // Formulario válido
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: any = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!errors[field]) {
          errors[field] = err.message;
        }
      });
      return errors;
    }
    return null;
  }
};