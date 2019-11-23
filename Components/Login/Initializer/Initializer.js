import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    AsyncStorage
} from 'react-native'

export default class Initializer extends Component {

    componentDidMount = async () => {

        await this.loadApp()
    }


    loadApp = async () => {

        const userToken = await AsyncStorage.getItem('userToken')
        this.props.navigation.navigate(userToken ? 'Home' : 'Welcome')
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkkhaki',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
