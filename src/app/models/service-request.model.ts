export enum RequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ServiceRequest {
  id?: string;
  clientPhone: string;
  serviceName: string;
  zoneName: string;
  description: string;
  status: RequestStatus;
  createdAt: string;
  artisanName: string;
  updatedAt: string;
}