import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import ResumePDF from '../../Assets/Images/Resume.pdf';

class Resume extends Component {
  render() {
    return (
    <div>
        <div style={{height: "20px"}}> </div>
            <div className="container-fluid" style={{width: "700px", margin: "auto", border: "3px solid black"}}>
            <Document file = {ResumePDF}>
                <Page pageNumber={1} />
            </Document>
        </div>
    </div>
    );
  }
}

export default Resume;
