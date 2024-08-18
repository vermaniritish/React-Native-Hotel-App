import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';


const FirebaseAnalytics = props => {

    return {
        initialize: async () => {
            const credentials = {
                clientId: '107330213838065618947',
                appId: '1:1020440294708:android:93d15f5e4eee70f506e161',
                apiKey: 'AIzaSyDhRtKdYmIWTHEYp2s4tXd7ggksYoD7Kik',
                storageBucket: 'destiniaanalyticstest.appspot.com',
                messagingSenderId: '1020440294708',
                projectId: 'destiniaanalyticstest',
            };
              
            const config = {
                name: 'Destinia',
            };
            
            await firebase.initializeApp(credentials, config);
        },
        logEvent: async (params) => {
            try {
                await analytics().logEvent('AnalyticsEventScreenView', params);
                console.log('Custom event logged successfully', params);
            } catch (error) {
                console.error('Error logging custom event', error);
            }
        },
        logCustomEvent: async (type, params) => {
            try {
                await analytics().logEvent(type, params);
                console.log('Custom event logged successfully', params);
            } catch (error) {
                console.error('Error logging custom event', error);
            }
        }
    };
}

export default FirebaseAnalytics;