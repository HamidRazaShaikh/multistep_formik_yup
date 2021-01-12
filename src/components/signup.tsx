import React from "react";
import Background from "./../dddd.jpg";

import {
  TextField,
  Grid,
  Container,
  Button,
  Typography,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  container: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#25h145",
    borderRadius: 25,
    padding: 25,
    marginTop: theme.spacing(12),
    backgroundColor: theme.palette.common.white,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },

  form: {
    with: "100%",
    marginTop: theme.spacing(3),
  },
}));

type Props = {
  setIsSignup: Function;
  setUser: Function;
};

const SignUp: React.FC<Props> = ({ setIsSignup, setUser }) => {
  const classes = useStyles();

  let signUpSchema = yup.object().shape({
    firstName: yup.string().required("this feild is required."),
    lastName: yup.string().required("this feild is required."),
    email: yup.string().email().required("this feild is required."),
    password: yup
      .string()
      .min(6, "password is too short.")
      .max(20, "password is too long.")
      .required("this field is required."),
      
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      
    >
      <CssBaseline />
      <div className={classes.container}>
        <div className={classes.paper}>
          <Typography variant="h5"> Sign Up</Typography>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            setIsSignup(true);
            const { firstName, lastName, email } = values;
            setUser({ firstName, lastName, email });
            console.log(values);
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    error={errors.firstName && touched.firstName}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    id="firstName"
                    label="first name"
                    autoFocus
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    error={errors.lastName && touched.lastName}
                    autoComplete="lname"
                    name="lastName"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    id="lastName"
                    label="last name"
                    helperText={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    error={errors.email && touched.email}
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    id="email"
                    label="email address"
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    error={errors.password && touched.password}
                    autoComplete="current password"
                    name="password"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    id="password"
                    label="password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                style={{ margin: "10px 0 5px" }}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default SignUp;
