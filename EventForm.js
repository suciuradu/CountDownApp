import React, { Component } from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
    saveEvent,
    deleteEvent,
    updateEvent,
    formatDateTime
} from './api';


const styles = StyleSheet.create({
    fieldContainer: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    text: {
        height: 60,
        margin: 0,
        marginLeft: 7,
        marginRight: 7,
        paddingLeft: 10,
        fontSize: 21,
    },
    borderTop: {
        borderColor: '#edeeef',
        borderTopWidth: 0.5,
    },
    button: {
        height: 50,
        backgroundColor: '#f2d705',
        borderColor: '#f2d705',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

class EventForm extends Component {
    static navigationOptions = ({ navigation }) => {
        title = navigation.state.params.title;
        if (title) {
            return {
                headerTitle: `Edit ${title}`,
            };
        } else {
            return {
                headerTitle: 'Add new event',
            };
        }
    };

    state = {
        id: null,
        title: null,
        date: '',
    };

    componentDidMount() {
        this.setState({
            id: this.props.navigation.state.params.id,
            title: this.props.navigation.state.params.title,
            date: this.props.navigation.state.params.date,
        });

        this.forceUpdate()
    }

    handleChangeTitle = (text) => {
        this.setState({
            title: text,
        });
    }

    handleDatePicked = (date) => {
        this.setState({
            date,
        });

        this.handleDatePickerHide();
    }


    handleDatePickerHide = () => {
        this.setState({
            showDatePicker: false,
        });
    }

    handleDatePress = () => {
        this.setState({
            showDatePicker: true,
        });
    }

    handleAddPress = () => {
        saveEvent(this.state)
            .then(() => {
                this.props.navigation.goBack();
            })
    }

    handleUpdatePress = () => {
        updateEvent(this.state.id, this.state.title, this.state.date)
            .then(() => {
                this.props.navigation.goBack();
            })
    }

    handleDeletePress = () => {
        deleteEvent(this.state.id)
            .then(() => {
                this.props.navigation.goBack();
            })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.text}
                        onChangeText={this.handleChangeTitle}
                        placeholder="Event title"
                        spellCheck={false}
                        defaultValue={this.state.title}
                    />
                    <TextInput
                        style={[styles.text, styles.borderTop]}
                        placeholder="Event date"
                        spellCheck={false}
                        defaultValue={formatDateTime(this.state.date.toString())}
                        editable={!this.state.showDatePicker}
                        onFocus={this.handleDatePress}
                    />
                    <DateTimePicker
                        isVisible={this.state.showDatePicker}
                        mode="datetime"
                        onConfirm={this.handleDatePicked}
                        onCancel={this.handleDatePickerHide}
                    />
                </View>

                {this.state.id == null ?
                    <TouchableHighlight
                        onPress={this.handleAddPress}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableHighlight> : null
                }

                {this.state.id != null ?
                    <TouchableHighlight
                        onPress={this.handleUpdatePress}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableHighlight> : null
                }

                {this.state.id != null ?
                    <TouchableHighlight
                        onPress={this.handleDeletePress}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableHighlight> : null
                }
            </View>
        );
    }
}

export default EventForm;