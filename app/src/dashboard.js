import React, {useContext} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './components/themes/Navigator';
import Home from './screens/home/Home';
import SingIn from "./screens/authentication/SignIn";
import SingUp from "./screens/authentication/SignUp";
import Error from "./screens/Error";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {Context} from "./utils/Store";

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
    app: {
        flex: 1,
        display: 'flex',
        minHeight: '100vh'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    footer: {
        padding: theme.spacing(2),
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [user] = useContext(Context);

    function PrivateRoute({children, ...rest}) {
        return (
            <Route
                {...rest}
                render={({location}) =>
                    user === "undefined" ?
                        <LinearProgress/>
                        :
                        user ? (
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
            <div className={classes.app}>
                <CssBaseline/>
                <Navigator/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Switch>
                        <PrivateRoute exact path="/">
                            <Home/>
                        </PrivateRoute>
                        <Route exact path="/login">
                            <SingIn/>
                        </Route>
                        <Route exact path="/sign-up">
                            <SingUp/>
                        </Route>
                        <Route path="*">
                            <Error content={"Error 404 Page not found"}/>
                        </Route>
                    </Switch>
                    <footer className={classes.footer}>
                        <Box pt={4}>
                            <Copyright/>
                        </Box>
                    </footer>
                </main>
            </div>
        </Router>
    );
}
