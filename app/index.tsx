import React, {useEffect, useState} from 'react';
import {View, ImageBackground, StatusBar} from 'react-native';
import {useRouter} from 'expo-router';
import {CustomText} from '../components/ui/CustomText';
import {CustomButton} from '../components/ui/CustomButton';
import './global.css';

export default function WelcomeScreen() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => { //simular una carga inicial
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const handleRegister = () => {
    router.push('./auth/register');
  };
  const handleLogin = () => {
    router.push('./auth/login');
  };
  if (!isLoaded) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <CustomText variant="title">Spotify</CustomText>
      </View>
    );
  }
  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      {/*Background*/}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800' }}
        className="flex-1"
        resizeMode="cover"
      >
        {/* Overlay*/}
        <View className="flex-1 bg-black/60">
          {/* Logo y título*/}
          <View className="flex-1 justify-center items-center px-6">
            <View className="items-center mb-8">
              {/*Aquí va el logo de Spotify*/}
              <CustomText variant="heading" className="text-5xl mb-4">
                ♪
              </CustomText>
              <CustomText variant="heading" className="tracking-wider">
                Spotify
              </CustomText>
            </View>
            <CustomText 
              variant="title" 
              className="text-center mb-2"
            >
              Millones de canciones.
            </CustomText>
            <CustomText 
              variant="title" 
              className="text-center"
            >
              Gratis en Spotify.
            </CustomText>
          </View>
          {/* Botones abajo*/}
          <View className="px-6 pb-12 gap-4">
            <CustomButton
              title="Registrarse gratis"
              variant="primary"
              size="large"
              onPress={handleRegister}
              className="w-full"
            />
            <CustomButton
              title="Iniciar sesión con Google"
              variant="secondary"
              size="large"
              onPress={() => {}}
              className="w-full"
            />
            <CustomButton
              title="Iniciar sesión con Facebook"
              variant="secondary"
              size="large"
              onPress={() => {}}
              className="w-full"
            />
            <CustomButton
              title="Iniciar sesión"
              variant="outline"
              size="large"
              onPress={handleLogin}
              className="w-full"
            />
            <CustomText 
              variant="caption" 
              className="text-center mt-4 px-8"
            >
              Al registrarte, aceptas las Condiciones de uso y la Política de privacidad de Spotify.
            </CustomText>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}