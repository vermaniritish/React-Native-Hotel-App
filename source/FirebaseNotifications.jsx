import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, requestNotifications } from 'react-native-permissions';

const FirebaseNotifications = props => {

    let object = {
        initNotifictions: async () => {
            let app;
            if (firebase.apps.length === 0) {
                app = await firebase.initializeApp({
                    clientId: '107330213838065618947',
                    appId: '1:1020440294708:android:93d15f5e4eee70f506e161',
                    apiKey: 'AIzaSyDhRtKdYmIWTHEYp2s4tXd7ggksYoD7Kik',
                    storageBucket: 'destiniaanalyticstest.appspot.com',
                    messagingSenderId: '1020440294708',
                    projectId: 'destiniaanalyticstest',
                })
            } else {
                app = firebase.app()
            }
        },
        registerToken: async () => {
            let token = await AsyncStorage.getItem('fcm_token');
            console.log(`exist`, token);
            if(!token)
            {
                let token = await messaging().getToken();
                await AsyncStorage.setItem('fcm_token', token);
            }
        },
        deregisterToken: async () => {
            let token = await AsyncStorage.getItem('fcm_token');
            if(token) {
                await AsyncStorage.removeItem('fcm_token');
                await messaging().deleteToken()
            }
        },
        requestPermission: async () => {
            requestNotifications(['alert', 'sound']).then((status, settings) => {
                console.log(`status, settings`, status, settings);
            });
            // let result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            // console.log(`resultresultresultresult`, result);
            // if (result === RESULTS.GRANTED) {
            //     global.notifications = true;
            //     console.log('Notification permission granted');
            //   } else {
            //     global.notifications = false;
            //     console.log('Notification permission denied');
            //   }
        },
        checkPermissions: async () => {
            const android = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS); // 
            console.log(`androaid`, android, PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
            return android === RESULTS.GRANTED;
        },
        listener: async (type, params) => {
            messaging().setBackgroundMessageHandler(async remoteMessage => {
                console.log('Message handled in the background!', remoteMessage);
            });
    
            messaging().onMessage(async (remoteMessage) => {
                // Handle incoming message
                console.log('Received FCM message:', remoteMessage);
                // Handle notification in the foreground
                // Example: displayNotification(remoteMessage);
            });
        }
    };

    return object;
}

export default FirebaseNotifications;