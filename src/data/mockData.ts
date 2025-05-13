import { Job, JobProvider, JobSeeker } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp Solutions',
    providerId: 'provider1',
    location: 'San Francisco, CA',
    jobType: 'part-time',
    salary: '$30-40/hr',
    description: 'We are looking for a skilled frontend developer to join our team and help build modern web applications.',
    requirements: [
      'Proficiency in React and TypeScript',
      'Experience with modern CSS frameworks',
      'Understanding of responsive design principles',
      'Good communication skills'
    ],
    responsibilities: [
      'Develop and maintain frontend components',
      'Collaborate with design team',
      'Optimize applications for performance',
      'Write clean, maintainable code'
    ],
    createdAt: new Date('2023-06-01'),
    applicants: [],
    status: 'open',
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Marketing Assistant',
    company: 'Brand Builders Inc.',
    providerId: 'provider2',
    location: 'Remote',
    jobType: 'part-time',
    salary: '$25-30/hr',
    description: 'Join our marketing team to help create and execute digital marketing campaigns for our clients.',
    requirements: [
      'Basic understanding of digital marketing principles',
      'Excellent written communication',
      'Social media savvy',
      'Ability to work independently'
    ],
    responsibilities: [
      'Assist with social media content creation',
      'Help monitor campaign performance',
      'Research market trends',
      'Support the marketing team with administrative tasks'
    ],
    createdAt: new Date('2023-06-05'),
    applicants: [],
    status: 'open',
    imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Customer Support Representative',
    company: 'ServiceFirst Co.',
    providerId: 'provider3',
    location: 'Chicago, IL',
    jobType: 'part-time',
    salary: '$18-22/hr',
    description: 'We need friendly, patient individuals to join our customer support team and help our customers with their inquiries.',
    requirements: [
      'Excellent communication skills',
      'Problem-solving abilities',
      'Basic technical knowledge',
      'Customer service experience a plus'
    ],
    responsibilities: [
      'Answer customer inquiries via phone and email',
      'Troubleshoot basic technical issues',
      'Escalate complex problems to the appropriate team',
      'Maintain customer satisfaction'
    ],
    createdAt: new Date('2023-06-10'),
    applicants: [],
    status: 'open',
    imageUrl: 'https://images.pexels.com/photos/7709018/pexels-photo-7709018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    title: 'Data Entry Specialist',
    company: 'InfoProcess LLC',
    providerId: 'provider4',
    location: 'Remote',
    jobType: 'part-time',
    salary: '$15-20/hr',
    description: 'Looking for detail-oriented individuals to help with data entry tasks for our growing database.',
    requirements: [
      'Fast and accurate typing skills',
      'Attention to detail',
      'Basic spreadsheet knowledge',
      'Reliable internet connection'
    ],
    responsibilities: [
      'Enter data from various sources into our system',
      'Verify data accuracy',
      'Format and organize information',
      'Meet weekly data entry targets'
    ],
    createdAt: new Date('2023-06-15'),
    applicants: [],
    status: 'open',
    imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    title: 'Graphic Design Intern',
    company: 'Creative Vision Studio',
    providerId: 'provider5',
    location: 'Boston, MA',
    jobType: 'internship',
    salary: '$20/hr',
    description: 'Exciting opportunity for a creative graphic design student to gain real-world experience at our design studio.',
    requirements: [
      'Currently enrolled in graphic design program',
      'Portfolio showcasing design skills',
      'Proficiency in Adobe Creative Suite',
      'Eager to learn and grow'
    ],
    responsibilities: [
      'Assist senior designers with projects',
      'Create social media graphics',
      'Help with brand identity development',
      'Participate in brainstorming sessions'
    ],
    createdAt: new Date('2023-06-20'),
    applicants: [],
    status: 'open',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const mockSeekers: JobSeeker[] = [
  {
    id: 'seeker1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    userType: 'seeker',
    photoURL: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: new Date('2023-05-15'),
    skills: ['JavaScript', 'React', 'CSS', 'HTML'],
    experience: '2 years',
    education: 'Bachelor\'s in Computer Science',
    location: 'San Francisco, CA',
    bio: 'Frontend developer passionate about creating beautiful user experiences.',
    savedJobs: ['1', '5'],
    appliedJobs: []
  }
];

export const mockProviders: JobProvider[] = [
  {
    id: 'provider1',
    name: 'Sarah Miller',
    email: 'sarah@techcorp.com',
    userType: 'provider',
    photoURL: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: new Date('2023-04-10'),
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    companySize: '50-100',
    location: 'San Francisco, CA',
    website: 'https://techcorp-example.com',
    description: 'Innovative tech company specializing in web and mobile applications.',
    postedJobs: ['1']
  }
];