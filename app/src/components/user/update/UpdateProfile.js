import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField} from "@material-ui/core";
import React, {useContext} from "react";
import {useFormik} from "formik";
import Alert from "@material-ui/lab/Alert/Alert";
import {Context} from "../../../utils/Store";
import useUpdateProfile from './useUpdateProfile';

const validate = values => {
    const errors = {};

    if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
    }

    if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }
    return errors;
};


export default function UpdateProfile() {
    const [state] = useContext(Context);

    const update = useUpdateProfile();
    const [invalidAuth, setInvalidAuth] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            name: state.user.profile.name,
            lastName: state.user.profile.lastName,
        },
        validate,
        onSubmit: async values => update(values,setInvalidAuth),
    });

    return (
        <Grid item xs={12}>
            {invalidAuth &&
            <Alert  severity="error">Something has gone wrong try again</Alert>
            }

            <form onSubmit={formik.handleSubmit}>
                <Card>
                    <CardHeader subheader="The information can be edited" title="Profile"/>
                    <Divider/>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    helperText="Please specify the first name"
                                    label="First name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    variant="outlined"
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <Alert severity="error">{formik.errors.name}</Alert>
                                ) : null}
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                    variant="outlined"
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <Alert severity="error">{formik.errors.lastName}</Alert>
                                ) : null}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider/>
                    <Box display="flex" justifyContent="flex-end" p={2}>
                        <Button color="primary" variant="contained" type="submit">
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
        </Grid>
    );
}