import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FormikConfig, FormikValues } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { object, mixed, string } from "yup";
import PDF from "./pdf";
import { useDispatch } from "react-redux";
import { addToStore } from "../store/formSlice";

// type Props = {
//   userData: any;
// };

const MainForm: React.FC = () => {
  const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  // console.log(userData);

  return (
    <div>
      <Card>
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

              description: "",
            }}
            onSubmit={async (values) => {
              await sleep(3000);
              console.log(values);
              dispatch(addToStore(values));
              setData(values);
              setShow(true);
            }}
          >
            <FormikStep
              label="Personal info"
              // validationSchema={object().shape({
              //   name: string().required("this feild is required."),
              //   cell: string().required("this feild is required."),
              //   email: string().email().required("this feild is required."),
              //   address: string().required("this feild is required."),
              // })}
            >
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="name"
                  component={TextField}
                  label="Name"
                />
              </Box>
              <Grid container spacing={6}>
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
                  label="Are you employed?"
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
            <FormikStep label="More Info">
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="description"
                  component={TextField}
                  label="Description"
                />
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
        {show && (
          <Grid item>
            <Button>
              <PDF data={data} />
            </Button>
          </Grid>
        )}
      </Card>
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

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
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
        <Form>
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

          {currentChild}
          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  onClick={() => setStep((s) => s - 1)}
                >
                  {" "}
                  Back{" "}
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                color="primary"
                variant="contained"
                type="submit"
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
  );
}

export default MainForm;
