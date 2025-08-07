import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,
    Platform, ScrollView, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addGeneratedIdea } from "../redux/slices/ideaSlice";

const storyElements = {
    character: [
        { name: "Mysterious stranger" },
        { name: "Wise elder" },
        { name: "Young adventurer" },
        { name: "Lost robot" },
        { name: "Cunning wizard/sorceress" },
    ],
    setting: [
        { name: "Abandoned mansion" },
        { name: "Futuristic megacity" },
        { name: "Ancient mysterious forest" },
        { name: "Spaceship" },
        { name: "Underwater city" },
    ],
    object: [
        { name: "Antique clock" },
        { name: "Mysterious amulet" },
        { name: "Glowing crystal" },
        { name: "Diary with blank pages" },
        { name: "Strange map" },
    ],
    plotTwist: [
        { name: "Betrayal by a close friend" },
        { name: "Discovery of a hidden inheritance" },
        { name: "The hero becomes the villain" },
        { name: "The world turns out to be a simulation" },
        { name: "The past affects the present" },
    ],
};

const getRandomElement = (category) => {
    const items = storyElements[category];
    return items[Math.floor(Math.random() * items.length)];
};

const StoryBuilderScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [generatedElements, setGeneratedElements] = useState({
        character: null,
        setting: null,
        object: null,
        plotTwist: null,
    });
    const [selectedCategories, setSelectedCategories] = useState({
        character: true,
        setting: true,
        object: true,
        plotTwist: true,
    });

    const toggleCategory = (category) => {
        setSelectedCategories(prev => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const generateStoryIdea = (specificCategory = null) => {
        setGeneratedElements(prev => {
            const newElements = { ...prev };
            if (specificCategory) {
                newElements[specificCategory] = getRandomElement(specificCategory);
            } else {
                for (const category in selectedCategories) {
                    if (selectedCategories[category]) {
                        newElements[category] = getRandomElement(category);
                    } else {
                        newElements[category] = null;
                    }
                }
            }
            return newElements;
        });
    };

    const saveStoryIdea = () => {
        const title = "Story Idea: " + new Date().toLocaleDateString('en-US');
        let ideaText = "Here is your story idea:\n\n";

        let hasContent = false;
        if (generatedElements.character) { ideaText += `Character: ${generatedElements.character.name}\n`; hasContent = true; }
        if (generatedElements.setting) { ideaText += `Setting: ${generatedElements.setting.name}\n`; hasContent = true; }
        if (generatedElements.object) { ideaText += `Object: ${generatedElements.object.name}\n`; hasContent = true; }
        if (generatedElements.plotTwist) { ideaText += `Plot Twist: ${generatedElements.plotTwist.name}\n`; hasContent = true; }

        if (!hasContent) {
            Alert.alert("Save Error", "Nothing to save. Generate at least one element!");
            return;
        }

        const newIdea = {
            id: `generated_idea_${Date.now()}`,
            title: title,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            text: ideaText,
            question: "Idea generated in the story builder.",
            type: 'idea',
        };
        dispatch(addGeneratedIdea(newIdea));
        Alert.alert("Saved!", "Story idea successfully saved in 'My Stories' (Ideas Tab).");
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
                    <Text style={styles.headerTitle}>STORY BUILDER</Text>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.descriptionText}>
                        Select categories and generate unique ideas for your stories!
                    </Text>

                    <View style={styles.categorySelectionContainer}>
                        {Object.keys(storyElements).map(categoryKey => (
                            <TouchableOpacity
                                key={categoryKey}
                                style={[
                                    styles.categoryButton,
                                    selectedCategories[categoryKey] ? styles.activeCategoryButton : null
                                ]}
                                onPress={() => toggleCategory(categoryKey)}
                            >
                                <Text style={styles.categoryButtonText}>
                                    {categoryKey === 'character' ? 'Character' :
                                        categoryKey === 'setting' ? 'Setting' :
                                            categoryKey === 'object' ? 'Object' :
                                                categoryKey === 'plotTwist' ? 'Plot Twist' : categoryKey}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.generateButton} onPress={() => generateStoryIdea()}>
                        <Text style={styles.generateButtonText}>GENERATE IDEA</Text>
                    </TouchableOpacity>

                    {Object.keys(generatedElements).map(categoryKey => {
                        const element = generatedElements[categoryKey];
                        if (element) {
                            console.log("elementL: ", element.name)
                            return (
                                <View key={categoryKey} style={styles.generatedElementCard}>
                                    <View style={styles.generatedElementContent}>
                                        {/* You can add icons here later if needed */}
                                        <View style={styles.elementTextContainer}>
                                            <Text style={styles.elementCategoryTitle}>
                                                {categoryKey === 'character' ? 'Character:' :
                                                    categoryKey === 'setting' ? 'Setting:' :
                                                        categoryKey === 'object' ? 'Object:' :
                                                            categoryKey === 'plotTwist' ? 'Plot Twist:' : categoryKey}
                                            </Text>
                                            <Text style={styles.elementName}>{element.name}</Text>
                                        </View>

                                    </View>
                                </View>
                            );
                        }
                        return null;
                    })}

                    {Object.values(generatedElements).some(e => e !== null) && (
                        <TouchableOpacity style={styles.saveIdeaButton} onPress={saveStoryIdea}>
                            <Text style={styles.saveIdeaButtonText}>SAVE IDEA</Text>
                        </TouchableOpacity>
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
        alignItems: 'center',
    },
    descriptionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Roboto-Regular',
        lineHeight: 24,
    },
    categorySelectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
        width: '100%',
    },
    categoryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    activeCategoryButton: {
        backgroundColor: '#4A90E2',
        borderColor: '#4A90E2',
        ...Platform.select({
            ios: {
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 10,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    categoryButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold', // Changed from Roboto-Regular to Roboto-Bold
    },
    generateButton: {
        backgroundColor: '#FFA500',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginBottom: 30,
        ...Platform.select({
            ios: {
                shadowColor: '#FFA500',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    generateButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    generatedElementCard: {
        // ИЗМЕНЕНИЕ ЗДЕСЬ:
        backgroundColor: 'rgba(50, 50, 50, 0.7)', // Более темный серый с прозрачностью для лучшего контраста
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#00C853',
        width: '100%',
        ...Platform.select({
            ios: {
                shadowColor: '#00C853',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    generatedElementContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    elementIcon: {
        width: 40,
        height: 40,
        tintColor: 'white',
        marginRight: 15,
    },
    elementTextContainer: {
        // flex: 1,
    },
    elementCategoryTitle: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
    elementName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold', // Ensure this is consistent with the font loaded
    },
    regenerateButton: {
        padding: 5,
    },
    regenerateIcon: {
        width: 25,
        height: 25,
        tintColor: 'rgba(255, 255, 255, 0.7)',
    },
    saveIdeaButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 10,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    saveIdeaButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
});

export default StoryBuilderScreen;
