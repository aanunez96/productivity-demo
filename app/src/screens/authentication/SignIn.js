import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {accountsClient} from '../../utils/accounts-js';
import {useHistory,Link as RouterLink} from "react-router-dom";
import {useFormik} from 'formik';
import Alert from '@material-ui/lab/Alert';
import {Context} from "../../utils/Store";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        margin: theme.spacing(1),
    }
}));

const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 8 characters or more';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

export default function SignIn() {
    const [, dispatch] = useContext(Context);
    const classes = useStyles();
    const history = useHistory();
    const [invalidAuth, setInvalidAuth] = React.useState(false);
    const onSubmit = async (values) => {
        try{
            await accountsClient.loginWithService('password', {
                user: {
                    email: values.email,
                },
                password: values.password,
            });
            const userInfoData = await accountsClient.getUser();
            dispatch({
                type: "GET_USER",
                payload: userInfoData
            });
            history.push("/");
        }catch(error){
            console.log(error);
            setInvalidAuth(true);
        }

    };

    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validate,
        onSubmit: async values => onSubmit(values),
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                {invalidAuth &&
                <Alert className={classes.alert} severity="error">Your email or password are incorrect</Alert>
                }

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <Alert className={classes.alert} severity="error">{formik.errors.email}</Alert>
                    ) : null}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <Alert className={classes.alert} severity="error">{formik.errors.password}</Alert>
                    ) : null}
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to={"/sign-up"} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    );
}