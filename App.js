import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/display';
import { API_KEY } from './utils/apiKey';

export default class App extends Component {
    state = {
        isLoading: true,
        temperature: 0,
        weatherConditions: null,
        error: null
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            error => {
                this.setState({
                    error: 'Error'
                });
            }
        );
    }

    fetchWeather(lat = 25, lon = 25) {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    temperature: json.main.temp,
                    weatherCondition: json.weather[0].main,
                    isLoading: false
                });
            });
    }

    render() {
        const { isLoading } = this.state;
        return (
            <View style={styles.container}>
        <Text style={styles.name}>Muhammad Luqman Bin Mohamad Nadzri</Text><br></br>
                {isLoading ? (
                    <Text style={styles.loading}>Fetching The Weather</Text>
                ) : (
                    <Weather
                        weather={this.state.weatherCondition}
                        temperature={this.state.temperature}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    name: {
        alignContent: 'center',
        color: "white",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },

    loading: {
        alignContent: 'center',
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#add8e6"
    }

   
    
});