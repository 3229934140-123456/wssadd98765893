import type { ClinicData, DoctorData, ReceptionistData, AbnormalPatient, TrendData, TreatmentType } from '@/types';

export const clinics: ClinicData[] = [
  { id: '1', name: '北京朝阳店', appointments: 186, arrivals: 158, noShows: 18, reschedules: 10, noShowRate: 9.7, rescheduleRate: 5.4, arrivalRate: 84.9 },
  { id: '2', name: '北京海淀店', appointments: 203, arrivals: 175, noShows: 20, reschedules: 8, noShowRate: 9.9, rescheduleRate: 3.9, arrivalRate: 86.2 },
  { id: '3', name: '上海浦东店', appointments: 245, arrivals: 218, noShows: 15, reschedules: 12, noShowRate: 6.1, rescheduleRate: 4.9, arrivalRate: 89.0 },
  { id: '4', name: '上海徐汇店', appointments: 178, arrivals: 149, noShows: 21, reschedules: 8, noShowRate: 11.8, rescheduleRate: 4.5, arrivalRate: 83.7 },
  { id: '5', name: '广州天河店', appointments: 192, arrivals: 165, noShows: 17, reschedules: 10, noShowRate: 8.9, rescheduleRate: 5.2, arrivalRate: 85.9 },
  { id: '6', name: '深圳南山店', appointments: 215, arrivals: 189, noShows: 16, reschedules: 10, noShowRate: 7.4, rescheduleRate: 4.7, arrivalRate: 87.9 },
  { id: '7', name: '杭州西湖店', appointments: 156, arrivals: 134, noShows: 14, reschedules: 8, noShowRate: 9.0, rescheduleRate: 5.1, arrivalRate: 85.9 },
  { id: '8', name: '成都锦江店', appointments: 168, arrivals: 142, noShows: 19, reschedules: 7, noShowRate: 11.3, rescheduleRate: 4.2, arrivalRate: 84.5 },
];

export const doctors: DoctorData[] = [
  { id: 'd1', name: '张明远', clinicId: '1', clinicName: '北京朝阳店', specialty: '正畸', suggestions: 45, appointmentRate: 91.1, arrivalRate: 88.9, score: 92 },
  { id: 'd2', name: '李思琪', clinicId: '3', clinicName: '上海浦东店', specialty: '种植', suggestions: 38, appointmentRate: 89.5, arrivalRate: 92.1, score: 91 },
  { id: 'd3', name: '王建国', clinicId: '2', clinicName: '北京海淀店', specialty: '正畸', suggestions: 52, appointmentRate: 84.6, arrivalRate: 80.8, score: 83 },
  { id: 'd4', name: '陈雨萱', clinicId: '4', clinicName: '上海徐汇店', specialty: '儿牙', suggestions: 33, appointmentRate: 81.8, arrivalRate: 78.8, score: 79 },
  { id: 'd5', name: '刘伯涛', clinicId: '6', clinicName: '深圳南山店', specialty: '种植', suggestions: 41, appointmentRate: 87.8, arrivalRate: 85.4, score: 86 },
  { id: 'd6', name: '赵晓梅', clinicId: '5', clinicName: '广州天河店', specialty: '牙周', suggestions: 29, appointmentRate: 79.3, arrivalRate: 75.9, score: 77 },
  { id: 'd7', name: '孙伟华', clinicId: '7', clinicName: '杭州西湖店', specialty: '综合', suggestions: 36, appointmentRate: 83.3, arrivalRate: 80.6, score: 81 },
  { id: 'd8', name: '周雅婷', clinicId: '8', clinicName: '成都锦江店', specialty: '正畸', suggestions: 31, appointmentRate: 77.4, arrivalRate: 74.2, score: 75 },
  { id: 'd9', name: '吴俊杰', clinicId: '3', clinicName: '上海浦东店', specialty: '牙周', suggestions: 27, appointmentRate: 92.6, arrivalRate: 90.0, score: 93 },
  { id: 'd10', name: '郑丽娜', clinicId: '1', clinicName: '北京朝阳店', specialty: '儿牙', suggestions: 39, appointmentRate: 87.2, arrivalRate: 84.6, score: 85 },
];

