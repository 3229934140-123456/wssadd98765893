export interface ClinicWeeklyTrend {
  clinicId: string;
  clinicName: string;
  treatment: string;
  week: string;
  weekLabel: string;
  appointments: number;
  arrivals: number;
  noShows: number;
  reschedules: number;
  noShowRate: number;
  rescheduleRate: number;
  arrivalRate: number;
}

export interface DropoffPatient {
  id: string;
  name: string;
  phone: string;
  clinicName: string;
  treatmentType: string;
  lastAppointmentDate: string;
  suggestionDate: string;
  dropoffStage: string;
  suggestedAction: string;
  doctorId?: string;
  receptionistId?: string;
}

export type DoctorFunnelStage = 'suggestion_to_appointment' | 'appointment_to_reminder' | 'reminder_to_arrival';
export type ReceptionistFunnelStage = 'assigned_to_reminded' | 'reminded_to_responded' | 'responded_to_arrived';

export const DOCTOR_FUNNEL_STAGES: { value: DoctorFunnelStage; label: string; from: string; to: string }[] = [
  { value: 'suggestion_to_appointment', label: '医嘱→预约', from: '医嘱开出', to: '完成预约' },
  { value: 'appointment_to_reminder', label: '预约→提醒', from: '完成预约', to: '前台提醒' },
  { value: 'reminder_to_arrival', label: '提醒→到诊', from: '前台提醒', to: '实际到诊' },
];

export const RECEPTIONIST_FUNNEL_STAGES: { value: ReceptionistFunnelStage; label: string; from: string; to: string }[] = [
  { value: 'assigned_to_reminded', label: '分配→提醒', from: '分配名单', to: '完成提醒' },
  { value: 'reminded_to_responded', label: '提醒→响应', from: '完成提醒', to: '患者响应' },
  { value: 'responded_to_arrived', label: '响应→到诊', from: '患者响应', to: '实际到诊' },
];

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

export interface FollowUpRecord {
  id: string;
  patientId: string;
  fromStatus: 'undispatched' | 'dispatched' | 'processing' | 'completed';
  toStatus: 'undispatched' | 'dispatched' | 'processing' | 'completed';
  operator: string;
  timestamp: string;
  note?: string;
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
  dispatchedAt?: string;
  source?: {
    type: 'doctor' | 'receptionist';
    personName: string;
    stage: string;
    stageLabel: string;
  };
  followUpRecords: FollowUpRecord[];
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
