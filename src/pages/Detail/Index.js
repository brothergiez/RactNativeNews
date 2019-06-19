import React, { Component } from "react";
import Detail from "./Detail";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Detail: { screen: Detail }
}));
