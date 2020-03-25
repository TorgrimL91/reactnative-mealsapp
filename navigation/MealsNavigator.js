import React from 'react';
import {Platform, Text} from 'react-native';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMeals from  '../screens/CategoryMealsScreen';
import MealDetail from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';


const defaultStackNavOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
        },
        headerTitleStyle: {
            fontFamily: 'open-sans'
        },
    headerBackTitleStyle: {
            fontFamily: 'open-sans'
    },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator({
    Categories: {screen: CategoriesScreen},
    CategoryMeals: {screen: CategoryMeals},
    MealDetail:{screen: MealDetail}
    }, { mode: 'modal',
        defaultNavigationOptions: defaultStackNavOptions
});

const FavoritesNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetail
    }, {
        mode: 'modal',
        defaultNavigationOptions:  defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
        }
    }
};

const MealsFavTabNavigator = Platform.OS === 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            activeTintColor: Colors.accentColor
        }
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: 'Meals'
        }},
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator);