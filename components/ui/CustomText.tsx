import React from 'react';
import { Text, TextProps } from 'react-native';

interface CustomTextProps extends TextProps{
  variant?:'heading' | 'title' | 'body' | 'caption' | 'button';
  className?:string;
  children:React.ReactNode;
}
export const CustomText: React.FC<CustomTextProps> =({ 
  variant='body', 
  className='',
  children,
  ...props 
})=>{
  const getVariantStyles =()=>{
    switch (variant){
      case 'heading':
        return 'text-4xl font-bold text-white';
      case 'title':
        return 'text-2xl font-bold text-white';
      case 'body':
        return 'text-base text-white';
      case 'caption':
        return 'text-sm text-gray-400';
      case 'button':
        return 'text-base font-semibold text-black';
      default:
        return 'text-base text-white';
    }
  };

  return (
    <Text 
      className={`${getVariantStyles()} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};
