import React, { useState } from 'react'
import {
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	Image,
	Animated,
	PanResponder,
	SafeAreaView,
} from 'react-native'
import { router } from 'expo-router'
import { useTypography } from '../../../src/utils/TypographyContext'
import colors from '../../../src/styles/color'
import { STRINGS } from '../../../src/config/string'
import typography from '../../../src/styles/typhography'
import { LoginLongBtn } from '../../../src/components/LoginLongBtn'


const slides = [
	{
		text: STRINGS.ON_BOARDING.SLIDE1.TITLE,
		description: STRINGS.ON_BOARDING.SLIDE1.DESCRIPTION,
	},
	{
		text: STRINGS.ON_BOARDING.SLIDE2.TITLE,
		description: STRINGS.ON_BOARDING.SLIDE2.DESCRIPTION,
	},
	{
		text: STRINGS.ON_BOARDING.SLIDE3.TITLE,
		description: STRINGS.ON_BOARDING.SLIDE3.DESCRIPTION,
	},
	{
		text: STRINGS.ON_BOARDING.SLIDE4.TITLE,
		description: STRINGS.ON_BOARDING.SLIDE4.DESCRIPTION,
	},
]

export default function OnboardingScreen() {
	const { fontsLoaded } = useTypography()
	const [currentSlide, setCurrentSlide] = useState(0)
	const translateX = useState(new Animated.Value(0))[0]

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gestureState) => {
			translateX.setValue(gestureState.dx)
		},
		onPanResponderRelease: (_, gestureState) => {
			if (gestureState.dx > 50 && currentSlide > 0) {
				Animated.timing(translateX, {
					toValue: 400,
					duration: 300,
					useNativeDriver: true,
				}).start(() => {
					translateX.setValue(0)
					setCurrentSlide((prev) => prev - 1)
				})
			} else if (
				gestureState.dx < -50 &&
				currentSlide < slides.length - 1
			) {
				Animated.timing(translateX, {
					toValue: -400,
					duration: 300,
					useNativeDriver: true,
				}).start(() => {
					translateX.setValue(0)
					setCurrentSlide((prev) => prev + 1)
				})
			} else {
				Animated.spring(translateX, {
					toValue: 0,
					useNativeDriver: true,
				}).start()
			}
		},
	})

	const moveToLogin = () => {
		router.navigate('/login/login/LoginScreen')
	}

	if (!fontsLoaded) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color={colors.orange200} />
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.slideContainer}>
				<Animated.View
					style={{ transform: [{ translateX }] }}
					{...panResponder.panHandlers}
				>
					<Image
						source={require('../../../assets/icon/ic_boong')}
						style={styles.backgroundImage}
					/>
					<View style={styles.content}>
						<Text style={styles.title}>
							{slides[currentSlide].text}
						</Text>
						<Text style={styles.description}>
							{slides[currentSlide].description}
						</Text>
					</View>
				</Animated.View>
			</View>
			<View style={styles.dotsContainer}>
				{slides.map((_, index) => (
					<View
						key={index}
						style={[
							styles.dot,
							currentSlide === index && styles.activeDot,
						]}
					/>
				))}
			</View>

			<LoginLongBtn text={STRINGS.ON_BOARDING.PASS} onPress={moveToLogin}/>

		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		...typography.display.small,
		flex: 1,
		backgroundColor: colors.white,
	},
	slideContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backgroundImage: {
		width: '100%',
		height: '60%',
	},
	content: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',

		padding: 20,
	},
	dotsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 5,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: colors.gray300,
		marginHorizontal: 5,
		marginBottom: 18,
	},
	activeDot: {
		backgroundColor: colors.orange200,
	},
	title: {
		...typography.heading.large,
		textAlign: 'center',
		color: colors.gray500,
		marginBottom: 8,
	},
	description: {
		...typography.body.medium,
		textAlign: 'center',
		color: colors.gray400,
	},
	kakaoButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FEE500',
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 20,
		alignSelf: 'center',
		elevation: 2,
		boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
		marginBottom: 120,
	},
	kakaoImage: {
		width: 200,
		height: 30,
	},
})
