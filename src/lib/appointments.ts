import { postWithAuth } from './http';

export type CreateAppointmentPayload = {
    name: string;
    lineID: string;
    email: string;
    symtom: string;
    phoneNumber: string;
    moreInfo: string;
    time: string;
};

export const createAppointment = (data: CreateAppointmentPayload) =>
    postWithAuth('appointments', { data }, 'ไม่สามารถบันทึกการนัดหมายได้');
