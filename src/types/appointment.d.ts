interface Appointment {
  appointmentId: number;
  patientName: string;
  phoneNumber: number;
  description: string;
  appointmentDateTime: string;
  status: string;
}

interface BookAppointmentInput {
  patientName: string;
  phoneNumber: number;
  description: string;
  appointmentDate: string;
  appointmentTime: string;
}