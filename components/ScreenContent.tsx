/* eslint-disable prettier/prettier */
import { useNetInfo } from '@react-native-community/netinfo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

type ScreenContentProps = {
    title: string;
    path: string;
    children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
    const netInfo = useNetInfo();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View className={styles.container}>     
            {netInfo.isConnected === false ? (
                <View className={styles.errorContainer}>
                    <Text className={styles.errorText}>
                        Pas de connexion internet.
                    </Text>
                    <Text className={styles.errorSubText}>
                        Veuillez vérifier votre connexion et réessayer.
                    </Text>
                </View>
            ) : (
                <View style={{ flex: 1, width: '100%' }}>
                    {isLoading && (
                        <ActivityIndicator 
                            size="large" 
                            color="#0000ff" 
                            style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 1 }} 
                        />
                    )}
                    <WebView 
                        source={{ uri: 'https://tidic.fr/salles' }} 
                        style={styles.webview}
                        onLoadStart={() => setIsLoading(true)}
                        onLoadEnd={() => setIsLoading(false)}
                        javaScriptEnabled
                        domStorageEnabled
                        startInLoadingState
                        scalesPageToFit
                    />
                </View>
            )}
        </View>
    );
};

const styles = {
    container: `items-center flex-1 justify-center`,
    webview: `flex-1 w-full h-full`,
    errorContainer: `flex-1 items-center justify-center p-5`,
    errorText: `text-xl text-red-500 font-bold mb-2 text-center`,
    errorSubText: `text-gray-600 text-center`,
};
