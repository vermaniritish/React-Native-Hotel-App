import { View, Text, TextInput, ScrollView,  TouchableOpacity, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { base } from '../../../assets/global_style/base'

import { Button, Icon, Image } from '@rneui/themed'
import { Icons, IconsType } from '../../../assets/global_style/icon'
import { Dimension } from '../../../assets/global_style/dimension'
import { styles } from './style'
import { hp, wp } from '../../../assets/global_style/fontsize'
import { colors } from '../../../assets/global_style/colors'
import CalendarListScreen from './CalendarListScreen'
import { useTranslation } from 'react-i18next'
import CalendarSelection from './CalendarSelection'
import FlightsCalendarListScreen from './FlightsCalendarListScreen'

const FlightCalender = (props) => {

	const {t, i18n} = useTranslation();   

    useEffect(() => {
        const backAction = () => {
            props.onClose()
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);
    
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={base.subrow}>
                <View style={[{ paddingTop: hp(42), width: '100%', backgroundColor: '#FFF' }]}>
                    <View style={styles.uptitle}>
                        <View style={styles.headtitle}>
                        <TouchableOpacity onPress={() => props.onClose()} style={styles.crossIconWrap}>
                                <Image
                                    source={require('../../../assets/icons/chevron-left.png')}
                                    style={styles.crossIcon}
                                    
                                />
                            </TouchableOpacity>
                                
                            <Text style={styles.txtit}>{t('Choose_Date')}</Text>
                        </View>
                    </View>
                    {
                        props.selection
                        ?
                            <CalendarSelection 
                                flightMode={props.flightMode ? true : false}
                                selection={props.selection}
                                rangePicker={props.rangePicker}
                                startDay={props.startDay}
                                endDay={props.endDay ? props.endDay : null}
                                onClose={() => props.onClose()}
                                onSubmit={(startDay) => {
                                    props.onSubmit(startDay);
                                    props.onClose();
                                }}
                            />
                        :
                        <FlightsCalendarListScreen 
                            flightMode={props.flightMode ? true : false}
                            selection={props.selection}
                            rangePicker={props.rangePicker}
                            startDay={props.startDay}
                            endDay={props.endDay}
                            onClose={() => props.onClose()}
                            onSubmit={(startDay, endDay) => {
                                props.onSubmit(startDay, endDay);
                                props.onClose();
                            }}
                        />
                    }
                  
                </View>
            </View>
        </View>
    )
}

export default FlightCalender