import { React, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './style';
import { base } from '../../assets/global_style/base';
import { Button, Image, Overlay  } from '@rneui/themed';
import { colors } from '../../assets/global_style/colors';
import { fp, wp } from '../../assets/global_style/fontsize';
import { Platform } from 'react-native';
import { Linking } from 'react-native';

const Rating = (props) => {
   const {t, i18n} = useTranslation();
   const [detectLanguage, setDetectLang] = useState(props.language && props.language.code ? props.language.code : global.deviceLanguage);
   useEffect(() => {
      const backAction = () => { 
        props.close();
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
            <Overlay 
                isVisible={true} 
                overlayStyle={styles.overlay}
                onBackdropPress={() => {
                    props.close();
                }}
            >
            <View style={styles.ratingPopup}>
                <View style={base.row}>
                    <View style={[base.col12, {alignItems: 'center', marginTop: '4%'}]}>
                        <Image source={require('../../assets/icons/thumb.png')} style={styles.thumbUp} />    
                    </View>
                    <View style={[base.col12, styles.headingWrap]}><Text style={styles.heading}>{t('Rating_Heading')}</Text></View>
                    <View style={[base.col12, styles.descWrap]}><Text style={styles.desc}>{t('Rating_Desc')}</Text></View>
                    <View style={[base.col12, base.mb2, base.mt2]}>
                        <Button
                          buttonStyle={{ color: colors.black_Z, backgroundColor: '#FFF' }}
                          containerStyle={{ width: '100%', borderRadius: 40, borderWidth: wp(1.33), borderColor: colors.blue }}
                          titleStyle={{ width: '100%', fontSize: fp(18), color: colors.blue }}
                          onPress={async () => {
                            if(Platform.OS == 'ios') {
                                Linking.openURL(`https://apps.apple.com/es/app/destinia-app/id503802687`);
                            }
                            else {
                                Linking.openURL(`https://play.google.com/store/apps/details?id=com.destinia.m`);
                            }
                          }}
                        >
                          {t('Rating_Button_1')}
                        </Button>
                    </View>
                    <View style={[base.col12, base.mb2, base.mt2]}>
                        <Button
                          buttonStyle={{ color: colors.black_Z, backgroundColor: '#FFF' }}
                          containerStyle={{ width: '100%', borderRadius: 40, borderWidth: wp(1.33), borderColor: colors.blue }}
                          titleStyle={{ width: '100%', fontSize: fp(18), color: colors.blue }}
                          onPress={async () => {
                            props.onButtonPress();
                          }}
                        >
                          {t('Rating_Button_2')}
                        </Button>
                    </View>

                    <View style={[base.col12, base.mt2]}>
                        <Button
                          buttonStyle={{ color: colors.black_Z, backgroundColor: '#FFF' }}
                          containerStyle={{ width: '100%', borderRadius: 40, borderWidth: wp(1.33), borderColor: colors.blue }}
                          titleStyle={{ width: '100%', fontSize: fp(18), color: colors.blue }}
                          onPress={async () => {
                            props.close();
                          }}
                        >
                          {t('Rating_Button_3')}
                        </Button>
                    </View>
                </View>
            </View>
            </Overlay>
        </>
    );
};

const mapStateToProps = (state) => {
   return {
     currency: state.CurrencyReducer.currency,
      filterPopup: state.FilterPopUpReducer.filterPopup,
      language: state.LanguageReducer.language,
   };
 };
 export default connect(mapStateToProps)(Rating);
 