import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {SvgCssUri } from "react-native-svg";


// Render a Donation card containing image, name of doner and message they left
class DonationCard extends Component {
    render() {

        return (
            <View style = {styles.card}>
                <View style={styles.pic}>
                    <SvgCssUri
                        width='90%'
                        height='90%'
                        uri={ this.props.donation ? this.props.donation.img : null}
                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.textName}>{this.props.donation ? this.props.donation.name : null}</Text>
                    <Text style={styles.textTrees}> {this.props.donation ? this.props.donation.trees : null} trees </Text>
                    <Text style={styles.textMessage}>{this.props.donation ? this.props.donation.message : null}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        flex:1,
        flexDirection: 'row',
    },
    pic:{
        flex:1,
        height:Dimensions.get('window').height/6,
        resizeMode: 'contain',
        borderColor:'peru',
        borderBottomWidth:1,
    },
    textBox:{
        height:Dimensions.get('window').height/6,
        borderColor:'peru',
        borderBottomWidth:1,
        flex:2,
        flexDirection: 'column',
    },
    textName:{
        marginTop:2,
        fontSize:18,
        fontWeight:'bold',
        flex:1
    },
    textMessage:{
        marginTop:2,
        marginRight:5,
        flex:2
    },
    textTrees:{
        marginTop:2,
        backgroundColor: '#8ab73f',
        alignSelf: 'flex-start',
    },

})
export default DonationCard
