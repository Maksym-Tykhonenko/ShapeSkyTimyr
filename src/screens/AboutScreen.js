import React from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,
    Platform, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../assets/img/d0c514e06d42a429956df3b4d2be7791084d318d.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.darkOverlay}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/img/Layer_1_1_.png')} style={styles.backButtonIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>ABOUT</Text>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.paragraph}>
                        There is a storm that lives within every story, the spark of mystery, the question that lingers, the truth that hides behind words.
                    </Text>

                    <Text style={styles.paragraph}>
                        Shape Tales, Strike the Sky helps you find that spark. Through unexpected questions and bold characters, you shape your own tales – tales that challenge, surprise, and stay with you.
                    </Text>

                    <Text style={styles.paragraph}>
                        Every character in this world reflects a different side of the storm – their questions, much like the fruits they carry, reveal their true nature.
                    </Text>

                    <View style={styles.characterCard}>
                        <View style={styles.characterTextContainer}>
                            <Text style={styles.characterName}>Chloe Cherrystorm</Text>
                            <Text style={styles.characterDescription}>
                                Sharp, direct, and impossible to ignore. Her questions dig deep into secrets and hidden emotions
                            </Text>
                        </View>
                        <Image
                            source={require('../assets/img/ab43794d275e691a1e090767db78a4abeb0f5776.png')}
                            style={styles.characterImage}
                        />
                    </View>

                    <Text style={styles.paragraph}>
                        Shape Tales, Strike the Sky is not just a tool – it’s your personal storm of ideas. Choose a character, their questions guide you, and create stories worth remembering.
                    </Text>

                    <Text style={styles.paragraph}>
                        Whether you write or record them, your stories stay safe, ready to share, ready to grow, ready to strike when the moment comes.
                    </Text>
                </ScrollView>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        alignItems: 'center',
    },
    headerContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
        marginRight: 20,
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        letterSpacing: 1,
        flex: 1,
        textAlign: 'center',
        marginLeft: -44,
    },
    contentContainer: {
        width: '90%',
        paddingBottom: 40,
    },
    paragraph: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Roboto-Regular',
    },
    characterCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4A90E2',
        alignItems: 'center',
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
    characterTextContainer: {
        marginBottom: 15,
    },
    characterName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: 'Roboto-Bold',
    },
    characterDescription: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    characterImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default AboutScreen;
