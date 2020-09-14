import React, {useContext} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './components/themes/Navigator';
import Home from './screens/home/Home';
import SingIn from "./screens/authentication/SignIn";
import SingUp from "./screens/authentication/SignUp";
import Error from "./screens/Error";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {Context} from "./utils/Store";
import EditProfile from "./screens/user/EditProfile";
import CreateTask from "./screens/task/CreateTask";
import UpdateTask from "./screens/task/UpdateTask";
import ListPendingTask from "./screens/task/ListPendingTasks";
import DoneTasks from "./screens/task/DoneTasks";
import Container from "@material-ui/core/Container";
import Box from '@material-ui/core/Box';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        minHeight: '100vh',
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [state] = useContext(Context);

    function PrivateRoute({children, ...rest}) {
        return (
            <Route
                {...rest}
                render={({location}) =>
                    state.user === "undefined" ?
                        <LinearProgress/>
                        :
                        state.user ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {from: location}
                                }}
                            />
                        )
                }
            />
        );
    }

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <Navigator/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Switch>
                            <Route exact path="/login">
                                <SingIn/>
                            </Route>
                            <Route exact path="/sign-up">
                                <SingUp/>
                            </Route>
                            <PrivateRoute exact path="/">
                                <Home/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/edit-profile">
                                <EditProfile/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/pending-tasks">
                                <ListPendingTask/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/done-tasks">
                                <DoneTasks/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/create-task">
                                <CreateTask/>
                            </PrivateRoute>
                            <PrivateRoute exact path="/edit-task/:taskId">
                                <UpdateTask/>
                            </PrivateRoute>
                            <Route path="*">
                                <Error content={"Error 404 Page not found"}/>
                            </Route>
                        </Switch>

                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        </Router>
    );
}
