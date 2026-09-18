import { useState } from 'react';
import { Link } from 'react-router';
import {useAppointmentListQuery,useStatusMutation} from '../queries';

export default function AppointmentList() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const { data } = useAppointmentListQuery(date);
  const { mutate: updateStatus } = useStatusMutation();
  const appointments = data?.data ?? [];

  return (
    <div className="page">
      <h2>Appointments</h2>

      <Link to="/book">Book Appointment</Link>
      {' | '}
      <Link to="/reports">Reports</Link>

      <br /><br />

      <label htmlFor="appointmentDate">
        Select Date
      </label>

      <input
        id="appointmentDate"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Description</th>
            <th>Time</th>
            <th>Appeared</th>
            <th>No-Show</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(item => (
            <tr key={item.appointmentId}>
              <td>{item.patientName}</td>

              <td>{item.description}</td>

              <td>
                {new Date(
                  item.appointmentDateTime
                ).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={item.status === 'Appeared'}
                  onChange={() =>
                    updateStatus({
                      id: item.appointmentId,
                      status: 'Appeared'
                    })
                  }
                />
              </td>

              <td>
                <button
                  onClick={() =>
                    updateStatus({
                      id: item.appointmentId,
                      status: 'NoShow'
                    })
                  }
                >
                  No-Show
                </button>
              </td>
            </tr>
          ))}

          {appointments.length === 0 && (
            <tr>
              <td colSpan={5}>
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}