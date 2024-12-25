import { registerRootComponent } from 'expo';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../src/styles/color';
import { STRINGS } from '../src/config/string';

// 로그인 관련 화면
import LoginScreen from './login/login/login'

// 마이페이지 관련 화면
import MypageScreen from './(tabs)/(my)/(main)/my';
import EditprofileScreen from './(tabs)/(my)/EditProfile';
import MyreviewScreen from './(tabs)/(my)/myreview';
import MysuttleScreen from './(tabs)/(my)/mysuttle';
import MybillScreen from './(tabs)/(my)/mybill';

// 하단 세 개(공지, 정책, 설정)
import MynoticesScreen from './(tabs)/(my)/mynotices';
import MypolicesScreen from './(tabs)/(my)/mypolices';
import MyservicesScreen from './(tabs)/(my)/myservices';

// 회원탈퇴
import MychangeScreen from './(tabs)/(my)/change';
import MywithdrawalScreen from './(tabs)/(my)/withdrawal';



const Stack = createStackNavigator();
 
export default function App() {  
  return (
      <Stack.Navigator initialRouteName="First">
        <Stack.Screen
          name="First"
          component={LoginScreen}
          options={{ title: STRINGS.LOGIN.TITLE }}
        /> 
        <Stack.Screen
          name="my_page"
          component={MypageScreen}
          options={{ title: STRINGS.MY.TITLE }}
        /> 
        <Stack.Screen 
          name="my_page_edit" 
          component={EditprofileScreen} 
          options={{ title: "프로필 수정 화면" }} 
        />
        <Stack.Screen 
          name="my_page_review" 
          component={MyreviewScreen} 
          options={{ title: "리뷰 페이지" }} 
        />
        <Stack.Screen 
          name="my_page_suttle" 
          component={MysuttleScreen} 
          options={{ title: "배송 조회 페이지" }} 
        />
        <Stack.Screen 
          name="my_page_bill" 
          component={MybillScreen} 
          options={{ title: "결제 내역 페이지" }} 
        />
        <Stack.Screen 
          name="my_page_notice" 
          component={MynoticesScreen} 
          options={{ title: "설정" }} 
        />
        <Stack.Screen 
          name="my_page_police" 
          component={MypolicesScreen} 
          options={{ title: "약관 및 정책" }} 
        />
        <Stack.Screen 
          name="my_page_service" 
          component={MyservicesScreen} 
          options={{ title: "고객센터" }} 
        />
        <Stack.Screen 
          name="my_page_change" 
          component={MychangeScreen} 
          options={{ title: "수정 화면" }} 
        />
        <Stack.Screen 
          name="my_page_withdrawal" 
          component={MywithdrawalScreen} 
          options={{ title: "회원탈퇴" }} 
        />
      </Stack.Navigator>
  ); 
}  

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
