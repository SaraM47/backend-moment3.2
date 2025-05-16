// Defines the structure of an experience entry used in the CV list
export interface Experience {
  _id?: string;
  companyName: string;
  jobTitle: string;
  location: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}