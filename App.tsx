/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import { DatePickerDialog } from './main-index'
import moment from 'moment';

interface Props {
}

interface State {
    dobText: string;
    dobDate?: Date;
    journeyText: string;
    journeyDate?: Date;
}

export default class App extends Component<Props, State> {
    dobDialog = React.createRef<DatePickerDialog>();
    journeyDialog = React.createRef<DatePickerDialog>();

    constructor( props: Props ) {
        super(props);
        this.state = {
            dobText: '',
            journeyText: '',
            dobDate: new Date(),
        }
    }

    /**
     * DOB textbox click listener
     */
    onDOBPress = () => {

        //To open the dialog
        this.dobDialog.current?.open({
            date: this.state.dobDate,
            maxDate: new Date(),
            minDate: new Date(2022,0,1)
        });

    }

    /**
     * Call back for dob date picked event
     *
     */
    onDOBDatePicked = ( date: Date ) => {
        this.setState({
            dobDate: date,
            dobText: moment(date).format('DD-MMM-YYYY')
        });
    }


    render() {
        return (
            <SafeAreaView style={ styles.container }>
                <View style={ styles.container }>
                    <Text style={ styles.content }>
                        Date Picker Dialog Example
                    </Text>
                    <View style={ { flex: 1, marginTop: 10 } }>
                        <Text>DOB</Text>
                        <TouchableOpacity onPress={ this.onDOBPress.bind(this) }>
                            <View style={ styles.datePickerBox }>
                                <Text style={ styles.datePickerText }>{ this.state.dobText }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Place the dialog component at end of your views*/ }
                    <DatePickerDialog ref={ this.dobDialog } onDatePicked={ this.onDOBDatePicked.bind(this) }/>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF'
    },
    content: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    datePickerBox: {
        marginTop: 9,
        borderColor: '#ABABAB',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent: 'center'
    },
    datePickerText: {
        fontSize: 14,
        marginLeft: 5,
        borderWidth: 0,
        color: '#121212',
    },
});
