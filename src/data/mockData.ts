import type { ClinicData, DoctorData, ReceptionistData, AbnormalPatient, TrendData, TreatmentType, CustomerService, ClinicTreatmentBreakdown, ClinicWeeklyTrend, DropoffPatient } from '@/types';

const validateBreakdown = (breakdown: ClinicTreatmentBreakdown): ClinicTreatmentBreakdown => {
  const total = breakdown.arrivals + breakdown.noShows + breakdown.reschedules;
  if (total !== breakdown.appointments) {
    const diff = breakdown.appointments - total;
    breakdown.arrivals = Math.max(0, breakdown.arrivals + diff);
  }
  breakdown.noShowRate = +((breakdown.noShows / breakdown.appointments) * 100).toFixed(1);
  breakdown.rescheduleRate = +((breakdown.reschedules / breakdown.appointments) * 100).toFixed(1);
  breakdown.arrivalRate = +((breakdown.arrivals / breakdown.appointments) * 100).toFixed(1);
  return breakdown;
};

const calculateRates = (c: ClinicData): ClinicData => {
  return {
    ...c,
    noShowRate: +((c.noShows / c.appointments) * 100).toFixed(1),
    rescheduleRate: +((c.reschedules / c.appointments) * 100).toFixed(1),
    arrivalRate: +((c.arrivals / c.appointments) * 100).toFixed(1),
  };
};

