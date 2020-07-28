
import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text
} from 'react-native';

import ActionButton from 'react-native-action-button';
import EventCard from './EventCard';

import { getEvents } from './api';


const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: '#F3F3F3'
    },
    container: {
        flex: 1
    },
    label: {
        fontSize: 34,
        fontWeight: '400',
        color: '#000000',
        textAlign: 'left',
        paddingTop: 30,
        paddingLeft: 20,
    },
});

class EventList extends Component {
    state = {
        events: [],
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                events: this.state.events.map(evt => ({
                    ...evt,
                    timer: Date.now(),
                })),
            });
        }, 1000);


        this.props.navigation.addListener(
            'didFocus',
            () => {
                getEvents().then(events => this.setState({ events }));
            }
        );
    }

    handleAddEvent = (title, date, id) => {
        this.props.navigation.navigate('form', {title, date, id})
    }

    onPress = (title, date, id) => {
        this.props.navigation.navigate('form', {title, date, id})
    }

    render() {
        return [
            <FlatList
                key="flatlist"
                data={this.state.events}
                style={styles.list}
                keyExtractor={item => item.id}
                renderItem={({ item, separators }) => (
                    <EventCard
                        event={item}
                        onPress={() => this.onPress(item.title, item.date, item.id)}
                    />
                )}
            />,
            <ActionButton
                key="fab"
                buttonColor="rgba(247, 216, 0, 1)"
                onPress={() => this.handleAddEvent( null , Date(), null)}
            />,
        ];
    }
}

export default EventList;