import React, { useState } from "react";
import { Formik, Form, Field, FormikConfig, FormikValues } from "formik";
import {
  Box,
  Button,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Grid,
  CircularProgress,
  Typography,
  createStyles,
  makeStyles,
  Hidden,
  MobileStepper,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import MenuAppBar from "./nav";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { object, mixed, string } from "yup";
import PDF from "./pdf";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#546E7A",
    },
  },
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

type Props = {
  userData: any;
};

const MainForm: React.FC<Props> = ({ userData }) => {
  const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const classes = useStyles();

  console.log(userData);
  console.log(data);


  return (
    <div className={classes.root}>
      <MenuAppBar />

      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={6} lg={6}>
          <CardContent>
            <CardContent>
              <FormikStepper
                initialValues={{
                  name: "",
                  cell: "",
                  email: "",
                  address: "",
                  employed: false,
                  employerName: "",
                  employerAddress: "",
                  school: "",
                  statusSchool: "",
                  sessionSchool: "",

                  college: "",
                  statusCollege: "",
                  sessionCollege: "",

                  university: "",
                  statusUni: "",
                  sessionUni: "",

                  objective: "",
                  computerSkills: "",
                  languages: "",
                }}
                onSubmit={async (values) => {
                  await sleep(3000);
                  setData(values);
                  setShow(true);
                }}
              >
                <FormikStep
                  label="Personal info"
                  validationSchema={object().shape({
                    name: string().required("this feild is required."),
                    cell: string().required("this feild is required."),
                    email: string().email().required("this feild is required."),
                    address: string().required("this feild is required."),
                  })}
                >
                  <Box paddingBottom={2}>
                    <Field
                      fullWidth
                      name="name"
                      component={TextField}
                      label="Name"
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Box paddingBottom={2}>
                        <Field
                          fullWidth
                          name="cell"
                          component={TextField}
                          label="Cell No"
                        />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box paddingBottom={2}>
                        <Field
                          fullWidth
                          name="email"
                          component={TextField}
                          label="Email address"
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Box paddingBottom={2}>
                    <Field
                      fullWidth
                      name="address"
                      component={TextField}
                      label="Address"
                    />
                  </Box>
                  <Box paddingBottom={2}>
                 
                    <Field
                      name="employed"
                      type="checkbox"
                      component={CheckboxWithLabel}
                      Label={{ label: "Are you employed?" }}
                    />
                  </Box>
                </FormikStep>
                <FormikStep
                  label="employer details"
                  validationSchema={object().shape({
                    employerName: mixed().when("employed", {
                      is: true,
                      then: string().required("this field is required"),
                      otherwise: string(),
                    }),

                    employerAddress: mixed().when("employed", {
                      is: true,
                      then: string().required("this field is required"),
                      otherwise: string(),
                    }),
                  })}
                >
                  <Box paddingBottom={2}>
                    <Field
                      fullWidth
                      name="employerName"
                      component={TextField}
                      label="Employer Name"
                    />
                  </Box>
                  <Box paddingBottom={2}>
                    <Field
                      fullWidth
                      name="employerAddress"
                      component={TextField}
                      label="Employer Address"
                    />
                  </Box>
                </FormikStep>
                <FormikStep label="education">
                  <Box paddingBottom={2}>
                    <Typography>Matriculation</Typography>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Field
                          fullWidth
                          name="school"
                          component={TextField}
                          label="School Name"
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          fullWidth
                          name="statusSchool"
                          component={TextField}
                          label="status"
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          fullWidth
                          name="sessionSchool"
                          component={TextField}
                          label="session"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box paddingBottom={2}>
                    <Typography>Bachelor's</Typography>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Field
                          fullWidth
                          name="college"
                          component={TextField}
                          label="college Name"
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          fullWidth
                          name="statusCollege"
                          component={TextField}
                          label="status"
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          fullWidth
                          name="sessionCollege"
                          component={TextField}
                          label="session"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box paddingBottom={2}>
                    <Typography>Masters</Typography>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Field
                          fullWidth
                          name="university"
                          component={TextField}
                          label="university Name"
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          fullWidth
                          name="statusUni"
                          component={TextField}
                          label="status"
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          fullWidth
                          name="sessionUni"
                          component={TextField}
                          label="session"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </FormikStep>
                <FormikStep
                  label="More Info"
                  validationSchema={object().shape({
                    objective: string().required("this feild is required."),
                    languages: string().required("this feild is required."),
                  })}
                >
                  <Box paddingBottom={2}>
                    <Typography>Objective</Typography>
                    <Field
                      fullWidth
                      multiline
                      rows={4}
                      name="objective"
                      component={TextField}
                      label="Describe your objective in not less than 20 words."
                    />
                  </Box>
                  <Box paddingBottom={2}>
                    <Typography>Computer skills</Typography>
                    <Field
                      fullWidth
                      name="computerSkills"
                      component={TextField}
                      label="computer skills separated by ','"
                    />
                  </Box>
                  <Box paddingBottom={2}>
                    <Typography>Languages</Typography>
                    <Field
                      fullWidth
                      name="languages"
                      component={TextField}
                      label="names separated by ','"
                    />
                  </Box>
                </FormikStep>
              </FormikStepper>
            </CardContent>
            {show && (
              <Grid item xs={12}>
                <Button>
                  <PDF data={data} />
                </Button>
              </Grid>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const currentChild = childrenArray[step];
  const [data, setData] = useState({});
  console.log(data);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12}>
        <Formik
          {...props}
          validationSchema={currentChild.props.validationSchema}
          onSubmit={async (values, helpers) => {
            if (isLastStep()) {
              await props.onSubmit(values, helpers);
              setCompleted(true);
              setData(values);
            } else {
              setStep((s) => s + 1);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <Hidden xsDown>
                <ThemeProvider theme={theme}>
                  <Stepper alternativeLabel activeStep={step}>
                    {childrenArray.map((child, index) => (
                      <Step
                        key={child.props.label}
                        completed={step > index || completed}
                      >
                        <StepLabel>{child.props.label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </ThemeProvider>
              </Hidden>
              <Hidden smUp>
                <ThemeProvider theme={theme}>
                  <MobileStepper
                    steps={4}
                    position="top"
                    variant="dots"
                    style={{ marginTop: 50 }}
                    activeStep={step}
                    nextButton={<Button size="small" disabled></Button>}
                    backButton={<Button size="small" disabled></Button>}
                  />
                </ThemeProvider>
              </Hidden>
              <ThemeProvider theme={theme}>
              {currentChild}

              </ThemeProvider>

             
              <Grid container spacing={3}>
                {step > 0 ? (
                  <Grid item xs={4}>
                    <Button
                      disabled={isSubmitting}
                      color="primary"
                      variant="contained"
                      style={{ backgroundColor: "#78909C" }}
                      onClick={() => setStep((s) => s - 1)}
                    >
                      {" "}
                      Back{" "}
                    </Button>
                  </Grid>
                ) : null}
                <Grid item xs={4}>
                  <Button
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={isSubmitting}
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#78909C" }}
                  >
                    {isSubmitting
                      ? "Submitting"
                      : isLastStep()
                      ? "Submit"
                      : " Next"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default MainForm;
