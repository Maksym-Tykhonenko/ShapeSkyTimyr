import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform } from 'react-native';

const QuestionsScreen = ({navigation}) => {
    const characterName = 'Chloe Cherrystorm';
    const characterImage = require('../assets/img/e0c983935dd40398d24bfebdf60b75795e882a7a.png');

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
                    {/*<View style={styles.headerRightButtons}>*/}
                    {/*    <TouchableOpacity style={styles.headerRightButton}>*/}
                    {/*        <Image source={require('../assets/img/Frame2.png')} style={styles.headerButtonIcon} />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                </View>

                <View style={styles.characterIntroSection}>
                    <Image source={characterImage} style={styles.characterImage} resizeMode="contain" />
                    <Text style={styles.introText}>
                        Your questions from <Text style={styles.characterNameText}>{characterName}</Text>
                    </Text>
                </View>

                <View style={styles.questionsContainer}>
                    <TouchableOpacity style={styles.questionBox}>
                        <Text style={styles.questionText}>Why does this house feel haunted by more than just ghosts?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.questionBox}>
                        <Text style={styles.questionText}>Who loved someone they weren't supposed to?</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.instructionText}>
                    Use these questions for inspiration. You can change them or start your story now
                </Text>

                {/*<TouchableOpacity style={styles.newQuestionsButton}>*/}
                {/*    <Text style={styles.newQuestionsButtonText}>New Questions</Text>*/}
                {/*</TouchableOpacity>*/}

                <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={()=>{navigation.navigate('WritingScreen')}}>
                        <Text style={styles.actionButtonText}>Write</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    headerRightButtons: {
        flexDirection: 'row',
    },
    headerRightButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#007AFF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 10,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    headerButtonIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    characterIntroSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    characterImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    introText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    characterNameText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        color: '#81b0ff',
    },
    questionsContainer: {
        width: '90%',
        marginBottom: 20,
    },
    questionBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
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
    questionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    instructionText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 30,
        fontFamily: 'Roboto-Regular',
    },
    newQuestionsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#4A90E2',
        ...Platform.select({
            ios: {
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    newQuestionsIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
        marginRight: 10,
    },
    newQuestionsButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    actionButtonIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
        marginRight: 8,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
});

export default QuestionsScreen;
