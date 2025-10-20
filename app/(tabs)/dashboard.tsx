import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { CustomText } from '../../components/ui/CustomText';

interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  duration: string;
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columnas con padding

export default function DashboardScreen() {
  const router = useRouter();
  const [greeting, setGreeting] = useState<string>('');
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');

    loadData();
  }, []);

  const loadData = () => {
    setTimeout(() => {
      setRecentSongs([
        {
          id: '1',
          title: 'NerverMind',
          artist: 'Nirvana',
          imageUrl: 'https://imagenes.elpais.com/resizer/v2/J4MZMQKLQYOZ7RQXT3P5TPN7QM.jpg?auth=39f04afc389740f724fbe5266c605ad15646844cbfbe19c04fbbda0566e0f4af&width=980&height=980&focal=196%2C103',
          duration: '3:20',
        },
        {
          id: '2',
          title: 'Levitating',
          artist: 'Dua Lipa',
          imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
          duration: '3:23',
        },
        {
          id: '3',
          title: 'In Utero',
          artist: 'Nirvana',
          imageUrl: 'https://i5.walmartimages.com/seo/Nirvana-In-Utero-Music-Performance-Vinyl_83637d16-f51c-4311-a9ac-48969d7be7ab.e98314b55e3b08516bfadd468609c4bc.jpeg',
          duration: '3:50',
        },
      ]);

      setPlaylists([
        {
          id: '1',
          title: 'Top 50 Global',
          description: 'Las más escuchadas del momento',
          imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300',
        },
        {
          id: '2',
          title: 'RapCaviar',
          description: 'Lo mejor del hip-hop',
          imageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300',
        },
        {
          id: '3',
          title: 'Rock Classics',
          description: 'Los clásicos que amas',
          imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300',
        },
        {
          id: '4',
          title: 'Chill Vibes',
          description: 'Música relajante',
          imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300',
        },
      ]);

      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-spotify-black items-center justify-center">
        <CustomText variant="title" className="text-spotify-green">
          Cargando...
        </CustomText>
      </View>
    );
  }

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
              {greeting}
            </CustomText>
            <View className="flex-row gap-4">
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={28} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="time-outline" size={28} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Quick Access */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          className="px-4 mb-6"
        >
          <View className="flex-row flex-wrap gap-2">
            {recentSongs.slice(0, 6).map((song, index) => (
              <Animated.View
                key={song.id}
                entering={FadeInRight.delay(index * 100).duration(400)}
              >
                <TouchableOpacity
                  className="bg-spotify-gray rounded-md flex-row items-center overflow-hidden"
                  style={{ width: CARD_WIDTH }}
                >
                  <Image
                    source={{ uri: song.imageUrl }}
                    className="w-16 h-16"
                    resizeMode="cover"
                  />
                  <CustomText 
                    variant="body" 
                    className="flex-1 ml-3 font-semibold text-sm"
                    numberOfLines={2}
                  >
                    {song.title}
                  </CustomText>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Recently Played */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          className="mb-6"
        >
          <View className="px-4 mb-4 flex-row justify-between items-center">
            <CustomText variant="title" className="text-xl">
              Escuchado recientemente
            </CustomText>
            <TouchableOpacity>
              <CustomText variant="body" className="text-spotify-gray-light">
                Ver todo
              </CustomText>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-4 gap-4"
          >
            {recentSongs.map((song, index) => (
              <Animated.View
                key={song.id}
                entering={FadeInRight.delay(300 + index * 100).duration(400)}
              >
                <TouchableOpacity className="w-36">
                  <Image
                    source={{ uri: song.imageUrl }}
                    className="w-36 h-36 rounded-lg mb-2"
                    resizeMode="cover"
                  />
                  <CustomText 
                    variant="body" 
                    className="font-semibold"
                    numberOfLines={1}
                  >
                    {song.title}
                  </CustomText>
                  <CustomText 
                    variant="caption"
                    numberOfLines={1}
                  >
                    {song.artist}
                  </CustomText>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Playlists Recomendadas */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          className="mb-6"
        >
          <View className="px-4 mb-4">
            <CustomText variant="title" className="text-xl">
              Recomendado para ti
            </CustomText>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-4 gap-4"
          >
            {playlists.map((playlist, index) => (
              <Animated.View
                key={playlist.id}
                entering={FadeInRight.delay(500 + index * 100).duration(400)}
              >
                <TouchableOpacity className="w-36">
                  <Image
                    source={{ uri: playlist.imageUrl }}
                    className="w-36 h-36 rounded-lg mb-2"
                    resizeMode="cover"
                  />
                  <CustomText 
                    variant="body" 
                    className="font-semibold"
                    numberOfLines={1}
                  >
                    {playlist.title}
                  </CustomText>
                  <CustomText 
                    variant="caption"
                    numberOfLines={2}
                  >
                    {playlist.description}
                  </CustomText>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Espaciado para el Now Playing */}
        <View className="h-24" />
      </ScrollView>

      {/* Now Playing Mini Player */}
      <Animated.View 
        entering={FadeInDown.delay(600).duration(600)}
        className="absolute bottom-0 left-0 right-0 bg-spotify-gray border-t border-spotify-gray-light/20"
      >
        <TouchableOpacity 
          className="flex-row items-center px-4 py-3"
          onPress={() => router.push('/NowPlaying')}
        >
          <Image
            source={{ uri: recentSongs[0]?.imageUrl }}
            className="w-12 h-12 rounded-md mr-3"
            resizeMode="cover"
          />
          <View className="flex-1">
            <CustomText variant="body" className="font-semibold" numberOfLines={1}>
              {recentSongs[0]?.title}
            </CustomText>
            <CustomText variant="caption" numberOfLines={1}>
              {recentSongs[0]?.artist}
            </CustomText>
          </View>
          <TouchableOpacity className="mr-4">
            <Ionicons name="heart-outline" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-circle" size={40} color="#1DB954" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}