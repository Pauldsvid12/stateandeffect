import { Login } from '@/components/auth/login';
import { Register } from '@/components/auth/register';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StatusBar, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { CustomButton } from '../components/ui/CustomButton';
import { CustomText } from '../components/ui/CustomText';

export default function WelcomeScreen() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showForms, setShowForms] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  //valores para las animaciones
  const logoScale = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(100);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(50);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      logoScale.value = withSpring(1, {//animar el logo.
        damping: 10,
        stiffness: 100,
      });
      buttonsTranslateY.value = withSpring(0);//animar los botones
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (showForms) {
      formOpacity.value = withTiming(1, { duration: 300 });
      formTranslateY.value = withSpring(0);
    } else {
      formOpacity.value = withTiming(0, { duration: 300 });
      formTranslateY.value = withTiming(50, { duration: 300 });
    }
  }, [showForms]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));
  const animatedButtonsStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonsTranslateY.value }],
  }));
  const animatedFormStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));
  const handleLoginPress = () => {
    console.log('Login exitoso');
    router.replace('/(tabs)' as any);
  };
  const handleRegisterPress = () => {
    console.log('Registro exitoso');
    router.replace('/(tabs)' as any);
  };
  if (!isLoaded) {
    return (
      <View className="flex-1 bg-spotify-black items-center justify-center">
        <Animated.View entering={FadeIn.duration(500)}>
          <CustomText variant="heading" className="text-spotify-green text-6xl">
            ♫
          </CustomText>
          <CustomText variant="title" className="mt-4">Spotify</CustomText>
        </Animated.View>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800' }}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1 bg-black/70">  
          {!showForms ? (
            <>
              {/*Logo*/}
              <View className="flex-1 justify-center items-center px-6">
                <Animated.View style={animatedLogoStyle} className="items-center mb-8">
                  <Image
                    source={{ uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png' }}
                    style={{ width: 180, height: 60 }}
                    resizeMode="contain"
                    className="mb-4"
                  />
                </Animated.View>
                <CustomText variant="title" className="text-center mb-2 text-3xl">
                  Millones de canciones.
                </CustomText>
                <CustomText variant="title" className="text-center text-3xl">
                  Gratis en Spotify.
                </CustomText>
              </View>
              {/*botones*/}
              <Animated.View 
                style={animatedButtonsStyle}
                className="px-6 pb-12 gap-4"
              >
                <CustomButton
                  title="Registrarse gratis"
                  variant="primary"
                  size="large"
                  onPress={() => {
                    setIsLogin(false);
                    setShowForms(true);
                  }}
                  className="w-full"
                />
                <CustomButton
                  title="Iniciar sesión con Google"
                  variant="secondary"
                  size="large"
                  iconName="logo-google"
                  onPress={() => console.log('Google login')}
                  className="w-full"
                />
                <CustomButton
                  title="Iniciar sesión con Facebook"
                  variant="secondary"
                  size="large"
                  iconName="logo-facebook"
                  onPress={() => console.log('Facebook login')}
                  className="w-full"
                />
                <CustomButton
                  title="Iniciar sesión"
                  variant="outline"
                  size="large"
                  onPress={() => {
                    setIsLogin(true);
                    setShowForms(true);
                  }}
                  className="w-full"
                />

                <CustomText variant="caption" className="text-center mt-4 px-8">
                  Al registrarte, aceptas las Condiciones de uso y la Política de privacidad de Spotify.
                </CustomText>
              </Animated.View>
            </>
          ) : (
            //animacion para los formularios
            <Animated.View 
              style={animatedFormStyle}
              className="flex-1"
            >
              {isLogin ? (//renderizado condicional
                <Login 
                  onLoginSuccess={handleLoginPress}
                  onSwitchToRegister={() => setIsLogin(false)}
                  onBack={() => setShowForms(false)}
                />
              ) : (
                <Register 
                  onRegisterSuccess={handleRegisterPress}
                  onSwitchToLogin={() => setIsLogin(true)}
                  onBack={() => setShowForms(false)}
                />
              )}
            </Animated.View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}