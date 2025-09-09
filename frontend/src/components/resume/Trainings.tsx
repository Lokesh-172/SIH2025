import React, { useState } from 'react';

interface TrainingType {
  id: string;
  title: string;
  provider: string;
  completionDate: string;
  certificateLink: string;
  skills: string[];
  duration: string;
}

interface TrainingsProps {
  data: TrainingType[];
  onUpdate: (data: TrainingType[]) => void;
}

const Trainings: React.FC<TrainingsProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = () => Date.now().toString();

  const addTraining = () => {
    const newTraining: TrainingType = {
      id: generateId(),
      title: '',
      provider: '',
      completionDate: '',
      certificateLink: '',
      skills: [],
      duration: ''
    };
    onUpdate([...data, newTraining]);
    setEditingId(newTraining.id);
  };

  const updateTraining = (id: string, field: keyof TrainingType, value: any) => {
    const updatedData = data.map(training => 
      training.id === id ? { ...training, [field]: value } : training
    );
    onUpdate(updatedData);
  };

  const deleteTraining = (id: string) => {
    const updatedData = data.filter(training => training.id !== id);
    onUpdate(updatedData);
  };

  const addSkill = (id: string, skill: string) => {
    const training = data.find(t => t.id === id);
    if (training && skill.trim() && !training.skills.includes(skill.trim())) {
      updateTraining(id, 'skills', [...training.skills, skill.trim()]);
    }
  };

  const removeSkill = (id: string, skill: string) => {
    const training = data.find(t => t.id === id);
    if (training) {
      const updatedSkills = training.skills.filter(s => s !== skill);
      updateTraining(id, 'skills', updatedSkills);
    }
  };

  const popularTrainings = [
    { title: 'Full Stack Web Development', provider: 'freeCodeCamp' },
    { title: 'Data Science with Python', provider: 'Coursera' },
    { title: 'AWS Cloud Practitioner', provider: 'Amazon Web Services' },
    { title: 'Machine Learning', provider: 'Andrew Ng - Coursera' },
    { title: 'React - The Complete Guide', provider: 'Udemy' },
    { title: 'Digital Marketing', provider: 'Google Digital Garage' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trainings & Courses</h2>
        <p className="text-gray-600">Add certifications, online courses, and professional training programs</p>
      </div>

      <div className="space-y-6">
        {data.map((training) => (
          <div key={training.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {training.title || 'New Training/Course'}
                </h3>
                {training.provider && (
                  <p className="text-sm text-gray-600">{training.provider}</p>
                )}
                {training.completionDate && (
                  <p className="text-sm text-blue-600">
                    Completed: {new Date(training.completionDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(editingId === training.id ? null : training.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingId === training.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteTraining(training.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === training.id && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course/Training Title *
                    </label>
                    <input
                      type="text"
                      value={training.title}
                      onChange={(e) => updateTraining(training.id, 'title', e.target.value)}
                      placeholder="e.g., Full Stack Web Development, Data Science"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider/Institution *
                    </label>
                    <input
                      type="text"
                      value={training.provider}
                      onChange={(e) => updateTraining(training.id, 'provider', e.target.value)}
                      placeholder="e.g., Coursera, Udemy, Google, AWS"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={training.completionDate}
                      onChange={(e) => updateTraining(training.id, 'completionDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={training.duration}
                      onChange={(e) => updateTraining(training.id, 'duration', e.target.value)}
                      placeholder="e.g., 40 hours, 3 months, 12 weeks"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Link
                    </label>
                    <input
                      type="url"
                      value={training.certificateLink}
                      onChange={(e) => updateTraining(training.id, 'certificateLink', e.target.value)}
                      placeholder="Link to certificate or credential"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Skills Gained</h4>
                  <input
                    type="text"
                    placeholder="Add skill and press Enter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        addSkill(training.id, target.value);
                        target.value = '';
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {training.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(training.id, skill)}
                          className="ml-2 text-teal-600 hover:text-teal-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {editingId !== training.id && (
              <div className="space-y-2">
                {training.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {training.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {training.certificateLink && (
                  <a
                    href={training.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <span className="mr-1">🏆</span>
                    View Certificate
                  </a>
                )}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addTraining}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Add Training/Course</span>
        </button>

        {/* Popular Trainings */}
        {data.length === 0 && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-teal-900 mb-3">Popular Training Courses</h3>
            <div className="grid gap-2">
              {popularTrainings.map((training, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newTraining: TrainingType = {
                      id: generateId(),
                      title: training.title,
                      provider: training.provider,
                      completionDate: '',
                      certificateLink: '',
                      skills: [],
                      duration: ''
                    };
                    onUpdate([...data, newTraining]);
                    setEditingId(newTraining.id);
                  }}
                  className="text-left px-4 py-3 bg-white border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
                >
                  <div className="font-medium text-teal-800">{training.title}</div>
                  <div className="text-sm text-teal-600">{training.provider}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainings;
