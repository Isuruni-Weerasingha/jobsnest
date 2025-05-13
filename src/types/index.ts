export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'seeker' | 'provider';
  photoURL?: string;
  createdAt: Date;
}

export interface JobSeeker extends User {
  userType: 'seeker';
  skills: string[];
  experience: string;
  education: string;
  resumeURL?: string;
  location: string;
  bio: string;
  savedJobs: string[];
  appliedJobs: string[];
}

export interface JobProvider extends User {
  userType: 'provider';
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  website?: string;
  description: string;
  postedJobs: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  providerId: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  createdAt: Date;
  expiresAt?: Date;
  applicants: string[];
  status: 'open' | 'closed';
  imageUrl?: string;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  providerId: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
  createdAt: Date;
  resumeURL: string;
  coverLetter?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
  relatedTo?: {
    type: 'job' | 'application';
    id: string;
  };
}