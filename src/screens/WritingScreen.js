import React from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,
    Platform, Alert, TextInput, ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
    startEditing,
    updateStoryText,
    saveStoryText,
    cancelEditing,
    loadSavedText
} from "../redux/slices/textSlice";

const WritingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const { storyText, isEditing, savedText } = useSelector((state) => state.text);

    const { question } = route.params || {};

    const handleStartWriting = () => {
        dispatch(startEditing(savedText || ''));
    };

    const handleSaveWriting = () => {
        const storyTitle = "My Story from " + new Date().toLocaleDateString('en-US');
        dispatch(saveStoryText({
            title: storyTitle,
            question: question || 'Question not specified'
        }));
        Alert.alert('Story Saved!', 'Your text has been saved.', [
            { text: 'OK', onPress: () => {
                } }
        ]);
    };

    const handleCancelWriting = () => {
        Alert.alert(
            'Cancel Writing?',
            'Are you sure you want to cancel? Unsaved changes will be lost.',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => {
                        dispatch(cancelEditing());
                    } }
            ]
        );
    };

    const handleNewStory = () => {
        dispatch(startEditing(''));
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
                </View>

                <View style={styles.questionsContainer}>
                    <TouchableOpacity style={styles.questionBox}>
                        <Text style={styles.questionText}>{question || 'What old photo reveals more than it should?'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.questionBox}>
                        <Text style={styles.questionText}>Why does this house feel haunted by more than just ghosts?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.questionBox}>
                        <Text style={styles.questionText}>Who loved someone they weren't supposed to?</Text>
                    </TouchableOpacity>
                </View>

                {!isEditing ? (
                    <View style={styles.idleWritingContainer}>
                        {savedText ? (
                            <>
                                <Text style={styles.savedTextPreview}>
                                    {savedText.length > 100 ? savedText.substring(0, 100) + '...' : savedText}
                                </Text>
                                <TouchableOpacity style={styles.continueWritingButton} onPress={handleStartWriting}>
                                    <Text style={styles.continueWritingButtonText}>Continue</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.newStoryButton} onPress={handleNewStory}>
                                    <Text style={styles.newStoryButtonText}>New Story</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity style={styles.startWritingButton} onPress={handleStartWriting}>
                                <Text style={styles.startWritingButtonText}>Start Writing</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <ScrollView style={styles.textInputScrollView} contentContainerStyle={styles.textInputContent}>
                        <TextInput
                            style={styles.storyTextInput}
                            multiline
                            placeholder="Start your story here..."
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            value={storyText}
                            onChangeText={(text) => dispatch(updateStoryText(text))}
                            textAlignVertical="top"
                            autoFocus={true}
                        />
                    </ScrollView>
                )}


                <View style={styles.bottomButtonsContainer}>
                    {isEditing ? (
                        <>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelWriting}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveWriting}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <></>
                    )}
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
    idleWritingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginBottom: 20,
    },
    startWritingButton: {
        backgroundColor: '#007AFF',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
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
    startWritingButtonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    savedTextPreview: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
        maxHeight: 150,
    },
    continueWritingButton: {
        backgroundColor: '#00C853',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginBottom: 15,
        ...Platform.select({
            ios: {
                shadowColor: '#00C853',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    continueWritingButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    newStoryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    newStoryButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    textInputScrollView: {
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
    textInputContent: {
        padding: 20,
    },
    storyTextInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        textAlignVertical: 'top',
        fontFamily: 'Roboto-Regular',
        minHeight: 200,
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    cancelButton: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#FF4D4D',
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#FF4D4D',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    saveButton: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        paddingVertical: 15,
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
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
});

export default WritingScreen;
