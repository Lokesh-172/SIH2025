import React, { useState } from 'react';

interface PortfolioType {
  id: string;
  title: string;
  type: string;
  link: string;
  description: string;
  image: string;
}

interface PortfolioProps {
  data: PortfolioType[];
  onUpdate: (data: PortfolioType[]) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = () => Date.now().toString();

  const portfolioTypes = [
    'Website',
    'Mobile App',
    'Design Portfolio',
    'GitHub Repository',
    'Blog/Article',
    'Video/Demo',
    'Case Study',
    'Research Paper',
    'Presentation',
    'Other'
  ];

  const addPortfolioItem = () => {
    const newItem: PortfolioType = {
      id: generateId(),
      title: '',
      type: '',
      link: '',
      description: '',
      image: ''
    };
    onUpdate([...data, newItem]);
    setEditingId(newItem.id);
  };

  const updatePortfolioItem = (id: string, field: keyof PortfolioType, value: any) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onUpdate(updatedData);
  };

  const deletePortfolioItem = (id: string) => {
    const updatedData = data.filter(item => item.id !== id);
    onUpdate(updatedData);
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatePortfolioItem(id, 'image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio & Work Samples</h2>
        <p className="text-gray-600">Showcase your best work with links to projects, websites, and portfolios</p>
      </div>

      <div className="space-y-6">
        {data.map((item) => (
          <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.title || 'New Portfolio Item'}
                  </h3>
                  {item.type && (
                    <span className="inline-block px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                      {item.type}
                    </span>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    View
                  </a>
                )}
                <button
                  onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingId === item.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deletePortfolioItem(item.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === item.id && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updatePortfolioItem(item.id, 'title', e.target.value)}
                      placeholder="e.g., Personal Website, Mobile App Design"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      value={item.type}
                      onChange={(e) => updatePortfolioItem(item.id, 'type', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Type</option>
                      {portfolioTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link/URL *
                    </label>
                    <input
                      type="url"
                      value={item.link}
                      onChange={(e) => updatePortfolioItem(item.id, 'link', e.target.value)}
                      placeholder="https://yourportfolio.com or github.com/username/project"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => updatePortfolioItem(item.id, 'description', e.target.value)}
                    placeholder="Brief description of this work sample"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Image (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt="Preview"
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(item.id, e)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addPortfolioItem}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-pink-400 hover:text-pink-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Add Portfolio Item</span>
        </button>

        {/* Tips */}
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-pink-900 mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Portfolio Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-pink-800">
            <div>
              <h4 className="font-medium mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Include live links whenever possible
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Add screenshots or preview images
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Ensure all links are working
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">What to Include:</h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Your best and most recent work
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Diverse range of projects
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Work relevant to target jobs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
