import { Tabs } from 'expo-router'
import colors from '../../src/styles/color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BoongIcon from '../../assets/icon/ic_boong'
import { STRINGS } from '../../src/config/string'

const getTabBarIcon = (iconName, focused) => (
	<MaterialIcons
		name={iconName}
		size={24}
		color={focused ? colors.orange200 : colors.gray200}
	/>
)

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.orange200,
				colors: colors.gray200,
				tabBarStyle: {
					height: 80,
					backgroundColor: colors.white,
				},
			}}
		>
			<Tabs.Screen
				name="(boongtam)/(main)/boongtam"
				options={{
					title: STRINGS.BOONG_TAM.TITLE,
					tabBarIcon: ({ focused }) => (
						<BoongIcon
							color={focused ? colors.orange200 : colors.gray200}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(community)/(main)/community"
				options={{
					title: STRINGS.COMMYNUITY.TITLE,
					tabBarIcon: ({ focused }) => getTabBarIcon('chat', focused),
				}}
			/>
			<Tabs.Screen
				name="(pay)/(main)/pay"
				options={{
					title: STRINGS.PAY.TITLE,
					tabBarIcon: ({ focused }) =>
						getTabBarIcon('phishing', focused),
				}}
			/>
			<Tabs.Screen
				name="(shop)/(main)/shop"
				options={{
					title: STRINGS.SHOP.TITLE,
					tabBarIcon: ({ focused }) =>
						getTabBarIcon('shopping-cart', focused),
				}}
			/>
			<Tabs.Screen
				name="(my)/(main)/my"
				options={{
					title: STRINGS.MY.TITLE,
					tabBarIcon: ({ focused }) =>
						getTabBarIcon('account-circle', focused),
				}}
			/>
		</Tabs>
	)
}
