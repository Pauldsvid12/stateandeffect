// app/settings.tsx
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { CustomText } from '@/components/ui/CustomText';
import { CustomButton } from '@/components/ui/CustomButton';
import { Ionicons } from '@expo/vector-icons';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
}

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [dataOptimization, setDataOptimization] = useState(false);
  const [downloadQuality, setDownloadQuality] = useState('high');

  const audioSettings: SettingItem[] = [
    {
      id: '1',
      title: 'Calidad de audio',
      subtitle: 'Alta',
      icon: 'musical-notes',
      onPress: () => console.log('Calidad de audio'),
    },
    {
      id: '2',
      title: 'Ecualizador',
      subtitle: 'Personalizar sonido',
      icon: 'options',
      onPress: () => console.log('Ecualizador'),
    },
    {
      id: '3',
      title: 'Volumen normalizado',
      subtitle: 'Establece el mismo nivel de volumen',
      icon: 'volume-high',
      hasToggle: true,
      toggleValue: true,
      onToggle: () => {},
    },
  ];

  const playbackSettings: SettingItem[] = [
    {
      id: '4',
      title: 'Reproducción automática',
      subtitle: 'Reproduce música similar',
      icon: 'play-circle',
      hasToggle: true,
      toggleValue: autoplay,
      onToggle: setAutoplay,
    },
    {
      id: '5',
      title: 'Crossfade',
      subtitle: 'Transición suave entre canciones',
      icon: 'swap-horizontal',
      onPress: () => console.log('Crossfade'),
    },
    {
      id: '6',
      title: 'Gapless',
      subtitle: 'Sin pausas entre canciones',
      icon: 'infinite',
      hasToggle: true,
      toggleValue: true,
      onToggle: () => {},
    },
  ];

  const dataSettings: SettingItem[] = [
    {
      id: '7',
      title: 'Optimización de datos',
      subtitle: 'Reduce el uso de datos móviles',
      icon: 'cellular',
      hasToggle: true,
      toggleValue: dataOptimization,
      onToggle: setDataOptimization,
    },
    {
      id: '8',
      title: 'Calidad de descarga',
      subtitle: 'Alta',
      icon: 'download',
      onPress: () => console.log('Calidad de descarga'),
    },
    {
      id: '9',
      title: 'Almacenamiento',
      subtitle: 'Gestionar descargas',
      icon: 'folder',
      onPress: () => console.log('Almacenamiento'),
    },
  ];

  const notificationSettings: SettingItem[] = [
    {
      id: '10',
      title: 'Notificaciones',
      subtitle: 'Nuevos lanzamientos y más',
      icon: 'notifications',
      hasToggle: true,
      toggleValue: notifications,
      onToggle: setNotifications,
    },
  ];

  const renderSettingItem = (setting: SettingItem, index: number, delay: number) => (
    <Animated.View
      key={setting.id}
      entering={FadeInRight.delay(delay + index * 50).duration(400)}
    >
      <TouchableOpacity 
        onPress={setting.onPress}
        className="flex-row items-center py-4"
        disabled={setting.hasToggle}
      >
        <View className="w-12 h-12 bg-spotify-gray rounded-full items-center justify-center mr-4">
          <Ionicons name={setting.icon} size={24} color="#1DB954" />
        </View>
        <View className="flex-1">
          <CustomText variant="body" className="font-semibold mb-1">
            {setting.title}
          </CustomText>
          {setting.subtitle && (
            <CustomText variant="caption">
              {setting.subtitle}
            </CustomText>
          )}
        </View>
        {setting.hasToggle ? (
          <Switch
            value={setting.toggleValue}
            onValueChange={setting.onToggle}
            trackColor={{ false: '#535353', true: '#1DB954' }}
            thumbColor="#fff"
          />
        ) : (
          <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-spotify-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.duration(600)}
          className="px-6 pt-16 pb-4"
        >
          <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={28} color="#FFF" />
            </TouchableOpacity>
            <CustomText variant="heading" className="text-3xl">
              Configuración
            </CustomText>
          </View>
        </Animated.View>

        {/* Audio Settings */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          className="px-6 mb-6"
        >
          <CustomText variant="title" className="text-lg mb-4">
            Audio
          </CustomText>
          {audioSettings.map((setting, index) => 
            renderSettingItem(setting, index, 200)
          )}
        </Animated.View>

        {/* Playback Settings */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          className="px-6 mb-6"
        >
          <CustomText variant="title" className="text-lg mb-4">
            Reproducción
          </CustomText>
          {playbackSettings.map((setting, index) => 
            renderSettingItem(setting, index, 300)
          )}
        </Animated.View>

        {/* Data Settings */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          className="px-6 mb-6"
        >
          <CustomText variant="title" className="text-lg mb-4">
            Datos y almacenamiento
          </CustomText>
          {dataSettings.map((setting, index) => 
            renderSettingItem(setting, index, 400)
          )}
        </Animated.View>

        {/* Notification Settings */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          className="px-6 mb-6"
        >
          <CustomText variant="title" className="text-lg mb-4">
            Notificaciones
          </CustomText>
          {notificationSettings.map((setting, index) => 
            renderSettingItem(setting, index, 500)
          )}
        </Animated.View>

        {/* Other Options */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(600)}
          className="px-6 mb-6"
        >
          <CustomText variant="title" className="text-lg mb-4">
            Otros
          </CustomText>
          
          <TouchableOpacity className="flex-row items-center py-4">
            <View className="w-12 h-12 bg-spotify-gray rounded-full items-center justify-center mr-4">
              <Ionicons name="language" size={24} color="#1DB954" />
            </View>
            <View className="flex-1">
              <CustomText variant="body" className="font-semibold mb-1">
                Idioma
              </CustomText>
              <CustomText variant="caption">
                Español
              </CustomText>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4">
            <View className="w-12 h-12 bg-spotify-gray rounded-full items-center justify-center mr-4">
              <Ionicons name="information-circle" size={24} color="#1DB954" />
            </View>
            <View className="flex-1">
              <CustomText variant="body" className="font-semibold">
                Acerca de
              </CustomText>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </Animated.View>

        {/* Version Info */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(600)}
          className="px-6 pb-24 items-center"
        >
          <CustomText variant="caption" className="text-spotify-gray mb-2">
            Versión 1.0.0
          </CustomText>
          <CustomText variant="caption" className="text-spotify-gray">
            © 2024 Spotify Clone
          </CustomText>
        </Animated.View>
      </ScrollView>
    </View>
  );
}