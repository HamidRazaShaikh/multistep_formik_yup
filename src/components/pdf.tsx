import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";


// Create styles

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container1: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    alignItems: "stretch",
  },
  container2: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingTop: 15,
  },

  container3: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
  },

  detailColumn: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
  },
  linkColumn: {
    flexDirection: "column",
    flexGrow: 2,
    alignSelf: "flex-end",
  },
  name: {
    fontSize: 20,
    textTransform: "uppercase",
    flexDirection: "column",
    flexGrow: 9,
    paddingTop: 5,
  },
  subtitle: {
    fontSize: 10,
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "capitalize",
    paddingTop: 5,
  },
  email: {
    fontSize: 10,
    fontStyle: "italic",
    color: "blue",
    textTransform: "lowercase",
    paddingTop: 5,

    textDecoration: "none",
    flexDirection: "column",
    flexGrow: 9,
  },
  address: {
    fontSize: 10,
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "capitalize",
    paddingTop: 5,
    marginBottom: 20,
  },
  image: {
    fontSize: 10,
    color: "black",
    textDecoration: "none",
    alignSelf: "flex-end",
  },

  educationContainer: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
    borderRightWidth: 1,
    borderRightColor: "#112131",
    borderRightStyle: "solid",
    paddingRight: 2,
    marginRight: 5,
    paddingBottom: 5,
  },

  educationContainer2: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
    paddingRight: 2,
    marginRight: 5,
    paddingBottom: 5,
  },

  headings: {
    fontSize: 12,
    paddingTop: 8,
    textTransform: "capitalize",
    borderBottomWidth: 1,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
  },
  textObjective: {
    paddingTop: 5,
    fontSize: 11,
    lineHeight: 1.6,
    textDecoration: "none",
    textTransform: "capitalize",
    textAlign: "justify",
  },

  text: {
    paddingTop: 5,
    fontSize: 11,
    lineHeight: 1.6,
    textDecoration: "none",
    textTransform: "capitalize",
  },

  bold: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

// Create Document Component

function MyDocument(props: any) {
  let mydata = props.data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ******************* Header ************************* */}
        <View style={styles.container1}>
          <View style={styles.detailColumn}>
            <Text style={styles.name}>{mydata.name}</Text>
            <Text style={styles.email}>email : {mydata.email}</Text>
            <Text style={styles.subtitle}>Cell : {mydata.cell}</Text>
            <Text style={styles.subtitle}>Address : {mydata.address}</Text>
          </View>
        </View>

        {/* ******************* objective ************************* */}

        <View style={styles.container2}>
          <View style={styles.detailColumn}>
            <Text style={styles.headings}>Objective</Text>
            <Text style={styles.text}>{mydata.objective}</Text>
          </View>
        </View>

        {/* ******************* education************************* */}

        <View style={styles.container2}>
          <View style={styles.detailColumn}>
            <Text style={styles.headings}>Education</Text>
          </View>
        </View>

        <View style={styles.container3}>
          <View style={styles.educationContainer}>
            <Text style={styles.subtitle}>
              {" "}
              Exam : <Text style={styles.bold}>Matriculation</Text>
            </Text>
            <Text style={styles.bold}></Text>
            <Text style={styles.subtitle}>
              Session : <Text style={styles.bold}>{mydata.sessionSchool}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Institute : <Text style={styles.bold}>{mydata.school}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Status : <Text style={styles.bold}>{mydata.statusSchool}</Text>
            </Text>
          </View>

          <View style={styles.educationContainer}>
            <Text style={styles.subtitle}>
              {" "}
              Exam : <Text style={styles.bold}>Bachelors</Text>
            </Text>
            <Text style={styles.subtitle}>
              Session : <Text style={styles.bold}>{mydata.sessionCollege}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Institute : <Text style={styles.bold}>{mydata.college}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Status : <Text style={styles.bold}>{mydata.statusCollege}</Text>
            </Text>
          </View>

          <View style={styles.educationContainer2}>
            <Text style={styles.subtitle}>
              {" "}
              Exam : <Text style={styles.bold}>Masters</Text>
            </Text>
            <Text style={styles.subtitle}>
              Session : <Text style={styles.bold}>{mydata.sessionUni}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Institute : <Text style={styles.bold}>{mydata.university}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Status : <Text style={styles.bold}>{mydata.statusUni}</Text>
            </Text>
          </View>
        </View>

        {/* ******************* computer skills************************* */}

        <View style={styles.container2}>
          <View style={styles.detailColumn}>
            <Text style={styles.headings}>Computer Skills</Text>
            <Text style={styles.text}>{mydata.computerSkills}</Text>
          </View>
        </View>

        {/* ******************* languages************************* */}

        <View style={styles.container2}>
          <View style={styles.detailColumn}>
            <Text style={styles.headings}>Languages</Text>
            <Text style={styles.text}>{mydata.languages}</Text>
          </View>
        </View>

        {/* ******************* languages************************* */}

        {mydata.employed && (
          <View style={styles.container2}>
            <View style={styles.detailColumn}>
              <Text style={styles.headings}>Employer data</Text>
              <Text style={styles.subtitle}>
                Name : <Text style={styles.bold}>{mydata.employerName}</Text>
              </Text>

              <Text style={styles.subtitle}>
                Address :{" "}
                <Text style={styles.bold}>{mydata.employerAddress}</Text>
              </Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}

function PDF(props: any) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    setOpen(true);
    return () => setOpen(false);
  },[]);

  let data = props.data;

  return (
    <>
      {open && (
        // <div>
        //   <Button variant="outlined" color="primary">
        //     <span>
        <PDFDownloadLink
          document={<MyDocument data={data} />}
          fileName="mydocument.pdf"
          style={{
            textDecoration: "none",
            borderColor: "#2196F3",
            borderRadius : '5px',
            color: "dodgerblue",
            border: "2px solid #2196F3",
            backgroundColor: "white",
            padding: "5px 10px",
            fontSize: "16px",
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF"
          }
        </PDFDownloadLink>

        //     </span>
        //   </Button>
        // </div>
      )}
    </>
  );
}
export default PDF;