export const receptionists: ReceptionistData[] = [
  { id: 'r1', name: '林小美', clinicId: '3', clinicName: '上海浦东店', reminders: 198, reminderRate: 96.5, responseRate: 89.2, score: 93 },
  { id: 'r2', name: '张梦琪', clinicId: '6', clinicName: '深圳南山店', reminders: 175, reminderRate: 94.3, responseRate: 87.1, score: 90 },
  { id: 'r3', name: '王佳怡', clinicId: '1', clinicName: '北京朝阳店', reminders: 156, reminderRate: 91.4, responseRate: 82.3, score: 86 },
  { id: 'r4', name: '陈思雨', clinicId: '2', clinicName: '北京海淀店', reminders: 168, reminderRate: 88.7, responseRate: 80.5, score: 83 },
  { id: 'r5', name: '杨紫萱', clinicId: '5', clinicName: '广州天河店', reminders: 149, reminderRate: 85.9, responseRate: 78.6, score: 80 },
  { id: 'r6', name: '黄诗涵', clinicId: '4', clinicName: '上海徐汇店', reminders: 142, reminderRate: 82.4, responseRate: 75.1, score: 77 },
  { id: 'r7', name: '刘梦瑶', clinicId: '7', clinicName: '杭州西湖店', reminders: 128, reminderRate: 79.7, responseRate: 73.4, score: 75 },
  { id: 'r8', name: '孙雨桐', clinicId: '8', clinicName: '成都锦江店', reminders: 135, reminderRate: 76.3, responseRate: 70.8, score: 72 },
];

