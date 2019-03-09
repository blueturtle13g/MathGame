import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import LinearGradient from 'react-native-linear-gradient';
import { updateProp, setNewRecord } from '../actions';
import {GRADIENT_COLOR} from "../actions/types";

class Record extends Component {

    renderOldRecords = records=>{
        if(records){
            records.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
            return(
                <ScrollView style={styles.records_con}>
                    {records.map((record, i)=>{
                        return(
                            <View
                                key={record.player + record.score + record.finish_time + record.correct_answers}
                                style={[styles.record_con]}
                            >
                                <Text style={[styles.texts, styles.rank]}>{i+1}</Text>
                                <Text style={[styles.texts, {width: "35%"}]}>{record.player}</Text>
                                <View style={styles.info_con}>
                                    <Entypo name={"flag"} size={30} color={"#2b2b2b"}/>
                                    <Text style={styles.texts}>{record.score}</Text>
                                </View>
                                <View style={[styles.info_con, {width: "25%"}]}>
                                    <Octicons name={"watch"} size={30} color={"#2b2b2b"}/>
                                    <Text style={styles.texts}>{record.finish_time}</Text>
                                </View>
                                <View style={styles.info_con}>
                                    <Octicons name={"verified"} size={30} color={"#2b2b2b"}/>
                                    <Text style={styles.texts}>{record.correct_answers}</Text>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            )
        }

        return(
            <View style={[styles.records_con, {justifyContent: "center", alignItems: "center"}]}>
                <Text style={[styles.texts, {fontSize: 25}]}>You have no record!</Text>
                <Entypo name={"emoji-happy"} size={100} color={"#2b2b2b"}/>
            </View>
        )
    };

    render() {
        const { store: {records}, navigation } = this.props;
        return (
            <LinearGradient
                style={[styles.container]}
                colors={GRADIENT_COLOR}
            >
                <TouchableOpacity
                    style={styles.closeModal}
                    onPress={()=>navigation.navigate(navigation.getParam('backGoesTo', 'GameStartScreen'))}
                >
                    <MaterialCommunityIcons name={"keyboard-backspace"} size={35} color={"#2b2b2b"}/>
                </TouchableOpacity>

                {this.renderOldRecords(records)}

            </LinearGradient>
        );
    }
}

function mapStateToProps(store) {
    return {store};
}

export default connect(
    mapStateToProps, { updateProp, setNewRecord }
)(Record);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 50,
        backgroundColor: "#4a5a54",
        justifyContent: "center",
        alignItems: "center"
    },
    records_con:{
        flex: 8,
    },
    record_con:{
        flex: 1,
        minHeight: 35,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 4,
    },
    texts:{
        fontSize: 17,
        fontStyle: "italic",
        textAlign: "center",
        color: "#2b2b2b"
    },
    newRecordCon:{
        marginTop: 15,
    },
    closeModal:{
        position: "absolute",
        top: 7,
        left: 7,
        zIndex: 2,
    },
    rank:{
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    },
    info_con:{
        width: "15%",
        justifyContent: "center",
        alignItems: "center"
    }
});