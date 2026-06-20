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

export interface ClinicTreatmentBreakdown {
  clinicId: string;
  clinicName: string;
  treatment: string;
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
  funnel: DoctorFunnel;
}

export interface DoctorFunnel {
  suggestions: number;
  appointments: number;
  appointmentRate: number;
  reminders: number;
  reminderRate: number;
  arrivals: number;
  arrivalRate: number;
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
  funnel: ReceptionistFunnel;
}

export interface ReceptionistFunnel {
  totalAssigned: number;
  reminded: number;
  reminderRate: number;
  responded: number;
  responseRate: number;
  arrived: number;
  arrivalRate: number;
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
  assignee: string;
  assigneeStatus: 'undispatched' | 'dispatched' | 'processing' | 'completed';
}

export interface CustomerService {
  id: string;
  name: string;
  clinicName: string;
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
