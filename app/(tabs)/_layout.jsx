import { Tabs } from 'expo-router'
import colors from '../../src/styles/color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BoongIcon from '../../assets/icon/ic_boong'

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
					height: 56,
					backgroundColor: colors.white
				},
			}}
		>
			<Tabs.Screen
				name="(boongtam)/(main)/boongtam"
				options={{
					title: 'boongtam',
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
					title: 'community',
					tabBarIcon: ({ focused }) => getTabBarIcon('chat', focused),
				}}
			/>
			<Tabs.Screen
				name="(pay)/(main)/pay"
				options={{
					title: 'pay',
					tabBarIcon: ({ focused }) => getTabBarIcon('phishing', focused),
				}}
			/>
			<Tabs.Screen
				name="(shop)/(main)/shop"
				options={{
					title: 'shop',
					tabBarIcon: ({ focused }) => getTabBarIcon('shopping-cart', focused),
				}}
			/>
			<Tabs.Screen
				name="(my)/(main)/my"
				options={{
					title: 'my',
					tabBarIcon: ({ focused }) =>
						getTabBarIcon('account-circle', focused),
				}}
			/>
		</Tabs>
	)
}
