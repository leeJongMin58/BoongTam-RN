import { registerRootComponent } from 'expo';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from "../src/styles/color"

// 로그인 관련 화면
import FirstScreen from './login/FirstScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="First">
        <Stack.Screen
          name="First"
          component={FirstScreen}
          options={{ title: '로그인 화면' }}
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
