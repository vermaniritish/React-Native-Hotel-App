import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Linking, I18nManager } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { fp, hp, hzp } from '../../../assets/global_style/fontsize';
import { styles } from './style';
import CustomWebView from '../../customWebView';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Dimension } from '../../../assets/global_style/dimension';
import { Font } from '../../../assets/global_style/fontfamily';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { SiftSciActions } from '../../../../SiftSciActions';
import CustomDTabs from '../../CustomDTabs';

import AppIntroSlider from 'react-native-app-intro-slider';
import FirebaseAnalytics from '../../FirebaseAnalytics';
import FirebaseNotifications from '../../../../FirebaseNotifications';

const Splash = props => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const slider = useRef();
  const [showDots, setShowDots] = useState(true);
  const [mounting, setMounting] = useState(true);
  const [openWebView, setOpenWebview] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {logEvent} = FirebaseAnalytics();
  let {requestPermission, listener, registerToken, checkPermissions} = FirebaseNotifications();
  const slides = [
    {
      key: '1',
      image: require('../../../assets/global_style/images/splach.png'),
      backgroundColor: '#59b2ab',
      button: t('Siguiente'),
    },
    {
      key: '2',
      // text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: require('../../../assets/global_style/images/splash3.png'),
      backgroundColor: '#febe29',
      button: t('Siguiente'),
    },
    {
      key: '3',
      // text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: require('../../../assets/global_style/images/splash2.png'),
      backgroundColor: '#22bcb5',
      button: t('Log_in'),
      extrabutton: true,
      newtxt: t('Maybe_later'),
    }
  ];
  
  useEffect(() => {
    trackingEvents();
    initScrrens()
    
  }, []);

  const initFirebaseFunction = async () => {
    await requestPermission();
    await listener();
    await registerToken();
  }


  const trackingEvents = () =>  {
    logEvent({
      AnalyticsParameterScreenName: `app_1_screen`,
      AnalyticsParameterScreenClass: `start_app`,
      AnalyticsParameterpageCategory: `231`
    });
    DeviceInfo.getUniqueId().then((uniqueId) => {
      SiftSciActions.setPageName(uniqueId, "Intro Screens");
    });
  }
  const initScrrens = async () => {
    await initFirebaseFunction()
    let yes = await AsyncStorage.getItem('introDone');
    let lang = await AsyncStorage.getItem('language');
    lang = lang ? JSON.parse(lang) : null;
    let currency = await AsyncStorage.getItem('currency');
    currency = currency ? JSON.parse(currency) : null;

    if(lang && lang.code) {
      props.setLangauge(lang);
      i18n.changeLanguage(lang.code);
    }
    else {
      i18n.changeLanguage(global.deviceLanguage);
    }
    
    let l =lang && lang.code ? lang.code : global.deviceLanguage;
    
    if(l == 'ar') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
    else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }

    let lastSearch = await AsyncStorage.getItem('LastSearches');
    if(lastSearch) {
      props.setLastSearch(JSON.parse(lastSearch));
    }

    if(currency && currency.code) {
      props.setCurrency(currency);
    }

    if(yes){
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'home' }]
      })
    }
    else
    {
      setMounting(false);
    }
  }

  const renderPrivacyCookieText = () => {
    let txt = t('By_continuing_you_agree_to_our');
    txt = txt.split('{');
    let fTxt = txt[0];
    let peTxt = txt[1].split('}');
    let pTxt = peTxt[0];
    beTxt = peTxt[1];
    let ceTxt = txt[2].split('}');
    let cTxt = ceTxt[0];
    let eTxt = ceTxt[1];
    
    return <>
      <Text style={styles.secScreenTitle}>{fTxt}
        <Text
          style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
          onPress={() => {
            let url = ('https://destinia.com/web/privacy_policy/' + (props.language && props.language.code ? props.language.code : global.deviceLanguage));
            Linking.openURL(url);
            
          }}>{pTxt}</Text>
          {beTxt} 
          <Text
            style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
            onPress={() => {
              let url = ('https://destinia.com/web/cookies/' + (props.language && props.language.code ? props.language.code : global.deviceLanguage));
              Linking.openURL(url);
            }}
          >{cTxt}</Text>{eTxt}
          </Text>
    </>
  }

  const onSlideChange = () => {
    setTimeout(() => {
      console.log(`SSSS`, slider && slider.current && slider.current.state.activeIndex);
      setCurrentSlide(slider && slider.current && slider.current.state.activeIndex);
      if(slider && slider.current && slider.current.state.activeIndex == 0)
      {
        logEvent({
          AnalyticsParameterScreenName: `app_1_screen`,
          AnalyticsParameterScreenClass: `start_app`,
          AnalyticsParameterpageCategory: `231`
        });
      }
      else if(slider && slider.current && slider.current.state.activeIndex == 1)
      {
        logEvent({
          AnalyticsParameterScreenName: `app_2_screen`,
          AnalyticsParameterScreenClass: `start_app`,
          AnalyticsParameterpageCategory: `231`
        });
      }
      else if(slider && slider.current && slider.current.state.activeIndex == 2)
      {
        logEvent({
          AnalyticsParameterScreenName: `app_3_screen`,
          AnalyticsParameterScreenClass: `start_app`,
          AnalyticsParameterpageCategory: `231`
        });
      }
    }, 5);
  }

  const _renderItem = ({ item, index }) => {
    return (
      index == 2 && openWebView
      ?
        <CustomWebView

          data={openWebView}
          onPress={() => {
            setOpenWebview(null);
            console.log(slider.current.state);
          }}
        />
      :
      <View style={styles.slide}>

        <View style={styles.imgmain}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={base.container}>
          <View style={base.row}>
            <View style={base.col12}>
              <View style={styles.inview}>
                {item.key == '1' &&
                  <>
                    <Text style={styles.strong}>{t('book_at_the_best_price')}</Text><Text style={styles.title}>{t('We_help_you_with_our')} {"\n"} {t('24_hour_customer_service')}</Text>
                  </>
                }

                {item.key == '2' &&
                  renderPrivacyCookieText()
                }
                {item.key == '3' &&
                  <>
                    <Text style={styles.title}><Text style={{ fontWeight: 'bold' }}>{t('Join_Destinia')}</Text> {t('accumulate_discounts_and_travel_for_free')}</Text>
                  </>
                }

                {
                  item.extrabutton
                    ?
                    <>
                      <View style={styles.buttonset}>
                        <Button
                          buttonStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderRadius: 40, borderColor: colors.blue }}
                          containerStyle={{ width: '100%' }}
                          titleStyle={{ width: '100%', fontSize: fp(25), color: colors.blue }}
                          onPress={async () => {
                            if (item.key < slides.length) {
                              slider.current.goToSlide(item.key, true)
                            }
                            else { 
                              let url = 'https://res.destinia.com/my-account/multilogin?showTabs=true&defaultTab=login&mode=app&lang='+(props.language && props.language.code ? props.language.code : global.deviceLanguage);
                              CustomDTabs.init(url)
                              // setOpenWebview({title: item.button, url: url});
                            }
                          }}>
                          {item.button}
                        </Button>
                      </View>
                      <View style={styles.buttonset}>
                        <Button
                          buttonStyle={{ backgroundColor: colors.blue, color: colors.black_Z }}
                          containerStyle={{ width: '100%', borderRadius: 40, backgroundColor: colors.blue }}
                          titleStyle={{ width: '100%', fontSize: fp(25), color: '#fff' }}
                          onPress={async () => {
                            let url = 'https://res.destinia.com/my-account/multilogin?showTabs=true&defaultTab=register&mode=app&lang='+(props.language && props.language.code ? props.language.code : global.deviceLanguage);
                            CustomDTabs.init(url);
                            // setOpenWebview({title: t('Regístrate'), url: url});
                          }}
                        >
                          {t('Regístrate')}
                        </Button>
                      </View>
                    </>
                    :
                    <View style={styles.buttonset}>
                      <Button
                        buttonStyle={{ backgroundColor: '#ffd212' }}
                        containerStyle={{ width: '100%', borderRadius: 40, backgroundColor: '#ffd212' }}
                        titleStyle={{ width: '100%', fontSize: fp(25), color: colors.black_Z, fontFamily: Font.medium }}
                        onPress={async () => {
                          if (item.key < slides.length) {
                            slider.current.goToSlide(item.key, true)
                          }
                          else {
                            let url = 'https://res.destinia.com/my-account/multilogin?showTabs=true&defaultTab=register&mode=app&lang='+(props.language && props.language.code ? props.language.code : global.deviceLanguage);
                            CustomDTabs.init(url);
                          }
                        }}>
                        {item.button}
                      </Button>
                    </View>
                }

                <Text style={styles.lastLine}
                  onPress={async () => {
                    await AsyncStorage.setItem('introDone', '1');
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'home' }]
                    })
                  }}
                >{
                    item.newtxt
                  }</Text>
              </View>
            </View>
          </View>
        </View>

      </View>
    );
  };
  return (
    
      (
        mounting
        ?
          <View style={styles.main}>
            <View style={{width: '100%', height: '100%', backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: hp(200), height: hp(200)}} >
                <Image source={require('../../../assets/icons/D-logo.png')} style={{width: hp(200), height: hp(200), backgroundColor: colors.orange, objectFit: 'contain', borderRadius: 100}} />
              </View>
            </View>
          </View>
        :
          <View style={[styles.main, openWebView ? {paddingTop: '0'} : {}]}>
            <AppIntroSlider
              renderItem={_renderItem}
              data={slides}
              ref={(ref) => (slider.current = ref)}
              activeDotStyle={styles.dNone}
              dotStyle={styles.dNone}
              onSlideChange={onSlideChange}
            />
            <View style={styles.polgon}>
              {
                currentSlide < 2
                &&
                <>
                  <View style={currentSlide >= 0 ? [styles.polgonIcon, styles.polgonIconActive] : styles.polgonIcon}></View>
                  <View style={currentSlide >= 1 ? [styles.polgonIcon, styles.polgonIconActive] : styles.polgonIcon}></View>
                  <View style={currentSlide >= 2 ? [styles.polgonIcon, styles.polgonIconActive] : styles.polgonIcon}></View>
                </>
              }
            </View>
          </View>
      )

  );
};


const mapStateToProps = (state) => {
  return {
    currency: state.CurrencyReducer.currency,
    language: state.LanguageReducer.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
     setLangauge: (lang) => {
        dispatch({ type: 'SET_LANGUAGE', payload: lang })
     },
     setCurrency: (c) => {
        dispatch({ type: 'SET_CURRENCY', payload: c })
    },
    setLastSearch: (c) => {
			dispatch({ type: 'SET_LAST_SEARCHES', payload: c })
		},
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);