import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Image,
    Platform,
    Dimensions
} from 'react-native';

const characterData = [
    {
        id: '1',
        name: 'Chloe Cherrystorm',
        image: require('../assets/img/e0c983935dd40398d24bfebdf60b75795e882a7a.png'),
        questionsText: 'Sharp, direct, and impossible to ignore',
        navigate: 'QuestionsScreen'
    },
    {
        id: '2',
        name: 'Orion Orangefog',
        image: require('../assets/img/ab43794d275e691a1e090767db78a4abeb0f5776.png'),
        questionsText: 'Mood Prediction',
        navigate: 'MoodPredictionScreen'
    },
    {
        id: '3',
        name: 'Bea Blueberryzap',
        image: require('../assets/img/7132d231640d0f9ec20796f6df3a6d9bb46436a0.png'),
        questionsText: 'My Stories',
        navigate: 'MyStoriesScreen'
    },
    {
        id: '4',
        name: 'Felix Greenapple',
        image: require('../assets/img/FelixGreenapple.png'),
        questionsText: 'About',
        navigate: 'AboutScreen'
    },
    {
        id: '5', // Changed ID to be unique
        name: 'Liam Lemonbolt', // Changed name based on new image
        image: require('../assets/img/LiamLemonbolt.png'),
        questionsText: 'Story Builder',
        navigate: 'StoryBuilderScreen'
    },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CharacterScreen = ({navigation}) => {
    const renderCharacterCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardQuestionsText}>{item.questionsText}</Text>
            <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
            <TouchableOpacity style={styles.cardActionButton}  onPress={() => navigation.navigate(item.navigate)}>
                <Text style={styles.cardActionButtonText}>Select Character</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/img/d0c514e06d42a429956df3b4d2be7791084d318d.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.darkOverlay}>
                <View style={styles.headerButtonsContainer}>
                    <TouchableOpacity style={styles.headerButton} onPress={()=>{navigation.navigate('SettingsScreen')}}>
                        <Image source={require('../assets/img/Frame2.png')} style={styles.headerButtonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={()=>{navigation.navigate('TechnologiesScreen')}}>
                        <Image source={require('../assets/img/Frame3.png')} style={styles.headerButtonIcon} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={characterData}
                    renderItem={renderCharacterCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    contentContainerStyle={styles.cardsListContainer}
                />
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
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        justifyContent: 'space-between',
    },
    headerButtonsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerButton: {},
    headerButtonIcon: {},
    cardsListContainer: {
        paddingHorizontal: 0,
    },
    card: {
        width: windowWidth -20,
        height: windowHeight / 2,
        marginTop: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderColor: '#4A90E2',
        borderWidth: 2,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 15,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    cardName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: 'Roboto-Bold',
    },
    cardQuestionsText: {
        color: '#DDD',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Roboto-Regular',
    },
    cardImage: {
        width: '100%',
        height: 250,
        marginBottom: 15,
    },
    cardActionButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#007AFF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    cardActionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    dotsIndicatorContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'white',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

export default CharacterScreen;
