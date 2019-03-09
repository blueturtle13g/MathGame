import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

import { msToTime } from "../utils";
import { updateProp } from '../actions';
import {FINISH_TIME} from "../actions/types";

class Board extends Component {
    state={
        duration: "00:00:00",
        interval_running: false
    };

    componentDidMount() {
        this.handleDuration();
    }

    componentDidUpdate() {
        this.handleDuration();
    }

    handleDuration = ()=>{
        if(!this.state.interval_running && this.props.store.is_playing) {
            let durationInterval = setInterval(() => {
                if (!this.props.store.is_playing) {
                    clearInterval(durationInterval);
                    this.setState({interval_running: false});
                    this.props.updateProp({key: FINISH_TIME, value: this.state.duration});
                    return;
                }
                this.setState({duration: msToTime(Date.now() - this.props.store.start_time), interval_running: true})
            }, 1000);
        }
    };

    render() {
        const {
            score,
            asked_questions,
            correct_answers
        } = this.props.store;
        return (
            <View style={styles.container}>

                <View style={styles.info_con}>
                    <Entypo name={"flag"} size={30} color={"#5a5a5a"}/>
                </View>
                <View style={styles.info_con}>
                    <Octicons name={"watch"} size={30} color={"#5a5a5a"}/>
                </View>
                <View style={styles.info_con}>
                    <Octicons name={"verified"} size={30} color={"#5a5a5a"}/>
                </View>

                <View style={styles.info_con}>
                    <Text style={styles.info_text}>{score}</Text>
                </View>
                <View style={styles.info_con}>
                    <Text style={styles.info_text}>{this.state.duration}</Text>
                </View>
                <View style={styles.info_con}>
                    <Text style={styles.info_text}>{asked_questions}/{correct_answers}</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {updateProp}
)(Board);

const styles = StyleSheet.create({
    container:{
        flex: 1.5,
        backgroundColor: "transparent",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    info_con:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "33.3%",
        height: "50%"
    },
    info_text:{
        fontSize: 20,
        fontWeight: "400"
    }
});
