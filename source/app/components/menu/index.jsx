import { Image } from '@rneui/themed';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { hp, wp } from '../../assets/global_style/fontsize';
import CustomDTabs from '../CustomDTabs';
import { styles } from './style';
import FirebaseAnalytics from '../FirebaseAnalytics';

const Menu = (props) => {
   const {t, i18n} = useTranslation();
	const {logEvent} = FirebaseAnalytics();
    
    useEffect(() => {
        logEvent({
			AnalyticsParameterScreenName: `app_my_account_screen`,
			AnalyticsParameterScreenClass: `app_area`,
            AnalyticsParameterpageCategory: `231`
		});
    }, []);

    return (
        <>
            <View style={styles.view}>
                <View style={styles.mainhef}>
                <Text style={styles.head}>{t('Hola_viajero')}</Text>
                <Text  style={[styles.head2, styles.ptop1]}>{t('Dónde_quieres_ir')}</Text>
                </View>
                <View>
                    <View style={styles.menuarea}>
                        <View style={styles.menudivde}>
                            <TouchableOpacity
                                style={styles.menuTab}
                                onPress={() => {
                                    let url = 'https://res.destinia.com/my-account/multilogin?showTabs=true&defaultTab=login&mode=app&lang='+(props.language && props.language.code ? props.language.code : global.deviceLanguage)+'&return_url=https%3A%2F%2Fres.destinia.com%2Fmy-account%2Fapp%2Fprofile';
                                    CustomDTabs.init(url);
                                    // props.setFilterPopup({ modal: 'webview', data: {url: url, title: t('Mi_perfil')} }); 
                                }}
                            >
                                <View style={styles.iconarea}>
                                    <Image
                                        source={require('../../../app/assets/icons/ProfileIcon.png')}
                                        style={[{width: wp(24), height: hp(24), objectFit: 'contain', marginHorizontal: '10%'}]}
                                    />
                                </View>
                                <View style={styles.txtare}>
                                    <Text style={styles.txtrt}>{t('Mi_perfil')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menudivde}>
                            <TouchableOpacity
                                style={styles.menuTab}
                                onPress={() => {
                                    let url = 'https://res.destinia.com/my-account/multilogin?showTabs=true&defaultTab=login&mode=app&lang='+(props.language && props.language.code ? props.language.code : global.deviceLanguage)+'&return_url=https%3A%2F%2Fres.destinia.com%2Fmy-account%2Fapp%2Fcoupons';
                                    CustomDTabs.init(url);
                                    // props.setFilterPopup({ modal: 'webview', data: {url: url, title: t('Bonos_y_cupones')} }); 
                                }}
                            >   
                                <View style={styles.iconarea}>
                                    <Image
                                        source={require('../../../app/assets/icons/gift-card.png')}
                                        style={[{width: wp(27), height: hp(27), objectFit: 'contain', marginHorizontal: '10%'}]}
                                    />
                                </View>
                                <View style={styles.txtare}>
                                    <Text style={styles.txtrt}>{t('Bonos_y_cupones')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menudivde}>
                        
                        <TouchableOpacity
                                style={styles.menuTab}
                                onPress={() => {
                                    let url = 'https://destinia.com/rewards?mode=app&lang='+(props.language && props.language.code ? props.language.code : global.deviceLanguage);
                                    // CustomDTabs.init(url);
                                    props.setFilterPopup({ modal: 'webview', data: {url: url, title: t('Destinia_Rewards')} }); 
                                }}
                            >   
                            <View style={styles.iconarea}>
                                <Image
                                    source={require('../../../app/assets/icons/dollar.png')}
                                    style={[{width: wp(24), height: hp(30), objectFit: 'contain', marginHorizontal: '10%'}]}
                                />
                            </View>
                            <View style={styles.txtare}>
                                <Text style={styles.txtrt}>{t('Destinia_Rewards')}</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.menudivde}>
                            <TouchableOpacity
                                style={styles.menuTab}
                                onPress={() => props.onPress('settings')}
                            >
                                <View style={styles.iconarea}>
                                    <Image
                                        source={require('../../../app/assets/icons/cog.png')}
                                        style={[{width: wp(24), height: hp(30), objectFit: 'contain', marginHorizontal: '10%'}]}
                                    />
                                </View>
                                <View style={styles.txtare}>
                                    <Text style={styles.txtrt}>{t('Ajustes_notificaciones')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menudivde}>
                            <TouchableOpacity
                                style={styles.menuTab}
                                onPress={() => props.onPress('help')}
                            >
                            <View style={styles.iconarea}>
                                <Image
                                    source={require('../../../app/assets/icons/question.png')}
                                    style={[{width: wp(24), height: hp(26), objectFit: 'contain', marginHorizontal: '10%'}]}
                                />
                            </View>
                            <View style={styles.txtare}>
                                <Text style={styles.txtrt}>{t('Ayuda')}</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            
        </>
    );
};


const mapStateToProps = (state) => {
	return {
		filterPopup: state && state.FilterPopUpReducer && state.FilterPopUpReducer.filterPopup,
		language: state.LanguageReducer.language,
		currency: state.CurrencyReducer.currency,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setFilterPopup: (lang) => {
			dispatch({ type: 'SET_FILTER_POPUP', payload: lang })
		},
		setCurrency: (c) => {
			dispatch({ type: 'SET_CURRENCY', payload: c })
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);