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
import { loginUseCase } from '../../../src/usecases/authUsecase'

const { width, height } = Dimensions.get('window')

const KAKAO_REST_API = process.env.EXPO_PUBLIC_KAKAO_REST_API
const REDIRECT_URI = 'http://192.168.162.10:8081/'
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`

export default function KakaoLoginWebViewDialog({ visible, onClose }) {
	const handleWebViewMessage = (event) => {
		const url = event.nativeEvent['url']
		const exp = 'code='
		const condition = url.indexOf(exp)
		if (condition !== -1) {
			try {
				console.log(url.substring(condition + exp.length))
				loginUseCase(url.substring(condition + exp.length)).then(
					() => {
						onClose()
					},
				)
			} catch (error) {
				console.error('Kakao 로그인 중 에러 발생:', error)
			}
		} else {
			console.log('URL에서 인증 코드를 추출하지 못했습니다.')
		}
	}

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
							uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}`,
						}}
						injectedJavaScript={INJECTED_JAVASCRIPT}
						javaScriptEnabled={true}
						onMessage={handleWebViewMessage}
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
