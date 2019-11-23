import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

export default class WelcomeScreen extends Component {
    static navigationOptions = function(props) {
        return {
            title: 'Welcome',
            headerLeft: null
        }
    };
      handleRoute = async (destination) => {
          await this.props.navigation.navigate(destination)
      }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignIn')}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ForgetPassword')}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Forget password ?</Text>
                </TouchableOpacity>
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
  buttonStyle: {
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10
  }
})
