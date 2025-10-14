import {View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import { CustomText } from '../ui/CustomText';
import { CustomButton } from '../ui/CustomButton';

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
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  useEffect(() => {//validacion en tiempo real
    if (formData.email && errors.email) {
      validateEmail(formData.email);
    }
  }, [formData.email]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Correo electrónico inválido' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: undefined }));
    return true;
  };
  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'La contraseña debe tener al menos 8 caracteres' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: undefined }));
    return true;
  };
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => {//simular registro
      setIsLoading(false);
      console.log('Registro exitoso:', formData);
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
          {/*Ingresar nombre del usuario*/}
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
            {errors.username && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.username}
              </CustomText>
            )}
          </View>
          {/*Ingresar correo*/}
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
            {errors.email && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.email}
              </CustomText>
            )}
          </View>
          {/*Ingresar contraseña*/}
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
            {errors.password && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.password}
              </CustomText>
            )}
          </View>
          {/*Ingresar confimacion de la contraseña*/}
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
          {/*boton de registro*/}
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
          {/*Terminos y condiciones*/}
          <CustomText variant="caption" className="text-center mt-8 text-spotify-gray-light">
            Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.
          </CustomText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};