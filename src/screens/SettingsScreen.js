import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Switch,
    Platform,
    Image,
    Linking, Alert
} from 'react-native';
import {clearAllWrittenStories} from "../redux/slices/textSlice";
import {clearAllGeneratedIdeas} from "../redux/slices/ideaSlice";
import {useDispatch} from "react-redux";

const SettingsScreen = ({navigation}) => {
    const [isMusicOn, setIsMusicOn] = useState(true);
    const [areNotificationsOn, setAreNotificationsOn] = useState(false);


    const dispatch = useDispatch(); // Initialize useDispatch

    const handleDeleteAllData = () => {
        Alert.alert(
            "Delete All Data?",
            "Are you sure you want to delete ALL your saved stories and generated ideas? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        dispatch(clearAllWrittenStories()); // Dispatch action to clear written stories
                        dispatch(clearAllGeneratedIdeas()); // Dispatch action to clear generated ideas
                        Alert.alert("Data Deleted", "All your stories and ideas have been cleared.");
                    },
                    style: "destructive" // Make the "Delete" button red on iOS
                }
            ],
            { cancelable: true }
        );
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
                    <Text style={styles.headerTitle}>SETTINGS</Text>
                    <View style={styles.headerRightPlaceholder} />
                </View>

                <View style={styles.settingsOptionsContainer}>
                    {/*<View style={styles.optionRow}>*/}
                    {/*    <Text style={styles.optionText}>Music</Text>*/}
                    {/*    <Switch*/}
                    {/*        trackColor={{ false: "#767577", true: "#81b0ff" }}*/}
                    {/*        thumbColor={isMusicOn ? "#007AFF" : "#f4f3f4"}*/}
                    {/*        ios_backgroundColor="#3e3e3e"*/}
                    {/*        onValueChange={setIsMusicOn}*/}
                    {/*        value={isMusicOn}*/}
                    {/*    />*/}
                    {/*</View>*/}

                    <TouchableOpacity style={styles.optionRow} onPress={handleDeleteAllData}> {/* Add onPress handler */}
                        <Text style={styles.optionText}>Delete All Data</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionRow} onPress={() => Linking.openURL('https://www.termsfeed.com/live/f8cf5180-bc48-4690-9d0b-167befe4bd2b')}>
                        <Text style={styles.optionText}>Terms of Use</Text>
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
    },
    headerContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
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
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },
    headerRightPlaceholder: {
        width: 44,
    },
    settingsOptionsContainer: {
        width: '90%',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 5,
    },
    optionText: {
        color: 'white',
        fontSize: 18,

        fontFamily: 'Michroma-Regular',
    },
    actionIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
});

export default SettingsScreen;
