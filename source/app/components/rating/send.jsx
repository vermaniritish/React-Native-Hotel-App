import React, { useEffect } from 'react'
import { BackHandler, Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { base } from '../../assets/global_style/base'
import NetInfo from "@react-native-community/netinfo";
import { Button, Image } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { fp, hp, wp } from '../../assets/global_style/fontsize'
import { styles } from './style'
import { colors } from '../../assets/global_style/colors'
import { API } from '../../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SendRating = (props) => {
    const windowHeight = Dimensions.get('window').height;
    const [isConnected, setIsConnected] = React.useState(true);
	const {t, i18n} = useTranslation();   
    const [focused, setFocused] = React.useState(null);
    const [email, setEmail] = React.useState(``);
    const [errorEmail, setErrorEmail] = React.useState(``);
    const [message, setMessage] = React.useState(``);
    const [errorMessage, setErrorMessage] = React.useState(``);
    const [saved, setSaved] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    
    
    const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    useEffect(() => {
        console.log('yes');
        const backAction = () => {
            props.onClose()
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
            
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            backHandler.remove();
            unsubscribe();
        }
      }, []);
      const handleReconnect = async () => {
        try {
          const state = await NetInfo.fetch();
          setIsConnected(state.isConnected);
        } catch (error) {
          console.error('Error fetching network information', error);
        }
      };
    
    const submit = async () => {
        Keyboard.dismiss();
        if(errorEmail || errorMessage || saving) return false;
        setSaving(true);
        let url = `https://haxapps.destinia.com/json/app.feedback/${(Platform.OS=== 'ios' ? 'app.ios' : 'app.android' )}/?bd=8f5bff6bbf6154a2ea413ac4654d4b45`;
        let response = await API.post(url, {
            email: email,
            comment: message
        })
        if(response && response.status) {
            setSaved(true);
            AsyncStorage.setItem('rating_done', '1');
            setTimeout(() => {
                props.onClose();
            }, 1200)
        }
        setSaving(false);
    }
    
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView>
            <View style={[base.subrow, {height: windowHeight}]}>
                <View style={[{ paddingTop: hp(42), width: '100%', backgroundColor: '#FFF' }]}>
                    
                    <View style={styles.uptitle}>
                        <View style={styles.headtitle}>
                            <TouchableOpacity onPress={() => props.onClose()} style={styles.crossIconWrap}>
                                <Image
                                    source={require('../../assets/icons/chevron-left.png')}
                                    style={styles.crossIcon}
                                    
                                />
                            </TouchableOpacity>
                                
                            <Text style={styles.txtit}>{props.title}</Text>
                        </View>
                    </View>
                </View>
                <View style={base.w100}>
                    <View style={base.w100}>
                        <View style={styles.scrollWrap}>
                            <View 
                                style={styles.scrollContent}
                            >
                                <View style={[base.row]}>
                                    <View style={[base.col12, base.mb4]}>
                                        <Text style={[styles.textit]}>{t('Send_Rating_Text')}</Text>
                                    </View>
                                </View>
                                <View style={[base.row, base.mb4]}>
                                    <View style={[base.col12]}>
                                        <Text style={styles.inputLabel}>{ t('E-mail') }</Text>
                                        <View style={[styles.inut, (focused == 'email' ? styles.inputActive : {})]}>
										    <TextInput
                                                style={styles.input}
                                                placeholder=""
                                                keyboardType="default"
                                                value={email}
                                                selectionColor={colors.blue}
                                                onChangeText={(val) => {
                                                    console.log(val, validateEmail(val));
                                                    if(!val) {
                                                        setErrorEmail(t(`This field is required`));
                                                    }
                                                    else if(!validateEmail(val)) {
                                                        setErrorEmail(t(`Please enter a valid email address`));
                                                    }
                                                    else {
                                                        setErrorEmail(``);
                                                    }
                                                    setEmail(val);
                                                }}
                                                onFocus={() => {
                                                    setFocused('email')
                                                }}
                                            />
                                        </View>
                                        {
                                            errorEmail
                                            &&
                                            <Text style={{color: colors.rederror}}>{errorEmail}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={[base.row, base.mb5]}>
                                    <View style={[base.col12]}>
                                        <Text style={styles.inputLabel}>{ t(`Comentario`) }</Text>
                                        <View style={[styles.inut, {height: 'auto'}, (focused == 'message' ? styles.inputActive : {})]}>
										    <TextInput
                                                style={[styles.input, {overflow: 'scroll', marginTop: '1%'}]}
                                                placeholder={``}
                                                keyboardType="default"
                                                multiline
                                                value={message}
                                                selectionColor={colors.blue}
                                                onChangeText={(val) => {
                                                    if(!val) {
                                                        setErrorMessage(t(`This field is required`));
                                                    }
                                                    else {
                                                        setErrorMessage(``);
                                                    }
                                                    setMessage(val);
                                                }}
                                                onFocus={() => {
                                                    setFocused('message')
                                                }}
                                            />
                                        </View>
                                        {
                                            errorMessage
                                            &&
                                            <Text style={{color: colors.rederror}}>{errorMessage}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={[base.row, base.mb5]}>
                                    <View style={[base.col12]}>
                                        <Button buttonStyle={styles.lastbtn} titleStyle={styles.lasttitle}
                                            onPress={submit}
                                        >{t('Enviar')}</Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {isConnected ? (
                                    <></>
                                ) : (
                                    <View style={{position: 'absolute', bottom: 0, backgroundColor: '#46403c', width: '100%', height: '40', paddingHorizontal: wp('20'), paddingVertical: wp('15') }}>
                                        <Text style={{color: '#FFF', fontSize: fp(18), marginBottom: hp(10)}}>{t('Internet_detect_message')}</Text>
                                        <TouchableOpacity
                                            onPress={handleReconnect}
                                        ><Text style={{color: '#ee7e38', fontSize: fp(18)}}>{t('Try_Again')}</Text></TouchableOpacity>
                                    </View>
                                )}
             {saved && (
                    <View style={{position: 'absolute', bottom: 0, backgroundColor: '#018749', width: '100%', height: '40', paddingHorizontal: wp('20'), paddingVertical: wp('15') }}>
                        <Text style={{color: '#FFF', fontSize: fp(18), marginBottom: hp(10)}}>{t('Thanks you for sharing your opinion.')}</Text>
                    </View>
                )}
            </KeyboardAvoidingView>
        </View>
    )
}

export default SendRating