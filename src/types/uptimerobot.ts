
export interface UptimeRobotMonitor {
  id: number;
  friendly_name: string;
  url: string;
  type: number;
  sub_type?: string;
  keyword_type?: number;
  keyword_value?: string;
  port?: number;
  interval: number;
  status: number;
  create_datetime: number;
  ssl?: UptimeRobotSSL;
  logs?: UptimeRobotLog[];
  response_times?: UptimeRobotResponseTime[];
  custom_uptime_ratio?: string;
  custom_uptime_ratios?: string;
  all_time_uptime_ratio?: string;
  all_time_uptime_duration?: string;
  all_time_downtime_duration?: string;
}

export interface UptimeRobotSSL {
  brand: string;
  product: string;
  expires: number;
}

export interface UptimeRobotLog {
  type: number;
  datetime: number;
  duration: number;
  reason?: UptimeRobotLogReason;
}

export interface UptimeRobotLogReason {
  code: number;
  detail: string;
}

export interface UptimeRobotResponseTime {
  datetime: number;
  value: number;
}

export interface UptimeRobotResponse {
  stat: string;
  account?: UptimeRobotAccount;
  monitors?: UptimeRobotMonitor[];
}

export interface UptimeRobotAccount {
  email: string;
  monitor_limit: number;
  monitor_interval: number;
  up_monitors: number;
  down_monitors: number;
  paused_monitors: number;
}

export enum MonitorStatus {
  Paused = 0,
  NotCheckedYet = 1,
  Up = 2,
  SeemsDown = 8,
  Down = 9,
}

