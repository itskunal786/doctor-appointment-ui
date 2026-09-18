import { useState } from 'react';
import { Link } from 'react-router';
import { getReport } from '../queries';

export default function Report() {

  const today = new Date().toISOString().split('T')[0];

  const [type, setType] = useState('single');
  const [date, setDate] = useState(today);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const [report, setReport] =
    useState<ReportResponse | null>(null);

  async function generateReport() {

    let from = date;
    let to = date;

    if (type === 'range') {
      from = fromDate;
      to = toDate;
    }

    try {
      const res = await getReport(from, to);
      setReport(res.data);
    } catch {
      alert('Report could not be generated');
    }
  }

  return (
    <div className="page">

      <h2>Appointment Report</h2>

      <label htmlFor="reportType">
        Report Type
      </label>

      <select
        id="reportType"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setReport(null);
        }}
      >
        <option value="single">
          Single Date
        </option>

        <option value="range">
          Date Range
        </option>
      </select>

      {type === 'single' && (
        <div>

          <label htmlFor="reportDate">
            Date
          </label>

          <input
            id="reportDate"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setReport(null);
            }}
          />

        </div>
      )}

      {type === 'range' && (
        <div>

          <label htmlFor="fromDate">
            From Date
          </label>

          <input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setReport(null);
            }}
          />

          <label htmlFor="toDate">
            To Date
          </label>

          <input
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setReport(null);
            }}
          />

        </div>
      )}

      <br />

      <button
        type="button"
        onClick={generateReport}
      >
        Generate Report
      </button>

      {report && (
        <div>

          <p> Appeared Patients: {report.appeared} </p>
          <p>   No Show Patients: {report.noShow} </p>
          
          </div>
      )}

      <br /><br />

      <Link to="/">
        Back to Appointments
      </Link>

    </div>
  );
}