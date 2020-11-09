import React, { useContext, useState, useEffect } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { View, Text, ActivityIndicator } from 'react-native';
import PostForm from '../screens/Posts/PostForm';

const NewPostStack = ({ navigation }) => {
	return <PostForm />;
};
export default NewPostStack;
