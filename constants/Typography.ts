import Color from '../constants/Colors';
import { TextStyle } from 'react-native';

const Typography: { [key: string]: { [key: string]: TextStyle } } = {
    display: {
        large: {
            fontFamily: 'NanumSquare-Regular',
            fontSize: 57,
            fontWeight: 'normal',
            lineHeight: 57 * 1.5,
            color: Color.gray.gray500,
        },
        medium: { 
            fontFamily: 'NanumSquare-Regular',
            fontSize: 45,
            fontWeight: 'normal', 
            lineHeight: 45 * 1.5,
            color: Color.gray.gray500,
        },
        small: {
            fontFamily: 'NanumSquare-Regular',
            fontSize: 36,
            fontWeight: 'normal',
            lineHeight: 36 * 1.5,
            color: Color.gray.gray500, 
        },
    },
    heading: {  
        large: {
            fontFamily: 'Maplestory-Light',
            fontSize: 32,
            fontWeight: 'normal',
            lineHeight: 32 * 1.5,
            color: Color.gray.gray500,
        },
        medium: {
            fontFamily: 'Maplestory-Light',
            fontSize: 28,
            fontWeight: 'normal',
            lineHeight: 28 * 1.5,
            color: Color.gray.gray500,
        },
        small: {
            fontFamily: 'Maplestory-Light',
            fontSize: 24,
            fontWeight: 'normal',
            lineHeight: 24 * 1.5,
            color: Color.gray.gray500,
        },
        small_bold: {
            fontFamily: 'Maplestory-Bold',
            fontSize: 24,
            fontWeight: 'bold',
            lineHeight: 24 * 1.5,
            color: Color.gray.gray500,
        },
    },
    body: { 
        large: {
            fontFamily: 'NanumSquare-Regular',
            fontSize: 16,
            fontWeight: 'normal',
            lineHeight: 16 * 1.5,
            color: Color.gray.gray500,
        },
        large_bold: {
            fontFamily: 'NanumSquare-Bold',
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 16 * 1.5,
            color: Color.gray.gray500,
        },
        medium: {
            fontFamily: 'NanumSquare-Regular',
            fontSize: 14,
            fontWeight: 'normal',
            lineHeight: 14 * 1.5,
            color: Color.gray.gray500,
        },        
    },
    label: {
        large: {
            fontFamily: 'NanumSquare-Regular',
            fontSize: 14,
            fontWeight: 'normal',
            lineHeight: 14 * 1.5,
            color: Color.gray.gray500,
        },
        normal: {
            fontFamily: 'NanumSquare-Regular',
            fontSize: 11,
            fontWeight: 'normal',
            lineHeight: 11 * 1.5,
            color: Color.gray.gray500,
        },
        small: {
            fontFamily: 'NanumSquare-Regular',
            fontSize: 8,
            fontWeight: 'normal',
            lineHeight: 8 * 1.5,
            color: Color.gray.gray500,
        },
    }
};

export default Typography;
