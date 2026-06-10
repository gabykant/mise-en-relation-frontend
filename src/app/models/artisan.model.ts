export interface Artisan {
  id?: string;
  firstName: string;
  lastName: string;
  phone_number: string;
  profession: string;
  zone: string;
  status: 'ACTIVE' | 'INACTIVE';
  verified: boolean;
  createdAt: string;
  photoUrl: string;
  diplomas: Diploma[];
}

interface Diploma {
  name: string;
  startDate: string;
  endDate: string;
}