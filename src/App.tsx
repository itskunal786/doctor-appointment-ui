import {BrowserRouter,Routes, Route} from 'react-router';
import {AppointmentList, BookAppointment} from './features/appointments';
import {Report} from './features/reports';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppointmentList />}/>
        <Route path="/book"  element={<BookAppointment />}/>
        <Route path="/reports" element={<Report />}/>
      </Routes>
    </BrowserRouter>
  );
}