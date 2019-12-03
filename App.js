import React, {Component} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Icon} from 'native-base'

// Screens
// Tree Screens
import HomeScreen from './Components/HomeScreen/HomeScreen'
import TopDoner from  './Components/TopDoner/TopDoner'
import LatestDoner from  './Components/LatestDoner/LatestDoner'
import SettingsScreen from './Components/SettingsScreen/SettingsScreen'

// Login Screens
import Initializer from './Components/Login/Initializer/Initializer'
import WelcomeScreen from './Components/Login/WelcomeScreen/WelcomeScreen'
import SignInScreen from './Components/Login/SignInScreen/SignInScreen'
import SignUpScreen from './Components/Login/SignUpScreen/SignUpScreen'
import ForgetPasswordScreen from './Components/Login/ForgetPasswordScreen/ForgetPasswordScreen'

// Redux Setup
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './Reducers'
const store = createStore(rootReducer);

// Navigation Setup
import {createAppContainer, createSwitchNavigator,  } from 'react-navigation'
import {createStackNavigator,} from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {createBottomTabNavigator} from 'react-navigation-tabs'

// Amplify imports and config
import Amplify from '@aws-amplify/core'
import awsmobile from './Constants/awsmobile'
Amplify.configure(awsmobile)



const AppTabNavigator = createStackNavigator (
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({navigation}) => ({
              headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                  <View style={{paddingHorizontal: 10}}>
                    <Icon name='md-menu' size={24}/>
                  </View>
                </TouchableOpacity>
              )
          }),
        },
        TopDoner: {screen: TopDoner},
        LatestDoner: {screen: LatestDoner},
    },
    {
        headerLayoutPreset:'center',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'peru',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
)



const AppDrawerNavigator = createDrawerNavigator(
    {
        Tabs: AppTabNavigator,
        Settings:{screen:SettingsScreen},
        Home: {screen: HomeScreen},
        TopDoner: {screen: TopDoner},
        LatestDoner: {screen: LatestDoner},
    }
)

const AuthStackNavigator = createStackNavigator({
    Welcome: {screen: WelcomeScreen},
    SignIn: {screen: SignInScreen},
    SignUp: {screen:SignUpScreen},
    ForgetPassword: {screen:ForgetPasswordScreen}
    },
    {
        headerLayoutPreset:'center',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'peru',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
)


const Main = createSwitchNavigator ({
    Initializer: Initializer,
    App: AppDrawerNavigator,
    Auth: AuthStackNavigator
})

const Navigation = createAppContainer(Main);


class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
};

export default App;
