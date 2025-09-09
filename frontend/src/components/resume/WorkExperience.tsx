import React, { useState } from 'react';

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

interface WorkExperienceProps {
  data: WorkExperienceType[];
  onUpdate: (data: WorkExperienceType[]) => void;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = () => Date.now().toString();

  const addExperience = (type: 'job' | 'internship') => {
    const newExperience: WorkExperienceType = {
      id: generateId(),
      type,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentlyWorking: false,
      description: [''],
      technologies: []
    };
    onUpdate([...data, newExperience]);
    setEditingId(newExperience.id);
  };

  const updateExperience = (id: string, field: keyof WorkExperienceType, value: any) => {
    const updatedData = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate(updatedData);
  };

  const deleteExperience = (id: string) => {
    const updatedData = data.filter(exp => exp.id !== id);
    onUpdate(updatedData);
  };

  const addDescriptionPoint = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'description', [...experience.description, '']);
    }
  };

  const updateDescriptionPoint = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const updatedDescription = [...experience.description];
      updatedDescription[index] = value;
      updateExperience(id, 'description', updatedDescription);
    }
  };

  const removeDescriptionPoint = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience && experience.description.length > 1) {
      const updatedDescription = experience.description.filter((_, i) => i !== index);
      updateExperience(id, 'description', updatedDescription);
    }
  };

  const addTechnology = (id: string, tech: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience && tech.trim() && !experience.technologies.includes(tech.trim())) {
      updateExperience(id, 'technologies', [...experience.technologies, tech.trim()]);
    }
  };

  const removeTechnology = (id: string, tech: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const updatedTechnologies = experience.technologies.filter(t => t !== tech);
      updateExperience(id, 'technologies', updatedTechnologies);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your work experience including jobs and internships</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => addExperience('job')}
          className="px-6 py-3 bg-peach text-charcoal rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
        >
          <span>💼</span>
          <span>Add Job</span>
        </button>
        <button
          onClick={() => addExperience('internship')}
          className="px-6 py-3 bg-peach text-charcoal rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
        >
          <span>🎯</span>
          <span>Add Internship</span>
        </button>
      </div>

      <div className="space-y-6">
        {data.map((experience) => (
          <div key={experience.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  experience.type === 'job' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {experience.type.toUpperCase()}
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {experience.position || `New ${experience.type}`}
                  </h3>
                  {experience.company && (
                    <p className="text-sm text-gray-600">{experience.company}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(editingId === experience.id ? null : experience.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingId === experience.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteExperience(experience.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === experience.id && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position/Role *
                    </label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                      placeholder="Software Developer, Data Analyst, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization *
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                      placeholder="Company name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                      placeholder="City, State/Country"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                      disabled={experience.isCurrentlyWorking}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={experience.isCurrentlyWorking}
                        onChange={(e) => {
                          updateExperience(experience.id, 'isCurrentlyWorking', e.target.checked);
                          if (e.target.checked) {
                            updateExperience(experience.id, 'endDate', '');
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Currently working here</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Job Description & Responsibilities</h4>
                  {experience.description.map((desc, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <textarea
                        value={desc}
                        onChange={(e) => updateDescriptionPoint(experience.id, index, e.target.value)}
                        placeholder="Describe your responsibilities and achievements"
                        rows={2}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                      {experience.description.length > 1 && (
                        <button
                          onClick={() => removeDescriptionPoint(experience.id, index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addDescriptionPoint(experience.id)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Add Description Point
                  </button>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Technologies Used</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Add technology and press Enter"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          addTechnology(experience.id, target.value);
                          target.value = '';
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(experience.id, tech)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
