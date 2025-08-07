import React from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,
    Platform, ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const StoryDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { story } = route.params || {};

    if (!story) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: Story not found.</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

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
                    <Text style={styles.headerTitle}>{story.title ? story.title.toUpperCase() : 'STORY DETAILS'}</Text>
                    {/*<View style={styles.headerRightButtons}>*/}
                    {/*    <TouchableOpacity style={styles.headerRightButton}>*/}
                    {/*        <Image source={require('../assets/img/Layer_1_1_.png')} style={styles.headerButtonIcon} />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                </View>

                <View style={styles.characterSection}>
                    <Image
                        source={require('../assets/img/e0c983935dd40398d24bfebdf60b75795e882a7a.png')}
                        style={styles.characterImage}
                    />
                    <Text style={styles.questionsFromText}>Your questions from Chloe Cherrystorm</Text>
                </View>

                <View style={styles.questionsContainer}>
                    <TouchableOpacity style={styles.questionBox}>
                        <Text style={styles.questionText}>{story.question || 'Question not specified'}</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.storyContentScrollView} contentContainerStyle={styles.storyContentContainer}>
                    <Text style={styles.storyText}>{story.text}</Text>
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
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
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
    characterSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    characterImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    questionsFromText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginBottom: 10,
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
    storyContentScrollView: {
        flex: 1,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#4A90E2',
        marginBottom: 20,
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
    storyContentContainer: {
        padding: 20,
    },
    storyText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Roboto-Regular',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
    },
    errorText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
});

export default StoryDetailScreen;
