import { CheckBox, Icon, Image, Text } from '@rneui/themed';
import React from 'react';

import { Alert, Platform, TouchableOpacity, View } from 'react-native';
import { base } from '../../assets/global_style/base';
import { colors } from '../../assets/global_style/colors';
import { fp, hp, wp } from '../../assets/global_style/fontsize';
import { styles } from './style';
// import buildingIcon from '../../assets/icons/building.svg';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import calendar from '../../../locale/calendar';
import { useIsFocused } from '@react-navigation/native';
import CustomDTabs from '../CustomDTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseAnalytics from '../FirebaseAnalytics';

const Flights = (props) => {
    const {logEvent, logCustomEvent} = FirebaseAnalytics();
	const [detectLanguage, setDetectLang] = React.useState(props.language && props.language.code ? props.language.code : global.deviceLanguage);
	const [currency, setCurrency] = React.useState(props.currency && props.currency ? props.currency : { label: 'EUROS', code: "€", iso3: "EUR" });
	const { t, i18n } = useTranslation();
	const[error, setError] = React.useState(null);
	const [location, setLocation] = React.useState(null);

	const isFocused = useIsFocused();
    React.useEffect(() => {
		setDetectLang(props.language && props.language.code ? props.language.code : global.deviceLanguage)
		setCurrency(props.currency && props.currency ? props.currency : { label: 'EUROS', code: "€", iso3: "EUR" });
	}, [isFocused, props.language, props.currency]);

    const getTotalPeople = () => {
        let adults = 0;
        let children = 0;
        for(let k = 0; k < props.viaData.length; k++)
        {
            adults  += props.viaData[k].adults > 0 ? props.viaData[k].adults : 0;
            children  += props.viaData[k].children > 0 ? props.viaData[k].children : 0;
        }
        return {
			adults: adults,
			children: children
		}
    }

    const updateLastSearch = async (location, startDay, endDay, url) => {
        let s = props.lastSearch;
        s = s && s.length > 0 ? s : [];
        if(s.length > 0) {
            let index = s.findIndex((i, k) => {
                return i.type == 'flight' && i.location.id == location.id && i.startDay == startDay && i.endDay == endDay
            });
            if(index > -1) {
                s.splice(index, 1);
            }
        }
        s.unshift({
            location, 
            startDay,
            endDay, 
            url,
            type: 'flight'
        });
        try {
			await AsyncStorage.setItem(
				'LastSearches',
				JSON.stringify(s.slice(0, 5)),
			);
		} catch (e) {
		}
        props.setLastSearch(s.slice(0, 5));
    }
    console.log('sdsd');
    return (<View style={[styles.searchArea]}>
        <View style={[
            styles.searchShadow,
            {bottom: hp(-1.0), height: hp(Platform.OS == 'ios' ? '340' : '370')}
        ]}></View>
        <View style={styles.maingt}>
            <View style={[base.row]}>
                <View style={[base.col12, {flexDirection: 'row'}]}>
                    <View style={[base.row, {marginHorizontal: -12}]}>
                    <View style={[base.col8, {flexDirection: 'row', marginBottom: hp(10)}]}>
                        <CheckBox
                            containerStyle={styles.radioContainer}
                            textStyle={styles.radioButtonTxt}
                            checked={props.tripType == 'return' ? true : false}
                            onPress={() => {
                                props.setTripType('return')
                            }}
                            checkedIcon={
                                <View
                                  style={{ height: 19, width: 19, borderWidth: 1, borderColor: '#2d91fb', backgroundColor: '#3b99fc', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}
                                >
                                    <View style={{ height: 7, width: 7, backgroundColor: '#FFF', borderRadius: 40 }}></View>
                                </View>
                            }
                            uncheckedIcon={
                                <View
                                  style={{ height: 19, width: 19, borderWidth: 1, borderColor: colors.offgrey, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}
                                >
                                    <View style={{ height: 7, width: 7, backgroundColor: '#FFF', borderRadius: 40 }}></View>
                                </View>
                            }
                            title={t(`Round_Trip`)}
                        />
                        <CheckBox
                            containerStyle={styles.radioContainer}
                            textStyle={styles.radioButtonTxt}
                            checked={props.tripType == 'oneway' ? true : false}
                            onPress={() => {
                                props.setTripType('oneway')
                            }}
                            checkedIcon={
                                <View
                                  style={{ height: 19, width: 19, borderWidth: 1, borderColor: '#2d91fb', backgroundColor: '#3b99fc', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}
                                >
                                    <View style={{ height: 7, width: 7, backgroundColor: '#FFF', borderRadius: 40 }}></View>
                                </View>
                            }
                            uncheckedIcon={
                                <View
                                  style={{ height: 19, width: 19, borderWidth: 1, borderColor: colors.offgrey, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}
                                >
                                    <View style={{ height: 7, width: 7, backgroundColor: '#FFF', borderRadius: 40 }}></View>
                                </View>
                            }
                            title={t(`One_Way`)}
                        />
                    </View>
                    </View>
                </View>
                <View style={[base.col12]}>
                    <View style={[base.row, {position: 'relative'}]}>
                        <View style={[base.col12]}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setFilterPopup({ modal: 'flightlocation', data: {title: t('Departure')} });
                                    props.setLocationModal(true);
                                }}
                            >
                                <View style={styles.inut}>
                                    <Image
                                        source={require('../../assets/icons/takeoff.png')}
                                        style={{ width: wp(16), height: wp(14), marginRight: 7, marginLeft: 5 }}
                                    />
                                    <View
                                        style={styles.input}
                                        keyboardType="default"
                                    ><Text numberOfLines={1} ellipsizeMode="tail" style={styles.inputText}>{props.location && props.location.id ? props.location.name : t('Departure')}</Text></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.returnTrip}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.shuffleLocations()
                                }}
                            >
                                    <Image
                                        source={require('../../assets/icons/return.png')}
                                        style={styles.returnicon}
                                    />
                            </TouchableOpacity>
                        </View>
                        <View style={base.col12}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setFilterPopup({ modal: 'location2', data: {title: t('Destination')} });
                                    props.setLocationModal2(true);
                                }}
                            >
                                <View style={styles.inut}>
                                    <Image
                                        source={require('../../assets/icons/land.png')}
                                        style={{ width: wp(16), height: wp(16), marginRight: 7, marginLeft: 5 }}
                                    />
                                    <View
                                        style={styles.input}
                                        keyboardType="default"
                                    ><Text numberOfLines={1} ellipsizeMode="tail" style={styles.inputText}>{props.location2 && props.location2.id ? props.location2.name : t('Destination')}</Text></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {
                    props.tripType == 'oneway'
                    ?
                    <View style={base.col12}>
                        <TouchableOpacity
                            onPress={() => {
                                props.setFilterPopup({ modal: 'calendar3', data: null });
                                props.setCalendarModal(true);
                            }}
                        >
                            <View style={styles.inut}>
                                <Image
                                    source={require('../../assets/icons/calendar.png')}
                                    style={{ width: wp(13), height: wp(14), marginRight: 5, marginLeft: 5 }}
                                />
                                <View
                                    style={styles.input}
                                    keyboardType="default"
                                ><Text style={[styles.inputText, { paddingRight: wp(2) }]}>{props.startDay && calendar && calendar[detectLanguage] && calendar[detectLanguage].monthNamesShort ? (moment(props.startDay).format('D') + ' ' + calendar[detectLanguage].monthNamesShort[moment(props.startDay).format('M') - 1]) : t(`Departure_Date`)}</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <>
                        <View style={base.col6}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setFilterPopup({ modal: 'calendar', data: null });
                                    props.setCalendarModal(true);
                                }}
                            >
                                <View style={styles.inut}>
                                    <Image
                                        source={require('../../assets/icons/calendar.png')}
                                        style={{ width: wp(13), height: wp(14), marginRight: 5, marginLeft: 5 }}
                                    />
                                    <View
                                        style={styles.input}
                                        keyboardType="default"
                                    ><Text style={[styles.inputText, { paddingRight: wp(2) }]}>{props.startDay && calendar && calendar[detectLanguage] && calendar[detectLanguage].monthNamesShort ? (moment(props.startDay).format('D') + ' ' + calendar[detectLanguage].monthNamesShort[moment(props.startDay).format('M') - 1]) : t(`Departure_Date`)}</Text></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={base.col6}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setFilterPopup({ modal: 'calendar2', data: null });
                                    if (props.endDay) {
                                        props.setCalendarModal2(true);
                                    }
                                    else {
                                        props.setCalendarModal(true);
                                    }
                                }}
                            >
                                <View style={styles.inut}>
                                    <Image
                                        source={require('../../assets/icons/calendar.png')}
                                        style={{ width: wp(13), height: wp(14), marginRight: 5, marginLeft: 5 }}
                                    />
                                    <View
                                        style={styles.input}
                                        keyboardType="default"
                                    ><Text style={[styles.inputText, , { paddingRight: wp(2) }]}>{props.endDay && calendar && calendar[detectLanguage] && calendar[detectLanguage].monthNamesShort ? (moment(props.endDay).format('D') + ' ' + calendar[detectLanguage].monthNamesShort[moment(props.endDay).format('M') - 1]) : t(`Return_Date`)}</Text></View>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                <View style={base.col12}>
                    <TouchableOpacity
                        onPress={() => {
                            props.setFilterPopup({ modal: 'occupation', data: null });
                            props.setViaModal(true);
                        }}
                    >
                        <View style={styles.inut}>
                            <Image
                                source={require('../../assets/icons/users.png')}
                                style={{ width: wp(16), height: wp(10), marginRight: 5, marginLeft: 5 }}
                            />
                            <View
                                style={[styles.input, { width: '82%' }]}
                                keyboardType="default"
                            ><Text style={styles.inputText}>{getTotalPeople().adults && getTotalPeople().adults > 0 ? getTotalPeople().adults : '0'} {t('adults')}, {getTotalPeople().children && getTotalPeople().children > 0 ? getTotalPeople().children : '0'} {t('children')}</Text></View>
                            <Image
                                source={require('../../assets/icons/dropdown_icon.png')}
                                style={{ width: wp('21'), height: wp('21'), marginRight: wp(60) }}

                            />

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={base.col12}>
                    {
                        error
                        &&
                        <Text style={[base.textDanger, base.textCenter, base.col12]}>{error}</Text>
                    }
                    <TouchableOpacity
                        onPress={async () => {
                            console.log(props.viaData);
                            if (!props.location || !props.location2 || !props.location.name || !props.location2.name) {
                                setError(t('location_error'));
                            }
                            else if ( props.tripType == 'return' && (!props.startDay || !props.endDay) ) {
                                setError(t('flight_days_error'));
                            }
                            else if ( props.tripType == 'return' && !props.startDay ) {
                                setError(t('flight_oneway_days_error'));
                            }
                            else if (props.viaData.length < 1 || props.viaData[0].adults < 1) {
                                setError(t('adults_error'));
                            }
                            else {
                                let l1 = props.location && props.location.name ? props.location.name : null;
                                l1 = l1 ? l1.split(/(\(.+\))/g) : null;
                                l1 = l1 && l1.length > 1 ? l1[1].replace('(', '').replace(')', '') : ``;
                                let l2 = props.location2 && props.location2.name ? props.location2.name : null;
                                l2 = l2 ? l2.split(/(\(.+\))/g) : null;
                                l2 = l2 && l2.length > 1 ? l2[1].replace('(', '').replace(')', '') : ``;
                                let url = 'https://online.destinia.com/online/transports/direct_search?journeys=' + encodeURI(props.tripType == 'return' ? `[{"from":"${l1}", "to":"${l2}", "date": "${moment(props.startDay).format('DD/MM/YYYY')}"},{"from":"${l2}", "to":"${l1}", "date": "${moment(props.endDay).format('DD/MM/YYYY')}"}]` : `[{"from":"${l1}", "to":"${l2}", "date": "${moment(props.startDay).format('DD/MM/YYYY')}"}]` )  + '&occupancy=' +  encodeURI(JSON.stringify(props.viaData)) + '&language_code=' + (detectLanguage) + '&remite=' + (Platform.OS === 'ios' ? 'app/ios' : 'app/android') + '&currency_code=' + (currency && currency.iso3 ? currency.iso3 : 'EUR') + '&mode=app';
                                logCustomEvent('search',{pagecategory: `231`, product: 'V', remite: Platform.OS});
                                updateLastSearch(props.location2, props.startDay, props.endDay, url);
                                try {
                                    await AsyncStorage.setItem(
                                        'LastSearches',
                                        JSON.stringify(s.slice(0, 5)),
                                    );
                                } catch (e) {
                                }
                                CustomDTabs.init(url);
                            }
                        }}
                    >
                        {
                            Platform.OS == 'ios'
                            ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(54), borderRadius: hp(8) }}>
                                    <Image source={require('../../assets/icons/gradient.png')} style={{ width: wp('340'), height: hp('55'), borderRadius: hp(8) }} />
                                    <Text style={{ width: '100%', fontSize: fp(22), color: '#fff', width: '100%', position: 'absolute', textAlign: 'center' }}>{t('Search')}</Text>
                                </View>
                            :
                                <LinearGradient
                                    colors={[colors.orange, colors.orangeLight]}
                                    style={{ justifyContent: 'center', alignItems: 'center', height: hp(54), borderRadius: hp(8) }}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text style={{ width: '100%', fontSize: fp(22), color: '#fff', width: '100%', textAlign: 'center' }}>{t('Search')}</Text>
                                </LinearGradient>
                        }
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </View>)
};

const mapStateToProps = (state) => {
    return {
        filterPopup: state && state.FilterPopUpReducer && state.FilterPopUpReducer.filterPopup,
        language: state.LanguageReducer.language,
        currency: state.CurrencyReducer.currency,
        lastSearch: state.LastSearchReducer.searches,
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

export default connect(mapStateToProps, mapDispatchToProps)(Flights);