export const abnormalPatients: AbnormalPatient[] = [
  { id: 'p1', name: '王女士', phone: '138****1234', clinicName: '上海徐汇店', treatmentType: '种植', abnormalType: 'suture_unvisited', abnormalDetail: '术后7天未拆线回访', lastVisitDate: '2024-06-10', daysOverdue: 5, noShowCount: 1, status: 'pending' },
  { id: 'p2', name: '李先生', phone: '139****5678', clinicName: '北京朝阳店', treatmentType: '正畸', abnormalType: 'ortho_overdue', abnormalDetail: '正畸复诊超期8周', lastVisitDate: '2024-04-15', daysOverdue: 62, noShowCount: 2, status: 'pending' },
  { id: 'p3', name: '张小朋友', phone: '137****9012', clinicName: '深圳南山店', treatmentType: '儿牙', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约3次', lastVisitDate: '2024-05-20', daysOverdue: 28, noShowCount: 3, status: 'contacted' },
  { id: 'p4', name: '刘女士', phone: '136****3456', clinicName: '成都锦江店', treatmentType: '正畸', abnormalType: 'ortho_overdue', abnormalDetail: '正畸复诊超期7周', lastVisitDate: '2024-04-28', daysOverdue: 49, noShowCount: 1, status: 'pending' },
  { id: 'p5', name: '陈先生', phone: '135****7890', clinicName: '广州天河店', treatmentType: '种植', abnormalType: 'suture_unvisited', abnormalDetail: '术后10天未拆线回访', lastVisitDate: '2024-06-08', daysOverdue: 7, noShowCount: 0, status: 'contacted' },
  { id: 'p6', name: '赵女士', phone: '134****2345', clinicName: '上海浦东店', treatmentType: '牙周', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约2次', lastVisitDate: '2024-05-15', daysOverdue: 33, noShowCount: 2, status: 'pending' },
  { id: 'p7', name: '孙先生', phone: '133****6789', clinicName: '杭州西湖店', treatmentType: '正畸', abnormalType: 'ortho_overdue', abnormalDetail: '正畸复诊超期9周', lastVisitDate: '2024-04-05', daysOverdue: 72, noShowCount: 3, status: 'pending' },
  { id: 'p8', name: '周女士', phone: '132****0123', clinicName: '北京海淀店', treatmentType: '种植', abnormalType: 'suture_unvisited', abnormalDetail: '术后8天未拆线回访', lastVisitDate: '2024-06-09', daysOverdue: 6, noShowCount: 0, status: 'recovered' },
  { id: 'p9', name: '吴先生', phone: '131****4567', clinicName: '上海徐汇店', treatmentType: '综合', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约2次', lastVisitDate: '2024-05-25', daysOverdue: 23, noShowCount: 2, status: 'contacted' },
  { id: 'p10', name: '郑女士', phone: '130****8901', clinicName: '深圳南山店', treatmentType: '牙周', abnormalType: 'ortho_overdue', abnormalDetail: '牙周复查超期6周', lastVisitDate: '2024-05-05', daysOverdue: 43, noShowCount: 1, status: 'pending' },
  { id: 'p11', name: '冯先生', phone: '188****2233', clinicName: '北京朝阳店', treatmentType: '正畸', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约4次', lastVisitDate: '2024-04-20', daysOverdue: 58, noShowCount: 4, status: 'pending' },
  { id: 'p12', name: '何女士', phone: '187****5566', clinicName: '广州天河店', treatmentType: '儿牙', abnormalType: 'suture_unvisited', abnormalDetail: '术后6天未回访', lastVisitDate: '2024-06-12', daysOverdue: 3, noShowCount: 0, status: 'contacted' },
  { id: 'p13', name: '韩先生', phone: '186****8899', clinicName: '成都锦江店', treatmentType: '种植', abnormalType: 'ortho_overdue', abnormalDetail: '种植复查超期8周', lastVisitDate: '2024-04-18', daysOverdue: 60, noShowCount: 2, status: 'pending' },
  { id: 'p14', name: '许女士', phone: '185****1122', clinicName: '上海浦东店', treatmentType: '正畸', abnormalType: 'no_show_repeat', abnormalDetail: '累计爽约3次', lastVisitDate: '2024-05-02', daysOverdue: 46, noShowCount: 3, status: 'pending' },
  { id: 'p15', name: '邓先生', phone: '184****4455', clinicName: '杭州西湖店', treatmentType: '牙周', abnormalType: 'suture_unvisited', abnormalDetail: '术后9天未拆线回访', lastVisitDate: '2024-06-07', daysOverdue: 8, noShowCount: 1, status: 'pending' },
];

export const trendData: TrendData[] = [
  { week: '第1周', appointments: 182, arrivals: 148, noShows: 24, reschedules: 10, noShowRate: 13.2 },
  { week: '第2周', appointments: 195, arrivals: 162, noShows: 22, reschedules: 11, noShowRate: 11.3 },
  { week: '第3周', appointments: 208, arrivals: 178, noShows: 19, reschedules: 11, noShowRate: 9.1 },
  { week: '第4周', appointments: 215, arrivals: 186, noShows: 18, reschedules: 11, noShowRate: 8.4 },
];

export const getClinicsByTreatment = (type: TreatmentType): ClinicData[] => {
  const multipliers: Record<TreatmentType, number[]> = {
    all: [1, 1, 1, 1, 1, 1, 1, 1],
    orthodontics: [0.85, 0.92, 0.95, 0.78, 0.88, 0.9, 0.82, 0.75],
    implant: [0.7, 0.65, 0.82, 0.6, 0.72, 0.78, 0.68, 0.58],
    periodontal: [0.9, 0.88, 0.92, 0.85, 0.87, 0.91, 0.84, 0.8],
    pediatric: [0.75, 0.8, 0.88, 0.7, 0.78, 0.82, 0.72, 0.65],
    general: [0.95, 0.93, 0.97, 0.9, 0.94, 0.96, 0.89, 0.86],
  };

  const rates: Record<TreatmentType, { noShow: number; reschedule: number }> = {
    all: { noShow: 1, reschedule: 1 },
    orthodontics: { noShow: 1.15, reschedule: 1.2 },
    implant: { noShow: 1.3, reschedule: 1.4 },
    periodontal: { noShow: 0.85, reschedule: 0.9 },
    pediatric: { noShow: 1.4, reschedule: 1.3 },
    general: { noShow: 0.75, reschedule: 0.7 },
  };

  const mult = multipliers[type];
  const rateMult = rates[type];

  return clinics.map((c, i) => {
    const appointments = Math.round(c.appointments * mult[i]);
    const noShows = Math.round(appointments * (c.noShowRate / 100) * rateMult.noShow);
    const reschedules = Math.round(appointments * (c.rescheduleRate / 100) * rateMult.reschedule);
    const arrivals = appointments - noShows - reschedules;
    return {
      ...c,
      appointments,
      arrivals,
      noShows,
      reschedules,
      noShowRate: +((noShows / appointments) * 100).toFixed(1),
      rescheduleRate: +((reschedules / appointments) * 100).toFixed(1),
      arrivalRate: +((arrivals / appointments) * 100).toFixed(1),
    };
  });
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
