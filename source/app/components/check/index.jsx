import { React, useState } from 'react';
import Currency from '../currency';
import Help from '../help';
import Language from '../language';
import Menu from '../menu';
import Settings from '../settings';
import { connect } from 'react-redux';
import CustomWebView from '../customWebView';
import SendRating from '../rating/send';
import { useTranslation } from 'react-i18next';

const Check = (props) => {
    const [screen, setScreen] = useState('menu');
    const { t, i18n } = useTranslation();
    return (
        <>
            {
               props.filterPopup && props.filterPopup.modal == 'webview'
               &&
               <CustomWebView
                  data={props.filterPopup.data}
                  onPress={() => {
                    props.setFilterPopup(null);
                  }}
               />
			}
            {
                (!props.filterPopup || (props.filterPopup && props.filterPopup.modal == 'ratingPopup')) && screen == 'menu'
                &&
                <Menu 
                    onPress={(screen) => {
                        setScreen(screen);
                    }}
                />
            }
            {
                !props.filterPopup && screen == 'settings'
                &&
                <Settings 
                    onPress={(screen) => {
                        setScreen(screen);
                    }}
                />
            }
            {
                !props.filterPopup && screen == 'language'
                &&
                <Language 
                    onPress={(screen) => {
                        setScreen(screen);
                    }}
                />
            }
            {
                !props.filterPopup && screen == 'currency'
                &&
                <Currency
                    onPress={(screen) => {
                        setScreen(screen);
                    }}
                />
            }
            {
                !props.filterPopup && screen == 'help'
                &&
                <Help
                    onPress={(screen) => {
                        setScreen(screen);
                    }}
                />
            }

            {
				props.filterPopup && props.filterPopup.modal == 'sendRating' && props.route.name != 'search'
				&&
				<SendRating
					title={t(`Danos tu opinión`)}
					onClose={() => {
                        props.setFilterPopup(null);
                    }}
				/>
			}
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

export default connect(mapStateToProps, mapDispatchToProps)(Check);
