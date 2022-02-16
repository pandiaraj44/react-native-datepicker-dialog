import React, { Component } from 'react';
import { Platform } from 'react-native';
import RNDateTimePicker, {
    AndroidEvent,
    AndroidNativeProps,
    Event,
    IOSNativeProps
} from "@react-native-community/datetimepicker"
import Container from "./container"

export interface PickerOption {
    date?: Date;
}

export interface Props {
    onDatePicked?: ( date: Date ) => void;
    onCancel?: () => void;
    okLabel?: string;
    cancelLabel?: string;
    locale?: string;
}

type DPPropsReadOnly = IOSNativeProps | AndroidNativeProps
type Writeable<T> = { -readonly [P in keyof T]: Writeable<T[P]> };
export type DPProps = Writeable<DPPropsReadOnly>

interface PickerProps<Option extends PickerOption> {
    buildPickerProps?: ( option: Option ) => Partial<DPProps>
}

interface State<Option extends PickerOption> {
    pickerVisible: boolean;
    date?: Date;
    options?: Option;
}

export default class PickerDialog<Option extends PickerOption> extends Component<Props & PickerProps<Option>, State<Option>> {

    constructor( props: Props ) {
        super(props);

        this.state = {
            pickerVisible: false,
        }
    }

    static defaultProps = {
        okLabel: 'Ok',
        cancelLabel: 'Cancel'
    }

    open( options: Option ) {
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
            pickerVisible: true
        });
    }

    hideDatePickerModal() {
        this.setState({
            pickerVisible: false
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
        const { locale, okLabel, cancelLabel, buildPickerProps } = this.props;
        const { pickerVisible, options = {}, date: sDate } = this.state;
        const xbuildProps: any = buildPickerProps ? buildPickerProps(options as Option) : {};
        if ( Platform.OS === "ios" ) {
            xbuildProps.locale = locale ? locale : 'en_EN'
        }
        return (
            <Container
                datePickerVisible={ pickerVisible }
                okLabel={ okLabel! }
                cancelLabel={ cancelLabel! }
                onOK={ this.onOk }
                onCancel={ this.onCancel }
            >
                <RNDateTimePicker
                    { ...xbuildProps }
                    value={ sDate! }
                    onChange={ this.onChange }
                />
            </Container>
        );
    }
}

