import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import HomeScreen from '../screens/CharacterScreen';
import BlogListScreen from "../screens/BlogScreen";
import RemindersScreen from "../screens/RemindersScreen";
import SavedMoodsScreen from "../screens/SavedMoodsScreen";
import StatsScreen from "../screens/StatsScreen";

const Tab = createBottomTabNavigator();

const getTabIcon = (routeName) => {
    switch (routeName) {
        case 'Home':
            return require('../assets/img/Frame862.png');
        case 'BlogListScreen':
            return require('../assets/img/Frame84.png');
        case 'RemindersScreen':
            return require('../assets/img/Frame85.png');
        case 'SavedMoodsScreen':
            return require('../assets/img/Frame87.png');
        case 'StatsScreen':
            return require('../assets/img/Frame84.png');
    }
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#F196FF',
                    shadowColor: '#1F2021',
                    elevation: 10,
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                    height: 200,
                },
                headerTitle: () => (
                    <Image
                        source={require('../assets/img/Group1.png')}
                        style={{

                            marginRight: 15,

                        }}
                    />
                ),

                tabBarStyle: {
                    position: 'absolute',
                    bottom: 40,
                    left: 20,
                    right: 20,
                    elevation: 5,
                    width: '80%',
                    marginLeft: '10%',
                    backgroundColor: '#fff',
                    borderRadius: 80,
                    paddingTop: 25,
                    height: 90,
                    paddingBottom: 10,
                    borderWidth: 3,
                    borderColor: '#F196FF',
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 20,
                },
                // headerShown: false,
                tabBarIcon: () => (
                    <Image
                        source={getTabIcon(route.name)}
                        style={{ }}
                    />
                ),
            })}
        >

            <Tab.Screen
                name="BlogListScreen"
                component={BlogListScreen}
                options={{
                    tabBarLabel: '',
                    headerStyle: {
                        backgroundColor: '#F196FF',
                        shadowColor: '#1F2021',
                        elevation: 10,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        height: 100,
                    },
                    headerTitle: "Blog",
                    headerTitleStyle: {
                        color: '#fff',
                    }
                }}
            />

            <Tab.Screen
                name="RemindersScreen"
                component={RemindersScreen}
                options={{
                    tabBarLabel: '',
                    // headerTitle: '',
                }}
            />

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                    // headerTitle: '',
                }}
            />


            <Tab.Screen
                name="SavedMoodsScreen"
                component={SavedMoodsScreen}
                options={{
                    tabBarLabel: '',
                    // headerTitle: '',
                }}
            />

            <Tab.Screen
                name="StatsScreen"
                component={StatsScreen}
                options={{
                    tabBarLabel: '',
                    // headerTitle: '',
                }}
            />






        </Tab.Navigator>
    );
};

export default MainTabNavigator;
