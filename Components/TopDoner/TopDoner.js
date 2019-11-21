
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

// Redux Imports
import { connect } from 'react-redux'
import { setUpdateTimer, setTopDoners } from '../../Actions'


const {TeamTrees} = require('teamtrees-api');
const teamTrees = new TeamTrees();

import DonationCard from '../DonationCard/DonationCard'
const UPDATE_INTERVAL = 60*1000; // update interval for team team every 5 minutes

class TopDoner extends Component {

    static navigationOptions = {
        title: 'Top Doners',
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
            let topDoners = (await teamTrees.getMostTrees()).slice(0,9);
            this.props.setTopDoners(topDoners);
            //console.log(typeof({this.props.topDoners[0].img}));

         } catch(e) {
             Alert.alert('error', e.message);
         }

    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView style = {styles.container}>

                    {

                        (this.props.topDoners||[]).map((item, key) => (
                        <View key={key} >
                        <DonationCard donation={item}/>
                        </View>
                        ))

                    }
                </ScrollView>
            </View>

        )
    }

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})

const mapStateToProps = state => ({
    topDoners: state.treeInfo.topDoners,
    updateTimer: state.treeInfo.updateTimer
})

const mapDispatchToProps = dispatch => ({
    setTopDoners: (topDoners) => dispatch(setTopDoners(topDoners)),
    setUpdateTimer: (updateTimer) => dispatch(setUpdateTimer(updateTimer))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopDoner);
