import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from 'react-native-animatable';

import {
    updateProp,
    askHelp,
    startGame,
    skipQuestion
} from '../actions';
import {
    NAV_IS_UP,
    LEVEL,
    EASY,
    MEDIUM,
    HARD,
    MASTER,
} from "../actions/types";

class Nav extends Component {

    render() {
        const {
            updateProp,
            askHelp,
            startGame,
            skipQuestion,
            navigation:{navigate, state},
            store: {nav_is_up, level, help, is_playing}
        } = this.props;
        return (
            <Animatable.View
                transition="flex"
                style={[styles.container, nav_is_up &&{flex: 1.6}]}
            >
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[styles.nav_option, nav_is_up &&{height: "50%"}]}
                    onPress={()=>updateProp({key: NAV_IS_UP, value: !nav_is_up})}
                >
                    <SimpleLineIcons name={nav_is_up ? "arrow-down" : "arrow-up"} size={35} color={"#2b2b2b"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[styles.nav_option, nav_is_up &&{height: "50%"}]}
                    onPress={()=>{
                        if(is_playing)startGame()
                    }}
                >
                    <MaterialCommunityIcons name={"restart"} size={40} color={"#2b2b2b"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[styles.nav_option, nav_is_up &&{height: "50%"}]}
                    onPress={()=>navigate("RecordScreen", { backGoesTo: state.routeName })}
                >
                    <Ionicons name={"ios-timer"} size={40} color={"#2b2b2b"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[styles.nav_option, nav_is_up &&{height: "50%"}]}
                    onPress={askHelp}
                >
                    <Foundation name={"lightbulb"} size={33} color={"#2b2b2b"}/>
                    {is_playing &&(
                        <View style={styles.help_badge}>
                            <Text style={styles.help_text}>{help}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[styles.nav_option, nav_is_up &&{height: "50%"}]}
                    onPress={skipQuestion}
                >
                    <Feather name={"skip-forward"} size={35} color={"#2b2b2b"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[
                        styles.nav_option,
                        {width: "25%"},
                        styles.level_option,
                        nav_is_up &&{height: "50%"},
                        level === EASY &&{borderColor: "#009bba"}
                    ]}
                    onPress={()=>updateProp({key: LEVEL, value: EASY})}
                >
                    <Text
                        style={[
                            styles.level_text,
                            level === EASY &&{color: "#009bba"}
                        ]}
                    >
                        EASY
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[
                        styles.nav_option,
                        {width: "25%"},
                        styles.level_option,
                        nav_is_up &&{height: "50%"},
                        level === MEDIUM &&{borderColor: "#009bba"}
                    ]}
                    onPress={()=>updateProp({key: LEVEL, value: MEDIUM})}
                >
                    <Text
                        style={[
                            styles.level_text,
                            level === MEDIUM &&{color: "#009bba"}
                        ]}
                    >
                        MEDIUM
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[
                        styles.nav_option,
                        {width: "25%"},
                        styles.level_option,
                        nav_is_up &&{height: "50%"},
                        level === HARD &&{borderColor: "#009bba"}
                    ]}
                    onPress={()=>updateProp({key: LEVEL, value: HARD})}
                >
                    <Text
                        style={[
                            styles.level_text,
                            level === HARD &&{color: "#009bba"}
                        ]}
                    >
                        HARD
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.5}
                    style={[
                        styles.nav_option,
                        {width: "25%"},
                        styles.level_option,
                        nav_is_up &&{height: "50%"},
                        level === MASTER &&{borderColor: "#009bba"}
                    ]}
                    onPress={()=>updateProp({key: LEVEL, value: MASTER})}
                >
                    <Text
                        style={[
                            styles.level_text,
                            level === MASTER &&{color: "#009bba"}
                        ]}
                    >
                        MASTER
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        );
    }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {updateProp, askHelp, startGame, skipQuestion}
)(Nav);

const styles = StyleSheet.create({
    container:{
        flex: .8,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "#fdfbfb"
    },
    nav_option:{
        width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    level_option:{
        paddingTop: 5,
        borderBottomWidth: 5,
        borderColor: "#fdfbfb"
    },
    level_text:{
        color: "#5a5a5a",
        fontSize: 18
    },
    help_badge:{
        position: "absolute",
        top: 4,
        right: 12,
        width: 23,
        height: 23,
        borderRadius: 50,
        backgroundColor: "#009bba",
        justifyContent: "center",
        alignItems: "center"
    },
    help_text:{
        fontSize: 17,
        textAlign: "center",
        fontWeight: "600"
    }
});
