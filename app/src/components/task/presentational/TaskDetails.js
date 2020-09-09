import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import Alert from "@material-ui/lab/Alert/Alert";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

const categories = ['short', 'medium', 'long', 'customized'];

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    alert: {
        margin: theme.spacing(1),
    }
}));

export default function TaskDetails(props) {
    const classes = useStyles();
    const history = useHistory();
    const {fetchHook: [loading, task, modify, data, invalidSubmit], isUpdate} = props;

    const validate = values => {
        const errors = {};

        if (!isUpdate && !values.tittle) {
            errors.tittle = 'Required';
        } else if (values.tittle.length > 40) {
            errors.tittle = 'Must be 40 characters or less';
        }

        if (!isUpdate && !values.description) {
            errors.description = 'Required';
        } else if (values.description.length > 255) {
            errors.description = 'Must be 255 characters or less';
        }
        if (values.classification === 'customized' && (values.minutes + values.seconds === 0 || values.minutes * 60 + values.seconds > 7200)) {
            errors.minutes = 'The total duration cannot be 0 or greater than 2 hours';
        }
        if (values.classification === 'customized' && values.seconds > 60) {
            errors.seconds = 'Seconds cannot be greater than 60';
        }
        if (!isUpdate && !values.classification) {
            errors.classification = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            tittle: "",
            description: "",
            minutes: 0,
            seconds: 0,
            classification: 'customized',
        },
        validate,
        onSubmit: async values => modify({
            tittle: values.tittle,
            description: values.description,
            duration: values.minutes * 60 + values.seconds,
            classification: values.classification
        }),
    });

    const changeClassification = (event) => {
        switch (event.target.value) {
            case 'short':
                formik.setFieldValue("minutes", 30);
                formik.setFieldValue("seconds", 0);
                break;
            case 'medium':
                formik.setFieldValue("minutes", 45);
                formik.setFieldValue("seconds", 0);
                break;
            case 'long':
                formik.setFieldValue("minutes", 60);
                formik.setFieldValue("seconds", 0);
                break;
            default:
                formik.setFieldValue("minutes", 0);
                formik.setFieldValue("seconds", 0);
                break;
        }
        formik.handleChange(event);
    };

    const updateField = (task) => {

        formik.setFieldValue("tittle", task.tittle);
        formik.setFieldValue("description", task.description);
        formik.setFieldValue("minutes", Math.floor(task.duration/60));
        formik.setFieldValue("seconds", task.duration % 60);
        formik.setFieldValue("classification", task.classification);
        // setFlagData(true);
    };

    useEffect(() => {
        task && updateField(task);
    }, [task]);

    // (data) && history.push(`/ad/${data.classification}/${data._id}`);


    return (
        <Grid item xs={12}>
            {loading &&
            <>
                <LinearProgress/>
                <br/>
            </>
            }
            {invalidSubmit &&
            <Alert severity="error">Something has gone wrong try again</Alert>
            }
            <form
                onSubmit={formik.handleSubmit}
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title={`${(isUpdate) ? "Update" : "Create"} Task`}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tittle"
                                    name="tittle"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tittle}
                                    required
                                    variant="outlined"
                                />
                                {formik.touched.tittle && formik.errors.tittle ? (
                                    <Alert className={classes.alert} severity="error">{formik.errors.tittle}</Alert>
                                ) : null}
                            </Grid>
                            <Grid item lg={4} md={4} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Duration Minutes"
                                    name="minutes"
                                    type="number"
                                    disabled={(formik.values.classification === 'customized') ? false : true}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.minutes}
                                    variant="outlined"
                                />
                                {formik.touched.minutes && formik.errors.minutes ? (
                                    <Alert className={classes.alert} severity="error">{formik.errors.minutes}</Alert>
                                ) : null}
                            </Grid>
                            <Grid item lg={4} md={4} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Duration Seconds"
                                    name="seconds"
                                    type="number"
                                    disabled={(formik.values.classification === 'customized') ? false : true}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.seconds}
                                    variant="outlined"
                                />
                                {formik.touched.seconds && formik.errors.seconds ? (
                                    <Alert className={classes.alert} severity="error">{formik.errors.seconds}</Alert>
                                ) : null}
                            </Grid>
                            <Grid item lg={4} md={4} xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="select-outlined">Category</InputLabel>

                                    <Select
                                        labelId="select-outlined"
                                        name="classification"
                                        required
                                        onChange={changeClassification}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.classification}
                                        label="Category"
                                    >
                                        {categories.map(e =>
                                            <MenuItem key={e}
                                                      value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                {formik.touched.classification && formik.errors.classification ? (
                                    <Alert className={classes.alert}
                                           severity="error">{formik.errors.classification}</Alert>
                                ) : null}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                    multiline
                                    variant="outlined"
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <Alert className={classes.alert}
                                           severity="error">{formik.errors.description}</Alert>
                                ) : null}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider/>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        p={2}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
        </Grid>
    );
}