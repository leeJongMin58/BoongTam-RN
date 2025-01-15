import React from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { STRINGS } from '../../../src/config/string'
import Typography from '../../../src/styles/typhography'
import Colors from '../../../src/styles/color'

export function AgreementModal({ isVisible, onClose, onAgreement }) {
	const handleAgreement = () => {
		onClose()
		onAgreement()
	}
	return (
		<Modal
			transparent={true}
			visible={isVisible}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>
						{STRINGS.LOGIN.AGREEMENT.TITLE}
					</Text>
					<Text style={styles.modalText}>
						{STRINGS.LOGIN.AGREEMENT.SERVICE}
					</Text>
					<Text style={styles.modalText}>
						{STRINGS.LOGIN.AGREEMENT.PRIVACY}
					</Text>
					<Text style={styles.modalText}>
						{STRINGS.LOGIN.AGREEMENT.LOCATION}
					</Text>

					<View style={styles.modalButtons}>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={handleAgreement}
						>
							<Text style={styles.modalButtonText}>{STRINGS.LOGIN.AGREEMENT.ALL_AGREEMENT}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={onClose}
						>
							<Text style={styles.modalButtonText}>{STRINGS.LOGIN.AGREEMENT.CANCEL}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
	},
	modalContainer: {
		width: '80%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
	},
	modalTitle: {
        ...Typography.heading.small_bold,
		marginBottom: 15,
		textAlign: 'center',
	},
	modalText: {
        ...Typography.body.large,
		marginBottom: 10,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	modalButton: {
		padding: 10,
		borderRadius: 5,
		backgroundColor: Colors.orange100, // 오렌지색
	},
	modalButtonText: {
        ...Typography.body.large_bold,
		color: Colors.gray500,
	},
})
