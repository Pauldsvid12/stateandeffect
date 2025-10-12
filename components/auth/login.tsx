import {useRouter } from 'expo-router';
import React, { useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {CustomButton} from '../ui/CustomButton';
import {CustomText} from '../ui/CustomText';

interface LoginFormData {
  email: string;
  password: string;
}
interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}
export const Login: React.FC = ()=>{
  const router = useRouter();
  const [formData, setFormData]=useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors]=useState<LoginErrors>({});
  const [isLoading, setIsLoading]=useState<boolean>(false);
  const [passwordVisible, setPasswordVisible]=useState<boolean>(false);
  const [rememberMe, setRememberMe]=useState<boolean>(false);
  useEffect(()=>{
    if (formData.email && errors.email){
      validateEmail(formData.email);
    }
  },[formData.email]);
  const validateEmail=(email: string): boolean =>{ //validar correo
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({...prev, email: 'Correo electrónico inválido'}));
      return false;
    }
    setErrors(prev =>({...prev, email: undefined}));
    return true;
  };
  const validateForm=(): boolean=>{
    const newErrors: LoginErrors={};
    if(!formData.email.trim()){
      newErrors.email='El correo es requerido';
    }else if(!validateEmail(formData.email)){
      newErrors.email='Correo electrónico inválido';
    }
    if(!formData.password){
      newErrors.password='La contraseña es requerida';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginm= async()=>{
    if(!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    setTimeout(() =>{
      setIsLoading(false);
      if(formData.email ==='demo@spotify.com' && formData.password === 'password') {//simular validacion
        console.log('Login exitoso:', formData);
      }else{
        setErrors({ general: 'Correo o contraseña incorrectos'});
      }
    }, 2000);
  };
  const handleInputChange=(field: keyof LoginFormData, value: string)=>{
    setFormData(prev=>({...prev, [field]: value}));
    // Limpiar error general al cambiar campos
    if (errors.general) {
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
          <TouchableOpacity onPress={() => router.back()} className="mb-6">
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
        {/*Social Login Buttons*/}
        <View className="gap-3 mb-6">
          <CustomButton
            title="Continuar con Google"
            variant="secondary"
            size="medium"
            onPress={() => handleSocialLogin('Google')}
          />
          <CustomButton
            title="Continuar con Facebook"
            variant="secondary"
            size="medium"
            onPress={() => handleSocialLogin('Facebook')}
          />
          <CustomButton
            title="Continuar con Apple"
            variant="secondary"
            size="medium"
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
          {/*Ingresar correo*/}
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
          {/*Ver o no ver contraseña*/}
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
          {/*Login Button*/}
          <CustomButton
            title="Iniciar sesión"
            variant="primary"
            size="large"
            onPress={handleLoginm}
            isLoading={isLoading}
            className="mt-4"
          />
          {/*Olvidar contraseñas*/}
          <TouchableOpacity className="self-center mt-2">
            <CustomText variant="body" className="text-white underline">
              ¿Olvidaste tu contraseña?
            </CustomText>
          </TouchableOpacity>
          {/*Dividir*/}
          <View className="h-[1px] bg-spotify-gray my-4" />
          {/*Register Link*/}
          <View className="flex-row justify-center items-center">
            <CustomText variant="body" className="text-spotify-gray-light">
              ¿No tienes cuenta?{' '}
            </CustomText>
            <TouchableOpacity onPress={() => router.push('./auth/register')}>
              <CustomText variant="body" className="text-spotify-green font-bold">
                Regístrate en Spotify
              </CustomText>
            </TouchableOpacity>
          </View>
          {/*Demo credentials hint*/}
          <View className="mt-8 p-4 bg-spotify-green/10 rounded-lg border border-spotify-green/30">
            <CustomText variant="caption" className="text-spotify-green text-center">
              Demo: demo@spotify.com / password
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};