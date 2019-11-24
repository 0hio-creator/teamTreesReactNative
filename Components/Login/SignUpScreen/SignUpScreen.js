
import React, {Component} from 'react'
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Keyboard,
    View,
    Alert,
    Modal,
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

// redux imports
import { connect } from 'react-redux'
import { setEmail, setUserName, setPassword, setPhoneNumber, setConfirmationCode } from '../../../Actions'

class SignUpScreen extends Component {



  // Sign up user with AWS Amplify Auth
   signUp = async() => {

    // rename variable to conform with Amplify Auth field phone attribute
    console.log('userName:',this.props.email)

    await Auth.signUp({
        username: this.props.userName,
        password: this.props.password,
        attributes: {
           email: this.props.email,
           phone_number: this.props.phoneNumber
       }
    })
    .then(() => {
        console.log('sign up successful!')
        Alert.alert('Enter the confirmation code you received.')
    })
    .catch(err => {
        if (! err.message) {
            console.log('Error when signing up: ', err)
            Alert.alert('Error when signing up: ', err)
        } else {
            console.log('Error when signing up: ', err.message)
            Alert.alert('Error when signing up: ', err.message)
        }
    })
  }

  // Confirm users and redirect them to the SignIn page
   confirmSignUp = async() => {
    //const { username, authCode } = this.state
    console.log(typeof(this.props.confirmationCode))

    await Auth.confirmSignUp(
        this.props.userName,
        this.props.confirmationCode
    )
    .then(() => {
      this.props.navigation.navigate('SignIn')
      console.log('Confirm sign up successful')
    })
    .catch(err => {
      if (! err.message) {
        console.log('Error when entering confirmation code: ', err)
        Alert.alert('Error when entering confirmation code: ', err)
      } else {
        console.log('Error when entering confirmation code: ', err.message)
        Alert.alert('Error when entering confirmation code: ', err.message)
      }
  })
  }

  // Resend code if not received already
    resendSignUp = async() => {
        await Auth.resendSignUp({
            username:this.props.userName
        })
        .then(() => console.log('Confirmation code resent successfully'))
        .catch(err => {
            if (! err.message) {
                console.log('Error requesting new confirmation code: ', err)
                Alert.alert('Error requesting new confirmation code: ', err)
            } else {
                console.log('Error requesting new confirmation code: ', err.message)
                Alert.alert('Error requesting new confirmation code: ', err.message)
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Container style={styles.infoContainer}>
                    <View style={styles.container}>
                        {/* username section  */}
                        <Item rounded style={styles.itemStyle}>
                            <Icon
                                active
                                name='person'
                                style={styles.iconStyle}
                            />
                            <Input
                                style={styles.input}
                                placeholder='Username'
                                placeholderTextColor='#adb4bc'
                                keyboardType={'email-address'}
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onSubmitEditing={(event) => {this.refs.SecondInput._root.focus()}}
                                value={this.props.userName}
                                onChangeText={(value) => {this.props.setUserName(value)}}
                            />
                        </Item>
                        {/*  password section  */}
                        <Item rounded style={styles.itemStyle}>
                            <Icon
                                active
                                name='lock'
                                style={styles.iconStyle}
                            />
                            <Input
                                style={styles.input}
                                placeholder='Password'
                                placeholderTextColor='#adb4bc'
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                // ref={c => this.SecondInput = c}
                                ref='SecondInput'
                                onSubmitEditing={(event) => {this.refs.ThirdInput._root.focus()}}
                                value={this.props.password}
                                onChangeText={(value) => {this.props.setPassword(value)}}
                            />
                        </Item>
                        {/* email section */}
                        <Item rounded style={styles.itemStyle}>
                            <Icon
                                active
                                name='mail'
                                style={styles.iconStyle}
                            />
                            <Input
                                style={styles.input}
                                placeholder='Email'
                                placeholderTextColor='#adb4bc'
                                keyboardType={'email-address'}
                                returnKeyType='next'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={false}
                                ref='ThirdInput'
                                onSubmitEditing={(event) => {this.refs.FourthInput._root.focus()}}
                                value={this.props.email}
                                onChangeText={(value) => {this.props.setEmail(value)}}
                            />
                        </Item>
                        {/* phone section  */}
                        <Item rounded style={styles.itemStyle}>
                            <Icon
                                active
                                name='call'
                                style={styles.iconStyle}
                            />
                            <Input
                                style={styles.input}
                                placeholder='+44766554433'
                                placeholderTextColor='#adb4bc'
                                keyboardType={'phone-pad'}
                                returnKeyType='done'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={false}
                                ref='FourthInput'
                                value={this.props.phoneNumber}
                                onChangeText={(value) => {this.props.setPhoneNumber(value)}}
                            />
                        </Item>
                        {/* End of phone input */}
                        <TouchableOpacity
                            onPress={this.signUp}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>
                              Sign Up
                            </Text>
                        </TouchableOpacity>
                        {/* code confirmation section  */}
                        <Item rounded style={styles.itemStyle}>
                            <Icon
                                active
                                name='md-apps'
                                style={styles.iconStyle}
                            />
                            <Input
                                style={styles.input}
                                placeholder='Confirmation code'
                                placeholderTextColor='#adb4bc'
                                keyboardType={'numeric'}
                                returnKeyType='done'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={false}
                                value={this.props.confirmationCode}
                                onChangeText={(value) => {this.props.setConfirmationCode(value)}}
                            />
                        </Item>
                        <TouchableOpacity
                            onPress={this.confirmSignUp}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>
                                Confirm Sign Up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.resendSignUp}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>
                                Resend code
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Container>
            </View>
        )
  }
}

const mapStateToProps = state => ({
    email:state.loginInfo.email,
    userName:state.loginInfo.userName,
    password:state.loginInfo.password,
    phoneNumber:state.loginInfo.phoneNumber,
    confirmationCode:state.loginInfo.confirmationCode
})

const mapDispatchToProps = dispatch => ({
    setEmail: (email) => dispatch(setEmail(email)),
    setUserName: (userName) => dispatch(setUserName(userName)),
    setPassword: (password) => dispatch(setPassword(password)),
    setPhoneNumber: (phoneNumber) => dispatch(setPhoneNumber(phoneNumber)),
    setConfirmationCode: (confirmationCode) => dispatch(setConfirmationCode(confirmationCode))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpScreen);