export const clinics: ClinicData[] = [
  calculateRates({ id: '1', name: '北京朝阳店', appointments: 186, arrivals: 158, noShows: 18, reschedules: 10, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  calculateRates({ id: '2', name: '北京海淀店', appointments: 203, arrivals: 175, noShows: 20, reschedules: 8, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  calculateRates({ id: '3', name: '上海浦东店', appointments: 245, arrivals: 218, noShows: 15, reschedules: 12, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  calculateRates({ id: '4', name: '上海徐汇店', appointments: 178, arrivals: 149, noShows: 21, reschedules: 8, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  calculateRates({ id: '5', name: '广州天河店', appointments: 192, arrivals: 165, noShows: 17, reschedules: 10, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  calculateRates({ id: '6', name: '深圳南山店', appointments: 215, arrivals: 189, noShows: 16, reschedules: 10, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  calculateRates({ id: '7', name: '杭州西湖店', appointments: 156, arrivals: 134, noShows: 14, reschedules: 8, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  calculateRates({ id: '8', name: '成都锦江店', appointments: 168, arrivals: 142, noShows: 19, reschedules: 7, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
];

export const clinicTreatmentBreakdown: ClinicTreatmentBreakdown[] = [
  validateBreakdown({ clinicId: '1', clinicName: '北京朝阳店', treatment: '正畸', appointments: 68, arrivals: 55, noShows: 8, reschedules: 5, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '1', clinicName: '北京朝阳店', treatment: '种植', appointments: 42, arrivals: 36, noShows: 3, reschedules: 3, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '1', clinicName: '北京朝阳店', treatment: '牙周', appointments: 35, arrivals: 31, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '1', clinicName: '北京朝阳店', treatment: '儿牙', appointments: 28, arrivals: 22, noShows: 3, reschedules: 3, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '1', clinicName: '北京朝阳店', treatment: '综合', appointments: 13, arrivals: 14, noShows: 1, reschedules: 0, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '2', clinicName: '北京海淀店', treatment: '正畸', appointments: 75, arrivals: 63, noShows: 8, reschedules: 4, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '2', clinicName: '北京海淀店', treatment: '种植', appointments: 48, arrivals: 42, noShows: 4, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '2', clinicName: '北京海淀店', treatment: '牙周', appointments: 38, arrivals: 34, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '2', clinicName: '北京海淀店', treatment: '儿牙', appointments: 24, arrivals: 20, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '2', clinicName: '北京海淀店', treatment: '综合', appointments: 18, arrivals: 16, noShows: 2, reschedules: 0, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '3', clinicName: '上海浦东店', treatment: '正畸', appointments: 88, arrivals: 80, noShows: 4, reschedules: 4, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '3', clinicName: '上海浦东店', treatment: '种植', appointments: 62, arrivals: 56, noShows: 3, reschedules: 3, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '3', clinicName: '上海浦东店', treatment: '牙周', appointments: 42, arrivals: 38, noShows: 2, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '3', clinicName: '上海浦东店', treatment: '儿牙', appointments: 30, arrivals: 26, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '3', clinicName: '上海浦东店', treatment: '综合', appointments: 23, arrivals: 18, noShows: 3, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '4', clinicName: '上海徐汇店', treatment: '正畸', appointments: 62, arrivals: 48, noShows: 9, reschedules: 5, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '4', clinicName: '上海徐汇店', treatment: '种植', appointments: 40, arrivals: 35, noShows: 3, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '4', clinicName: '上海徐汇店', treatment: '牙周', appointments: 35, arrivals: 30, noShows: 3, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '4', clinicName: '上海徐汇店', treatment: '儿牙', appointments: 22, arrivals: 18, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '4', clinicName: '上海徐汇店', treatment: '综合', appointments: 19, arrivals: 18, noShows: 1, reschedules: 0, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '5', clinicName: '广州天河店', treatment: '正畸', appointments: 68, arrivals: 57, noShows: 7, reschedules: 4, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '5', clinicName: '广州天河店', treatment: '种植', appointments: 45, arrivals: 40, noShows: 3, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '5', clinicName: '广州天河店', treatment: '牙周', appointments: 38, arrivals: 34, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '5', clinicName: '广州天河店', treatment: '儿牙', appointments: 24, arrivals: 20, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '5', clinicName: '广州天河店', treatment: '综合', appointments: 17, arrivals: 14, noShows: 1, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '6', clinicName: '深圳南山店', treatment: '正畸', appointments: 78, arrivals: 69, noShows: 5, reschedules: 4, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '6', clinicName: '深圳南山店', treatment: '种植', appointments: 52, arrivals: 46, noShows: 4, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '6', clinicName: '深圳南山店', treatment: '牙周', appointments: 38, arrivals: 35, noShows: 2, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '6', clinicName: '深圳南山店', treatment: '儿牙', appointments: 27, arrivals: 23, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '6', clinicName: '深圳南山店', treatment: '综合', appointments: 20, arrivals: 16, noShows: 2, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '7', clinicName: '杭州西湖店', treatment: '正畸', appointments: 52, arrivals: 43, noShows: 5, reschedules: 4, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '7', clinicName: '杭州西湖店', treatment: '种植', appointments: 35, arrivals: 30, noShows: 3, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '7', clinicName: '杭州西湖店', treatment: '牙周', appointments: 32, arrivals: 29, noShows: 2, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '7', clinicName: '杭州西湖店', treatment: '儿牙', appointments: 20, arrivals: 16, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '7', clinicName: '杭州西湖店', treatment: '综合', appointments: 17, arrivals: 16, noShows: 1, reschedules: 0, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '8', clinicName: '成都锦江店', treatment: '正畸', appointments: 55, arrivals: 44, noShows: 7, reschedules: 4, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '8', clinicName: '成都锦江店', treatment: '种植', appointments: 38, arrivals: 32, noShows: 4, reschedules: 2, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '8', clinicName: '成都锦江店', treatment: '牙周', appointments: 32, arrivals: 28, noShows: 3, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '8', clinicName: '成都锦江店', treatment: '儿牙', appointments: 23, arrivals: 20, noShows: 2, reschedules: 1, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
  validateBreakdown({ clinicId: '8', clinicName: '成都锦江店', treatment: '综合', appointments: 20, arrivals: 18, noShows: 2, reschedules: 0, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 }),
];

export const doctors: DoctorData[] = [
  { id: 'd1', name: '张明远', clinicId: '1', clinicName: '北京朝阳店', specialty: '正畸', suggestions: 45, appointmentRate: 91.1, arrivalRate: 88.9, score: 92, funnel: { suggestions: 45, appointments: 41, appointmentRate: 91.1, reminders: 39, reminderRate: 95.1, arrivals: 40, arrivalRate: 88.9 } },
  { id: 'd2', name: '李思琪', clinicId: '3', clinicName: '上海浦东店', specialty: '种植', suggestions: 38, appointmentRate: 89.5, arrivalRate: 92.1, score: 91, funnel: { suggestions: 38, appointments: 34, appointmentRate: 89.5, reminders: 33, reminderRate: 97.1, arrivals: 35, arrivalRate: 92.1 } },
  { id: 'd3', name: '王建国', clinicId: '2', clinicName: '北京海淀店', specialty: '正畸', suggestions: 52, appointmentRate: 84.6, arrivalRate: 80.8, score: 83, funnel: { suggestions: 52, appointments: 44, appointmentRate: 84.6, reminders: 40, reminderRate: 90.9, arrivals: 42, arrivalRate: 80.8 } },
  { id: 'd4', name: '陈雨萱', clinicId: '4', clinicName: '上海徐汇店', specialty: '儿牙', suggestions: 33, appointmentRate: 81.8, arrivalRate: 78.8, score: 79, funnel: { suggestions: 33, appointments: 27, appointmentRate: 81.8, reminders: 24, reminderRate: 88.9, arrivals: 26, arrivalRate: 78.8 } },
  { id: 'd5', name: '刘伯涛', clinicId: '6', clinicName: '深圳南山店', specialty: '种植', suggestions: 41, appointmentRate: 87.8, arrivalRate: 85.4, score: 86, funnel: { suggestions: 41, appointments: 36, appointmentRate: 87.8, reminders: 35, reminderRate: 97.2, arrivals: 35, arrivalRate: 85.4 } },
  { id: 'd6', name: '赵晓梅', clinicId: '5', clinicName: '广州天河店', specialty: '牙周', suggestions: 29, appointmentRate: 79.3, arrivalRate: 75.9, score: 77, funnel: { suggestions: 29, appointments: 23, appointmentRate: 79.3, reminders: 21, reminderRate: 91.3, arrivals: 22, arrivalRate: 75.9 } },
  { id: 'd7', name: '孙伟华', clinicId: '7', clinicName: '杭州西湖店', specialty: '综合', suggestions: 36, appointmentRate: 83.3, arrivalRate: 80.6, score: 81, funnel: { suggestions: 36, appointments: 30, appointmentRate: 83.3, reminders: 28, reminderRate: 93.3, arrivals: 29, arrivalRate: 80.6 } },
  { id: 'd8', name: '周雅婷', clinicId: '8', clinicName: '成都锦江店', specialty: '正畸', suggestions: 31, appointmentRate: 77.4, arrivalRate: 74.2, score: 75, funnel: { suggestions: 31, appointments: 24, appointmentRate: 77.4, reminders: 22, reminderRate: 91.7, arrivals: 23, arrivalRate: 74.2 } },
  { id: 'd9', name: '吴俊杰', clinicId: '3', clinicName: '上海浦东店', specialty: '牙周', suggestions: 27, appointmentRate: 92.6, arrivalRate: 90.0, score: 93, funnel: { suggestions: 27, appointments: 25, appointmentRate: 92.6, reminders: 25, reminderRate: 100.0, arrivals: 24, arrivalRate: 90.0 } },
  { id: 'd10', name: '郑丽娜', clinicId: '1', clinicName: '北京朝阳店', specialty: '儿牙', suggestions: 39, appointmentRate: 87.2, arrivalRate: 84.6, score: 85, funnel: { suggestions: 39, appointments: 34, appointmentRate: 87.2, reminders: 33, reminderRate: 97.1, arrivals: 33, arrivalRate: 84.6 } },
];

export const receptionists: ReceptionistData[] = [
  { id: 'r1', name: '林小美', clinicId: '3', clinicName: '上海浦东店', reminders: 198, reminderRate: 96.5, responseRate: 89.2, score: 93, funnel: { totalAssigned: 210, reminded: 198, reminderRate: 94.3, responded: 187, responseRate: 94.4, arrived: 178, arrivalRate: 84.8 } },
  { id: 'r2', name: '张梦琪', clinicId: '6', clinicName: '深圳南山店', reminders: 175, reminderRate: 94.3, responseRate: 87.1, score: 90, funnel: { totalAssigned: 190, reminded: 175, reminderRate: 92.1, responded: 162, responseRate: 92.6, arrived: 155, arrivalRate: 81.6 } },
  { id: 'r3', name: '王佳怡', clinicId: '1', clinicName: '北京朝阳店', reminders: 156, reminderRate: 91.4, responseRate: 82.3, score: 86, funnel: { totalAssigned: 175, reminded: 156, reminderRate: 89.1, responded: 142, responseRate: 91.0, arrived: 132, arrivalRate: 75.4 } },
  { id: 'r4', name: '陈思雨', clinicId: '2', clinicName: '北京海淀店', reminders: 168, reminderRate: 88.7, responseRate: 80.5, score: 83, funnel: { totalAssigned: 195, reminded: 168, reminderRate: 86.2, responded: 150, responseRate: 89.3, arrived: 142, arrivalRate: 72.8 } },
  { id: 'r5', name: '杨紫萱', clinicId: '5', clinicName: '广州天河店', reminders: 149, reminderRate: 85.9, responseRate: 78.6, score: 80, funnel: { totalAssigned: 178, reminded: 149, reminderRate: 83.7, responded: 135, responseRate: 90.6, arrived: 125, arrivalRate: 70.2 } },
  { id: 'r6', name: '黄诗涵', clinicId: '4', clinicName: '上海徐汇店', reminders: 142, reminderRate: 82.4, responseRate: 75.1, score: 77, funnel: { totalAssigned: 168, reminded: 142, reminderRate: 84.5, responded: 125, responseRate: 88.0, arrived: 118, arrivalRate: 70.2 } },
  { id: 'r7', name: '刘梦瑶', clinicId: '7', clinicName: '杭州西湖店', reminders: 128, reminderRate: 79.7, responseRate: 73.4, score: 75, funnel: { totalAssigned: 155, reminded: 128, reminderRate: 82.6, responded: 112, responseRate: 87.5, arrived: 105, arrivalRate: 67.7 } },
  { id: 'r8', name: '孙雨桐', clinicId: '8', clinicName: '成都锦江店', reminders: 135, reminderRate: 76.3, responseRate: 70.8, score: 72, funnel: { totalAssigned: 162, reminded: 135, reminderRate: 83.3, responded: 118, responseRate: 87.4, arrived: 108, arrivalRate: 66.7 } },
];

export const customerServices: CustomerService[] = [
  { id: 'cs1', name: '陈晓红', clinicName: '北京朝阳店' },
  { id: 'cs2', name: '李雪芳', clinicName: '北京海淀店' },
  { id: 'cs3', name: '王美玲', clinicName: '上海浦东店' },
  { id: 'cs4', name: '张丽华', clinicName: '上海徐汇店' },
  { id: 'cs5', name: '刘芳芳', clinicName: '广州天河店' },
  { id: 'cs6', name: '赵雅芝', clinicName: '深圳南山店' },
  { id: 'cs7', name: '孙秀英', clinicName: '杭州西湖店' },
  { id: 'cs8', name: '周慧敏', clinicName: '成都锦江店' },
];

export const abnormalPatients: AbnormalPatient[] = [
  { id: 'p1', name: '王女士', phone: '138****1234', clinicName: '上海徐汇店', treatmentType: '种植', abnormalType: 'suture_unvisited', abnormalDetail: '术后7天未拆线回访', lastVisitDate: '2024-06-10', daysOverdue: 5, noShowCount: 1, status: 'pending', assignee: '', assigneeStatus: 'undispatched' },
  { id: 'p2', name: '李先生', phone: '139****5678', clinicName: '北京朝阳店', treatmentType: '正畸', abnormalType: 'ortho_overdue', abnormalDetail: '正畸复诊超期8周', lastVisitDate: '2024-04-15', daysOverdue: 62, noShowCount: 2, status: 'pending', assignee: '陈晓红', assigneeStatus: 'dispatched' },
  { id: 'p3', name: '张小朋友', phone: '137****9012', clinicName: '深圳南山店', treatmentType: '儿牙', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约3次', lastVisitDate: '2024-05-20', daysOverdue: 28, noShowCount: 3, status: 'contacted', assignee: '赵雅芝', assigneeStatus: 'processing' },
  { id: 'p4', name: '刘女士', phone: '136****3456', clinicName: '成都锦江店', treatmentType: '正畸', abnormalType: 'ortho_overdue', abnormalDetail: '正畸复诊超期7周', lastVisitDate: '2024-04-28', daysOverdue: 49, noShowCount: 1, status: 'pending', assignee: '', assigneeStatus: 'undispatched' },
  { id: 'p5', name: '陈先生', phone: '135****7890', clinicName: '广州天河店', treatmentType: '种植', abnormalType: 'suture_unvisited', abnormalDetail: '术后10天未拆线回访', lastVisitDate: '2024-06-08', daysOverdue: 7, noShowCount: 0, status: 'contacted', assignee: '刘芳芳', assigneeStatus: 'processing' },
  { id: 'p6', name: '赵女士', phone: '134****2345', clinicName: '上海浦东店', treatmentType: '牙周', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约2次', lastVisitDate: '2024-05-15', daysOverdue: 33, noShowCount: 2, status: 'pending', assignee: '', assigneeStatus: 'undispatched' },
  { id: 'p7', name: '孙先生', phone: '133****6789', clinicName: '杭州西湖店', treatmentType: '正畸', abnormalType: 'ortho_overdue', abnormalDetail: '正畸复诊超期9周', lastVisitDate: '2024-04-05', daysOverdue: 72, noShowCount: 3, status: 'pending', assignee: '孙秀英', assigneeStatus: 'dispatched' },
  { id: 'p8', name: '周女士', phone: '132****0123', clinicName: '北京海淀店', treatmentType: '种植', abnormalType: 'suture_unvisited', abnormalDetail: '术后8天未拆线回访', lastVisitDate: '2024-06-09', daysOverdue: 6, noShowCount: 0, status: 'recovered', assignee: '李雪芳', assigneeStatus: 'completed' },
  { id: 'p9', name: '吴先生', phone: '131****4567', clinicName: '上海徐汇店', treatmentType: '综合', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约2次', lastVisitDate: '2024-05-25', daysOverdue: 23, noShowCount: 2, status: 'contacted', assignee: '张丽华', assigneeStatus: 'processing' },
  { id: 'p10', name: '郑女士', phone: '130****8901', clinicName: '深圳南山店', treatmentType: '正畸', abnormalType: 'ortho_overdue', abnormalDetail: '正畸复诊超期6周+3天', lastVisitDate: '2024-05-01', daysOverdue: 45, noShowCount: 1, status: 'pending', assignee: '', assigneeStatus: 'undispatched' },
  { id: 'p11', name: '冯先生', phone: '188****2233', clinicName: '北京朝阳店', treatmentType: '正畸', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约4次', lastVisitDate: '2024-04-20', daysOverdue: 58, noShowCount: 4, status: 'pending', assignee: '陈晓红', assigneeStatus: 'dispatched' },
  { id: 'p12', name: '何女士', phone: '187****5566', clinicName: '广州天河店', treatmentType: '儿牙', abnormalType: 'suture_unvisited', abnormalDetail: '术后6天未回访', lastVisitDate: '2024-06-12', daysOverdue: 3, noShowCount: 0, status: 'contacted', assignee: '刘芳芳', assigneeStatus: 'processing' },
  { id: 'p13', name: '韩先生', phone: '186****8899', clinicName: '成都锦江店', treatmentType: '种植', abnormalType: 'suture_unvisited', abnormalDetail: '种植术后10天未回访', lastVisitDate: '2024-06-07', daysOverdue: 8, noShowCount: 0, status: 'pending', assignee: '', assigneeStatus: 'undispatched' },
  { id: 'p14', name: '许女士', phone: '185****1122', clinicName: '上海浦东店', treatmentType: '正畸', abnormalType: 'ortho_overdue', abnormalDetail: '正畸复诊超期7周', lastVisitDate: '2024-05-03', daysOverdue: 43, noShowCount: 3, status: 'pending', assignee: '王美玲', assigneeStatus: 'dispatched' },
  { id: 'p15', name: '邓先生', phone: '184****4455', clinicName: '杭州西湖店', treatmentType: '牙周', abnormalType: 'suture_unvisited', abnormalDetail: '术后9天未拆线回访', lastVisitDate: '2024-06-07', daysOverdue: 8, noShowCount: 1, status: 'pending', assignee: '', assigneeStatus: 'undispatched' },
];

export const trendData: TrendData[] = [
  { week: '第1周', appointments: 182, arrivals: 148, noShows: 24, reschedules: 10, noShowRate: 13.2 },
  { week: '第2周', appointments: 195, arrivals: 162, noShows: 22, reschedules: 11, noShowRate: 11.3 },
  { week: '第3周', appointments: 208, arrivals: 178, noShows: 19, reschedules: 11, noShowRate: 9.1 },
  { week: '第4周', appointments: 215, arrivals: 186, noShows: 18, reschedules: 11, noShowRate: 8.4 },
];

export const getTreatmentBreakdownByClinic = (clinicId: string): ClinicTreatmentBreakdown[] => {
  return clinicTreatmentBreakdown.filter(b => b.clinicId === clinicId);
};

export const getTotalStats = (data: ClinicData[]) => {
  const totalAppointments = data.reduce((sum, c) => sum + c.appointments, 0);
  const totalArrivals = data.reduce((sum, c) => sum + c.arrivals, 0);
  const totalNoShows = data.reduce((sum, c) => sum + c.noShows, 0);
  const totalReschedules = data.reduce((sum, c) => sum + c.reschedules, 0);

  return {
    appointments: totalAppointments,
    arrivals: totalArrivals,
    noShowRate: +((totalNoShows / totalAppointments) * 100).toFixed(1),
    rescheduleRate: +((totalReschedules / totalAppointments) * 100).toFixed(1),
  };
};

export const funnelData = [
  { name: '医嘱开出', value: 1000, rate: 100 },
  { name: '患者预约', value: 847, rate: 84.7 },
  { name: '前台提醒', value: 798, rate: 94.2 },
  { name: '实际到诊', value: 712, rate: 89.2 },
];

const weekLabels = ['第1周 (5.26-6.1)', '第2周 (6.2-6.8)', '第3周 (6.9-6.15)', '第4周 (6.16-6.22)'];
const weekKeys = ['week1', 'week2', 'week3', 'week4'];

const generateWeeklyTrendForClinic = (clinicId: string, clinicName: string): ClinicWeeklyTrend[] => {
  const treatments = ['正畸', '种植', '牙周', '儿牙', '综合'];
  const baseVolumes: Record<string, number[]> = {
    '1': [68, 42, 35, 28, 13],
    '2': [75, 48, 38, 24, 18],
    '3': [88, 62, 42, 30, 23],
    '4': [62, 40, 35, 22, 19],
    '5': [68, 45, 38, 24, 17],
    '6': [78, 52, 38, 27, 20],
    '7': [52, 35, 32, 20, 17],
    '8': [55, 38, 32, 23, 20],
  };
  
  const weekMultipliers = [0.85, 0.92, 0.98, 1.0];
  const clinicBase = baseVolumes[clinicId] || [50, 30, 25, 20, 15];
  const trends: ClinicWeeklyTrend[] = [];

  treatments.forEach((treatment, ti) => {
    weekKeys.forEach((week, wi) => {
      const baseAppt = Math.round(clinicBase[ti] * weekMultipliers[wi]);
      let noShowRate = 9 + (ti === 3 ? 3 : 0) + (wi === 3 ? 2 : 0);
      let rescheduleRate = 5;
      
      if (clinicId === '4' && treatment === '正畸' && wi >= 2) noShowRate += 5;
      if (clinicId === '8' && treatment === '种植' && wi >= 1) noShowRate += 3;
      
      const noShows = Math.round(baseAppt * (noShowRate / 100));
      const reschedules = Math.round(baseAppt * (rescheduleRate / 100));
      const arrivals = baseAppt - noShows - reschedules;
      
      trends.push({
        clinicId,
        clinicName,
        treatment,
        week: weekKeys[wi],
        weekLabel: weekLabels[wi],
        appointments: baseAppt,
        arrivals,
        noShows,
        reschedules,
        noShowRate: +(noShowRate).toFixed(1),
        rescheduleRate: +(rescheduleRate).toFixed(1),
        arrivalRate: +((arrivals / baseAppt) * 100).toFixed(1),
      });
    });
  });
  
  return trends;
};

export const clinicWeeklyTrends: ClinicWeeklyTrend[] = [
  ...generateWeeklyTrendForClinic('1', '北京朝阳店'),
  ...generateWeeklyTrendForClinic('2', '北京海淀店'),
  ...generateWeeklyTrendForClinic('3', '上海浦东店'),
  ...generateWeeklyTrendForClinic('4', '上海徐汇店'),
  ...generateWeeklyTrendForClinic('5', '广州天河店'),
  ...generateWeeklyTrendForClinic('6', '深圳南山店'),
  ...generateWeeklyTrendForClinic('7', '杭州西湖店'),
  ...generateWeeklyTrendForClinic('8', '成都锦江店'),
];

export const dropoffPatients: DropoffPatient[] = [
  { id: 'dp1', name: '马先生', phone: '139****1111', clinicName: '北京朝阳店', treatmentType: '正畸', lastAppointmentDate: '2024-06-15', suggestionDate: '2024-06-10', dropoffStage: 'suggestion_to_appointment', suggestedAction: '电话联系确认预约意向', doctorId: 'd1' },
  { id: 'dp2', name: '杨女士', phone: '138****2222', clinicName: '北京朝阳店', treatmentType: '种植', lastAppointmentDate: '2024-06-18', suggestionDate: '2024-06-12', dropoffStage: 'suggestion_to_appointment', suggestedAction: '发送优惠信息促动预约', doctorId: 'd1' },
  { id: 'dp3', name: '朱小朋友', phone: '137****3333', clinicName: '北京朝阳店', treatmentType: '儿牙', lastAppointmentDate: '2024-06-10', suggestionDate: '2024-06-05', dropoffStage: 'appointment_to_reminder', suggestedAction: '前台补发短信提醒', doctorId: 'd10' },
  { id: 'dp4', name: '胡先生', phone: '136****4444', clinicName: '北京朝阳店', treatmentType: '牙周', lastAppointmentDate: '2024-06-12', suggestionDate: '2024-06-08', dropoffStage: 'appointment_to_reminder', suggestedAction: '确认是否已收到提醒', doctorId: 'd1' },
  { id: 'dp5', name: '郭女士', phone: '135****5555', clinicName: '北京朝阳店', treatmentType: '正畸', lastAppointmentDate: '2024-06-20', suggestionDate: '2024-06-15', dropoffStage: 'reminder_to_arrival', suggestedAction: '询问爽约原因重新预约', doctorId: 'd1' },
  { id: 'dp6', name: '何先生', phone: '134****6666', clinicName: '上海浦东店', treatmentType: '种植', lastAppointmentDate: '2024-06-19', suggestionDate: '2024-06-14', dropoffStage: 'suggestion_to_appointment', suggestedAction: '医生助理亲自跟进', doctorId: 'd2' },
  { id: 'dp7', name: '高女士', phone: '133****7777', clinicName: '上海浦东店', treatmentType: '正畸', lastAppointmentDate: '2024-06-11', suggestionDate: '2024-06-06', dropoffStage: 'suggestion_to_appointment', suggestedAction: '了解时间冲突原因', doctorId: 'd2' },
  { id: 'dp8', name: '林先生', phone: '132****8888', clinicName: '上海浦东店', treatmentType: '牙周', lastAppointmentDate: '2024-06-13', suggestionDate: '2024-06-09', dropoffStage: 'reminder_to_arrival', suggestedAction: '发送交通路线指南', doctorId: 'd9' },
  { id: 'dp9', name: '罗女士', phone: '131****9999', clinicName: '北京海淀店', treatmentType: '正畸', lastAppointmentDate: '2024-06-17', suggestionDate: '2024-06-11', dropoffStage: 'appointment_to_reminder', suggestedAction: '检查提醒系统是否漏发', doctorId: 'd3' },
  { id: 'dp10', name: '梁先生', phone: '130****1010', clinicName: '北京海淀店', treatmentType: '种植', lastAppointmentDate: '2024-06-14', suggestionDate: '2024-06-09', dropoffStage: 'suggestion_to_appointment', suggestedAction: '提供分期方案降低门槛', doctorId: 'd3' },
  { id: 'dp11', name: '宋女士', phone: '188****1212', clinicName: '上海徐汇店', treatmentType: '儿牙', lastAppointmentDate: '2024-06-16', suggestionDate: '2024-06-10', dropoffStage: 'reminder_to_arrival', suggestedAction: '家长沟通强调复诊重要性', doctorId: 'd4' },
  { id: 'dp12', name: '唐先生', phone: '187****3434', clinicName: '上海徐汇店', treatmentType: '正畸', lastAppointmentDate: '2024-06-18', suggestionDate: '2024-06-13', dropoffStage: 'suggestion_to_appointment', suggestedAction: '弹性安排周末时段', doctorId: 'd4' },
  { id: 'dp13', name: '韩女士', phone: '186****5656', clinicName: '深圳南山店', treatmentType: '种植', lastAppointmentDate: '2024-06-20', suggestionDate: '2024-06-15', dropoffStage: 'appointment_to_reminder', suggestedAction: '人工电话确认', doctorId: 'd5' },
  { id: 'dp14', name: '冯先生', phone: '185****7878', clinicName: '广州天河店', treatmentType: '牙周', lastAppointmentDate: '2024-06-12', suggestionDate: '2024-06-07', dropoffStage: 'suggestion_to_appointment', suggestedAction: '发送牙龈健康科普', doctorId: 'd6' },
  { id: 'dp15', name: '董女士', phone: '184****9090', clinicName: '杭州西湖店', treatmentType: '综合', lastAppointmentDate: '2024-06-14', suggestionDate: '2024-06-09', dropoffStage: 'reminder_to_arrival', suggestedAction: '了解改约意向', doctorId: 'd7' },
  { id: 'dp16', name: '萧先生', phone: '183****2323', clinicName: '成都锦江店', treatmentType: '正畸', lastAppointmentDate: '2024-06-19', suggestionDate: '2024-06-14', dropoffStage: 'suggestion_to_appointment', suggestedAction: '了解矫正顾虑', doctorId: 'd8' },
  { id: 'dp17', name: '程女士', phone: '182****4545', clinicName: '上海浦东店', treatmentType: '种植', lastAppointmentDate: '2024-06-10', suggestionDate: '2024-06-05', dropoffStage: 'assigned_to_reminded', suggestedAction: '核实名单分配是否到位', receptionistId: 'r1' },
  { id: 'dp18', name: '曹先生', phone: '181****6767', clinicName: '上海浦东店', treatmentType: '正畸', lastAppointmentDate: '2024-06-15', suggestionDate: '2024-06-10', dropoffStage: 'assigned_to_reminded', suggestedAction: '优先安排电话提醒', receptionistId: 'r1' },
  { id: 'dp19', name: '袁女士', phone: '180****8989', clinicName: '上海浦东店', treatmentType: '儿牙', lastAppointmentDate: '2024-06-18', suggestionDate: '2024-06-13', dropoffStage: 'reminded_to_responded', suggestedAction: '更换联系方式重试', receptionistId: 'r1' },
  { id: 'dp20', name: '邓先生', phone: '179****1122', clinicName: '深圳南山店', treatmentType: '牙周', lastAppointmentDate: '2024-06-11', suggestionDate: '2024-06-06', dropoffStage: 'responded_to_arrived', suggestedAction: '送上复诊小礼品激励', receptionistId: 'r2' },
  { id: 'dp21', name: '许女士', phone: '178****3344', clinicName: '北京朝阳店', treatmentType: '正畸', lastAppointmentDate: '2024-06-20', suggestionDate: '2024-06-15', dropoffStage: 'reminded_to_responded', suggestedAction: '短信+电话双通道提醒', receptionistId: 'r3' },
  { id: 'dp22', name: '傅先生', phone: '177****5566', clinicName: '北京海淀店', treatmentType: '种植', lastAppointmentDate: '2024-06-17', suggestionDate: '2024-06-12', dropoffStage: 'assigned_to_reminded', suggestedAction: '检查提醒排班', receptionistId: 'r4' },
  { id: 'dp23', name: '沈女士', phone: '176****7788', clinicName: '广州天河店', treatmentType: '正畸', lastAppointmentDate: '2024-06-13', suggestionDate: '2024-06-08', dropoffStage: 'responded_to_arrived', suggestedAction: '提供停车优惠信息', receptionistId: 'r5' },
  { id: 'dp24', name: '曾先生', phone: '175****9900', clinicName: '上海徐汇店', treatmentType: '儿牙', lastAppointmentDate: '2024-06-16', suggestionDate: '2024-06-11', dropoffStage: 'reminded_to_responded', suggestedAction: '傍晚时段拨打成功率高', receptionistId: 'r6' },
  { id: 'dp25', name: '彭女士', phone: '174****2233', clinicName: '杭州西湖店', treatmentType: '牙周', lastAppointmentDate: '2024-06-14', suggestionDate: '2024-06-09', dropoffStage: 'assigned_to_reminded', suggestedAction: '优化提醒话术', receptionistId: 'r7' },
  { id: 'dp26', name: '吕先生', phone: '173****4455', clinicName: '成都锦江店', treatmentType: '种植', lastAppointmentDate: '2024-06-19', suggestionDate: '2024-06-14', dropoffStage: 'responded_to_arrived', suggestedAction: '术前再次电话确认', receptionistId: 'r8' },
];

export const getWeeklyTrendByClinic = (clinicId: string): ClinicWeeklyTrend[] => {
  return clinicWeeklyTrends.filter(t => t.clinicId === clinicId);
};

export const getDropoffPatients = (
  personType: 'doctor' | 'receptionist',
  personId: string,
  stage: string
): DropoffPatient[] => {
  return dropoffPatients.filter(p => {
    if (personType === 'doctor' && p.doctorId !== personId) return false;
    if (personType === 'receptionist' && p.receptionistId !== personId) return false;
    if (p.dropoffStage !== stage) return false;
    return true;
  });
};

export const getClinicsByTreatment = (type: TreatmentType): ClinicData[] => {
  if (type === 'all') {
    return clinics.map(c => {
      const breakdown = clinicTreatmentBreakdown.filter(b => b.clinicId === c.id);
      const appointments = breakdown.reduce((sum, b) => sum + b.appointments, 0);
      const arrivals = breakdown.reduce((sum, b) => sum + b.arrivals, 0);
      const noShows = breakdown.reduce((sum, b) => sum + b.noShows, 0);
      const reschedules = breakdown.reduce((sum, b) => sum + b.reschedules, 0);
      return calculateRates({ ...c, appointments, arrivals, noShows, reschedules, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 });
    });
  }

  const treatmentMap: Record<TreatmentType, string> = {
    all: '全部',
    orthodontics: '正畸',
    implant: '种植',
    periodontal: '牙周',
    pediatric: '儿牙',
    general: '综合',
  };

  const treatmentName = treatmentMap[type];
  
  return clinics.map(c => {
    const breakdown = clinicTreatmentBreakdown.find(b => b.clinicId === c.id && b.treatment === treatmentName);
    if (!breakdown) {
      return calculateRates({ ...c, appointments: 0, arrivals: 0, noShows: 0, reschedules: 0, noShowRate: 0, rescheduleRate: 0, arrivalRate: 0 });
    }
    return calculateRates({
      ...c,
      appointments: breakdown.appointments,
      arrivals: breakdown.arrivals,
      noShows: breakdown.noShows,
      reschedules: breakdown.reschedules,
      noShowRate: 0,
      rescheduleRate: 0,
      arrivalRate: 0,
    });
  });
};
