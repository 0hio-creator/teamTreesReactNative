
import React, {Component} from 'react'
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    TouchableWithoutFeedback,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    Animated,
} from 'react-native'

import {
    Container,
    Item,
    Input,
    Icon
} from 'native-base'


import {styles} from '../styles'

// AWS Amplify
import Auth from '@aws-amplify/auth'


import { connect } from 'react-redux'
import { setUserName, setPassword } from '../../../Actions'

class SignInScreen extends Component {

    static navigationOptions = function(props) {
        return {
            title: 'Sign In',
        }
    };


    signIn = async () => {

       await Auth.signIn({
            username:this.props.userName,
            password:this.props.password
        })
        .then(user => {
            this.setState({ user })
            this.props.navigation.navigate('Initializer')
        })
        .catch(err => {
            if (! err.message) {
                console.log('Error when signing in: ', err)
                Alert.alert('Error when signing in: ', err)
            } else {
                console.log('Error when signing in: ', err.message)
                Alert.alert('Error when signing in: ', err.message)
            }
        })
    }
    render() {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
                keyboardVerticalOffset = {null}
                enabled>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Container style={styles.infoContainer}>
                            <View style={styles.container}>
                                <Item rounded style={styles.itemStyle}>
                                    <Icon
                                        active
                                        name='person'
                                        style={styles.iconStyle}/>
                                    <Input
                                        style={styles.input}
                                        placeholder='Username'
                                        placeholderTextColor='peru'
                                        keyboardType={'email-address'}
                                        returnKeyType='next'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onSubmitEditing={(event) => {this.refs.SecondInput._root.focus()}}
                                        value={this.props.userName}
                                        onChangeText={(value) => {this.props.setUserName(value)}}
                                    />
                                </Item>
                                <Item rounded style={styles.itemStyle}>
                                    <Icon
                                        active
                                        name='lock'
                                        style={styles.iconStyle}
                                    />
                                    <Input
                                        style={styles.input}
                                        placeholder='Password'
                                        placeholderTextColor='peru'
                                        returnKeyType='go'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        ref='SecondInput'
                                        value={this.props.password}
                                        onChangeText={(value) => {this.props.setPassword(value)}}
                                    />
                                </Item>
                                <TouchableOpacity
                                    onPress={() => this.signIn()}
                                    style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Container>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
    userName:state.loginInfo.userName,
    password:state.loginInfo.password,
})

const mapDispatchToProps = dispatch => ({
    setUserName: (userName) => dispatch(setUserName(userName)),
    setPassword: (password) => dispatch(setPassword(password)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInScreen);
