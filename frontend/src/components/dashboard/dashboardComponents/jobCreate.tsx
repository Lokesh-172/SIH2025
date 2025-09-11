'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Plus,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  FileText,
  Users,
  X,
  Check
} from 'lucide-react';

const departments = [
  "Engineering", 
  "Analytics", 
  "Design", 
  "Product", 
  "Marketing", 
  "Operations"
];

const castes = ["General", "OBC", "SC", "ST", "EWS"];
const categories = ["Open", "Reserved"];
const genderOptions = ["Male", "Female", "Other"];

interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipend: string;
  skills: string;
  deadline: string;
  description: string;
  requirements: string;
  casteCategory: string;
  reservationCategory: string;
  allowedGenders: string[];
  minQualification: string;
  experienceRequired: string;
  ageLimit: string;
}

interface JobCreationFormProps {
  onSubmit?: (job: any) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

const JobCreationForm: React.FC<JobCreationFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isModal = false 
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    department: '',
    location: '',
    type: 'Remote',
    duration: '',
    stipend: '',
    skills: '',
    deadline: '',
    description: '',
    requirements: '',
    casteCategory: 'Open to All',
    reservationCategory: 'Open',
    allowedGenders: ['Male', 'Female', 'Other'],
    minQualification: '',
    experienceRequired: 'Fresher',
    ageLimit: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors for the field being edited
    if (errors.includes(name)) {
      setErrors(prev => prev.filter(error => error !== name));
    }
  };

  const handleGenderChange = (gender: string) => {
    setFormData(prev => {
      let newGenders = [...prev.allowedGenders];
      if (newGenders.includes(gender)) {
        newGenders = newGenders.filter(g => g !== gender);
      } else {
        newGenders.push(gender);
      }
      return {
        ...prev,
        allowedGenders: newGenders
      };
    });
    
    if (errors.includes('allowedGenders')) {
      setErrors(prev => prev.filter(error => error !== 'allowedGenders'));
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.title) newErrors.push('title');
    if (!formData.department) newErrors.push('department');
    if (!formData.location) newErrors.push('location');
    if (!formData.duration) newErrors.push('duration');
    if (!formData.stipend) newErrors.push('stipend');
    if (!formData.skills) newErrors.push('skills');
    if (!formData.deadline) newErrors.push('deadline');
    if (!formData.description) newErrors.push('description');
    if (formData.allowedGenders.length === 0) newErrors.push('allowedGenders');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create job object
      const newJob = {
        id: Date.now().toString(),
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        requirements: formData.requirements.split(',').map(req => req.trim()).filter(req => req),
        status: 'active',
        postedDate: new Date().toISOString().split('T')[0],
        applicationsCount: 0
      };

      // Call onSubmit if provided, otherwise navigate back
      if (onSubmit) {
        onSubmit(newJob);
      } else {
        console.log('Job created:', newJob);
        alert('Job posted successfully!');
        router.push('/company/dashboard');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Error posting job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <div className={`${isModal ? 'p-6' : 'min-h-screen bg-slate-50 py-8'}`}>
      <div className={`${isModal ? '' : 'max-w-4xl mx-auto px-6'}`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-peach p-6 text-charcoal">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Plus className="h-6 w-6 mr-2" />
                  Create New Job Posting
                </h1>
                <p className="text-charcoal/80 mt-1">
                  Fill in the details to post your internship opportunity
                </p>
              </div>
              {isModal && (
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-charcoal/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Display */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 font-medium mb-2">
                  Please fill in the following required fields:
                </p>
                <ul className="text-red-600 text-sm space-y-1">
                  {errors.map(error => (
                    <li key={error} className="flex items-center">
                      <X className="h-3 w-3 mr-2" />
                      {error === 'allowedGenders' ? 'Allowed Genders' : 
                       error.charAt(0).toUpperCase() + error.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Job Title *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors ${
                      errors.includes('title') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Frontend Developer Intern"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors ${
                    errors.includes('department') ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors ${
                      errors.includes('location') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Bangalore, India"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Work Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Duration *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors ${
                      errors.includes('duration') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 3 months"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Stipend *
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors ${
                      errors.includes('stipend') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 15,000/month"
                  />
                </div>
              </div>

              {/* NEW FIELDS - Eligibility Criteria */}
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Caste Category
                </label>
                <select
                  name="casteCategory"
                  value={formData.casteCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
                >
                  <option value="Open to All">Open to All</option>
                  {castes.map(caste => (
                    <option key={caste} value={caste}>
                      {caste}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Reservation Category
                </label>
                <select
                  name="reservationCategory"
                  value={formData.reservationCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
                >
                  <option value="Open">Open</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Experience Required
                </label>
                <select
                  name="experienceRequired"
                  value={formData.experienceRequired}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
                >
                  <option value="Fresher">Fresher</option>
                  <option value="0-6 months">0-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2+ years">2+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Age Limit
                </label>
                <input
                  type="text"
                  name="ageLimit"
                  value={formData.ageLimit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
                  placeholder="e.g., 18-28 years"
                />
              </div>
            </div>

            {/* Gender Preferences */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Allowed Genders *
              </label>
              <div className="flex flex-wrap gap-4">
                {genderOptions.map(gender => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.allowedGenders.includes(gender)}
                      onChange={() => handleGenderChange(gender)}
                      className="rounded border-gray-300 text-peach focus:ring-peach focus:ring-offset-0"
                    />
                    <span className="text-sm text-charcoal">{gender}</span>
                  </label>
                ))}
              </div>
              {errors.includes('allowedGenders') && (
                <p className="text-red-600 text-xs mt-1">Please select at least one gender</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Required Skills *
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors ${
                  errors.includes('skills') ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., React, JavaScript, TypeScript (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate skills with commas
              </p>
            </div>

            {/* Minimum Qualification */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Minimum Qualification
              </label>
              <input
                type="text"
                name="minQualification"
                value={formData.minQualification}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
                placeholder="e.g., B.Tech/BE in Computer Science or equivalent"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Application Deadline *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors ${
                    errors.includes('deadline') ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors resize-none ${
                  errors.includes('description') ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the role, responsibilities, and what the intern will learn..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Additional Requirements
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach focus:border-peach transition-colors resize-none"
                placeholder="List specific requirements, qualifications, or preferences (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Separate requirements with commas
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-melon text-white rounded-lg hover:bg-melon/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Post Job
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobCreationForm;
