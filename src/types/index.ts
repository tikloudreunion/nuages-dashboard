export interface Container {
  id: string;
  name: string;
  domain: string;
  status: 'running' | 'stopped';
  uptime: string;
  ram: {
    used: number;
    total: number;
  };
  cpu: number;
  createdAt: string;
  image: string;
  services: string[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: string;
}

export interface CreateContainerData {
  name: string;
  image: string;
  services: string[];
}