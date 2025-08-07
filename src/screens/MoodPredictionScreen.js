import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,
    Platform, ScrollView, TextInput, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MoodPredictionScreen = () => {
    const navigation = useNavigation();

    const [answers, setAnswers] = useState(Array(5).fill(''));
    const [predictionMade, setPredictionMade] = useState(false);
    const [moodPrediction, setMoodPrediction] = useState('');

    const questions = [
        "What made you smile this morning?",
        "What one word describes your current state?",
        "What are you most looking forward to today?",
        "If your day were a song, what would it be?",
        "What color best reflects your mood right now?"
    ];

    const handleAnswerChange = (text, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = text;
        setAnswers(newAnswers);
    };

    const handleGetPrediction = () => {
        const filledAnswers = answers.filter(answer => answer.trim() !== '').length;

        if (filledAnswers < questions.length) {
            Alert.alert('Not all answers filled', 'Please answer all questions to get a prediction.');
            return;
        }

        let prediction = "Today your day will be filled with ";
        const keywords = answers.join(' ').toLowerCase();

        if (keywords.includes('happiness') || keywords.includes('joy') || keywords.includes('smile')) {
            prediction += "sparkling joy and pleasant surprises! Be open to new opportunities.";
        } else if (keywords.includes('calm') || keywords.includes('peace') || keywords.includes('quiet')) {
            prediction += "serenity and harmony. Take time for yourself and enjoy the moment.";
        } else if (keywords.includes('energy') || keywords.includes('movement') || keywords.includes('activity')) {
            prediction += "vibrant energy and productivity. Your efforts will bring excellent results!";
        } else if (keywords.includes('sadness') || keywords.includes('tiredness') || keywords.includes('reflection')) {
            prediction += "time for reflection and inner growth. Allow yourself to rest and recover.";
        } else {
            prediction += "unexpected discoveries and interesting encounters. The day will bring you new experiences.";
        }

        setMoodPrediction(prediction);
        setPredictionMade(true);
    };

    const handleReset = () => {
        setAnswers(Array(5).fill(''));
        setPredictionMade(false);
        setMoodPrediction('');
    };

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
                    <Text style={styles.headerTitle}>MOOD PREDICTION</Text>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    {!predictionMade ? (
                        <>
                            {questions.map((q, index) => (
                                <View key={index} style={styles.questionBox}>
                                    <Text style={styles.questionText}>{`${index + 1}. ${q}`}</Text>
                                    <TextInput
                                        style={styles.answerInput}
                                        placeholder="Your answer..."
                                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                        value={answers[index]}
                                        onChangeText={(text) => handleAnswerChange(text, index)}
                                        multiline
                                        textAlignVertical="top"
                                    />
                                </View>
                            ))}

                            <TouchableOpacity style={styles.predictButton} onPress={handleGetPrediction}>
                                <Text style={styles.predictButtonText}>Get Prediction</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.characterSection}>
                                <Image
                                    source={require('../assets/img/LiamLemonbolt.png')}
                                    style={styles.characterImage}
                                />
                                <Text style={styles.characterName}>Chloe Cherrystorm</Text>
                                <Text style={styles.predictionIntroText}>
                                    Based on your answers, here's what awaits you today:
                                </Text>
                            </View>

                            <View style={styles.predictionBox}>
                                <Text style={styles.predictionText}>{moodPrediction}</Text>
                            </View>

                            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                                <Text style={styles.resetButtonText}>Start Over</Text>
                            </TouchableOpacity>
                        </>
                    )}
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
        fontSize: 20,
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
        alignItems: 'center',
    },
    questionBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#4A90E2',
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
    questionText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'Roboto-Regular',
    },
    answerInput: {
        color: 'white',
        fontSize: 16,
        minHeight: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontFamily: 'Roboto-Regular',
    },
    predictButton: {
        backgroundColor: '#007AFF',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 20,
        marginBottom: 20,
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
    predictButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    characterSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    characterImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 15,
        resizeMode: 'contain',
    },
    characterName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Roboto-Bold',
    },
    predictionIntroText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
        fontFamily: 'Roboto-Regular',
    },
    predictionBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#FFA500',
        width: '100%',
        ...Platform.select({
            ios: {
                shadowColor: '#FFA500',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    predictionText: {
        color: 'white',
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    resetButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        marginTop: 10,
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
});

export default MoodPredictionScreen;
