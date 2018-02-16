import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  DatePickerIOS,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native';

export default class DatePickerDialog extends Component{

  constructor(props){
    super(props);

	this.modalKey = `IosDatePickerModal_${Date.now()}`

    this.state = {
      datePickerVisible: false,
      options: null
    }
  }

  static propTypes = {
    /**
     * Date picked handler.
     *
     * This is called when the user selected the date from picker
     * The first and only argument is a Date object representing the picked
     * date and time.
     */
    onDatePicked: PropTypes.func,

    /**
     * Date Cancelled handler.
     *
     * This is called when the user dismissed the picker.
     */
    onCancel: PropTypes.func,

    /**
    * Ok button label
    */
    okLabel: PropTypes.string,

    /**
    * Cancel button label
    */
    cancelLabel: PropTypes.string
  }

  static defaultProps = {
    okLabel: 'Ok',
    cancelLabel: 'Cancel'
  }

  /**
 * Opens the standard IOS date picker dialog.
 *
 * The available keys for the `options` object are:
 *   * `date` (`Date` object or timestamp in milliseconds) - date to show by default
 *   * `minDate` (`Date` or timestamp in milliseconds) - minimum date that can be selected
 *   * `maxDate` (`Date` object or timestamp in milliseconds) - minimum date that can be selected
 *
 */
  open(options: Object){
    this.setState({
      options: options
    });
    this.showDatePickerModal();
  }

  getSelectedDate(){
    return (options) ? options.date : null;
  }

  cancel = () => {
    this.hideDatePickerModal();
    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  ok = () => {
    this.hideDatePickerModal();
    if(this.props.onDatePicked){
      this.props.onDatePicked(this.state.options.date);
    }
  }

  showDatePickerModal(){
    this.setState({
      datePickerVisible: true
    });
  }

  hideDatePickerModal(){
    this.setState({
      datePickerVisible: false
    });
  }

  render(){
    const { locale } = this.props;
    let datePickerProps = {};
    if (this.state.options){
      if(this.state.options.date) {
        datePickerProps['date'] = this.state.options.date;
      }
      if (this.state.options.minDate) {
        datePickerProps['minimumDate'] = this.state.options.minDate;
      }
      if (this.state.options.maxDate) {
        datePickerProps['maximumDate'] = this.state.options.maxDate;
      }
    }else{
      datePickerProps['date'] = new Date();
    }

    return(
      <Modal style={{flex:1}} onRequestClose={() => {}} visible={this.state.datePickerVisible} transparent key={this.modalKey}>
        <View style={styles.container} >
          <View style={styles.background}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.modalContent}>
                <View style={{marginTop: 24, marginLeft: 8, marginRight:8}}>
                  <DatePickerIOS {...datePickerProps}
                    mode="date"
		    locale={locale ? locale : 'en_EN'}
                    onDateChange={(date)=>{
                      let options = this.state.options;
                      options.date = date;
                      this.setState({
                        options: options
                      });
                    }}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight style={{flex:1}} onPress={this.cancel.bind(this)} underlayColor={"#57D4E8"}>
                      <View style={{}}><Text style={styles.buttonTextStyle}>{this.props.cancelLabel}</Text></View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1}} onPress={this.ok.bind(this)} underlayColor={"#57D4E8"}>
                      <View style={{}}><Text style={styles.buttonTextStyle}>{this.props.okLabel}</Text></View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.58)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 16,
    margin: 16
  },
  buttonTextStyle: {
    textAlign:'center',
    fontSize: 16,
    color: '#007AFF'
  }
});
