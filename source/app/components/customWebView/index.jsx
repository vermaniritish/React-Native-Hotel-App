import React from 'react';
import { Image, Linking, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { styles } from './style';
import { BackHandler } from 'react-native';

const CustomWebView = (props) => {
    React.useEffect(() => {
        const backAction = () => {
            if(props.data.onPress) {
                props.data.onPress()
            }
            else if(props.onPress) {
                props.onPress();
            }
           return true;
         };
     
         const backHandler = BackHandler.addEventListener(
           'hardwareBackPress',
           backAction,
         );
     
         return () => backHandler.remove();
    }, []);
    return (
        <>
           <View style={styles.view}>
                <View
                    style={[styles.topBar, {paddingTop: Platform.OS === 'ios' ? 27 : StatusBar.currentHeight}]}
                >
                    <View style={styles.topBarTitle}>
                        <Text style={styles.title_ti}>{props.data.title}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                if(props.data.onPress) {
                                    props.data.onPress()
                                }
                                else if(props.onPress) {
                                    props.onPress();
                                }
                            }}
                            style={styles.crossover}
                        >
                            <Image
                                source={require('../../assets/icons/chevron-left.png')}
                                style={styles.crossIcon}
                                onPress={() => props.onClose()}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <WebView 
                    source={{uri: props.data.url}} 
                    // source={{uri: 'https://google.com'}} 
                    style={{marginTop: '20'}}
                    originWhitelist={[ '*']}
                    onShouldStartLoadWithRequest={event => {
                        if (event.url.slice(0, 6) === 'mailto' || event.url.slice(0, 3) === 'tel') {
                            Linking.openURL(event.url);
                            return false
                        }
                        return true;
                    }}
                    
                />
            </View>
        </>
    );
};

export default CustomWebView;
