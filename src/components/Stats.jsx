import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Stats()
{
    const { id } = useParams();
    const handleExportPdf = () => {
          fetch(`http://localhost:8080/stats/${id}`)
            .then(response => response.blob())
            .then(blob => {
              // Create a temporary URL for the blob
              const url = window.URL.createObjectURL(blob);
      
              // Create a link element to trigger the download
              const link = document.createElement('a');
              link.href = url;
              link.download = 'exported.pdf';
      
              // Trigger the download by clicking the link element
              link.click();
      
              // Clean up by revoking the URL object
              window.URL.revokeObjectURL(url);
            })
            .catch(error => {
              console.error('Error exporting PDF:', error);
            });
        };
      
        return (
          <button onClick={handleExportPdf}>Export PDF</button>
        );
      
}
export default Stats;