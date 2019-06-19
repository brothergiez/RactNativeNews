import React, { Component } from "react";
import Technology from "./Technology";
import Detail from "../Detail/Detail";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Technology: { screen: Technology },
    Detail: { screen: Detail }
}));
