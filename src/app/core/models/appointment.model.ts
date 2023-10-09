import { PatientInfo } from "./patient.model"

export type AppointmentFlag = 'active' | 'cancelled' | 'short_call' | 'no_show' | 'recall' | 'pending';
export type AppointmentStatus = 'arrived' | 'ready' | 'in_progress' | 'checkout' | 'ready_to_review' | 'chart_reviewed';
export type AppointmentView = 'resourceTimeGridDay' | 'dayGridWeek' | 'dayGridMonth' | 'listWeek';
export type ConfirmType = 'text' | 'call' | 'email';

export const APPOINTMENT_FLAGS = [
  'active',
  'cancelled',
  'short_call',
  'no_show',
  'recall',
  'pending'
]

export const APPOINTMENT_STATUS = [
  'arrived',
  'ready',
  'in_progress',
  'checkout',
  'ready_to_review',
  'chart_reviewed'
]

export const CONFIRM_TYPES = [
  {label: 'Text', value: 'text' },
  {label: 'Call', value: 'call' },
  {label: 'Email', value: 'email' }
]

export interface Appointment {
  id: number
  userId: number
  practiceId: number
  patientId: number
  patient?: PatientInfo;
  providerId: number
  startDateTime: string
  endDateTime: string
  priority: number
  flag: AppointmentFlag
  status: AppointmentStatus
  description: string
  phone1: string
  phone2: string
  email: string
  notes: string
  posted: number
  appointmentTypeId: number
  createdAt: string
  updatedAt: string
}

export interface CreateAppointmentDto {
  practiceId: number
  providerId: number
  patientId: number
  startDateTime: string
  endDateTime: string
  priority: number
  flag: number
  status: number
  description: string
  phone1: string
  phone2: string
  email: string
  notes: string
  posted: number
  appointmentTypeId: number
}
