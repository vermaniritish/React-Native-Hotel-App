import { StyleSheet } from 'react-native';
import { colors } from '../../assets/global_style/colors';
import { Font } from '../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../../assets/global_style/fontsize';

export const styles = StyleSheet.create({
    thumbWrap: {
        alignItems: 'center',
        marginTop: hp(20)
    },
    thumbUp: {
        width: wp(80),
        height: wp(80),
    },
    ratingPopup: {
        height: hp(480),
        paddingHorizontal: '5%'
    },
    overlay: {
        marginHorizontal: '6%',
        marginVertical: '5%',
        borderRadius: wp('10')
    },
    headingWrap: {
        alignItems: 'center',
        marginVertical: hp(10)
    },
    heading: {
        fontSize: fp(26),
        textAlign: 'center',
        color: '#46403c'
    },
    descWrap: {
        alignItems: 'center',
        marginBottom: hp(10),
        paddingHorizontal: wp(40)
    },
    desc: {
        textAlign: 'center',
        fontSize: fp(21),
        color: '#74716e',
    },
    view: {
        flex: 1,
        backgroundColor: colors.white
    },
    uptitle: {
        paddingTop: hp(20),
        paddingBottom: hp(25),
        borderBottomWidth: hp(1),
        paddingLeft: hp(6),
        borderColor: colors.orange,
        width: '100%',
        flexDirection: 'row',
    },
    headtitle: {
        flexDirection: 'row',
    },
    headit: {
        fontSize: fp(25),
        fontFamily: Font.semiBold,
        color: colors.black,
        paddingVertical: vp(20),
        borderBottomWidth: 1,
        borderColor: colors.offgrey,

    },
    icnset: {
    },
    txtit: {
        fontSize: fp(28),
        fontFamily: Font.lightBold,
        color: colors.black_Z,
        alignSelf: 'flex-start',
        marginLeft: wp(10)
    },
    crossIconWrap: {
        // backgroundColor: 'pink',
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center'
        // height: hp(50)
    },
    crossIcon: {
        width: wp(20),
        height: wp(20),
        // marginLeft: wp(24),
        // marginVertical: '21%',
    },
    inputLabel: {
        color: colors.black_Z,
        fontSize: fp(16),
        fontFamily: Font.lightBold,
        margin: 0,
        padding: 0
    },
    input: {
        height: hp(80),
        margin: 0,
        width: '100%',
        fontSize: hp(20),
        color: colors.black_Z,
        fontFamily: Font.regular,
        padding: 0
    },
    inputActive: {
        borderColor: colors.blue,
    },
    inut: {
        width: '100%',
        height: hp(40),
        margin: 0,
        borderBottomWidth: 1.5,
        borderColor: colors.grey,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1
    },
    textit: {
        fontSize: fp(20),
        lineHeight: hp(30),
        color: colors.black_Z,
        fontFamily: Font.regular
    },
    scrollContent: { paddingBottom: hp(0), paddingHorizontal: wp('18'), paddingTop: wp('20') },
    spce:{
        paddingHorizontal:wp(22)
      },
      lastbtn:{
        backgroundColor:colors.blue,
        padding: hp(7)
      },
      
      lasttitle: {
        fontSize: fp(21)
      },
});



