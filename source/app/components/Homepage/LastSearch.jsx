import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './style';
import { base } from '../../assets/global_style/base';
import { LocaleConfig } from 'react-native-calendars';
import calendar from '../../../locale/calendar';
import moment from 'moment';
import CustomDTabs from '../CustomDTabs';

const LastSearch = (props) => {
   const {t, i18n} = useTranslation();
    let deviceLanguage = props.language && props.language.code ? props.language.code : global.deviceLanguage;
    let allLnags = ['en', 'es', 'fr', 'it', 'de', 'pt', 'ar'];
    LocaleConfig.locales['en'] = calendar.en;
    LocaleConfig.locales['de'] = calendar.de;
    LocaleConfig.locales['es'] = calendar.es;
    LocaleConfig.locales['fr'] = calendar.fr;
    LocaleConfig.locales['it'] = calendar.it;
    LocaleConfig.locales['pt'] = calendar.pt;
    LocaleConfig.locales['ar'] = calendar.ar;
    LocaleConfig.defaultLocale = deviceLanguage && allLnags.includes(deviceLanguage) ? deviceLanguage : 'en';
    const [searchs, setSearchs] = useState(props.lastSearch);
    const getLocationName = (name) => {
        name = name.split(',');
        if(name.length >= 2) {
            return name[name.length - 2].trim();
        }
        else {
            return name[name.length - 1].trim();
        }
    };

    const getIcon = (type) => {
        if(type == 'hotel') 
            return require('../../assets/icons/hotels.png') 
        else 
            return require('../../assets/icons/flights_active.png')
    }

    useEffect(() => {
        let s = props.lastSearch;
        let f = [];
        for(let i  = 0 ; i < s.length; i++) {
            if(moment(s[i].startDay + " 00:00:01").unix(), moment(moment().format('YYYY-MM-DD 00:00:01')).unix())
            f.push(s[i]);
        }
        setSearchs(f);
    }, [props.lastSearch]);

    return (
        <>
            <View style={styles.lastSearcher}>
                <View style={[base.row]}>
                    <View style={[base.col12]}>
                        <View style={[base.mt3, base.mb3]}><Text style={styles.gridsTitle}>{t('Last_searches')}</Text></View>
                        <ScrollView horizontal={searchs && searchs.length >= 3 ? true : false } style={styles.hScrollView} contentContainerStyle={{ flexDirection: 'row' }}>
                            {
                                searchs && searchs.length > 0 && 
                                searchs.map((item, i) => {
                                    return <TouchableOpacity
                                            onPress={() => {
                                                if(item.url)
                                                CustomDTabs.init(item.url);
                                            }}
                                        >
                                        <ImageBackground 
                                            source={require('../../assets/icons/gradient.png')}
                                            style={styles.grid}
                                        >
                                            
                                            <View style={styles.gridInner}>
                                                <View style={styles.gIconT}>
                                                    <Image
                                                        source={getIcon(item.type)}  
                                                        style={[styles.gimg, item.type == 'flight' ? styles.fImg : {}]}
                                                    />
                                                    <Text style={styles.gTitle}>{getLocationName(item.location.name)}</Text>
                                                </View>
                                                <View style={styles.gIconT}>
                                                    <Text style={styles.gDate}>{
                                                        item.type == 'hotel'
                                                        ?
                                                            (moment(item.startDay).format('DD') + (moment(item.startDay).format('MM') !== moment(item.endDay).format('MM') ? ' ' + LocaleConfig.locales[LocaleConfig.defaultLocale].monthNamesShort[moment(item.startDay).format('MM')-1] : '') + ' - ' + moment(item.endDay).format('DD') + ' ' + LocaleConfig.locales[LocaleConfig.defaultLocale].monthNamesShort[moment(item.endDay).format('MM')-1])
                                                        :
                                                            (item.startDay && item.endDay && item.endDay !== item.startDay
                                                            ? 
                                                                (moment(item.startDay).format('DD') + (moment(item.startDay).format('MM') !== moment(item.endDay).format('MM') ? ' ' + LocaleConfig.locales[LocaleConfig.defaultLocale].monthNamesShort[moment(item.startDay).format('MM')-1] : '') + ' - ' + moment(item.endDay).format('DD') + ' ' + LocaleConfig.locales[LocaleConfig.defaultLocale].monthNamesShort[moment(item.endDay).format('MM')-1]) 
                                                            : 
                                                                (moment(item.startDay).format('DD') + ' ' + LocaleConfig.locales[LocaleConfig.defaultLocale].monthNamesShort[moment(item.startDay).format('MM')-1])
                                                            )
                                                    }</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                })
                            }
                        </ScrollView>
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
        lastSearch: state && state.LastSearchReducer &&  state.LastSearchReducer.searches,
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
        setLastSearch: (c) => {
			dispatch({ type: 'SET_LAST_SEARCHES', payload: c })
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LastSearch);