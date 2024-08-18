import {React, useEffect, useState} from 'react';
import { View, Switch, Platform, Linking, AppState} from 'react-native';
import { StyleSheet, Text, TouchableOpacity, BackHandler, Image} from 'react-native';
import { styles } from './style';
import WebView from 'react-native-webview';
import { Icon } from '@rneui/themed';
import { Icons, IconsType } from '../../assets/global_style/icon';
import { colors } from '../../assets/global_style/colors';
import { Dimension } from '../../assets/global_style/dimension';
import {useTranslation} from 'react-i18next';
import { connect } from 'react-redux';
import { hp, wp } from '../../assets/global_style/fontsize';
import FirebaseAnalytics from '../FirebaseAnalytics';
import FirebaseNotifications from '../../../FirebaseNotifications';
import { useIsFocused } from '@react-navigation/native';


const Settings = (props) => {
   const {t, i18n} = useTranslation();
   const [detectLanguage, setDetectLang] = useState(props.language && props.language.code ? props.language.code : global.deviceLanguage);
   const languages = [
      {
         label: 'Español',
         code: 'es'
      },
      {
         label: 'English',
         code: 'en'
      },
      {
         label: 'Français',
         code: 'fr'
      },
      {
         label: 'Italiano',
         code: 'it'
      },
      {
         label: 'Deutsch',
         code: 'de'
      },
      {
         label: 'Português',
         code: 'pt'
      },
      {
         label: 'العربية',
         code: 'ar',
      }
   ];
   
   const isFocused = useIsFocused();

   let defaultLang = languages.filter((l) => {
      return l.code == detectLanguage
   });

   
   const [checked, setChecked] = useState(false);
   const {logEvent} = FirebaseAnalytics();
   const {checkPermissions, requestPermission, registerToken, deregisterToken} = FirebaseNotifications();

   const firebaseEvents = async () => {
      let notifiPermitted = await checkPermissions();
      console.log('yes', notifiPermitted);
      if(notifiPermitted) {
         setChecked(true);
         registerToken();
      }
      else {
         setChecked(false);
         deregisterToken();
      }
      
      logEvent({
			AnalyticsParameterScreenName: `app_settings_screen`,
			AnalyticsParameterScreenClass: `app_area`,
         AnalyticsParameterpageCategory: `231`
		});
   }

   firebaseEvents();

   useEffect(() => {
      let subscription = AppState.addEventListener('change', firebaseEvents);
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress', () => {
            props.onPress('menu')
            return true;
         },
      );
  
      return () => {
         backHandler.remove();
         subscription.remove();
      }
    }, []);

   
    return (
        <>
           <View style={styles.view}>
                <View style={styles.mainhef}>
                <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                  <TouchableOpacity
                     onPress={() => props.onPress('menu')}
                     style={[{position: 'absolute',alignItems: 'center', width: wp(55), height: hp(60)}, {left: wp('10')} ]}
                  >
                     <Image
                        source={detectLanguage == 'ar' ? require('../../assets/icons/back_ar.png') : require('../../assets/icons/back.png')}
                        style={[{ width: wp('18'), height: wp('26'), marginTop: hp(15)}]}
                        
                     />
                  </TouchableOpacity>
                  <Text style={styles.head}>{t('Ajustes_notificaciones')}</Text>
                </View>
                </View>
                <View>
                   <View style={styles.mainit}>
                    <Text style={styles.txtonw}>{t('Ajustes')}</Text>
                    
                    <View  style={styles.divide}>
                         <View style={styles.left}>
                              <TouchableOpacity
                                 onPress={() => props.onPress('language')}
                              >
                            <Text style={styles.txtblack}>
                                {t('idioma')}
                            </Text>
                            </TouchableOpacity>
                         </View>
                         <View style={styles.right}>
                              <TouchableOpacity
                                 onPress={() => props.onPress('language')}
                              >
                                 <Text style={styles.txtblue}>
                                    {props.language && props.language.label ?  props.language.label : (defaultLang.length > 0 ? defaultLang[0].label : `English`)}
                                 </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
                    <View  style={styles.divide}>
                         <View style={styles.left}>
                           <TouchableOpacity
                              onPress={() => props.onPress('currency')}
                           >
                              <Text style={styles.txtblack}>
                              {t('Moneda')}
                              </Text>
                            </TouchableOpacity>
                         </View>
                         <View style={styles.right}>
                              <TouchableOpacity
                                 onPress={() => props.onPress('currency')}
                              >
                                 <Text style={styles.txtblue}>
                                    {props.currency && props.currency.label ?  props.currency.label + `(${props.currency.code})` : `Euro (€)`}
                                 </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
                   </View>
                   <View style={styles.mainit}>
                    <Text style={styles.txtonw}>{t('Notificaciones')}</Text>
                   
                    <View  style={styles.divide}>
                         <View style={styles.left}>
                            <Text style={styles.txtblack}>
                            {t('Notificaciones')}
                            </Text>
                         </View>
                         <View style={styles.right}>
                            <Switch
                                 value={checked}
                                 onValueChange={async (value) => {
                                       if (Platform.OS === 'ios') {
                                          Linking.openURL('app-settings:');
                                       } else {
                                          Linking.openSettings();
                                       }
                                 }}
                                 trackColor={{false: '#767577', true: '#81b0ff'}}
                                 thumbColor={checked ? colors.blue : '#f4f3f4'}
                                 ios_backgroundColor="#3e3e3e"
                                 style={styles.switch}
                           >
                            </Switch>
                         </View>
                    </View>
                   </View>
                </View>
            </View>
            
        </>
    );
};

const mapStateToProps = (state) => {
   return {
     currency: state.CurrencyReducer.currency,
     language: state.LanguageReducer.language,
   };
 };
 
 export default connect(mapStateToProps)(Settings);
