import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  DatePickerAndroid,
  StyleSheet
} from 'react-native';

export default class DatePickerDialog extends Component{

  constructor(props){
    super(props);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.state = {
      date: null
    }
  }

  static propTypes = {
    /**
     * Date picked handler.
     *
     * This method will be called when the user selected the date from picker
     * The first and only argument is a Date object representing the picked
     * date and time.
     */
    onDatePicked: PropTypes.func,

    /**
     * Date Cancelled handler.
     *
     * This method will be called when the user dismissed the picker.
     */
    onCancel: PropTypes.func,
  }

  /**
   * Opens the standard Android date picker dialog.
   *
   * The available keys for the `options` object are:
   *   * `date` (`Date` object or timestamp in milliseconds) - date to show by default
   *   * `minDate` (`Date` or timestamp in milliseconds) - minimum date that can be selected
   *   * `maxDate` (`Date` object or timestamp in milliseconds) - minimum date that can be selected
   *
   * Note the native date picker dialog has some UI glitches on Android 4 and lower
   * when using the `minDate` and `maxDate` options.
   */
  open(options: Object){
    DatePickerAndroid.open(options).then(this.handleDatePicker);
  }

  handleDatePicker({action, year, month, day}){
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day)
      });
      if(this.props.onDatePicked){
        this.props.onDatePicked(new Date(year, month, day));
      }
    }else if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  getSelectedDate(){
    return this.state.date;
  }

  render(){
    return(
      <View style={styles.container}></View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
