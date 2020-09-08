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
import {gql, useMutation} from '@apollo/client';
import {useHistory} from "react-router-dom";
import {accountsClient} from "../../utils/accounts-js";
import {useFormik} from 'formik';
import Alert from "@material-ui/lab/Alert/Alert";
import {Context} from "../../utils/Store";
import {Link as RouterLink} from "react-router-dom";



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
        marginTop: theme.spacing(3),
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

    if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
    }

    if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 8 characters or more';
    }

    return errors;
};

const CREATE_USER = gql`
mutation CreateUser(
  $email: String!
  $password: String!
  $name: String
  $lastName :String
){
  createUser(user:{
    email:$email,
    password:$password,
    profile:{
      name: $name,
      lastName: $lastName
    }
  }){
    userId
  }
}

`;

export default function SignUp() {
    const [,dispatch] = useContext(Context);
    const classes = useStyles();
    const history = useHistory();
    const [createUser] = useMutation(CREATE_USER);
    const [invalidAuth, setInvalidAuth] = React.useState(false);

    const create = async (values) => {
        try {
            await createUser({
                variables: {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                    lastName: values.lastName,
                }
            });
            await login(values.email,values.password);
            const userInfoData = await accountsClient.getUser();
            dispatch({
                type: "GET_USER",
                payload: userInfoData
            });
            history.push("/");
        }catch (e) {
            setInvalidAuth(true);
        }
    };

    const login = async (email,password) => {
        await accountsClient.loginWithService('password', {
            user: {
                email: email,
            },
            password: password,
        });
    };
    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
            name: '',
            lastName: '',
        },
        validate,
        onSubmit: async values => create(values),
    });


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                {invalidAuth &&
                <Alert className={classes.alert} severity="error">Your credentials are invalid try other</Alert>
                }

                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                fullWidth
                                id="name"
                                label="First Name"
                                autoFocus
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <Alert className={classes.alert} severity="error">{formik.errors.name}</Alert>
                            ) : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <Alert className={classes.alert} severity="error">{formik.errors.lastName}</Alert>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Alert className={classes.alert} severity="error">{formik.errors.email}</Alert>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}