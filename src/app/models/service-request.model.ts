export enum RequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ServiceRequest {
  id?: string;
  clientId: string;
  clientPhone: string;
  serviceType: string;
  serviceName: string;
  location: string;
  zoneName: string;
  description: string;
  status: RequestStatus;
  createdAt: string;
  artisanName?: string;
}