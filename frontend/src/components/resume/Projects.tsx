import React, { useState } from 'react';

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

interface ProjectsProps {
  data: ProjectType[];
  onUpdate: (data: ProjectType[]) => void;
}

const Projects: React.FC<ProjectsProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = () => Date.now().toString();

  const addProject = (type: 'academic' | 'personal') => {
    const newProject: ProjectType = {
      id: generateId(),
      title: '',
      type,
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      githubLink: '',
      liveLink: '',
      achievements: []
    };
    onUpdate([...data, newProject]);
    setEditingId(newProject.id);
  };

  const updateProject = (id: string, field: keyof ProjectType, value: any) => {
    const updatedData = data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    onUpdate(updatedData);
  };

  const deleteProject = (id: string) => {
    const updatedData = data.filter(project => project.id !== id);
    onUpdate(updatedData);
  };

  const addTechnology = (id: string, tech: string) => {
    const project = data.find(p => p.id === id);
    if (project && tech.trim() && !project.technologies.includes(tech.trim())) {
      updateProject(id, 'technologies', [...project.technologies, tech.trim()]);
    }
  };

  const removeTechnology = (id: string, tech: string) => {
    const project = data.find(p => p.id === id);
    if (project) {
      const updatedTechnologies = project.technologies.filter(t => t !== tech);
      updateProject(id, 'technologies', updatedTechnologies);
    }
  };

  const addAchievement = (id: string) => {
    const project = data.find(p => p.id === id);
    if (project) {
      updateProject(id, 'achievements', [...project.achievements, '']);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const project = data.find(p => p.id === id);
    if (project) {
      const updatedAchievements = [...project.achievements];
      updatedAchievements[index] = value;
      updateProject(id, 'achievements', updatedAchievements);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const project = data.find(p => p.id === id);
    if (project) {
      const updatedAchievements = project.achievements.filter((_, i) => i !== index);
      updateProject(id, 'achievements', updatedAchievements);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic/Personal Projects</h2>
        <p className="text-gray-600">Showcase your academic and personal projects</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => addProject('academic')}
          className="px-6 py-3 bg-peach text-charcoal rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
        >
          <span>🎓</span>
          <span>Add Academic Project</span>
        </button>
        <button
          onClick={() => addProject('personal')}
          className="px-6 py-3 bg-peach text-charcoal rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
        >
          <span>🚀</span>
          <span>Add Personal Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {data.map((project) => (
          <div key={project.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.type === 'academic' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {project.type.toUpperCase()}
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {project.title || 'New Project'}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(editingId === project.id ? null : project.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingId === project.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === project.id && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      placeholder="e.g., E-commerce Website, Data Analysis Tool"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Link
                    </label>
                    <input
                      type="url"
                      value={project.githubLink}
                      onChange={(e) => updateProject(project.id, 'githubLink', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Demo Link
                    </label>
                    <input
                      type="url"
                      value={project.liveLink}
                      onChange={(e) => updateProject(project.id, 'liveLink', e.target.value)}
                      placeholder="https://yourproject.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Describe what the project does, its purpose, and key features"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    required
                  />
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Technologies Used</h4>
                  <input
                    type="text"
                    placeholder="Add technology and press Enter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        addTechnology(project.id, target.value);
                        target.value = '';
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(project.id, tech)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Achievements</h4>
                  {project.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateAchievement(project.id, index, e.target.value)}
                        placeholder="Key achievement or feature"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => removeAchievement(project.id, index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addAchievement(project.id)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Add Achievement
                  </button>
                </div>
              </div>
            )}

            {editingId !== project.id && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">No projects added yet</p>
            <p className="text-sm">Add your academic and personal projects to showcase your skills</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
