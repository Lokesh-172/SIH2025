import React, { useState } from 'react';

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

interface EducationProps {
  data: EducationType[];
  onUpdate: (data: EducationType[]) => void;
}

const Education: React.FC<EducationProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = () => Date.now().toString();

  const addEducation = () => {
    const newEducation: EducationType = {
      id: generateId(),
      degree: '',
      specialization: '',
      institution: '',
      location: '',
      startYear: '',
      endYear: '',
      cgpa: '',
      percentage: '',
      achievements: []
    };
    onUpdate([...data, newEducation]);
    setEditingId(newEducation.id);
  };

  const updateEducation = (id: string, field: keyof EducationType, value: any) => {
    const updatedData = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate(updatedData);
  };

  const deleteEducation = (id: string) => {
    const updatedData = data.filter(edu => edu.id !== id);
    onUpdate(updatedData);
  };

  const addAchievement = (id: string) => {
    const education = data.find(edu => edu.id === id);
    if (education) {
      updateEducation(id, 'achievements', [...education.achievements, '']);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const education = data.find(edu => edu.id === id);
    if (education) {
      const updatedAchievements = [...education.achievements];
      updatedAchievements[index] = value;
      updateEducation(id, 'achievements', updatedAchievements);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const education = data.find(edu => edu.id === id);
    if (education) {
      const updatedAchievements = education.achievements.filter((_, i) => i !== index);
      updateEducation(id, 'achievements', updatedAchievements);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">Add your educational qualifications starting from the most recent</p>
      </div>

      <div className="space-y-6">
        {data.map((education) => (
          <div key={education.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {education.degree || 'New Education Entry'}
                </h3>
                {education.institution && (
                  <p className="text-sm text-gray-600">{education.institution}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(editingId === education.id ? null : education.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingId === education.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteEducation(education.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === education.id && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree/Course *
                    </label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                      placeholder="B.Tech, M.Tech, B.Sc, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={education.specialization}
                      onChange={(e) => updateEducation(education.id, 'specialization', e.target.value)}
                      placeholder="Electronics and Communication"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution *
                    </label>
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                      placeholder="Delhi Technological University"
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
                      value={education.location}
                      onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                      placeholder="New Delhi, India"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Year *
                    </label>
                    <select
                      value={education.startYear}
                      onChange={(e) => updateEducation(education.id, 'startYear', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 20 }, (_, i) => 2010 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Year *
                    </label>
                    <select
                      value={education.endYear}
                      onChange={(e) => updateEducation(education.id, 'endYear', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 20 }, (_, i) => 2015 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CGPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      max="10"
                      value={education.cgpa}
                      onChange={(e) => updateEducation(education.id, 'cgpa', e.target.value)}
                      placeholder="8.5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Percentage
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      max="100"
                      value={education.percentage}
                      onChange={(e) => updateEducation(education.id, 'percentage', e.target.value)}
                      placeholder="85.5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Achievements & Honors</h4>
                  {education.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateAchievement(education.id, index, e.target.value)}
                        placeholder="Achievement or honor received"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => removeAchievement(education.id, index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addAchievement(education.id)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Add Achievement
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addEducation}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Add Education</span>
        </button>
      </div>
    </div>
  );
};

export default Education;
