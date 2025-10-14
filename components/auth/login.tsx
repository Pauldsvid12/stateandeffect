import { KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState} from 'react';
import { CustomButton } from '../ui/CustomButton';
import { CustomText } from '../ui/CustomText';

interface LoginFormData {
  email: string;
  password: string;
}
interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}
interface LoginProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
  onBack: () => void;
}
export const Login: React.FC<LoginProps> = ({ 
  onLoginSuccess, 
  onSwitchToRegister, 
  onBack 
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {//validar el email
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
  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    setTimeout(() => {//se simula el logueo
      setIsLoading(false);
      if (formData.email === 'paul.juelam.est@uets.edu.ec' && formData.password === 'edgewwe123') {//validacion de los datos
        console.log('Login exitoso:', formData);
        onLoginSuccess();
      } else {
        setErrors({ general: 'Correo o contraseña incorrectos' });
      }
    }, 2000);
  };
  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors.general) {//eliminar el error al cambiar los datos
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  };
  const handleSocialLogin = (provider: string) => {
    console.log(`Login con ${provider}`);
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
            Iniciar sesión
          </CustomText>
          <CustomText variant="body" className="text-spotify-gray-light">
            Accede a tu cuenta de Spotify
          </CustomText>
        </View>
        {/*Login con otras redes*/}
        <View className="gap-3 mb-6">
          <CustomButton
            title="Continuar con Google"
            variant="secondary"
            size="medium"
            iconName="logo-google"
            onPress={() => handleSocialLogin('Google')}
          />
          <CustomButton
            title="Continuar con Facebook"
            variant="secondary"
            size="medium"
            iconName="logo-facebook"
            onPress={() => handleSocialLogin('Facebook')}
          />
          <CustomButton
            title="Continuar con Apple"
            variant="secondary"
            size="medium"
            iconName="logo-apple"
            onPress={() => handleSocialLogin('Apple')}
          />
        </View>
        {/*Dividir*/}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-spotify-gray" />
          <CustomText variant="body" className="mx-4 text-spotify-gray-light">
            O
          </CustomText>
          <View className="flex-1 h-[1px] bg-spotify-gray" />
        </View>
        {/*Error general*/}
        {errors.general && (
          <View className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
            <CustomText variant="body" className="text-red-500 text-center">
              {errors.general}
            </CustomText>
          </View>
        )}
        {/*Form*/}
        <View className="gap-4">
          {/*ingresar email*/}
          <View>
            <CustomText variant="caption" className="mb-2 text-white">
              Correo electrónico o nombre de usuario
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
              placeholder="Contraseña"
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
          {/*ver o no ver contraseña*/}
          <TouchableOpacity 
            onPress={() => setPasswordVisible(!passwordVisible)}
            className="self-start"
          >
            <CustomText variant="caption" className="text-spotify-green">
              {passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            </CustomText>
          </TouchableOpacity>
          {/*Recordar*/}
          <TouchableOpacity 
            onPress={() => setRememberMe(!rememberMe)}
            className="flex-row items-center gap-2"
          >
            <View className={`w-5 h-5 rounded border-2 ${
              rememberMe ? 'bg-spotify-green border-spotify-green' : 'border-spotify-gray-light'
            } items-center justify-center`}>
              {rememberMe && (
                <CustomText variant="caption" className="text-black font-bold">
                  ✓
                </CustomText>
              )}
            </View>
            <CustomText variant="body" className="text-white">
              Recuérdame
            </CustomText>
          </TouchableOpacity>
          {/*Boton de login*/}
          <CustomButton
            title="Iniciar sesión"
            variant="primary"
            size="large"
            onPress={handleLogin}
            isLoading={isLoading}
            className="mt-4"
          />
          {/*Olvidaste tu contraseña*/}
          <TouchableOpacity className="self-center mt-2">
            <CustomText variant="body" className="text-white underline">
              ¿Olvidaste tu contraseña?
            </CustomText>
          </TouchableOpacity>
          {/*dividir*/}
          <View className="h-[1px] bg-spotify-gray my-4" />
          {/*Link para registrase*/}
          <View className="flex-row justify-center items-center">
            <CustomText variant="body" className="text-spotify-gray-light">
              ¿No tienes cuenta?{' '}
            </CustomText>
            <TouchableOpacity onPress={onSwitchToRegister}>
              <CustomText variant="body" className="text-spotify-green font-bold">
                Regístrate en Spotify
              </CustomText>
            </TouchableOpacity>
          </View>
          {/* DATOS A INGRESAR*/}
          <View className="mt-8 p-4 bg-spotify-green/10 rounded-lg border border-spotify-green/30">
            <CustomText variant="caption" className="text-spotify-green text-center">
              Probar: paul.juelam.est@uets.edu.ec / edgewwe321
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};