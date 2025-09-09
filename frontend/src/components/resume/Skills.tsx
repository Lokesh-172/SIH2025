import React, { useState } from 'react';

interface SkillType {
  id: string;
  category: string;
  skills: string[];
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface SkillsProps {
  data: SkillType[];
  onUpdate: (data: SkillType[]) => void;
}

const Skills: React.FC<SkillsProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = () => Date.now().toString();

  const skillCategories = [
    'Technical Skills',
    'Programming Languages',
    'Frameworks & Libraries',
    'Databases',
    'Tools & Software',
    'Soft Skills',
    'Languages',
    'Other Skills'
  ];

  const addSkillCategory = () => {
    const newSkill: SkillType = {
      id: generateId(),
      category: '',
      skills: [],
      proficiencyLevel: 'Intermediate'
    };
    onUpdate([...data, newSkill]);
    setEditingId(newSkill.id);
  };

  const updateSkill = (id: string, field: keyof SkillType, value: any) => {
    const updatedData = data.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onUpdate(updatedData);
  };

  const deleteSkill = (id: string) => {
    const updatedData = data.filter(skill => skill.id !== id);
    onUpdate(updatedData);
  };

  const addSkillToCategory = (id: string, skillName: string) => {
    const skillGroup = data.find(skill => skill.id === id);
    if (skillGroup && skillName.trim() && !skillGroup.skills.includes(skillName.trim())) {
      updateSkill(id, 'skills', [...skillGroup.skills, skillName.trim()]);
    }
  };

  const removeSkillFromCategory = (id: string, skillName: string) => {
    const skillGroup = data.find(skill => skill.id === id);
    if (skillGroup) {
      const updatedSkills = skillGroup.skills.filter(s => s !== skillName);
      updateSkill(id, 'skills', updatedSkills);
    }
  };

  const proficiencyColors = {
    'Beginner': 'bg-red-100 text-red-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-blue-100 text-blue-800',
    'Expert': 'bg-green-100 text-green-800'
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600">Organize your skills by category and proficiency level</p>
      </div>

      <div className="space-y-6">
        {data.map((skillGroup) => (
          <div key={skillGroup.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-lg text-gray-900">
                  {skillGroup.category || 'New Skill Category'}
                </h3>
                {skillGroup.proficiencyLevel && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${proficiencyColors[skillGroup.proficiencyLevel]}`}>
                    {skillGroup.proficiencyLevel}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(editingId === skillGroup.id ? null : skillGroup.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingId === skillGroup.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteSkill(skillGroup.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === skillGroup.id && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skill Category *
                    </label>
                    <select
                      value={skillGroup.category}
                      onChange={(e) => updateSkill(skillGroup.id, 'category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {skillCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proficiency Level
                    </label>
                    <select
                      value={skillGroup.proficiencyLevel}
                      onChange={(e) => updateSkill(skillGroup.id, 'proficiencyLevel', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Skills
                  </label>
                  <input
                    type="text"
                    placeholder="Type a skill and press Enter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        addSkillToCategory(skillGroup.id, target.value);
                        target.value = '';
                      }
                    }}
                  />
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Skills in this category:</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkillFromCategory(skillGroup.id, skill)}
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

            {editingId !== skillGroup.id && skillGroup.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skillGroup.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addSkillCategory}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Add Skill Category</span>
        </button>

        {/* Predefined Skills Suggestion */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">Popular Skills by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Technical Skills:</h4>
              <p className="text-blue-700">JavaScript, Python, Java, React, Node.js, MongoDB, SQL, Git, Docker, AWS</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Soft Skills:</h4>
              <p className="text-blue-700">Communication, Leadership, Problem Solving, Team Work, Project Management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
