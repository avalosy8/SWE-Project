import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import RedeemIcon from '@material-ui/icons/Redeem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/home"
    },

    {
        title: "Events",
        icon: <EventIcon />,
        link: "/events"
    },

    {
        title: "Points",
        icon: <RedeemIcon />,
        link: "/points"
    },

    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/settings"
    },

    {
        title: "Logout",
        icon: <ExitToAppIcon />,
        link: "/logout"
    },
]