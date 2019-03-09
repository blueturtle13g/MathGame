import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { updateProp, validateGenerate } from '../actions';
import * as Animatable from 'react-native-animatable';

class QA extends Component {
    state={
        option_ex_style: {},
        reveal_answer: false
    };

    handleOptionPress = (option)=>{
        this.setState({reveal_answer: true});
        setTimeout(()=>{
            this.setState({reveal_answer: false});
            this.props.validateGenerate(option);
        }, 400);
    };

    render() {
        const { store:{ problem, answer, options} } = this.props;
        const { reveal_answer } = this.state;
        return (
            <View style={styles.container}>
                <View
                    style={styles.problem}
                >
                    <Animatable.Text
                        animation="fadeIn"
                        iterationCount={1}
                        style={styles.problem_text}
                    >
                        {problem}
                    </Animatable.Text>
                </View>
                <View style={styles.options_con}>
                    {options.map(option=>{
                        const ex_style = option === answer ? styles.option_correct : styles.option_wrong;
                        return(
                            <TouchableOpacity
                                key={option}
                                style={[styles.option, reveal_answer && ex_style]}
                                activeOpacity={.7}
                                onPress={()=>{
                                    if(!reveal_answer) this.handleOptionPress(option)
                                }}
                            >
                                <Text
                                    style={styles.option_text}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
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
    mapStateToProps, {updateProp, validateGenerate}
)(QA);

const styles = StyleSheet.create({
    container:{
        flex: 9,
        backgroundColor: "transparent",
    },
    problem:{
        flex: 2,
        // backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
    },
    problem_text:{
        fontSize: 30,
        textAlign: "center",
        lineHeight: 40
    },
    options_con:{
        // backgroundColor: "red",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginHorizontal: 10
    },
    option:{
        backgroundColor: "#686868",
        width: "45%",
        height: 50,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    option_text:{
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        color: "#e5e5e5"
    },
    option_wrong:{
        backgroundColor: "#ff4f51"
    },
    option_correct:{
        backgroundColor: "#2f7d62"
    },
});
