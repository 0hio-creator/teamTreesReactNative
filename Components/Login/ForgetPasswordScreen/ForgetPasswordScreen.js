
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
  Animated
} from 'react-native'
import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'

// AWS Amplify
import Auth from '@aws-amplify/auth'

import {styles} from '../styles'

// redux imports
import { connect } from 'react-redux'
import { setUserName, setPassword, setConfirmationCode } from '../../../Actions'


class ForgetPasswordScreen extends Component {


      // Request a new password
         forgotPassword = async () => {
          await Auth.forgotPassword(this.props.userName)
          .then(data => console.log('New code sent', data))
          .catch(err => {
            if (! err.message) {
              console.log('Error while setting up the new password: ', err)
              Alert.alert('Error while setting up the new password: ', err)
            } else {
              console.log('Error while setting up the new password: ', err.message)
              Alert.alert('Error while setting up the new password: ', err.message)
            }
          })
        }

        // Upon confirmation redirect the user to the Sign In page
        forgotPasswordSubmit = async() => {
          await Auth.forgotPasswordSubmit(this.props.userName, this.props.confirmationCode, this.props.password)
          .then(() => {
            this.props.navigation.navigate('SignIn')
            console.log('the New password submitted successfully')
          })
          .catch(err => {
            if (! err.message) {
              console.log('Error while confirming the new password: ', err)
              Alert.alert('Error while confirming the new password: ', err)
            } else {
              console.log('Error while confirming the new password: ', err.message)
              Alert.alert('Error while confirming the new password: ', err.message)
            }
          })
        }

        render() {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar/>
          <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
            enabled
            keyboardVerticalOffset={23}>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                {/* Infos */}
                <Container style={styles.infoContainer}>
                  <View style={styles.container}>
                    {/* Username */}
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
                        returnKeyType='go'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={this.props.userName}
                        onChangeText={(value) => {this.props.setUserName(value)}}
                      />
                    </Item>
                    <TouchableOpacity
                        onPress={() => this.forgotPassword()}
                      style={styles.buttonStyle}>
                      <Text style={styles.buttonText}>
                        Send Code
                      </Text>
                    </TouchableOpacity>
                    {/* the New password section  */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
                        name='lock'
                        style={styles.iconStyle}
                      />
                      <Input
                        style={styles.input}
                        placeholder='New password'
                        placeholderTextColor='#adb4bc'
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        onSubmitEditing={(event) => { this.refs.SecondInput._root.focus()}}
                        value={this.props.password}
                        onChangeText={(value) => {this.props.setPassword(value)}}
                      />
                    </Item>
                    {/* Code confirmation section  */}
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
                        ref='SecondInput'
                        value={this.props.confirmationCode}
                        onChangeText={(value) => {this.props.setConfirmationCode(value)}}
                      />
                    </Item>
                    <TouchableOpacity
                    onPress={() => this.forgotPasswordSubmit()}
                      style={styles.buttonStyle}>
                      <Text style={styles.buttonText}>
                        Confirm the new password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Container>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
}

const mapStateToProps = state => ({
    userName:state.loginInfo.userName,
    password:state.loginInfo.password,
    confirmationCode:state.loginInfo.confirmationCode
})

const mapDispatchToProps = dispatch => ({
    setUserName: (userName) => dispatch(setUserName(userName)),
    setPassword: (password) => dispatch(setPassword(password)),
    setConfirmationCode: (confirmationCode) => dispatch(setConfirmationCode(confirmationCode))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgetPasswordScreen)
