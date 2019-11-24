
import React, {Component} from 'react'
import {
    Alert,
    Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native'

import AnimateNumber from 'react-native-countup'
import DonationCard from '../DonationCard/DonationCard'

// redux imports
import { connect } from 'react-redux'
import { setTotalTrees, setTopDoners, setLatestDoners, setUpdateTimer } from '../../Actions'

// team tree api imports
const {TeamTrees} = require('teamtrees-api');
const teamTrees = new TeamTrees();

const UPDATE_INTERVAL = 60*1000; // update interval for team team every 5 minutes

class HomeScreen extends Component {
    static navigationOptions = function(props) {
        return {
            title: 'Home',
            headerLeft: null
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


    // checks with the team tree api every 1min
    checkForUpdate = async () => {
         try {
             let totalTrees = await teamTrees.getTotalTrees(true);
             let topDoners = await teamTrees.getMostTrees();
             let latestDoners = await teamTrees.getMostRecent();
             this.props.setLatestDoners(latestDoners);
             this.props.setTopDoners(topDoners);
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
                <AnimateNumber
                    style={styles.heading}
                    value={Number((this.props.totalTrees?this.props.totalTrees:'0').replace(/,/g,''))}
                    countBy={183456}
                    formatter={(val)=>{
                        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }

                    }
                />
                <View style={styles.cardBox}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardText}>Last Doner</Text>
                        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('LatestDoner')}>
                            <Text style={styles.buttonText}>See More</Text>
                        </TouchableHighlight>
                    </View>
                    <DonationCard donation={(this.props.latestDoners?this.props.latestDoners[0]:[])}/>
                </View>

                <View style={styles.cardBox}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardText}>Top Doner</Text>
                        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('TopDoner')}>
                            <Text style={styles.buttonText}>See More</Text>
                        </TouchableHighlight>
                    </View>
                    <DonationCard donation={(this.props.topDoners?this.props.topDoners[0]:[])}/>
                </View>

            </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'darkkhaki'
    },
    logo: {
        height: Dimensions.get('window').height/6,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        //marginTop:4
    },
    heading:{
        marginTop:50,
        marginTop:50,
        fontSize:40,
        textAlign:'center',
        flex:1
    },
    cardBox: {
        fontSize:25,
        flex:2
    },
    card: {
        flex:2
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'peru',
      padding: 10,
      flex:1,
      marginRight:5
    },
    buttonText: {
        fontSize:15
    },
    cardText: {
        fontSize:25,
        fontWeight:'bold',
        flex:2,
        marginLeft:10
    },
    cardBtn:{
        flex:1,
    },
    cardHeader:{
        flexDirection: 'row',
        marginBottom:5
    }
});

const mapStateToProps = state => ({
    totalTrees: state.treeInfo.totalTrees,
    latestDoners: state.treeInfo.latestDoners,
    topDoners: state.treeInfo.topDoners,
    updateTimer: state.treeInfo.updateTimer

})

const mapDispatchToProps = dispatch => ({
    setTotalTrees: (totalTrees) => dispatch(setTotalTrees(totalTrees)),
    setLatestDoners: (latestDoners) => dispatch(setLatestDoners(latestDoners)),
    setTopDoners: (topDoners) => dispatch(setTopDoners(topDoners)),
    setUpdateTimer: (updateTimer) => dispatch(setUpdateTimer(updateTimer))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);
