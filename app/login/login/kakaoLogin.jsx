import WebView from 'react-native-webview'
import {
	Modal,
	StyleSheet,
	View,
	TouchableOpacity,
	Dimensions,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../../src/styles/color'

const { width, height } = Dimensions.get('window')

export default function KakaoLoginWebViewDialog({ visible, onClose }) {
	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.dialog}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={onClose}
					>
						<MaterialIcons name="close" size={24} />
					</TouchableOpacity>
					<WebView
						style={styles.webView}
						source={{
							uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=~~&redirect_uri=~~',
						}}
					/>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dialog: {
		width: width * 0.9,
		height: height * 0.7,
		backgroundColor: colors.gray500,
		borderRadius: 12,
		overflow: 'hidden',
	},
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 1,
		padding: 10,
	},
	webView: {
		flex: 1,
	},
})
