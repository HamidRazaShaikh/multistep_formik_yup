import React, { useState } from "react";
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
} from "@material-ui/core";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { object, mixed, number } from "yup";

export default function App() {
  const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

  return (
    <div>
      <Card>
        <CardContent>
          <FormikStepper
            initialValues={{
              firstName: "",
              lastName: "",
              millionaire: false,
              money: 0,
              description: "",
            }}
            onSubmit={async (values) => {
              await sleep(3000);
              console.log("values", values);
            }}
          >
            <FormikStep label="Personal Data">
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="firstName"
                  component={TextField}
                  label="first Name"
                />
              </Box>

              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="lastName"
                  component={TextField}
                  label="last Name"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  name="millionaire"
                  type="checkbox"
                  component={CheckboxWithLabel}
                  label="Are you a millionaire?"
                />
              </Box>
            </FormikStep>
            <FormikStep
              label="Bank Accounts"
              validationSchema={object({
                money: mixed().when("millionaire", {
                  is: true,
                  then: number()
                    .required()
                    .min(
                      1_00_000,
                      "Because you said you are a millionaire you need to have 1 million"
                    ),
                  otherwise: number().required(),
                }),
              })}
            >
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="money"
                  type="number"
                  component={TextField}
                  label="All the money I have"
                />
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
      </Card>
    </div>
  );
}

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
  console.log("currentChild", currentChild);

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
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
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
};



