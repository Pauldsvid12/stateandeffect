import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'; // Indicar carga ,Opaciadad al hacer click, Lo mismo para las propiedades
import { CustomText } from './CustomText';
import { Ionicons } from '@expo/vector-icons';

interface CustomButtonProps extends TouchableOpacityProps{
  title:string;
  variant?:'primary' | 'secondary' | 'outline';
  size?:'small' | 'medium' | 'large';
  isLoading?:boolean;
  className?:string;
  iconName?: keyof typeof Ionicons.glyphMap;
}
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant='primary',
  size='medium',
  isLoading=false,
  className='',
  disabled,
  iconName,
  ...props
})=>{
  const getVariantStyles =()=>{
    switch (variant){
      case 'primary':
        return 'bg-[#1DB954] active:bg-[#1ed760]';
      case 'secondary':
        return 'bg-white active:bg-gray-200';
      case 'outline':
        return 'bg-transparent border-2 border-white active:bg-white/10';
      default:
        return 'bg-[#1DB954]';
    }
  };
  const getSizeStyles =()=>{
    switch (size){
      case 'small':
        return 'py-2 px-6 rounded-full';
      case 'medium':
        return 'py-3 px-8 rounded-full';
      case 'large':
        return 'py-4 px-12 rounded-full';
      default:
        return 'py-3 px-8 rounded-full';
    }
  };
  const getTextColor =()=>{
    if (variant==='outline') return 'text-white';
    if (variant==='secondary') return 'text-black';
    return 'text-black';
  };
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      className={`${getVariantStyles()} ${getSizeStyles()} items-center justify-center ${
        isDisabled ? 'opacity-50' : ''
      } ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ?(
        <ActivityIndicator color={variant === 'outline' ? '#FFFFFF' : '#000000'} />
      ):(
        <View className="flex-row items-center gap-2">
          {iconName && (
            <Ionicons 
              name={iconName} 
              size={20} 
              color={variant === 'outline' ? '#FFFFFF' : '#000000'} 
            />
          )}
          <CustomText variant="button" className={`font-bold ${getTextColor()}`}>
            {title}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};