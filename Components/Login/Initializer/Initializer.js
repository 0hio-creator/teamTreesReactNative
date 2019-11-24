import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native'

// AWS Amplify
import Auth from '@aws-amplify/auth'

import { connect } from 'react-redux'
import {setUserToken} from '../../../Actions'

class Initializer extends Component {

    componentDidMount = async () => {

        await this.loadApp()
    }


    loadApp = async () => {

        await Auth.currentAuthenticatedUser()
        .then(user => {
            this.props.setUserToken(user)
        })
        .catch(err => console.log(err))
        this.props.navigation.navigate(this.props.userToken ? 'App' : 'Auth')
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

Initializer

const mapStateToProps = state => ({
    userToken:state.loginInfo.userToken,

})

const mapDispatchToProps = dispatch => ({
    setUserToken: (userToken) => dispatch(setUserToken(userToken)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Initializer);
