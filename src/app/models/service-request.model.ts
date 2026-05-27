export enum RequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ServiceRequest {
  id?: string;
  clientId: string;
  serviceType: string;
  location: string;
  description: string;
  status: RequestStatus;
  createdAt: string;
}