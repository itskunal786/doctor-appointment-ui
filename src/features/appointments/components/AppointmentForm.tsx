import { useForm } from 'react-hook-form';
import { getTimeOptions } from '../form';

interface AppointmentFormProps {
  onSubmit: (data: BookAppointmentInput) => void;
}

export default function AppointmentForm({
  onSubmit
}: AppointmentFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BookAppointmentInput>();

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="patientName">
        Patient Name
      </label>

      <input
        id="patientName"
        type="text"
        {...register('patientName', {
          required: 'Patient name is required'
        })}
      />

      <small>{errors.patientName?.message}</small>


      <label htmlFor="phoneNumber">
        Phone Number
      </label>

      <input
        id="phoneNumber"
        type="text"
        inputMode="numeric"
        maxLength={10}
        {...register('phoneNumber', {
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Enter valid 10 digit number'
          }
        })}
      />

      <small>{errors.phoneNumber?.message}</small>

      <label htmlFor="description">
        Description
      </label>

      <input
        id="description"
        type="text"
        {...register('description', {
          required: 'Description is required'
        })}
      />

      <small>{errors.description?.message}</small>


      <label htmlFor="appointmentDate">
        Appointment Date
      </label>

      <input
        id="appointmentDate"
        type="date"
        min={today}
        {...register('appointmentDate', {
          required: 'Date is required'
        })}
      />

      <small>{errors.appointmentDate?.message}</small>


      <label htmlFor="appointmentTime">
        Appointment Time
      </label>

      <select
        id="appointmentTime"
        {...register('appointmentTime', {
          required: 'Time is required'
        })}
      >
        <option value="">Select Time</option>

        {getTimeOptions().map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}

      </select>

      <small>{errors.appointmentTime?.message}</small>


      <button type="submit">
        Book Appointment
      </button>

    </form>
  );
}