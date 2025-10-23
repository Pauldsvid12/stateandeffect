import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../ui/CustomButton';
import { CustomText } from '../ui/CustomText';
import { useRouter } from 'expo-router';
import { validateEmail } from '@/lib/validations/emailSchema';
import { validatePassword } from '@/lib/validations/passwordSchema';
import { validateUsername } from '@/lib/validations/usernameSchema';
import { validateRegisterForm } from '@/lib/validations/registerSchema';
import { 
  EMAIL_REQUIRED_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  USERNAME_REQUIRED_MESSAGE,
  REGISTER_SUCCESS_MESSAGE
} from '@/constants/errorMessages';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
}

interface RegisterProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
  onBack: () => void;
}

export const Register: React.FC<RegisterProps> = ({ 
  onRegisterSuccess, 
  onSwitchToLogin, 
  onBack 
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // Validación en tiempo real del email
  useEffect(() => {
    if (formData.email && errors.email) {
      const errorMessage = validateEmail(formData.email);
      if (errorMessage) {
        setErrors(prev => ({ ...prev, email: errorMessage }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }
  }, [formData.email]);

  // Validación en tiempo real del username
  useEffect(() => {
    if (formData.username && errors.username) {
      const errorMessage = validateUsername(formData.username);
      if (errorMessage) {
        setErrors(prev => ({ ...prev, username: errorMessage }));
      } else {
        setErrors(prev => ({ ...prev, username: undefined }));
      }
    }
  }, [formData.username]);

  // Validación en tiempo real de la contraseña
  useEffect(() => {
    if (formData.password && errors.password) {
      const errorMessage = validatePassword(formData.password, false);
      if (errorMessage) {
        setErrors(prev => ({ ...prev, password: errorMessage }));
      } else {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    }
  }, [formData.password]);

  // Validación en tiempo real de confirmación de contraseña
  useEffect(() => {
    if (formData.confirmPassword && errors.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: undefined }));
      }
    }
  }, [formData.confirmPassword, formData.password]);

  // Validación completa del formulario usando el schema
  const validateForm = (): boolean => {
    const validationErrors = validateRegisterForm(formData);
    
    if (validationErrors) {
      setErrors(validationErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simular registro
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registro exitoso:', formData);
      
      // Redirigir al dashboard
      router.push('/(tabs)/dashboard');
      onRegisterSuccess();
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView 
        className="flex-1 bg-spotify-black"
        contentContainerClassName="px-6 pt-16 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/*Header*/}
        <View className="mb-8">
          <TouchableOpacity onPress={onBack} className="mb-6">
            <CustomText variant="title" className="text-spotify-gray-light">
              ← Atrás
            </CustomText>
          </TouchableOpacity>

          <CustomText variant="heading" className="mb-2">
            Crear cuenta
          </CustomText>
          <CustomText variant="body" className="text-spotify-gray-light">
            Regístrate gratis y empieza a escuchar
          </CustomText>
        </View>

        {/*Form*/}
        <View className="gap-4">
          {/*Ingresar nombre del usuario - Validado con Schema*/}
          <View>
            <CustomText variant="caption" className="mb-2 text-white">
              Nombre de usuario
            </CustomText>
            <TextInput
              className={`bg-spotify-gray/30 text-white px-4 py-3 rounded-lg border ${
                errors.username ? 'border-red-500' : 'border-transparent'
              }`}
              placeholder="Tu nombre de usuario"
              placeholderTextColor="#B3B3B3"
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              autoCapitalize="none"
            />
            {/* Renderizado condicional del error de username */}
            {errors.username && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.username}
              </CustomText>
            )}
          </View>

          {/*Ingresar correo - Validado con Schema*/}
          <View>
            <CustomText variant="caption" className="mb-2 text-white">
              Correo electrónico
            </CustomText>
            <TextInput
              className={`bg-spotify-gray/30 text-white px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-transparent'
              }`}
              placeholder="nombre@dominio.com"
              placeholderTextColor="#B3B3B3"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {/* Renderizado condicional del error de email */}
            {errors.email && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.email}
              </CustomText>
            )}
          </View>

          {/*Ingresar contraseña - Validado con Schema*/}
          <View>
            <CustomText variant="caption" className="mb-2 text-white">
              Contraseña
            </CustomText>
            <TextInput
              className={`bg-spotify-gray/30 text-white px-4 py-3 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-transparent'
              }`}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor="#B3B3B3"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
            />
            {/* Renderizado condicional del error de password */}
            {errors.password && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.password}
              </CustomText>
            )}
          </View>

          {/*Ingresar confirmación de la contraseña - Validado con Schema*/}
          <View>
            <CustomText variant="caption" className="mb-2 text-white">
              Confirmar contraseña
            </CustomText>
            <TextInput
              className={`bg-spotify-gray/30 text-white px-4 py-3 rounded-lg border ${
                errors.confirmPassword ? 'border-red-500' : 'border-transparent'
              }`}
              placeholder="Repite tu contraseña"
              placeholderTextColor="#B3B3B3"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
            />
            {/* Renderizado condicional del error de confirmPassword */}
            {errors.confirmPassword && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.confirmPassword}
              </CustomText>
            )}
          </View>

          {/*Ver o no ver contraseña*/}
          <TouchableOpacity 
            onPress={() => setPasswordVisible(!passwordVisible)}
            className="self-start"
          >
            <CustomText variant="caption" className="text-spotify-green">
              {passwordVisible ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}
            </CustomText>
          </TouchableOpacity>

          {/*Boton de registro*/}
          <CustomButton
            title="Registrarse"
            variant="primary"
            size="large"
            onPress={handleRegister}
            isLoading={isLoading}
            className="mt-4"
          />

          {/*Ir a loguearte*/}
          <View className="flex-row justify-center items-center mt-6">
            <CustomText variant="body" className="text-spotify-gray-light">
              ¿Ya tienes cuenta?{' '}
            </CustomText>
            <TouchableOpacity onPress={onSwitchToLogin}>
              <CustomText variant="body" className="text-spotify-green font-bold">
                Inicia sesión
              </CustomText>
            </TouchableOpacity>
          </View>

          {/*Términos y condiciones*/}
          <CustomText variant="caption" className="text-center mt-8 text-spotify-gray-light">
            Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.
          </CustomText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};