import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { CustomText } from '../../components/ui/CustomText';
import { CustomButton } from '../../components/ui/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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

export default function ProfileScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dataOptimization, setDataOptimization] = useState(false);

  const accountSettings: SettingItem[] = [
    {
      id: '1',
      title: 'Editar perfil',
      subtitle: 'Cambiar foto, nombre y más',
      icon: 'person-circle-outline',
      onPress: () => console.log('Editar perfil'),
    },
    {
      id: '2',
      title: 'Cuenta',
      subtitle: 'Gestionar tu suscripción',
      icon: 'card-outline',
      onPress: () => console.log('Cuenta'),
    },
    {
      id: '3',
      title: 'Privacidad',
      subtitle: 'Controla tus datos',
      icon: 'shield-checkmark-outline',
      onPress: () => console.log('Privacidad'),
    },
  ];

  const appSettings: SettingItem[] = [
    {
      id: '4',
      title: 'Notificaciones',
      subtitle: 'Alertas y actualizaciones',
      icon: 'notifications-outline',
      hasToggle: true,
      toggleValue: notifications,
      onToggle: setNotifications,
    },
    {
      id: '5',
      title: 'Optimización de datos',
      subtitle: 'Reduce el uso de datos',
      icon: 'cellular-outline',
      hasToggle: true,
      toggleValue: dataOptimization,
      onToggle: setDataOptimization,
    },
    {
      id: '6',
      title: 'Calidad de audio',
      subtitle: 'Automática',
      icon: 'musical-notes-outline',
      onPress: () => console.log('Calidad de audio'),
    },
    {
      id: '7',
      title: 'Idioma',
      subtitle: 'Español',
      icon: 'language-outline',
      onPress: () => console.log('Idioma'),
    },
  ];

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-spotify-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con perfil */}
        <Animated.View 
          entering={FadeInDown.duration(600)}
          className="px-4 pt-16 pb-6"
        >
          <CustomText variant="heading" className="text-3xl mb-8">
            Perfil
          </CustomText>

          {/* User Info Card */}
          <TouchableOpacity className="bg-spotify-gray rounded-2xl p-6 flex-row items-center mb-6">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
              className="w-20 h-20 rounded-full mr-4"
              resizeMode="cover"
            />
            <View className="flex-1">
              <CustomText variant="title" className="text-xl mb-1">
                David JM
              </CustomText>
              <CustomText variant="caption" className="mb-2">
                paul.juelam.est@uets.edu
              </CustomText>
              <View className="bg-spotify-green/20 px-3 py-1 rounded-full self-start">
                <CustomText variant="caption" className="text-spotify-green font-semibold">
                  Premium
                </CustomText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          {/* Stats */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-spotify-gray/30 rounded-xl p-4 items-center">
              <CustomText variant="title" className="text-2xl mb-1 text-spotify-green">
                127
              </CustomText>
              <CustomText variant="caption">
                Canciones
              </CustomText>
            </View>
            <View className="flex-1 bg-spotify-gray/30 rounded-xl p-4 items-center">
              <CustomText variant="title" className="text-2xl mb-1 text-spotify-green">
                24
              </CustomText>
              <CustomText variant="caption">
                Playlists
              </CustomText>
            </View>
            <View className="flex-1 bg-spotify-gray/30 rounded-xl p-4 items-center">
              <CustomText variant="title" className="text-2xl mb-1 text-spotify-green">
                15
              </CustomText>
              <CustomText variant="caption">
                Artistas
              </CustomText>
            </View>
          </View>
        </Animated.View>

        {/* Account Settings */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          className="px-4 mb-6"
        >
          <CustomText variant="title" className="text-lg mb-4">
            Cuenta
          </CustomText>

          {accountSettings.map((setting, index) => (
            <Animated.View
              key={setting.id}
              entering={FadeInRight.delay(index * 50).duration(400)}
            >
              <TouchableOpacity 
                onPress={setting.onPress}
                className="flex-row items-center py-4"
              >
                <View className="w-10 h-10 bg-spotify-gray/40 rounded-full items-center justify-center mr-4">
                  <Ionicons name={setting.icon} size={22} color="#1DB954" />
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
                <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* App Settings */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          className="px-4 mb-6"
        >
          <CustomText variant="title" className="text-lg mb-4">
            Configuración
          </CustomText>

          {appSettings.map((setting, index) => (
            <Animated.View
              key={setting.id}
              entering={FadeInRight.delay(300 + index * 50).duration(400)}
            >
              <TouchableOpacity 
                onPress={setting.onPress}
                className="flex-row items-center py-4"
                disabled={setting.hasToggle}
              >
                <View className="w-10 h-10 bg-spotify-gray/40 rounded-full items-center justify-center mr-4">
                  <Ionicons name={setting.icon} size={22} color="#1DB954" />
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
          ))}
        </Animated.View>

        {/* Other Options */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          className="px-4 mb-6"
        >
          <TouchableOpacity className="flex-row items-center py-4">
            <View className="w-10 h-10 bg-spotify-gray/40 rounded-full items-center justify-center mr-4">
              <Ionicons name="help-circle-outline" size={22} color="#1DB954" />
            </View>
            <View className="flex-1">
              <CustomText variant="body" className="font-semibold">
                Ayuda y soporte
              </CustomText>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4">
            <View className="w-10 h-10 bg-spotify-gray/40 rounded-full items-center justify-center mr-4">
              <Ionicons name="information-circle-outline" size={22} color="#1DB954" />
            </View>
            <View className="flex-1">
              <CustomText variant="body" className="font-semibold">
                Acerca de
              </CustomText>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(600)}
          className="px-4 pb-24"
        >
          <CustomButton
            title="Cerrar sesión"
            variant="outline"
            size="large"
            iconName="log-out-outline"
            onPress={handleLogout}
            className="w-full"
          />

          <CustomText variant="caption" className="text-center mt-6 text-spotify-gray">
            Versión 2.2.0 • Creado con Robtop
          </CustomText>
        </Animated.View>
      </ScrollView>
    </View>
  );
}