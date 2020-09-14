import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import {Link} from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button component={Link} to={"/"}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to={"/pending-tasks"}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Pending Task" />
        </ListItem>
        <ListItem button component={Link} to={"/done-tasks"}>
            <ListItemIcon>
                <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Done Task" />
        </ListItem>
    </div>
);
