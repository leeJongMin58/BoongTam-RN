import * as AuthSession from 'expo-auth-session'

export function getRedirectURI() {
	return AuthSession.makeRedirectUri({
		useProxy: true,
	})
}
