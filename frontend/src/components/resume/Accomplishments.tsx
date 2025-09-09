import React, { useState } from 'react';

interface AccomplishmentType {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  issuer: string;
}

interface AccomplishmentsProps {
  data: AccomplishmentType[];
  onUpdate: (data: AccomplishmentType[]) => void;
}

const Accomplishments: React.FC<AccomplishmentsProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = () => Date.now().toString();

  const accomplishmentCategories = [
    'Award',
    'Competition',
    'Recognition',
    'Achievement',
    'Honor',
    'Scholarship',
    'Publication',
    'Patent',
    'Speaking Engagement',
    'Media Coverage',
    'Other'
  ];

  const addAccomplishment = () => {
    const newAccomplishment: AccomplishmentType = {
      id: generateId(),
      title: '',
      category: '',
      date: '',
      description: '',
      issuer: ''
    };
    onUpdate([...data, newAccomplishment]);
    setEditingId(newAccomplishment.id);
  };

  const updateAccomplishment = (id: string, field: keyof AccomplishmentType, value: any) => {
    const updatedData = data.map(accomplishment => 
      accomplishment.id === id ? { ...accomplishment, [field]: value } : accomplishment
    );
    onUpdate(updatedData);
  };

  const deleteAccomplishment = (id: string) => {
    const updatedData = data.filter(accomplishment => accomplishment.id !== id);
    onUpdate(updatedData);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Award': 'bg-yellow-100 text-yellow-800',
      'Competition': 'bg-blue-100 text-blue-800',
      'Recognition': 'bg-green-100 text-green-800',
      'Achievement': 'bg-purple-100 text-purple-800',
      'Honor': 'bg-red-100 text-red-800',
      'Scholarship': 'bg-indigo-100 text-indigo-800',
      'Publication': 'bg-gray-100 text-gray-800',
      'Patent': 'bg-orange-100 text-orange-800',
      'Speaking Engagement': 'bg-pink-100 text-pink-800',
      'Media Coverage': 'bg-cyan-100 text-cyan-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const sampleAccomplishments = [
    { title: 'Dean\'s List', category: 'Honor', issuer: 'University' },
    { title: 'Hackathon Winner', category: 'Competition', issuer: 'Tech Event' },
    { title: 'Best Student Award', category: 'Award', issuer: 'Department' },
    { title: 'Research Paper Published', category: 'Publication', issuer: 'Journal' },
    { title: 'Merit Scholarship', category: 'Scholarship', issuer: 'Institution' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Accomplishments & Additional Details</h2>
        <p className="text-gray-600">Highlight your awards, recognitions, and other notable achievements</p>
      </div>

      <div className="space-y-6">
        {data.map((accomplishment) => (
          <div key={accomplishment.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {accomplishment.category && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(accomplishment.category)}`}>
                    {accomplishment.category}
                  </span>
                )}
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {accomplishment.title || 'New Accomplishment'}
                  </h3>
                  {accomplishment.issuer && (
                    <p className="text-sm text-gray-600">{accomplishment.issuer}</p>
                  )}
                  {accomplishment.date && (
                    <p className="text-sm text-blue-600">
                      {new Date(accomplishment.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(editingId === accomplishment.id ? null : accomplishment.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingId === accomplishment.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteAccomplishment(accomplishment.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === accomplishment.id && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={accomplishment.title}
                      onChange={(e) => updateAccomplishment(accomplishment.id, 'title', e.target.value)}
                      placeholder="e.g., Dean's List, Best Student Award"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={accomplishment.category}
                      onChange={(e) => updateAccomplishment(accomplishment.id, 'category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {accomplishmentCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issuer/Organization
                    </label>
                    <input
                      type="text"
                      value={accomplishment.issuer}
                      onChange={(e) => updateAccomplishment(accomplishment.id, 'issuer', e.target.value)}
                      placeholder="e.g., University, IEEE, Google"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={accomplishment.date}
                      onChange={(e) => updateAccomplishment(accomplishment.id, 'date', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={accomplishment.description}
                    onChange={(e) => updateAccomplishment(accomplishment.id, 'description', e.target.value)}
                    placeholder="Brief description of the accomplishment and its significance"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            )}

            {editingId !== accomplishment.id && accomplishment.description && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">{accomplishment.description}</p>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addAccomplishment}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-cyan-400 hover:text-cyan-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Add Accomplishment</span>
        </button>

        {/* Sample Accomplishments */}
        {data.length === 0 && (
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-cyan-900 mb-3">Common Accomplishments</h3>
            <div className="grid gap-2">
              {sampleAccomplishments.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newAccomplishment: AccomplishmentType = {
                      id: generateId(),
                      title: sample.title,
                      category: sample.category,
                      issuer: sample.issuer,
                      date: '',
                      description: ''
                    };
                    onUpdate([...data, newAccomplishment]);
                    setEditingId(newAccomplishment.id);
                  }}
                  className="text-left px-4 py-3 bg-white border border-cyan-200 rounded-lg hover:bg-cyan-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-cyan-800">{sample.title}</div>
                      <div className="text-sm text-cyan-600">{sample.issuer}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(sample.category)}`}>
                      {sample.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-cyan-900 mb-3 flex items-center">
            <span className="mr-2">🏆</span>
            Accomplishment Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-cyan-800">
            <div>
              <h4 className="font-medium mb-2">What to Include:</h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Academic honors and awards
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Competition wins and rankings
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Publications and patents
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Professional recognitions
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  List most recent first
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Include relevant dates
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Mention issuing organization
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Keep descriptions concise
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accomplishments;
