import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';

import { get, post, put } from '../../services/api';

export function useAppointmentListQuery(date: string) {
  return useQuery({
    queryKey: ['appointments', date],
    queryFn: () =>
      get<Appointment[]>('/appointment?date=' + date)
  });
}

export function useBookAppointmentMutation() {
  return useMutation({
    mutationFn: (data: BookAppointmentInput) =>
      post<MessageResponse>('/appointment/book', data)
  });
}

export function useStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; status: string }) =>
      put<MessageResponse>(
        '/appointment/' + data.id + '/status',
        { status: data.status }
      ),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['appointments']
      })
  });
}