import { apiClient } from './client';
import type { SystemStatus } from '../../types/api/system.dto';

export const getSystemStatus = async (): Promise<SystemStatus> => {
    const { data } = await apiClient.get<SystemStatus>('/');
    return data;
};
