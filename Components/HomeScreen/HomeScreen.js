
import React, {Component} from 'react';


import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Button,
  Alert
} from 'react-native';

import { connect } from 'react-redux'
import { setTotalTrees, setUpdateTimer } from '../../Actions'

const {TeamTrees} = require('teamtrees-api');
const teamTrees = new TeamTrees();

const UPDATE_INTERVAL = 60*1000; // update interval for team team every 5 minutes

class HomeScreen extends Component {
    static navigationOptions = function(props) {
        return {
            title: 'Home',
            headerLeft: <Button onPress={() => props.navigation.navigate('LatestDoner')} title= "=" />
        }
    };
    async componentDidMount() {

        this.checkForUpdate();
        let timer = setInterval(this.checkForUpdate, UPDATE_INTERVAL);
        this.props.setUpdateTimer(timer);
    }


    componentWillUnmount() {

        clearInterval(this.props.updateTimer);
    }


    // checks with the team tree api every 10s
     checkForUpdate = async () => {
         try {
             let totalTrees = await teamTrees.getTotalTrees(true);
             this.props.setTotalTrees(totalTrees);
         } catch (e) {
             Alert.alert('error', e.message);
         }

    }


    render () {

        return (
            <View style={styles.container}>
                <Image
                    source={require('./Assets/logo-team-trees.png')}
                    style = {styles.logo}
                />
                <View style ={{flex:1}}>
                    <Text style = {styles.heading}> {this.props.totalTrees}</Text>
                </View>
                <View style ={{flex:6}}>
                    <Text style = {styles.text}> hello World !</Text>
                    <Text style = {styles.text}> {this.props.totalTrees}</Text>
                </View>

            </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightgreen'
    },
    logo: {
        //height:130,
        width: Dimensions.get('window').width,
        flex:1,
        resizeMode: 'contain',
        //marginTop:4
    },
    heading:{
        fontSize:40,
        textAlign:'center'
    },
    text: {
        fontSize:25
    }
});

const mapStateToProps = state => ({
    totalTrees: state.treeInfo.totalTrees,
    updateTimer: state.treeInfo.updateTimer

})

const mapDispatchToProps = dispatch => ({
    setTotalTrees: (totalTrees) => dispatch(setTotalTrees(totalTrees)),
    setUpdateTimer: (updateTimer) => dispatch(setUpdateTimer(updateTimer))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);
