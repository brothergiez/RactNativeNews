import React, { Component } from "react";
import HomeScreen from "./HomeScreen";
import Entertainment from "../Entertainment/Index";
import Technology from "../Technology/Index";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Entertainment: { screen: Entertainment },
        Technology: { screen: Technology }
        // Detail: { screen: Detail }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default HomeScreenRouter;
