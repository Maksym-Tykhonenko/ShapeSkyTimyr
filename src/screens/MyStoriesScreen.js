import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,
    Platform, FlatList, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWrittenStory } from '../redux/slices/textSlice';
import { deleteGeneratedIdea } from '../redux/slices/ideaSlice';

const MyStoriesScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const writtenStories = useSelector((state) => state.text.writtenStories);
    const generatedIdeas = useSelector((state) => state.ideas.generatedIdeas);

    const [activeTab, setActiveTab] = useState('WRITTEN');

    const handleDeleteStory = (id, type) => {
        Alert.alert(
            'Delete Story?',
            'Are you sure you want to delete this story? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        if (type === 'written') {
                            dispatch(deleteWrittenStory(id));
                        } else if (type === 'idea') {
                            dispatch(deleteGeneratedIdea(id));
                        }
                    },
                },
            ]
        );
    };

    const handleStoryPress = (item, type) => {
        navigation.navigate('StoryDetail', {
            story: { ...item, type: type }
        });
    };

    const renderStoryCard = ({ item }) => (
        <TouchableOpacity
            style={styles.storyCard}
            onPress={() => handleStoryPress(item, activeTab === 'WRITTEN' ? 'written' : 'idea')}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTypeIcon}>
                    {activeTab === 'WRITTEN' ? '📝' : '💡'}
                </Text>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                        {item.title}
                    </Text>
                    <Text style={styles.cardDate}>{item.date}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => handleDeleteStory(item.id, activeTab === 'WRITTEN' ? 'written' : 'idea')}
                    style={styles.deleteButton}
                >
                    <Text style={styles.deleteButtonText}>✖️</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.cardQuestionPreview} numberOfLines={2} ellipsizeMode="tail">
                    {item.question || 'No question provided.'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const storiesToShow = activeTab === 'WRITTEN' ? writtenStories : generatedIdeas;

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
                    <Text style={styles.headerTitle}>MY STORIES</Text>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'WRITTEN' && styles.activeTabButton]}
                        onPress={() => setActiveTab('WRITTEN')}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 'WRITTEN' && styles.activeTabButtonText]}>WRITTEN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'GENERATED_IDEAS' && styles.activeTabButton]}
                        onPress={() => setActiveTab('GENERATED_IDEAS')}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 'GENERATED_IDEAS' && styles.activeTabButtonText]}>IDEAS</Text>
                    </TouchableOpacity>
                </View>

                {storiesToShow.length === 0 ? (
                    <View style={styles.noStoriesContainer}>
                        <Image
                            source={require('../assets/img/14196572a35295b37cd27f95890d186d334cfdc2.png')}
                            style={styles.noStoriesIcon}
                        />
                        <Text style={styles.noStoriesText}>Nothing here yet!</Text>
                        <Text style={styles.noStoriesSubText}>
                            {activeTab === 'WRITTEN'
                                ? 'Start writing your first story inspired by a question.'
                                : 'Generate your first story idea from the Story Builder.'}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={storiesToShow}
                        renderItem={renderStoryCard}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.storiesList}
                        showsVerticalScrollIndicator={false}
                    />
                )}
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
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 30,
        padding: 5,
        marginBottom: 20,
        width: '90%',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#4A90E2',
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
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
    },
    activeTabButton: {
        backgroundColor: '#FFA500',
        ...Platform.select({
            ios: {
                shadowColor: '#FFA500',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    tabButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    activeTabButtonText: {
        color: 'white',
    },
    noStoriesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    noStoriesIcon: {
        width: 150, // Smaller icon
        height: 150, // Smaller icon
        tintColor: 'rgba(255, 255, 255, 0.5)', // Softer tint
        marginBottom: 20,
    },
    noStoriesText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Roboto-Bold',
    },
    noStoriesSubText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        lineHeight: 22,
    },
    storiesList: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    // --- START Card Design Changes ---
    storyCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)', // Slightly less opaque
        borderRadius: 20, // More rounded corners
        padding: 20, // More padding
        marginBottom: 18, // More space between cards
        borderWidth: 1,
        borderColor: 'rgba(74, 144, 226, 0.4)', // Softer blue border
        overflow: 'hidden', // Ensures content stays within rounded corners
        ...Platform.select({
            ios: {
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 4 }, // Subtle shadow below
                shadowOpacity: 0.4,
                shadowRadius: 8,
            },
            android: {
                elevation: 8, // Increased elevation for Android
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // Space between header and body
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)', // Subtle separator
        paddingBottom: 10,
    },
    cardTypeIcon: {
        fontSize: 28, // Slightly smaller icon
        marginRight: 15, // More space from title
        color: 'white',
    },
    cardTitleContainer: {
        flex: 1,
    },
    cardTitle: {
        color: 'white',
        fontSize: 20, // Slightly larger title
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        marginBottom: 2, // Small space between title and date
    },
    cardDate: {
        color: 'rgba(255, 255, 255, 0.6)', // Softer date color
        fontSize: 13, // Slightly smaller date font
        fontFamily: 'Roboto-Regular',
    },
    deleteButton: {
        padding: 8, // More padding for easier press
        marginLeft: 15,
        backgroundColor: 'rgba(255, 77, 77, 0.2)', // Light red background for delete button
        borderRadius: 15, // Rounded delete button
    },
    deleteButtonText: {
        fontSize: 18, // Larger '✖️'
        color: '#FF4D4D', // Red cross
        fontWeight: 'bold',
    },
    cardBody: {
        marginTop: 5, // Space from separator
    },
    cardQuestionPreview: {
        color: 'rgba(255, 255, 255, 0.85)', // Slightly brighter text
        fontSize: 15, // Slightly larger font for preview
        fontStyle: 'italic',
        fontFamily: 'Roboto-Regular',
        lineHeight: 20, // Better line spacing
    },
    // --- END Card Design Changes ---
});

export default MyStoriesScreen;
