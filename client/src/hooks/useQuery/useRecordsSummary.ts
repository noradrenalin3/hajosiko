import { DaysRecords, MonthsRecords } from '@shared/types';
import { useQuery } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import queryKeys from '~/constants/queryKeys';
import useAuth from '~/hooks/useAuth';
import { baseURL, request } from '~/hooks/useQuery/request';

async function getMonths(
	user: User,
	vehicleId: number,
	year: number,
): Promise<MonthsRecords[]> {
	const params = new URLSearchParams({
		vehicle: vehicleId.toString(),
		year: year.toString(),
	}).toString();
	return await request<MonthsRecords[]>(
		`${baseURL}/records/summary?${params}`,
		{ method: 'GET' },
		user,
	);
}
async function getDays(
	user: User,
	vehicleId: number,
	year: number,
	month: number,
): Promise<DaysRecords[]> {
	const params = new URLSearchParams({
		vehicle: vehicleId.toString(),
		year: year.toString(),
		month: month.toString(),
	}).toString();
	return await request<DaysRecords[]>(
		`${baseURL}/records/summary?${params}`,
		{ method: 'GET' },
		user,
	);
}

export const useYearSummary = (vehicleId: number, year: number) => {
	const { currentUser } = useAuth();

	const query = useQuery({
		staleTime: 60000,
		queryKey: [queryKeys.records_summary, `${year}`, vehicleId],
		enabled: currentUser !== null,
		queryFn: async () => {
			if (!currentUser) return;
			return getMonths(currentUser, vehicleId, year);
		},
	});

	return query;
};
export const useMonthSummary = (
	vehicleId: number,
	year: number,
	month: number,
) => {
	const { currentUser } = useAuth();

	const query = useQuery({
		staleTime: 60000,
		queryKey: [queryKeys.records_summary, `${year}-${month}`, vehicleId],
		enabled: currentUser !== null && month !== undefined,
		queryFn: async () => {
			if (!currentUser || !month) return;
			return getDays(currentUser, vehicleId, year, month);
		},
	});

	return query;
};
