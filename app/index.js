import { registerRootComponent } from 'expo';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from "../src/styles/color"
import { STRINGS } from '../src/config/string';

// 로그인 관련 화면
import LoginScreen from './login/login/login'

const Stack = createStackNavigator();
 
export default function App() {  
  return (
      <Stack.Navigator initialRouteName="First">
        <Stack.Screen
          name="First"
          component={LoginScreen}
          options={{ title: STRINGS.LOGIN.TITLE }}
        /> 
      </Stack.Navigator>
  ); 
}  

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
