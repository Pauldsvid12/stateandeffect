// app/now-playing.tsx
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { CustomText } from '@/components/ui/CustomText';

const { width } = Dimensions.get('window');

interface Song {
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
  audioUrl: string; // URL del audio
}

export default function NowPlayingScreen() {
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Animaciones
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  // AQUÍ PONES TU MÚSICA
  const currentSong: Song = {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    // Opciones para audioUrl:
    // 1. URL online: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    // 2. Archivo local: require('../assets/music/song.mp3')
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  };

  // Cargar audio al iniciar
  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Actualizar posición cada segundo
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPlaying && sound) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis / 1000);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, sound]);

  // Animación del disco
  useEffect(() => {
    if (isPlaying) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 10000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      rotation.value = withTiming(rotation.value);
    }
  }, [isPlaying]);

  const loadAudio = async () => {
    try {
      setIsLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentSong.audioUrl },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      
      const status = await newSound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error cargando audio:', error);
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      scale.value = withSpring(1);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
      scale.value = withSpring(0.95);
    }
  };

  const handleSeek = async (value: number) => {
    if (!sound) return;
    await sound.setPositionAsync(value * 1000);
    setCurrentTime(value);
  };

  const handleSkipForward = async () => {
    if (!sound) return;
    const newPosition = Math.min(currentTime + 10, duration);
    await sound.setPositionAsync(newPosition * 1000);
    setCurrentTime(newPosition);
  };

  const handleSkipBackward = async () => {
    if (!sound) return;
    const newPosition = Math.max(currentTime - 10, 0);
    await sound.setPositionAsync(newPosition * 1000);
    setCurrentTime(newPosition);
  };

  const handleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ],
  }));

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 bg-spotify-black">
      <Animated.View entering={FadeIn.duration(400)} className="flex-1">
        {/* Header */}
        <View className="px-6 pt-16 pb-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-down" size={32} color="#FFF" />
          </TouchableOpacity>
          <View className="items-center flex-1">
            <CustomText variant="caption" className="mb-1">
              {isLoading ? 'CARGANDO...' : 'REPRODUCIENDO AHORA'}
            </CustomText>
            <CustomText variant="body" className="font-semibold">
              {currentSong.album}
            </CustomText>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Album Art */}
        <Animated.View 
          entering={SlideInDown.delay(100).duration(600)}
          className="items-center justify-center flex-1 px-8"
        >
          <Animated.View 
            style={[animatedImageStyle]}
            className="shadow-2xl"
          >
            <Image
              source={{ uri: currentSong.imageUrl }}
              style={{ 
                width: width - 80, 
                height: width - 80,
                borderRadius: (width - 80) / 2, // CIRCULAR
              }}
              resizeMode="cover"
            />
          </Animated.View>
        </Animated.View>

        {/* Song Info & Controls */}
        <Animated.View 
          entering={SlideInDown.delay(200).duration(600)}
          className="px-6 pb-10"
        >
          {/* Song Title & Artist */}
          <View className="flex-row justify-between items-start mb-6">
            <View className="flex-1 mr-4">
              <CustomText variant="title" className="text-2xl mb-2">
                {currentSong.title}
              </CustomText>
              <CustomText variant="body" className="text-spotify-gray-light">
                {currentSong.artist}
              </CustomText>
            </View>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={32} 
                color={isLiked ? "#1DB954" : "#FFF"} 
              />
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View className="mb-2">
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              onSlidingComplete={handleSeek}
              minimumTrackTintColor="#1DB954"
              maximumTrackTintColor="#535353"
              thumbTintColor="#FFF"
              disabled={isLoading}
            />
          </View>

          {/* Time */}
          <View className="flex-row justify-between mb-8">
            <CustomText variant="caption">
              {formatTime(currentTime)}
            </CustomText>
            <CustomText variant="caption">
              {formatTime(duration)}
            </CustomText>
          </View>

          {/* Main Controls */}
          <View className="flex-row justify-between items-center mb-6">
            {/* Shuffle */}
            <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
              <Ionicons 
                name="shuffle" 
                size={28} 
                color={isShuffle ? "#1DB954" : "#B3B3B3"} 
              />
            </TouchableOpacity>

            {/* Previous / Skip Backward */}
            <TouchableOpacity onPress={handleSkipBackward} disabled={isLoading}>
              <Ionicons name="play-skip-back" size={36} color="#FFF" />
            </TouchableOpacity>

            {/* Play/Pause */}
            <TouchableOpacity 
              onPress={handlePlayPause}
              className="w-20 h-20 bg-white rounded-full items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <CustomText variant="body" className="text-black">...</CustomText>
              ) : (
                <Ionicons 
                  name={isPlaying ? "pause" : "play"} 
                  size={40} 
                  color="#000" 
                  style={{ marginLeft: isPlaying ? 0 : 4 }}
                />
              )}
            </TouchableOpacity>

            {/* Next / Skip Forward */}
            <TouchableOpacity onPress={handleSkipForward} disabled={isLoading}>
              <Ionicons name="play-skip-forward" size={36} color="#FFF" />
            </TouchableOpacity>

            {/* Repeat */}
            <TouchableOpacity onPress={handleRepeat}>
              <Ionicons 
                name={repeatMode === 'one' ? "repeat-outline" : "repeat"} 
                size={28} 
                color={repeatMode !== 'off' ? "#1DB954" : "#B3B3B3"} 
              />
              {repeatMode === 'one' && (
                <View className="absolute -top-1 -right-1 w-3 h-3 bg-spotify-green rounded-full" />
              )}
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          
        </Animated.View>
      </Animated.View>
    </View>
  );
}