import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform, Image} from 'react-native';

const AppScreen = ({navigation}) => {
    return (
        <ImageBackground
            source={require('../assets/img/d0c514e06d42a429956df3b4d2be7791084d318d.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.darkOverlay}>
                <View style={styles.container}>
                    <View style={styles.characterSection}>
                        <Image source={require('../assets/img/4f011ea87c0e6c35fcde59ee4c764ce533e03e64.png')} style={{width:250,height:250, alignSelf: 'center', borderRadius: 20}}/>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.welcomeText}>WELCOME TO SHAPE TALES, STRIKE THE SKY</Text>
                        <View style={styles.descriptionBox}>
                            <Text style={styles.descriptionText}>
                                Let your imagination spark like lightning.
                            </Text>
                            <Text style={styles.descriptionText}>
                                Choose a character, explore their questions, and create your own mysterious tales.
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.startButton} onPress={()=>{navigation.navigate('CharacterScreen')}}>
                        <Text style={styles.startButtonText}>Start</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    darkOverlay: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 30,
        justifyContent: 'space-between',
    },
    characterSection: {
        marginTop: 100
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    welcomeText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Roboto-Bold',
    },
    descriptionBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        padding: 20,
        borderWidth: 2,
        borderColor: '#4A90E2',
        alignItems: 'center',
        width: '100%',
        ...Platform.select({
            ios: {
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    descriptionText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Roboto-Regular',
    },
    startButton: {
        width: '80%',
        paddingVertical: 15,
        borderRadius: 30,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        ...Platform.select({
            ios: {
                shadowColor: '#007AFF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    startButtonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
});

export default AppScreen;
