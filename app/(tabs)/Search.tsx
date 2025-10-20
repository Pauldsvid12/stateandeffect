import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { CustomText } from '../../components/ui/CustomText';
import { Ionicons } from '@expo/vector-icons';

interface Category {
  id: string;
  title: string;
  color: string;
  icon: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Category[] = [
    { id: '1', title: 'Pop', color: '#8E44AD', icon: '🎤' },
    { id: '2', title: 'Rock', color: '#E74C3C', icon: '🎸' },
    { id: '3', title: 'Hip-Hop', color: '#F39C12', icon: '🎧' },
    { id: '4', title: 'Jazz', color: '#3498DB', icon: '🎷' },
    { id: '5', title: 'Electrónica', color: '#9B59B6', icon: '🎹' },
    { id: '6', title: 'Reggaeton', color: '#E67E22', icon: '🔥' },
    { id: '7', title: 'Clásica', color: '#1ABC9C', icon: '🎻' },
    { id: '8', title: 'Indie', color: '#34495E', icon: '🌿' },
  ];

  return (
    <View className="flex-1 bg-spotify-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.duration(600)}
          className="px-4 pt-16 pb-4"
        >
          <CustomText variant="heading" className="text-3xl mb-6">
            Buscar
          </CustomText>

          {/* Search Bar */}
          <View className="bg-white/90 rounded-lg flex-row items-center px-4 py-3 mb-6">
            <Ionicons name="search" size={24} color="#000" />
            <TextInput
              className="flex-1 ml-3 text-black text-base"
              placeholder="Artistas, canciones o podcasts"
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Categories */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          className="px-4"
        >
          <CustomText variant="title" className="text-xl mb-4">
            Explorar por género
          </CustomText>

          <View className="flex-row flex-wrap gap-4 mb-20">
            {categories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInRight.delay(index * 50).duration(400)}
                style={{ width: CARD_WIDTH }}
              >
                <TouchableOpacity
                  className="rounded-lg overflow-hidden h-28 justify-end p-4"
                  style={{ backgroundColor: category.color }}
                >
                  <CustomText 
                    variant="body" 
                    className="font-bold text-lg text-white"
                  >
                    {category.title}
                  </CustomText>
                  <CustomText 
                    variant="heading" 
                    className="text-4xl absolute top-2 right-2 opacity-70"
                  >
                    {category.icon}
                  </CustomText>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}