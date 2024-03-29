import React from "react";

import {
  TextField,
  Grid,
  Container,
  Button,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import MenuAppBar from "./nav";

import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme: any) => ({
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

interface State {
  showPassword: boolean;
}

const SignUp: React.FC<Props> = ({ setIsSignup, setUser }) => {
  const classes = useStyles();
  const [show, setShow] = React.useState<State>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setShow({ ...show, showPassword: !show.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
    <div>
      <MenuAppBar />

      <Container component="main" maxWidth="xs">
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
            }}
          >
            {({ errors, handleChange, touched }) => (
              <Form className={classes.form} autoComplete="off">
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
                      type={show.showPassword ? "text" : "password"}
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : null
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {show.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                  style={{ margin: "10px 0 5px", backgroundColor: "#78909C" }}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
