import { Link, useNavigate } from 'react-router';

import AppointmentForm from '../components/AppointmentForm';
import { useBookAppointmentMutation } from '../queries';

export default function BookAppointment() {
  const navigate = useNavigate();

  const { mutateAsync: bookAppointment } =
    useBookAppointmentMutation();

  async function handleSubmit(data: BookAppointmentInput) {
  try {
    const res = await bookAppointment(data);

    alert(res.data.message);
    navigate('/');
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : 'Could not book appointment'
    );
  }
}

  return (
    <div className="form-page">
      <h2>Book Appointment</h2>

      <AppointmentForm onSubmit={handleSubmit} />

      <Link to="/">Back to Appointments</Link>
    </div>
  );
}