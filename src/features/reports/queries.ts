import { get } from '../../services/api';

export function getReport(
  fromDate: string,
  toDate: string
) {
  return get<ReportResponse>(
    '/report?fromDate=' +
    fromDate +
    '&toDate=' +
    toDate
  );
}