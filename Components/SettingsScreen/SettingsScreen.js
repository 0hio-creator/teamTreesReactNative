import React, {Component} from 'react'
import {
    AsyncStorage,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

export default class SettingsScreen extends Component {

    async singOut() {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Initializer')
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.singOut()}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Sign out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10
  }
})
