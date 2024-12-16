import Color from '../constants/Colors'
import { TextStyle } from 'react-native';

const Typos: { [key: string]: { [key: string]: TextStyle } } = {
    display: {
        display_large: {
            fontFamily: 'Roboto Mono',
            fontSize: 57,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        display_medium: {
            fontFamily: 'Roboto Mono',
            fontSize: 45,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        display_small: {
            fontFamily: 'Roboto Mono',
            fontSize: 36,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500, 
        },
    },
    headig: {
        heading_large: {
            fontFamily: 'Roboto Mono',
            fontSize: 32,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        heading_medium: {
            fontFamily: 'Roboto Mono',
            fontSize: 28,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        heading_small: {
            fontFamily: 'Roboto Mono',
            fontSize: 24,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        heading_small_bold: {
            fontFamily: 'Roboto Mono',
            fontSize: 24,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
    },
    body: { 
        body_large: {
            fontFamily: 'Roboto Mono',
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        body_medium: {
            fontFamily: 'Roboto Mono',
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        body_large_bold: {
            fontFamily: 'Roboto Mono',
            fontSize: 16,
            fontWeight: '700',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
    },
    label: {
        label_large: {
            fontFamily: 'Roboto Mono',
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        label_small: {
            fontFamily: 'Roboto Mono',
            fontSize: 11,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
        label_very_small: {
            fontFamily: 'Roboto Mono',
            fontSize: 8,
            fontWeight: '500',
            lineHeight: 150,
            color: Color.gray.gray500,
        },
    }
};

export default Typos;