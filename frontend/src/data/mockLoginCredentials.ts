// Mock login credentials for demo purposes
export interface LoginCredential {
  email: string;
  password: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: "student" | "company" | "admin";
    createdAt: string;
    updatedAt?: string;
    isVerified: boolean;
    profile?: {
      phone?: string;
      location?: string;
      bio?: string;
      skills?: string[];
      experience?: string;
      education?: string;
      resume?: string;
      // Student specific fields
      college?: string;
      course?: string;
      graduationYear?: string;
      // Company specific fields
      companyName?: string;
      designation?: string;
      companySize?: string;
    };
  };
}

export const mockLoginCredentials: LoginCredential[] = [
  // Student accounts
  {
    email: "john.student@gmail.com",
    password: "student123",
    user: {
      id: "1",
      email: "john.student@gmail.com",
      name: "John Doe",
      avatar: "/img1.jpg",
      role: "student",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-12-01T14:20:00Z",
      isVerified: true,
      profile: {
        phone: "+1-555-0123",
        location: "San Francisco, CA",
        bio: "Passionate computer science student seeking product management internships. Strong analytical skills and keen interest in tech innovation.",
        skills: [
          "Python",
          "JavaScript",
          "React",
          "Data Analysis",
          "Product Strategy",
          "Agile",
          "Figma",
        ],
        experience: "1 year",
        education: "Bachelor's in Computer Science",
        college: "Stanford University",
        course: "Computer Science",
        graduationYear: "2025",
        resume: "john_doe_resume.pdf",
      },
    },
  },
  {
    email: "sarah.dev@university.edu",
    password: "password123",
    user: {
      id: "2",
      email: "sarah.dev@university.edu",
      name: "Sarah Johnson",
      avatar: "/img2.jpg",
      role: "student",
      createdAt: "2024-02-20T08:15:00Z",
      updatedAt: "2024-11-28T16:45:00Z",
      isVerified: true,
      profile: {
        phone: "+1-555-0456",
        location: "Boston, MA",
        bio: "Final year engineering student with experience in full-stack development. Looking for opportunities in product management and UX design.",
        skills: [
          "Full-Stack Development",
          "UX/UI Design",
          "Product Research",
          "SQL",
          "Node.js",
          "MongoDB",
        ],
        experience: "2 years",
        education: "Bachelor's in Software Engineering",
        college: "MIT",
        course: "Software Engineering",
        graduationYear: "2024",
        resume: "sarah_johnson_resume.pdf",
      },
    },
  },
  {
    email: "alex.pm@college.edu",
    password: "intern2024",
    user: {
      id: "3",
      email: "alex.pm@college.edu",
      name: "Alex Chen",
      avatar: "/img3.jpg",
      role: "student",
      createdAt: "2024-03-10T12:00:00Z",
      updatedAt: "2024-12-02T09:30:00Z",
      isVerified: true,
      profile: {
        phone: "+1-555-0789",
        location: "Austin, TX",
        bio: "MBA student with tech background, specializing in product management. Previous experience in software development and business analysis.",
        skills: [
          "Product Management",
          "Business Analysis",
          "Scrum",
          "Market Research",
          "Python",
          "Tableau",
        ],
        experience: "3 years",
        education: "MBA in Technology Management",
        college: "University of Texas",
        course: "MBA - Technology Management",
        graduationYear: "2024",
        resume: "alex_chen_resume.pdf",
      },
    },
  },

  // Company accounts
  {
    email: "hr@techcorp.com",
    password: "company123",
    user: {
      id: "101",
      email: "hr@techcorp.com",
      name: "Emily Rodriguez",
      avatar: "/img4.jpg",
      role: "company",
      createdAt: "2024-01-05T09:00:00Z",
      updatedAt: "2024-12-01T11:15:00Z",
      isVerified: true,
      profile: {
        phone: "+1-555-1000",
        location: "San Jose, CA",
        bio: "Senior HR Manager at TechCorp, specializing in talent acquisition for product management and engineering roles. Passionate about connecting top talent with innovative opportunities.",
        companyName: "TechCorp Solutions",
        designation: "Senior HR Manager",
        companySize: "500-1000",
      },
    },
  },
  {
    email: "recruitment@innovateai.com",
    password: "recruiter456",
    user: {
      id: "102",
      email: "recruitment@innovateai.com",
      name: "Michael Thompson",
      avatar: "/img5.jpg",
      role: "company",
      createdAt: "2024-02-12T14:30:00Z",
      updatedAt: "2024-11-30T10:45:00Z",
      isVerified: true,
      profile: {
        phone: "+1-555-2000",
        location: "Seattle, WA",
        bio: "Lead Recruiter at InnovateAI focusing on product management and AI/ML internships. Building the next generation of product leaders.",
        companyName: "InnovateAI",
        designation: "Lead Recruiter",
        companySize: "100-500",
      },
    },
  },
  {
    email: "talent@startup.co",
    password: "startup789",
    user: {
      id: "103",
      email: "talent@startup.co",
      name: "Jessica Wang",
      avatar: "/img6.jpg",
      role: "company",
      createdAt: "2024-03-25T16:20:00Z",
      updatedAt: "2024-12-02T13:10:00Z",
      isVerified: true,
      profile: {
        phone: "+1-555-3000",
        location: "New York, NY",
        bio: "Talent Acquisition Specialist at GrowthStartup. Focused on finding passionate interns who want to make an impact in a fast-paced startup environment.",
        companyName: "GrowthStartup",
        designation: "Talent Acquisition Specialist",
        companySize: "10-50",
      },
    },
  },

  // Admin account
  {
    email: "admin@internmatch.com",
    password: "admin123",
    user: {
      id: "999",
      email: "admin@internmatch.com",
      name: "Admin User",
      avatar: "/img7.jpg",
      role: "admin",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-12-02T15:00:00Z",
      isVerified: true,
      profile: {
        phone: "+1-555-9999",
        location: "San Francisco, CA",
        bio: "Platform administrator with full access to manage users, companies, and system settings.",
        companyName: "InternMatch",
        designation: "System Administrator",
        companySize: "10-50",
      },
    },
  },
];

// Helper function to authenticate user
export const authenticateUser = (
  email: string,
  password: string
): LoginCredential | null => {
  const credential = mockLoginCredentials.find(
    (cred) =>
      cred.email.toLowerCase() === email.toLowerCase() &&
      cred.password === password
  );
  return credential || null;
};

// Helper function to get user by email (for password reset functionality)
export const getUserByEmail = (email: string): LoginCredential | null => {
  const credential = mockLoginCredentials.find(
    (cred) => cred.email.toLowerCase() === email.toLowerCase()
  );
  return credential || null;
};

// Export demo credentials for easy access
export const demoCredentials = {
  student: {
    email: "john.student@gmail.com",
    password: "student123",
  },
  company: {
    email: "hr@techcorp.com",
    password: "company123",
  },
  admin: {
    email: "admin@internmatch.com",
    password: "admin123",
  },
};
