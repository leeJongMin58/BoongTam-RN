import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	Modal,
	LogBox,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import Postcode from '@actbase/react-daum-postcode'
import Colors from '../../../src/styles/color'
import Typography from '../../../src/styles/typhography'
import { STRINGS } from '../../../src/config/string'
import { LoginAppbar } from '../../../src/components/LoginAppbar'
import { signupUseCase } from '../../../src/usecases/authUsecase'
import { LoginLongBtn } from '../../../src/components/LoginLongBtn'
import { ro } from 'date-fns/locale'

LogBox.ignoreLogs([
	'Warning: Postcode: Support for defaultProps will be removed from function components in a future major release',
])

const AddressInput = () => {
	const local = useLocalSearchParams()
	const router = useRouter()

	const [zipcode, setZipcode] = useState('')
	const [address, setAddress] = useState('')
	const [detailedAddress, setDetailedAddress] = useState('')
	const [isModalVisible, setModalVisible] = useState(false)

	console.log(local)

	const handleAddressSelect = (data) => {
		setZipcode(data.zonecode)
		setAddress(data.address)
		setModalVisible(false)
	}

	const handleNextBtn = async () => {
		try {
			console.log(local.phoneNumber)
			const result = await signupUseCase(
				local.phoneNumber,
				local.id,
				local.password,
				address,
				detailedAddress,
				zipcode,
				local.email
			)
			if (result.code == 200) {
				router.push({
					pathname: '/login/signup/loginSuccess'
				})
			}
		} catch (error) {
			console.log(error)
		}
		
		router.push({
			pathname: '/boongtam',
			params: {
				id: local.id,
				phoneNumber: local.phoneNumber,
				password: finallyPw.current,
			},
		})
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				<LoginAppbar
					title={STRINGS.LOGIN.SIGNUP}
					step={STRINGS.LOGIN.ADDRESS.STEP}
				/>

				{/* 주소 입력 */}
				<View style={styles.addressSection}>
					<Text style={styles.label}>
						{STRINGS.LOGIN.ADDRESS.ADDRESS1}
					</Text>
					<View style={styles.inputRow}>
						<TextInput
							style={styles.zipcodeInput}
							placeholder="우편번호"
							value={zipcode}
							editable={false}
						/>
						<TouchableOpacity
							style={styles.searchButton}
							onPress={() => setModalVisible(true)}
						>
							<Text style={styles.searchButtonText}>
								{STRINGS.LOGIN.ADDRESS.ADDRESS2}
							</Text>
						</TouchableOpacity>
					</View>
					<TextInput
						style={styles.input}
						placeholder="주소"
						value={address}
						editable={false}
					/>
					<TextInput
						style={styles.input}
						placeholder="상세주소"
						value={detailedAddress}
						onChangeText={(text) => setDetailedAddress(text.trim())}
					/>
				</View>
				<LoginLongBtn text={STRINGS.LOGIN.PASS} onPress={handleNextBtn} />

				{/* 주소 검색 모달 */}
				<Modal
					visible={isModalVisible}
					animationType="slide"
					transparent
				>
					<View style={styles.modalBackground}>
						<View style={styles.modalContainer}>
							<Postcode
								jsOptions={{ animation: true }}
								onSelected={handleAddressSelect}
								onError={(error) => {
									console.error('Postcode Error:', error)
									Alert.alert(
										'주소 검색 오류',
										'주소 검색 중 문제가 발생했습니다.',
									)
								}}
								style={{ flex: 1 }}
							/>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setModalVisible(false)}
							>
								<Text style={styles.closeButtonText}>닫기</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'space-between',
	},
	addressSection: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		...Typography.body.large_bold,
		marginBottom: 8,
		alignSelf: 'flex-start',
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	input: {
		height: 60,
		borderWidth: 1,
		borderColor: Colors.orange100,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
		width: '100%',
	},
	zipcodeInput: {
		flex: 3,
		height: 60,
		borderWidth: 1,
		borderColor: Colors.orange100,
		borderRadius: 5,
		paddingHorizontal: 10,
		width: '100%',
	},
	searchButton: {
		flex: 1,
		backgroundColor: Colors.orange100,
		paddingVertical: 18,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		height: 60,
	},
	searchButtonText: {
		color: Colors.white,
		...Typography.body.medium,
	},
	helperText: {
		marginTop: 10,
		...Typography.body.medium,
		color: Colors.gray300,
		textAlign: 'center',
	},
	modalBackground: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '90%',
		height: '70%',
		backgroundColor: Colors.white,
		borderRadius: 10,
		overflow: 'hidden',
	},
	closeButton: {
		backgroundColor: Colors.orange100,
		padding: 15,
		alignItems: 'center',
	},
	closeButtonText: {
		color: Colors.white,
		...Typography.body.medium,
	},
})

export default AddressInput
