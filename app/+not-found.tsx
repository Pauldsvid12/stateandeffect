import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown, BounceIn, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated';
import { CustomButton } from '../components/ui/CustomButton';
import { CustomText } from '../components/ui/CustomText';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  const router = useRouter();
  const rotation = useSharedValue(0);
  React.useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 100 }),
        withTiming(10, { duration: 100 }),
        withTiming(0, { duration: 100 })
      ),
      -1,
      false
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  return (
    <View className="flex-1 bg-spotify-black items-center justify-center px-6">
      {/*Icono animado*/}
      <Animated.View 
        style={animatedIconStyle}
        entering={BounceIn.duration(800)}
      >
        <Ionicons name="musical-notes-outline" size={120} color="#1DB954" />
      </Animated.View>

      {/*Error 404 de EXPO*/}
      <Animated.View 
        entering={FadeInDown.delay(200).duration(600)}
        className="items-center mt-8"
      >
        <CustomText variant="heading" className="text-8xl text-spotify-green mb-4">
          404
        </CustomText>
        <CustomText variant="title" className="text-center mb-2">
          Página no encontrada
        </CustomText>
        <CustomText variant="body" className="text-center text-spotify-gray-light mb-8 px-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </CustomText>
      </Animated.View>
      {/*Botones*/}
      <Animated.View 
        entering={FadeInDown.delay(400).duration(600)}
        className="w-full gap-3"
      >
        <CustomButton
          title="Volver al inicio"
          variant="primary"
          size="large"
          iconName="home"
          onPress={() => router.replace('/')}
          className="w-full"
        />
        <CustomButton
          title="Ir al Dashboard"
          variant="outline"
          size="large"
          iconName="grid"
          onPress={() => router.replace('./(tabs)')}
          className="w-full"
        />
      </Animated.View>
      {/*Decoracion*/}
      <Animated.View 
        entering={FadeInDown.delay(600).duration(600)}
        className="absolute bottom-10"
      >
        <CustomText variant="caption" className="text-spotify-gray">
          ¿Perdido en la música? 🎵
        </CustomText>
      </Animated.View>
    </View>
  );
}