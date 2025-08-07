import React from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image,
    Platform, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TechnologiesScreen = () => {
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
                    <Text style={styles.headerTitle}>TECHNOLOGIES</Text>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionTitle}>TECHNOLOGY STACK</Text>
                    <View style={styles.techStackContainer}>
                        <Text style={styles.techItem}>• React Native</Text>
                        <Text style={styles.techItem}>• JavaScript (ES6+)</Text>
                        <Text style={styles.techItem}>• Redux Toolkit (for state management)</Text>
                        <Text style={styles.techItem}>• React Navigation (for navigation)</Text>
                        <Text style={styles.techItem}>• React Native Audio Recorder Player (for audio)</Text>
                        <Text style={styles.techItem}>• ... and other auxiliary libraries</Text>
                    </View>

                    <Text style={styles.sectionTitle}>PURPOSE OF CREATION</Text>
                    <View style={styles.purposeBox}>
                        <Text style={styles.purposeText}>
                            This application was developed as a **practical project** to hone skills in **mobile development** using React Native.
                        </Text>
                        <Text style={styles.purposeText}>
                            The main goal was to study and apply:
                        </Text>
                        <Text style={styles.purposeListItem}>
                            • State management with Redux Toolkit.
                        </Text>
                        <Text style={styles.purposeListItem}>
                            • Navigation between screens.
                        </Text>
                        <Text style={styles.purposeListItem}>
                            • Working with native modules (e.g., audio).
                        </Text>
                        <Text style={styles.purposeListItem}>
                            • Creating custom UI components.
                        </Text>
                        <Text style={styles.purposeText}>
                            We aimed to create an intuitive and visually appealing user interface by applying best development practices.
                        </Text>
                    </View>

                    <Text style={styles.footerText}>
                        Thank you for your interest in our project!
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
        alignItems: 'center',
    },
    sectionTitle: {
        color: '#4A90E2',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        marginBottom: 15,
        marginTop: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    techStackContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
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
    techItem: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 5,
        fontFamily: 'Roboto-Regular',
    },
    purposeBox: {
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
    purposeText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'justify',
        marginBottom: 10,
        fontFamily: 'Roboto-Regular',
    },
    purposeListItem: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 5,
        marginLeft: 15,
        fontFamily: 'Roboto-Regular',
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        fontStyle: 'italic',
        fontFamily: 'Roboto-Regular',
    },
});

export default TechnologiesScreen;
