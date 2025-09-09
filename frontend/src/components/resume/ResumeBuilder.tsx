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

// Interfaces remain the same
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    // Close mobile menu when section changes
    setShowMobileMenu(false);
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
    { id: 'personal-info', label: 'Personal Information', short: 'Personal' },
    { id: 'career-objective', label: 'Career Objective', short: 'Objective' },
    { id: 'education', label: 'Education', short: 'Education' },
    { id: 'work-experience', label: 'Work Experience', short: 'Experience' },
    { id: 'skills', label: 'Skills', short: 'Skills' },
    { id: 'projects', label: 'Projects', short: 'Projects' },
    { id: 'extra-curricular', label: 'Extra Curricular', short: 'Activities' },
    { id: 'trainings', label: 'Trainings/Courses', short: 'Trainings' },
    { id: 'portfolio', label: 'Portfolio', short: 'Portfolio' },
    { id: 'accomplishments', label: 'Accomplishments', short: 'Awards' },
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

  const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
  const currentSection = sections[currentSectionIndex];

  // Navigation functions
  const goToPrevSection = () => {
    if (currentSectionIndex > 0) {
      setActiveSection(sections[currentSectionIndex - 1].id);
    }
  };

  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setActiveSection(sections[currentSectionIndex + 1].id);
    }
  };

  // Preview Mode UI
  if (previewMode) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-4">
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Resume Preview</h1>
                <p className="text-sm text-slate-600">Review and download your professional resume</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button 
                  type="button" 
                  onClick={() => setPreviewMode(false)} 
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors font-medium text-sm order-2 sm:order-1"
                >
                  Back to Edit
                </button>
                <button 
                  type="button" 
                  onClick={handlePrint} 
                  className="px-6 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm shadow-sm order-1 sm:order-2"
                >
                  Download PDF
                </button>
                {isModal && (
                  <button 
                    type="button" 
                    onClick={handleSaveResume} 
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-sm order-1 sm:order-3"
                  >
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

  // Main Builder Interface - Mobile First Design
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Resume Builder</h1>
              <p className="text-xs text-slate-600">{currentSection?.label}</p>
            </div>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-slate-700">Progress</span>
              <span className="text-xs text-slate-500 font-medium">
                {Math.round(calculateProgress())}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className="bg-slate-900 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${calculateProgress()}%` }} 
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevSection}
              disabled={currentSectionIndex === 0}
              className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <span className="text-xs text-slate-500 font-medium">
              {currentSectionIndex + 1} of {sections.length}
            </span>
            
            <button
              onClick={goToNextSection}
              disabled={currentSectionIndex === sections.length - 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              Next
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="border-t border-slate-200 bg-white">
            <div className="max-h-64 overflow-y-auto">
              {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-4 py-3 text-left border-b border-slate-100 last:border-b-0 ${
                      isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-mono w-8 text-center mr-3 opacity-75">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="p-4 border-t border-slate-200">
              <button 
                onClick={() => setPreviewMode(true)} 
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium mb-2"
              >
                Preview Resume
              </button>
              {isModal && onCancel && (
                <button 
                  onClick={onCancel} 
                  className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="lg:flex lg:gap-8 lg:h-screen lg:overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
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
                  <div 
                    className="bg-slate-900 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${calculateProgress()}%` }} 
                  />
                </div>
              </div>
              
              <nav className="space-y-1 mb-6">
                {sections.map((section, index) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-3 rounded-md text-left transition-all duration-200 ${
                        isActive 
                          ? 'bg-slate-900 text-white shadow-sm' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-xs font-mono w-6 text-center mr-3 opacity-75">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setPreviewMode(true)} 
                  className="w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                  Preview Resume
                </button>
                {isModal && onCancel && (
                  <button 
                    onClick={onCancel} 
                    className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:overflow-hidden">
            <div
              ref={contentRef}
              className="bg-white rounded-lg border border-slate-200 shadow-sm h-full overflow-y-auto"
            >
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30">
        <div className="flex items-center justify-center px-4 py-3">
          <button 
            onClick={() => setPreviewMode(true)} 
            className="px-6 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm"
          >
            Preview Resume
          </button>
        </div>
      </div>

      {/* Mobile Content Padding Bottom */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
};

export default ResumeBuilder;