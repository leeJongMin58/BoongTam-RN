import React, { createContext, useContext, useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import typography from '../../src/styles/typhography'

const TypographyContext = createContext()

export const useTypography = () => {
	return useContext(TypographyContext)
}

export const TypographyProvider = ({ children }) => {
	const [fontsLoaded] = useFonts({
		'Maplestory-Bold': require('../../assets/font/Maplestory Bold.ttf'),
		'Maplestory-Light': require('../../assets/font/Maplestory Light.ttf'),
		'NanumSquare-Bold': require('../../assets/font/NanumSquareB.ttf'),
		'NanumSquare-Regular': require('../../assets/font/NanumSquareR.ttf'),
	})

	const [updatedTypography, setUpdatedTypography] = useState(typography)

	// 폰트 로딩 완료 시 typography 업데이트
	useEffect(() => {
		if (fontsLoaded) {
			setUpdatedTypography({
				...typography,
				display: {
					large: {
						...typography.display.large,
						fontFamily: 'NanumSquare-Regular',
					},
					medium: {
						...typography.display.medium,
						fontFamily: 'NanumSquare-Regular',
					},
					small: {
						...typography.display.small,
						fontFamily: 'NanumSquare-Regular',
					},
				},
				heading: {
					large: {
						...typography.heading.large,
						fontFamily: 'Maplestory-Light',
					},
					medium: {
						...typography.heading.medium,
						fontFamily: 'Maplestory-Light',
					},
					small: {
						...typography.heading.small,
						fontFamily: 'Maplestory-Light',
					},
					small_bold: {
						...typography.heading.small_bold,
						fontFamily: 'Maplestory-Bold',
					},
				},
				body: {
					large: {
						...typography.body.large,
						fontFamily: 'NanumSquare-Regular',
					},
					large_bold: {
						...typography.body.large_bold,
						fontFamily: 'NanumSquare-Bold',
					},
					medium: {
						...typography.body.medium,
						fontFamily: 'NanumSquare-Regular',
					},
				},
				label: {
					large: {
						...typography.label.large,
						fontFamily: 'NanumSquare-Regular',
					},
					normal: {
						...typography.label.normal,
						fontFamily: 'NanumSquare-Regular',
					},
					small: {
						...typography.label.small,
						fontFamily: 'NanumSquare-Regular',
					},
				},
			})
		}
	}, [fontsLoaded])

	return (
		<TypographyContext.Provider
			value={{ typography: updatedTypography, fontsLoaded }}
		>
			{children}
		</TypographyContext.Provider>
	)
}

export default TypographyProvider
