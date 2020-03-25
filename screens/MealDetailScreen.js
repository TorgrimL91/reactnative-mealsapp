import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {MEALS} from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId');

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    return (
        <ScrollView>
            <Image/>
            <View>
                <DefaultText>{props.duration}m</DefaultText>
                <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={}>Ingredients</Text>
            <View style={styles.screen}>
                <Text>The MealDetails Screen</Text>
                <Text>{selectedMeal.title}</Text>
            </View>
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    return {
        headerTitle: selectedMeal.title,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Favorite' iconName='ios-star' onPress={() => {
                console.log('pressed button')
            }}/>
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealDetailScreen;