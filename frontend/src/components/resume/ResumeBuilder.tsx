'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import PersonalInfo from './PersonalInfo';
import CareerObjective from './CareerObjective';
import Education from './Education';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Projects from './Projects';
import ExtraCurricular from './ExtraCurricular';
import Trainings from './Trainings';
import Portfolio from './Portfolio';
import Accomplishments from './Accomplishments';
import ResumePreview from './ResumePreview';

// Interfaces remain the same (omitted for brevity)
interface PersonalInfoType {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  nationality: string;
  maritalStatus: string;
  profileImage: string;
}

interface EducationType {
  id: string;
  degree: string;
  specialization: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  cgpa: string;
  percentage: string;
  achievements: string[];
}

interface WorkExperienceType {
  id: string;
  type: 'job' | 'internship';
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  description: string[];
  technologies: string[];
}

interface SkillType {
  id: string;
  category: string;
  skills: string[];
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface ProjectType {
  id: string;
  title: string;
  type: 'academic' | 'personal';
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  githubLink: string;
  liveLink: string;
  achievements: string[];
}

interface ExtraCurricularType {
  id: string;
  title: string;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface TrainingType {
  id: string;
  title: string;
  provider: string;
  completionDate: string;
  certificateLink: string;
  skills: string[];
  duration: string;
}

interface PortfolioType {
  id: string;
  title: string;
  type: string;
  link: string;
  description: string;
  image: string;
}

interface AccomplishmentType {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  issuer: string;
}

interface ResumeData {
  personalInfo: PersonalInfoType;
  careerObjective: string;
  education: EducationType[];
  workExperience: WorkExperienceType[];
  skills: SkillType[];
  projects: ProjectType[];
  extraCurricular: ExtraCurricularType[];
  trainings: TrainingType[];
  portfolio: PortfolioType[];
  accomplishments: AccomplishmentType[];
}

interface ResumeBuilderProps {
  onResumeComplete?: (resumeData: ResumeData) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  onResumeComplete,
  onCancel,
  isModal = false,
}) => {
  const [activeSection, setActiveSection] = useState('personal-info');
  const [previewMode, setPreviewMode] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      github: '',
      portfolio: '',
      dateOfBirth: '',
      gender: '',
      category: '',
      nationality: 'Indian',
      maritalStatus: '',
      profileImage: '',
    },
    careerObjective: '',
    education: [],
    workExperience: [],
    skills: [],
    projects: [],
    extraCurricular: [],
    trainings: [],
    portfolio: [],
    accomplishments: [],
  });

  const printRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // This logic is correct and does not need to be changed.
  // It scrolls the inner component (`contentRef`) to the top.
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData.personalInfo.fullName || 'Resume'}_Professional`,
    onAfterPrint: () => {
      console.log('Resume PDF generated successfully!');
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const sections = [
    { id: 'personal-info', label: 'Personal Information' },
    { id: 'career-objective', label: 'Career Objective' },
    { id: 'education', label: 'Education' },
    { id: 'work-experience', label: 'Work Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'extra-curricular', label: 'Extra Curricular' },
    { id: 'trainings', label: 'Trainings/Courses' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'accomplishments', label: 'Accomplishments' },
  ];

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const calculateProgress = () => {
    let completedSections = 0;
    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email) completedSections++;
    if (resumeData.careerObjective) completedSections++;
    if (resumeData.education.length > 0) completedSections++;
    if (resumeData.workExperience.length > 0) completedSections++;
    if (resumeData.skills.length > 0) completedSections++;
    if (resumeData.projects.length > 0) completedSections++;
    if (resumeData.extraCurricular.length > 0) completedSections++;
    if (resumeData.trainings.length > 0) completedSections++;
    if (resumeData.portfolio.length > 0) completedSections++;
    if (resumeData.accomplishments.length > 0) completedSections++;
    return (completedSections / sections.length) * 100;
  };

  const handleSaveResume = () => {
    if (isModal && onResumeComplete) {
      onResumeComplete(resumeData);
    } else {
      console.log('Resume saved:', resumeData);
      handlePrint();
    }
  };

  const renderActiveSection = () => {
    // This function's content remains the same
    switch (activeSection) {
      case 'personal-info': return <PersonalInfo data={resumeData.personalInfo} onUpdate={(data) => updateResumeData('personalInfo', data)} />;
      case 'career-objective': return <CareerObjective data={resumeData.careerObjective} onUpdate={(data) => updateResumeData('careerObjective', data)} />;
      case 'education': return <Education data={resumeData.education} onUpdate={(data) => updateResumeData('education', data)} />;
      case 'work-experience': return <WorkExperience data={resumeData.workExperience} onUpdate={(data) => updateResumeData('workExperience', data)} />;
      case 'skills': return <Skills data={resumeData.skills} onUpdate={(data) => updateResumeData('skills', data)} />;
      case 'projects': return <Projects data={resumeData.projects} onUpdate={(data) => updateResumeData('projects', data)} />;
      case 'extra-curricular': return <ExtraCurricular data={resumeData.extraCurricular} onUpdate={(data) => updateResumeData('extraCurricular', data)} />;
      case 'trainings': return <Trainings data={resumeData.trainings} onUpdate={(data) => updateResumeData('trainings', data)} />;
      case 'portfolio': return <Portfolio data={resumeData.portfolio} onUpdate={(data) => updateResumeData('portfolio', data)} />;
      case 'accomplishments': return <Accomplishments data={resumeData.accomplishments} onUpdate={(data) => updateResumeData('accomplishments', data)} />;
      default: return <div className="p-8 text-center text-slate-500">Section not found</div>;
    }
  };

  // Preview Mode UI (unchanged)
  if (previewMode) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Resume Preview</h1>
                <p className="text-sm text-slate-600">Review and download your professional resume</p>
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={() => setPreviewMode(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors font-medium text-sm">
                  Back to Edit
                </button>
                <button type="button" onClick={handlePrint} className="px-6 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm shadow-sm">
                  Download PDF
                </button>
                {isModal && (
                  <button type="button" onClick={handleSaveResume} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-sm">
                    Use This Resume
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div ref={printRef}>
          <ResumePreview data={resumeData} />
        </div>
      </div>
    );
  }

  // Main Builder Interface with layout changes
  return (
    // CHANGE #1: Set a fixed viewport height and hide overflow to remove the page scroller.
    <div className="h-screen overflow-hidden bg-slate-50">
      {/* CHANGE #2: Make the main container and its flex child fill the available height. */}
      <div className="max-w-7xl mx-auto px-6 py-8 h-full">
        <div className="flex gap-8 h-full">
          <div className="w-80 flex-shrink-0">
            {/* The sticky sidebar works within this constrained layout */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Resume Builder</h2>
                <p className="text-sm text-slate-600">Create your professional resume</p>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <span className="text-sm text-slate-500 font-medium">
                    {Math.round(calculateProgress())}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-900 h-2 rounded-full transition-all duration-300" style={{ width: `${calculateProgress()}%` }} />
                </div>
              </div>
              <nav className="space-y-1 mb-6">
                {sections.map((section, index) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-3 rounded-md text-left transition-all duration-200 ${isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                      <span className="text-xs font-mono w-6 text-center mr-3 opacity-75">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="space-y-2">
                <button onClick={() => setPreviewMode(true)} className="w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium">
                  Preview Resume
                </button>
                {isModal && onCancel && (
                  <button onClick={onCancel} className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            {/* CHANGE #3: This div now fills its parent's height and scrolls internally. */}
            <div
              ref={contentRef}
              className="bg-white rounded-lg border border-slate-200 shadow-sm h-full overflow-y-auto"
            >
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;