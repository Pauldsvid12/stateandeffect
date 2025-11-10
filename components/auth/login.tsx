import { z } from "zod";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomButton } from "../ui/CustomButton";
import { CustomText } from "../ui/CustomText";

import {
  EMAIL_REQUIRED_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  GENERAL_LOGIN_ERROR,
  PASSWORD_REQUIRED_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
} from "@/constants/errorMessages";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginProps {
  onSwitchToRegister: () => void;
  onBack: () => void;
}

const loginSchema = z.object({
  email: z
    .string({ required_error: EMAIL_REQUIRED_MESSAGE })
    .email(EMAIL_INVALID_MESSAGE),
  password: z
    .string({ required_error: PASSWORD_REQUIRED_MESSAGE })
    .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
});

export const Login: React.FC<LoginProps> = ({ onSwitchToRegister, onBack }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    if (formData.email && errors.email) {
      const result = loginSchema.safeParse(formData);
      if (
        !result.success &&
        result.error.formErrors.fieldErrors.email?.length
      ) {
        setErrors((prev) => ({
          ...prev,
          email: result.error.formErrors.fieldErrors.email?.[0],
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  }, [formData.email]);

  const validateWithZod = (data: LoginFormData): LoginErrors => {
    const result = loginSchema.safeParse(data);
    if (result.success) return {};
    const { fieldErrors } = result.error.formErrors;
    return {
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    };
  };

  const validateForm = (): boolean => {
    const newErrors = validateWithZod(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setIsLoading(false);
      if (
        formData.email === "paul.juelam.est@uets.edu.ec" &&
        formData.password === "edgewwe123"
      ) {
        console.log("Login exitoso:", formData);
        router.push("/(tabs)/dashboard");
      } else {
        setErrors({ general: GENERAL_LOGIN_ERROR });
      }
    }, 2000);
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login con ${provider}`);
    router.push("/+not-found");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 bg-spotify-black"
        contentContainerClassName="px-6 pt-16 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8">
          <TouchableOpacity onPress={onBack} className="mb-6">
            <CustomText variant="title" className="text-spotify-gray-light">
              ← Atrás
            </CustomText>
          </TouchableOpacity>
          <CustomText variant="heading" className="mb-2">
            Iniciar sesión
          </CustomText>
          <CustomText variant="body" className="text-spotify-gray-light">
            Accede a tu cuenta de Spotify
          </CustomText>
        </View>

        {/* Login con otras redes */}
        <View className="gap-3 mb-6">
          <CustomButton
            title="Continuar con Google"
            variant="secondary"
            size="medium"
            iconName="logo-google"
            onPress={() => handleSocialLogin("Google")}
          />
          <CustomButton
            title="Continuar con Facebook"
            variant="secondary"
            size="medium"
            iconName="logo-facebook"
            onPress={() => handleSocialLogin("Facebook")}
          />
          <CustomButton
            title="Continuar con Apple"
            variant="secondary"
            size="medium"
            iconName="logo-apple"
            onPress={() => handleSocialLogin("Apple")}
          />
        </View>

        {/* Dividir */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-spotify-gray" />
          <CustomText variant="body" className="mx-4 text-spotify-gray-light">
            O
          </CustomText>
          <View className="flex-1 h-[1px] bg-spotify-gray" />
        </View>

        {/* Error general */}
        {errors.general && (
          <View className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
            <CustomText variant="body" className="text-red-500 text-center">
              {errors.general}
            </CustomText>
          </View>
        )}

        {/* Form */}
        <View className="gap-4">
          {/* Email */}
          <View>
            <CustomText variant="caption" className="mb-2 text-white">
              Correo electrónico o nombre de usuario
            </CustomText>
            <TextInput
              className={`bg-spotify-gray/30 text-white px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-transparent"
              }`}
              placeholder="nombre@dominio.com"
              placeholderTextColor="#B3B3B3"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.email}
              </CustomText>
            )}
          </View>

          {/* Password */}
          <View>
            <CustomText variant="caption" className="mb-2 text-white">
              Contraseña
            </CustomText>
            <TextInput
              className={`bg-spotify-gray/30 text-white px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-transparent"
              }`}
              placeholder="Contraseña"
              placeholderTextColor="#B3B3B3"
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
            />
            {errors.password && (
              <CustomText variant="caption" className="text-red-500 mt-1">
                {errors.password}
              </CustomText>
            )}
          </View>

          {/* Mostrar / Ocultar contraseña */}
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            className="self-start"
          >
            <CustomText variant="caption" className="text-spotify-green">
              {passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            </CustomText>
          </TouchableOpacity>

          {/* Recordarme */}
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            className="flex-row items-center gap-2"
          >
            <View
              className={`w-5 h-5 rounded border-2 ${
                rememberMe
                  ? "bg-spotify-green border-spotify-green"
                  : "border-spotify-gray-light"
              } items-center justify-center`}
            >
              {rememberMe && (
                <CustomText variant="caption" className="text-black font-bold">
                  ✓
                </CustomText>
              )}
            </View>
            <CustomText variant="body" className="text-white">
              Recuérdame
            </CustomText>
          </TouchableOpacity>

          {/* Botón login */}
          <CustomButton
            title="Iniciar sesión"
            variant="primary"
            size="large"
            onPress={handleLogin}
            isLoading={isLoading}
            className="mt-4"
          />

          {/* Olvidaste contraseña */}
          <TouchableOpacity className="self-center mt-2">
            <CustomText variant="body" className="text-white underline">
              ¿Olvidaste tu contraseña?
            </CustomText>
          </TouchableOpacity>

          {/* Dividir */}
          <View className="h-[1px] bg-spotify-gray my-4" />

          {/* Link para registrarse */}
          <View className="flex-row justify-center items-center">
            <CustomText variant="body" className="text-spotify-gray-light">
              ¿No tienes cuenta?{" "}
            </CustomText>
            <TouchableOpacity onPress={onSwitchToRegister}>
              <CustomText variant="body" className="text-spotify-green font-bold">
                Regístrate en Spotify
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Datos para probar */}
          <View className="mt-8 p-4 bg-spotify-green/10 rounded-lg border border-spotify-green/30">
            <CustomText variant="caption" className="text-spotify-green text-center">
              Probar: paul.juelam.est@uets.edu.ec / edgewwe123
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};