import { React, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, View, Text, Platform, Linking } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './style';
import { base } from '../../assets/global_style/base';
import { Button, Image, Overlay  } from '@rneui/themed';
import { colors } from '../../assets/global_style/colors';
import { fp, hp, wp } from '../../assets/global_style/fontsize';

const Version = (props) => {
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
                    <View style={[base.col12, styles.thumbWrap]}>
                        <Image source={require('../../assets/icons/recommended.png')} style={styles.thumbUp} />    
                    </View>
                    <View style={[base.col12, styles.headingWrap]}><Text style={styles.heading}>{t('Update_title')}</Text></View>
                    <View style={[base.col12, styles.descWrap]}><Text style={styles.desc}>{t('Update_description')}</Text></View>
                    <View style={[base.col12, base.mb2, base.mt2, {paddingHorizontal: wp(20)}]}>
                        <Button
                          buttonStyle={{ color: colors.black_Z, backgroundColor: '#FFF' }}
                          containerStyle={{ width: '100%', borderRadius: 40, borderWidth: wp(1.33), borderColor: colors.blue, paddingVertical: hp(0) }}
                          titleStyle={{ width: '100%', fontSize: fp(19), color: colors.blue }}
                          onPress={async () => {
                            if(Platform.OS == 'ios') {
                                Linking.openURL(`https://apps.apple.com/es/app/destinia-app/id503802687`);
                            }
                            else {
                                Linking.openURL(`https://play.google.com/store/apps/details?id=com.destinia.m`);
                            }
                          }}
                        >
                          {t('Update_button')}
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
 export default connect(mapStateToProps)(Version);
 