import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Stats()
{
  const { id } = useParams();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const handleExportPdf = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/stats/${id}`, {
        params: {
          start: start,
          end: end,
        },
        responseType: 'arraybuffer', // Ensure the response is treated as binary data
      });
  
      const blob = new Blob([result.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'exported.pdf';
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error while exporting PDF:', error);
    }
  };
  
      
        return (
      <div>
      <div class="container mt-4" >
        <div class="card">
          <h1>Select the dates for your stats</h1>
            <div class="form-group">
              <label>Select start date</label>
              <input type="date" class="form-control" id="prog" placeholder="Select start date"

                value={start}
                onChange={(event) => {
                  setStart(event.target.value);
                }}
                  />
                  <label>Select end date</label>
                  <input type="date" class="form-control" id="prog" placeholder="Select end date"

                value={end}
                onChange={(event) => {
                  setEnd(event.target.value);
                }}
                />

            </div>
                  <button onClick={handleExportPdf}>Export PDF</button>
        </div>
      </div>
    </div>
        
          
        );
      
}
export default Stats;