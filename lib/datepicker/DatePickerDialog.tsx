import React, { Component } from 'react';
import { Platform } from 'react-native';
import RNDateTimePicker, { AndroidEvent, Event } from "@react-native-community/datetimepicker"
import Container from "./container"

interface Props {
    onDatePicked?: ( date: Date ) => void;
    onCancel?: () => void;
    okLabel?: string;
    cancelLabel?: string;
    locale?: string;
}

interface State {
    datePickerVisible: boolean;
    date?: Date;
    options?: DatePickerOptions;
}

export interface DatePickerOptions {
    date?: Date;
    minDate?: Date;
    maxDate?: Date;
}

export default class DatePickerDialog extends Component<Props, State> {

    constructor( props: Props ) {
        super(props);

        this.state = {
            datePickerVisible: false,
        }
    }

    static defaultProps = {
        okLabel: 'Ok',
        cancelLabel: 'Cancel'
    }

    open( options: DatePickerOptions ) {
        this.setState({
            options: options,
            date: options.date ?? new Date(),
        });
        this.showDatePickerModal();
    }

    cancel = () => {
        this.hideDatePickerModal();
        this.props.onCancel?.();
    }

    showDatePickerModal() {
        this.setState({
            datePickerVisible: true
        });
    }

    hideDatePickerModal() {
        this.setState({
            datePickerVisible: false
        });
    }

    onChange = ( event: Event | AndroidEvent, date?: Date ) => {
        if ( Platform.OS === "android" ) {
            this.hideDatePickerModal();
            if ( date ) {
                this.setState({ date: date })
                this.props.onDatePicked?.(date!);
            } else {
                this.props.onCancel?.();
            }
        } else {
            this.setState({ date: date })
        }
    }

    //container callbacks
    onOk = () => {
        this.props.onDatePicked?.(this.state.date!);
        this.hideDatePickerModal();
    }
    onCancel = () => {
        this.props.onCancel?.();
        this.hideDatePickerModal();
    }

    render() {
        const { locale, okLabel, cancelLabel } = this.props;
        const { datePickerVisible, options = {}, date: sDate } = this.state;
        const { minDate, maxDate } = options
        const mode = Platform.OS === "ios" ? "spinner" : "calendar";
        const xProps = Platform.OS === "ios" ? { locale: locale ? locale : 'en_EN' } : {};
        return (
            <Container
                { ...xProps }
                datePickerVisible={ datePickerVisible }
                okLabel={ okLabel! }
                cancelLabel={ cancelLabel! }
                onOK={ this.onOk }
                onCancel={ this.onCancel }
            >
                <RNDateTimePicker
                    value={ sDate!  }
                    maximumDate={ maxDate }
                    minimumDate={ minDate }
                    mode="date"
                    display={ mode }
                    onChange={ this.onChange }
                />
            </Container>
        );
    }
}

