import React, { useState } from 'react';

interface ExtraCurricularType {
  id: string;
  title: string;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExtraCurricularProps {
  data: ExtraCurricularType[];
  onUpdate: (data: ExtraCurricularType[]) => void;
}

const ExtraCurricular: React.FC<ExtraCurricularProps> = ({ data, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = () => Date.now().toString();

  const addActivity = () => {
    const newActivity: ExtraCurricularType = {
      id: generateId(),
      title: '',
      organization: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onUpdate([...data, newActivity]);
    setEditingId(newActivity.id);
  };

  const updateActivity = (id: string, field: keyof ExtraCurricularType, value: any) => {
    const updatedData = data.map(activity => 
      activity.id === id ? { ...activity, [field]: value } : activity
    );
    onUpdate(updatedData);
  };

  const deleteActivity = (id: string) => {
    const updatedData = data.filter(activity => activity.id !== id);
    onUpdate(updatedData);
  };

  const activitySuggestions = [
    'Sports Club Member',
    'Cultural Club President',
    'Student Council Representative',
    'Debate Team Captain',
    'Music Band Member',
    'Drama Club Performer',
    'Photography Club',
    'Volunteer Work',
    'Community Service',
    'Event Organizer'
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Extra Curricular Activities</h2>
        <p className="text-gray-600">Highlight your involvement in clubs, sports, volunteering, and other activities</p>
      </div>

      <div className="space-y-6">
        {data.map((activity) => (
          <div key={activity.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {activity.title || 'New Activity'}
                </h3>
                {activity.organization && (
                  <p className="text-sm text-gray-600">{activity.organization}</p>
                )}
                {activity.position && (
                  <p className="text-sm text-blue-600">{activity.position}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingId(editingId === activity.id ? null : activity.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingId === activity.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteActivity(activity.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === activity.id && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Title *
                    </label>
                    <input
                      type="text"
                      value={activity.title}
                      onChange={(e) => updateActivity(activity.id, 'title', e.target.value)}
                      placeholder="e.g., Basketball Team, Drama Club"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization/Club *
                    </label>
                    <input
                      type="text"
                      value={activity.organization}
                      onChange={(e) => updateActivity(activity.id, 'organization', e.target.value)}
                      placeholder="e.g., University Sports Club, NGO Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position/Role
                    </label>
                    <input
                      type="text"
                      value={activity.position}
                      onChange={(e) => updateActivity(activity.id, 'position', e.target.value)}
                      placeholder="e.g., Team Captain, Secretary, Member"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="month"
                        value={activity.startDate}
                        onChange={(e) => updateActivity(activity.id, 'startDate', e.target.value)}
                        placeholder="Start Date"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="month"
                        value={activity.endDate}
                        onChange={(e) => updateActivity(activity.id, 'endDate', e.target.value)}
                        placeholder="End Date"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={activity.description}
                    onChange={(e) => updateActivity(activity.id, 'description', e.target.value)}
                    placeholder="Describe your role, responsibilities, and achievements"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            )}

            {editingId !== activity.id && activity.description && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addActivity}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Add Extra Curricular Activity</span>
        </button>

        {/* Activity Suggestions */}
        {data.length === 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-orange-900 mb-3">Activity Suggestions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {activitySuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newActivity: ExtraCurricularType = {
                      id: generateId(),
                      title: suggestion,
                      organization: '',
                      position: '',
                      startDate: '',
                      endDate: '',
                      description: ''
                    };
                    onUpdate([...data, newActivity]);
                    setEditingId(newActivity.id);
                  }}
                  className="text-left px-3 py-2 bg-white border border-orange-200 rounded-lg text-orange-800 hover:bg-orange-100 transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtraCurricular;
