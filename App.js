import React, {Component} from 'react';

// Screens
import HomeScreen from './Components/HomeScreen/HomeScreen'
import TopDoner from  './Components/TopDoner/TopDoner'
import LatestDoner from  './Components/LatestDoner/LatestDoner.js'

// Redux Setup
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './Reducers'
const store = createStore(rootReducer);


import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//import { createDrawerNavigator } from 'react-navigation-drawer';


const MainNavigator = createStackNavigator(
    {
        Home: {screen: HomeScreen},
        TopDoner: {screen: TopDoner},
        LatestDoner: {screen:LatestDoner}
    },
    {
        initialRouteName: 'Home',
        headerTransitionPreset:'fade-in-place',
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
);

const Navigation = createAppContainer(MainNavigator);


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
