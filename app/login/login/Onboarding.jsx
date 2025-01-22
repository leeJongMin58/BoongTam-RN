import React, { useState } from 'react'
import {
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	Animated,
	PanResponder,
	SafeAreaView,
} from 'react-native'
import { Image } from 'expo-image'
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
		image: require('../../../assets/Designer_2.jpeg'),
	},
	{
		text: STRINGS.ON_BOARDING.SLIDE2.TITLE,
		description: STRINGS.ON_BOARDING.SLIDE2.DESCRIPTION,
		image: require('../../../assets/Designer_3.jpeg'),
	},
	{
		text: STRINGS.ON_BOARDING.SLIDE3.TITLE,
		description: STRINGS.ON_BOARDING.SLIDE3.DESCRIPTION,
		image: require('../../../assets/Designer_4.jpeg'),
	},
	{
		text: STRINGS.ON_BOARDING.SLIDE4.TITLE,
		description: STRINGS.ON_BOARDING.SLIDE4.DESCRIPTION,
		image: require('../../../assets/Designer_5.jpeg'),
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
					<View style={styles.content}>
						<Image
							style={styles.slideImage}
							source={slides[currentSlide].image}
						/>
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
			<LoginLongBtn
				text={STRINGS.ON_BOARDING.PASS}
				onPress={moveToLogin}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.gray100,
	},
	slideContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	slideImage: {
		width: 240,
		height: 240,
		marginBottom: 16,
		resizeMode: 'contain',
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
})