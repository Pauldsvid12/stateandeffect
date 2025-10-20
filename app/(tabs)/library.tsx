import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { CustomText } from '../../components/ui/CustomText';
import { CustomButton } from '../../components/ui/CustomButton';
import { Ionicons } from '@expo/vector-icons';

interface LibraryItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  type: 'playlist' | 'album' | 'artist';
  isPinned?: boolean;
}

export default function LibraryScreen() {
  const [filter, setFilter] = useState<'all' | 'playlists' | 'albums' | 'artists'>('all');

  const libraryItems: LibraryItem[] = [
    {
      id: '1',
      title: 'Mis canciones favoritas',
      subtitle: '127 canciones',
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300',
      type: 'playlist',
      isPinned: true,
    },
    {
      id: '2',
      title: 'Workout Mix',
      subtitle: '45 canciones',
      imageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300',
      type: 'playlist',
    },
    {
      id: '3',
      title: 'The Weeknd',
      subtitle: 'Artista',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
      type: 'artist',
    },
    {
      id: '4',
      title: 'After Hours',
      subtitle: 'The Weeknd • 2020',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
      type: 'album',
    },
    {
      id: '5',
      title: 'Chill Vibes',
      subtitle: '89 canciones',
      imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300',
      type: 'playlist',
    },
  ];

  const filteredItems = filter === 'all' 
    ? libraryItems 
    : libraryItems.filter(item => {
        if (filter === 'playlists') return item.type === 'playlist';
        if (filter === 'albums') return item.type === 'album';
        if (filter === 'artists') return item.type === 'artist';
        return true;
      });

  return (
    <View className="flex-1 bg-spotify-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.duration(600)}
          className="px-4 pt-16 pb-4"
        >
          <View className="flex-row justify-between items-center mb-6">
            <CustomText variant="heading" className="text-3xl">
              Tu Biblioteca
            </CustomText>
            <View className="flex-row gap-3">
              <TouchableOpacity>
                <Ionicons name="search" size={28} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="add" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Filters */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="gap-2 mb-4"
          >
            <TouchableOpacity 
              onPress={() => setFilter('all')}
              className={`px-4 py-2 rounded-full ${
                filter === 'all' ? 'bg-spotify-green' : 'bg-spotify-gray'
              }`}
            >
              <CustomText 
                variant="body" 
                className={`font-semibold ${
                  filter === 'all' ? 'text-black' : 'text-white'
                }`}
              >
                Todos
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setFilter('playlists')}
              className={`px-4 py-2 rounded-full ${
                filter === 'playlists' ? 'bg-spotify-green' : 'bg-spotify-gray/40'
              }`}
            >
              <CustomText 
                variant="body" 
                className={`font-semibold ${
                  filter === 'playlists' ? 'text-black' : 'text-white'
                }`}
              >
                Playlists
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setFilter('albums')}
              className={`px-4 py-2 rounded-full ${
                filter === 'albums' ? 'bg-spotify-green' : 'bg-spotify-gray/40'
              }`}
            >
              <CustomText 
                variant="body" 
                className={`font-semibold ${
                  filter === 'albums' ? 'text-black' : 'text-white'
                }`}
              >
                Álbumes
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setFilter('artists')}
              className={`px-4 py-2 rounded-full ${
                filter === 'artists' ? 'bg-spotify-green' : 'bg-spotify-gray/40'
              }`}
            >
              <CustomText 
                variant="body" 
                className={`font-semibold ${
                  filter === 'artists' ? 'text-black' : 'text-white'
                }`}
              >
                Artistas
              </CustomText>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        {/* Library Items */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          className="px-4 pb-24"
        >
          {filteredItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(index * 50).duration(400)}
            >
              <TouchableOpacity className="flex-row items-center py-3">
                <Image
                  source={{ uri: item.imageUrl }}
                  className={`w-16 h-16 mr-4 ${
                    item.type === 'artist' ? 'rounded-full' : 'rounded-md'
                  }`}
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <View className="flex-row items-center">
                    {item.isPinned && (
                      <Ionicons name="pin" size={16} color="#1DB954" style={{ marginRight: 4 }} />
                    )}
                    <CustomText 
                      variant="body" 
                      className="font-semibold flex-1"
                      numberOfLines={1}
                    >
                      {item.title}
                    </CustomText>
                  </View>
                  <CustomText 
                    variant="caption"
                    numberOfLines={1}
                  >
                    {item.subtitle}
                  </CustomText>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#B3B3B3" />
              </TouchableOpacity>
            </Animated.View>
          ))}

          {filteredItems.length === 0 && (
            <View className="items-center justify-center py-20">
              <Ionicons name="musical-notes-outline" size={80} color="#535353" />
              <CustomText variant="title" className="mt-4 mb-2">
                No hay elementos
              </CustomText>
              <CustomText variant="caption" className="text-center px-8 mb-6">
                Explora música y crea tu primera playlist
              </CustomText>
              <CustomButton
                title="Explorar música"
                variant="primary"
                size="medium"
                onPress={() => {}}
              />
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}