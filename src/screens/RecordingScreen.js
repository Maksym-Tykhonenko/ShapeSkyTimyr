import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
//import AudioRecorderPlayer from ''
//import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetRecording,
  setRecordingError,
  startRecording,
  stopRecording,
  updateRecordingDuration,
} from '../redux/slices/audioSlice';

//const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { isRecording, recordedUri, recordingDuration, recordingError } =
    useSelector(state => state.audio);

  const { question } = route.params || {};

  const audioPath = Platform.select({
    ios: 'sound.m4a',
    android: 'sdcard/sound.mp4',
  });

  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message:
              'This app needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
          return true;
        } else {
          console.log('Microphone permission denied');
          Alert.alert(
            'Access Denied',
            'Microphone permission is required to record audio.',
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleStartRecording = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) return;

    try {
      dispatch(startRecording());
      const path = Platform.select({
        ios: audioPath,
        android: audioRecorderPlayer.currentPath + '/sound.mp4',
      });

      console.log('Recording to path:', path);
      const result = await AudioRecorderPlayer.startRecorder(path);

      AudioRecorderPlayer.addRecordBackListener(e => {
        dispatch(updateRecordingDuration(Math.floor(e.currentPosition / 1000)));
        return;
      });

      console.log('Recording started:', result);
    } catch (err) {
      dispatch(setRecordingError(err.message));
      console.error('Failed to start recording', err);
      Alert.alert(
        'Recording Error',
        `Failed to start recording: ${err.message}`,
      );
      dispatch(resetRecording());
    }
  };

  const handleStopRecording = async () => {
    try {
      const result = await AudioRecorderPlayer.stopRecorder();
      AudioRecorderPlayer.removeRecordBackListener();

      const finalUri = result;
      const durationMillis = recordingDuration * 1000;

      console.log(
        'Recording stopped. URI:',
        finalUri,
        'Duration:',
        recordingDuration,
      );
      dispatch(stopRecording({ uri: finalUri, duration: recordingDuration }));

      Alert.alert(
        'Recording Saved!',
        `Audio saved to: ${finalUri}\nDuration: ${formatDuration(
          recordingDuration,
        )}`,
        [
          {
            text: 'OK',
            onPress: () => {
              /* Maybe navigate or process here */
            },
          },
        ],
      );
    } catch (err) {
      dispatch(setRecordingError(err.message));
      console.error('Failed to stop recording', err);
      Alert.alert(
        'Recording Error',
        `Failed to stop recording: ${err.message}`,
      );
      dispatch(resetRecording());
    }
  };

  const formatDuration = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  useEffect(() => {
    return () => {
      if (isRecording) {
        handleStopRecording();
      }
      AudioRecorderPlayer.removeRecordBackListener();
      AudioRecorderPlayer.stopRecorder();
      dispatch(resetRecording());
    };
  }, [isRecording]);

  return (
    <ImageBackground
      source={require('../assets/img/d0c514e06d42a429956df3b4d2be7791084d318d.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.darkOverlay}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/img/Layer_1_1_.png')}
              style={styles.backButtonIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.questionsContainer}>
          <TouchableOpacity style={styles.questionBox}>
            <Text style={styles.questionText}>
              {question || 'What old photo reveals more than it should?'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.questionBox}>
            <Text style={styles.questionText}>
              Why does this house feel haunted by more than just ghosts?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.questionBox}>
            <Text style={styles.questionText}>
              Who loved someone they weren't supposed to?
            </Text>
          </TouchableOpacity>
        </View>

        {isRecording && (
          <Text style={styles.recordingTimer}>
            {formatDuration(recordingDuration)}
          </Text>
        )}

        <TouchableOpacity
          style={styles.microphoneButton}
          onPress={isRecording ? handleStopRecording : handleStartRecording}
          disabled={recordingError !== null}
        >
          <Image
            source={require('../assets/img/Frame22.png')}
            style={styles.microphoneIcon}
          />
        </TouchableOpacity>

        <View style={styles.bottomButtonsContainer}>
          {!isRecording ? (
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartRecording}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.stopButton}
                onPress={handleStopRecording}
              >
                <Text style={styles.stopButtonText}>STOP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.finishButton}
                onPress={() => {
                  if (recordedUri) {
                    Alert.alert(
                      'Recording Finished!',
                      'Your story has been saved!',
                      [
                        {
                          text: 'OK',
                          onPress: () => dispatch(resetRecording()),
                        },
                      ],
                    );
                  } else {
                    Alert.alert(
                      'No Recording',
                      'Please record your story first.',
                    );
                  }
                }}
              >
                <Text style={styles.finishButtonText}>FINISH</Text>
              </TouchableOpacity>
            </>
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
  questionsContainer: {
    width: '90%',
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
  recordingTimer: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Roboto-Bold',
  },
  microphoneButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 70,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#007AFF',
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),
    marginBottom: 40,
  },
  microphoneIcon: {
    width: 60,
    height: 60,
    tintColor: 'white',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    minWidth: 150,
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
  startButtonIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    marginRight: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  stopButton: {
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
  stopButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  finishButton: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#00C853',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#00C853',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  finishButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
});

export default RecordingScreen;
