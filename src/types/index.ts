export interface ClinicData {
  id: string;
  name: string;
  appointments: number;
  arrivals: number;
  noShows: number;
  reschedules: number;
  noShowRate: number;
  rescheduleRate: number;
  arrivalRate: number;
}

export interface DoctorData {
  id: string;
  name: string;
  clinicId: string;
  clinicName: string;
  specialty: string;
  suggestions: number;
  appointmentRate: number;
  arrivalRate: number;
  score: number;
}

export interface ReceptionistData {
  id: string;
  name: string;
  clinicId: string;
  clinicName: string;
  reminders: number;
  reminderRate: number;
  responseRate: number;
  score: number;
}

export interface AbnormalPatient {
  id: string;
  name: string;
  phone: string;
  clinicName: string;
  treatmentType: string;
  abnormalType: 'suture_unvisited' | 'ortho_overdue' | 'no_show_repeat';
  abnormalDetail: string;
  lastVisitDate: string;
  daysOverdue: number;
  noShowCount: number;
  status: 'pending' | 'contacted' | 'recovered';
}

export interface TrendData {
  week: string;
  appointments: number;
  arrivals: number;
  noShows: number;
  reschedules: number;
  noShowRate: number;
}

export type TreatmentType = 'all' | 'orthodontics' | 'implant' | 'periodontal' | 'pediatric' | 'general';

export const TREATMENT_TYPES: { value: TreatmentType; label: string }[] = [
  { value: 'all', label: '全部项目' },
  { value: 'orthodontics', label: '正畸' },
  { value: 'implant', label: '种植' },
  { value: 'periodontal', label: '牙周' },
  { value: 'pediatric', label: '儿牙' },
  { value: 'general', label: '综合' },
];
