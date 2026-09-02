export interface ClientSubscription {
  id: string;
  userId: string;
  planType: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface ClientSummary {
  id: string;
  phoneNumber: string;
  createdAt: string;
  lastOrderDate: string | null;
  hasActiveSubscription: boolean;
  subscriptionEndDate: string | null;
}