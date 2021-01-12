import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";

// Create styles
const newstyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component

function MyDocument(props: any) {
  let mydata = props.data;

  return (
    <Document>
      <Page size="A4" style={newstyles.page}>
        <View style={newstyles.section}>
          <Text>{mydata.name}</Text>
        </View>
        <View style={newstyles.section}>
          <Text>{mydata.cell}</Text>
        </View>
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
  });

  let data = props.data;

  return (
    <>
      {open && (
        <PDFDownloadLink
          document={<MyDocument data={data} />}
          fileName="mydocument.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a"
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF"
          }
        </PDFDownloadLink>
      )}
    </>
  );
}
export default PDF;
