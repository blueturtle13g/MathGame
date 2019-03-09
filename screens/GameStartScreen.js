import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {retrieveRecords} from "../utils";
import { startGame, updateProp } from '../actions';
import Nav from '../components/Nav';
import PlayGroundScreen from "./PlayGroundScreen";
import {RECORDS, KEYBOARD_IS_OPEN} from "../actions/types";

class GameStartScreen extends Component {
    state={flex: 10};
    async componentDidMount() {
        const { updateProp } = this.props;
        retrieveRecords().then((records) => updateProp({key: RECORDS, value: records}));
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            ()=> updateProp({key: KEYBOARD_IS_OPEN, value: true})
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            ()=> updateProp({key: KEYBOARD_IS_OPEN, value: false})
        );
        let tutorial_seen = await AsyncStorage.getItem('tutorial_seen');

        if (tutorial_seen == null) {
            AsyncStorage.setItem('tutorial_seen', 'true');
            this.props.navigation.navigate("TutorialScreen");
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        const { startGame, navigation } = this.props;
        return (
            <LinearGradient
                style={[styles.container]}
                colors={["#fdfbfb","#e6e8e9"]}
            >

                <View style={styles.start}>
                    <Text style={styles.text}>Start Playing!</Text>
                    <TouchableOpacity
                        style={styles.start_button}
                        onPress={()=>{
                            startGame();
                            navigation.navigate('PlayGroundScreen')
                        }}
                    >
                        <Text style={styles.button_text}>
                            Go!
                        </Text>
                    </TouchableOpacity>
                </View>

                <Nav navigation={navigation}/>
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
    mapStateToProps, {startGame, updateProp}
)(GameStartScreen);

const styles = StyleSheet.create({
    container:{
        flex: 10,
    },
    start_button:{
        marginTop: 25,
        width: 200,
        height: 50,
        backgroundColor: "#009bba",
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontSize: 50,
        fontWeight: "600"
    },
    button_text:{
        fontSize: 30,
        color: "#fff",
        fontStyle: "italic",
        fontWeight: "600"
    },
    start: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
