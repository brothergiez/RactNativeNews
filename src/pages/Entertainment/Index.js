import React, { Component } from "react";
import Entertainment from "./Entertainment";
import Detail from "../Detail/Detail";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
    Entertainment: { screen: Entertainment },
    Detail: { screen: Detail }
}));
