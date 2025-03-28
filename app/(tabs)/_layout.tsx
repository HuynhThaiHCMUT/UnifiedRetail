import { useAppSelector } from '@/utils/hook'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Redirect, Tabs, useRouter } from 'expo-router'

export default function TabLayout() {
    const auth = useAppSelector((state) => state.auth)
    if (!auth.user.token) return <Redirect href="/auth/sign-in" />
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: (props) => (
                        <MaterialCommunityIcons name="home" {...props} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inventory"
                options={{
                    title: 'Kho hàng',
                    tabBarIcon: (props) => (
                        <MaterialCommunityIcons name="home" {...props} />
                    ),
                }}
            />
            <Tabs.Screen
                name="pos"
                options={{
                    title: 'Bán hàng',
                    tabBarIcon: (props) => (
                        <MaterialCommunityIcons name="home" {...props} />
                    ),
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    title: 'Đơn hàng',
                    tabBarIcon: (props) => (
                        <MaterialCommunityIcons name="home" {...props} />
                    ),
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'Cài đặt',
                    tabBarIcon: (props) => (
                        <MaterialCommunityIcons name="cog" {...props} />
                    ),
                }}
            />
        </Tabs>
    )
}
