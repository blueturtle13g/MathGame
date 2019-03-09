import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

import {
    updateProp,
    setNewRecord,
    startGame
} from '../actions';
import Nav from '../components/Nav';
import Board from '../components/Board';
import QA from '../components/QA';
import {PLAYER} from "../actions/types";
import GameStartScreen from "./GameStartScreen";

class PlayGroundScreen extends Component {

    handleChangeText = value=>{
        if (value.length < 15) this.props.updateProp({key: PLAYER, value});
        else ToastAndroid.showWithGravity(
            'No More Characters Are Allowed!',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
        );
    };

    handleSubmit = ()=>{
        const { store, setNewRecord, navigation} = this.props;
        if(!!store.player.trim().length){
            setNewRecord();
            navigation.navigate('RecordScreen')
        }else{
            ToastAndroid.showWithGravity(
                'Please Enter A Name',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            );
        }
    };

    render() {
        const {
            store:{is_playing, player, keyboard_is_open, score},
            navigation,
            startGame
        } = this.props;

        return (
            <LinearGradient
                style={[styles.container]}
                colors={["#fdfbfb","#e6e8e9"]}
            >
                {!is_playing &&(
                    <TouchableOpacity
                        style={styles.dont_save}
                        onPress={()=> navigation.navigate("GameStartScreen")}
                    >
                        <Entypo name={"cross"} size={40} color={"#aa7678"}/>
                    </TouchableOpacity>
                )}
                <View style={{flex: 10}}>
                    {!is_playing &&(
                        <View style={styles.save_record}>
                            {!!score ?
                                <View style={styles.center}>
                                    <Text style={styles.text}>Congratulations!</Text>
                                    <TextInput
                                        autoFocus
                                        style={styles.input}
                                        placeholder={"Your Name Please"}
                                        value={player}
                                        onChangeText={this.handleChangeText}
                                        onSubmitEditing={this.handleSubmit}
                                    />
                                </View>
                                :
                                <View>
                                    <Text style={styles.text}>It's OK!</Text>
                                    <TouchableOpacity
                                        style={styles.start_button}
                                        onPress={startGame}
                                    >
                                        <Text style={styles.button_text}>
                                            Try Again
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    )}
                    <Board/>
                    {is_playing &&<QA/>}
                </View>
                {!keyboard_is_open &&<Nav navigation={navigation}/>}
            </LinearGradient>
        );
    }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {
        updateProp,
        setNewRecord,
        startGame
    }
)(PlayGroundScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    center:{
        justifyContent: "center",
        alignItems: "center"
    },
    finished_con:{
        flex: 10,
    },
    save_record:{
        flex: 9,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontSize: 30,
        textAlign: "center",
    },
    input:{
        marginTop: 5,
        borderWidth: 1,
        width: 300,
        fontSize: 20,
        textAlign: "center"
    },
    start_button:{
        marginTop: 25,
        width: 200,
        height: 50,
        backgroundColor: "#009bba",
        justifyContent: "center",
        alignItems: "center"
    },
    button_text:{
        fontSize: 30,
        color: "#fff",
        fontStyle: "italic",
        fontWeight: "600"
    },
    dont_save:{
        position: "absolute",
        top: 0,
        left: 0
    }
});
