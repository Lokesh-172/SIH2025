import React, { useState } from 'react';

interface CareerObjectiveProps {
  data: string;
  onUpdate: (data: string) => void;
}

const CareerObjective: React.FC<CareerObjectiveProps> = ({ data, onUpdate }) => {
  const [charCount, setCharCount] = useState(data.length);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const maxChars = 500;

  const handleChange = (value: string) => {
    if (value.length <= maxChars) {
      onUpdate(value);
      setCharCount(value.length);
    }
  };

  const generateWithGemini = async (prompt?: string) => {
    setIsGenerating(true);

    const apiKey = "AIzaSyA6Z4jr-hEklgF2sT4xhUwPVB6hJGfuZVQ";

    if (!apiKey) {
      console.error("API Key not found. Please set VITE_GEMINI_API_KEY in your .env.local file.");
      alert("API Key is missing. The developer has been notified.");
      setIsGenerating(false);
      return;
    }
    
    try {
      const defaultPrompt = `Generate a professional career objective for a resume. The objective should be:
      - 2-3 sentences long
      - Professional and compelling
      - Specific but adaptable
      - Include skills, goals, and value proposition
      - Between 100-300 words
      - Avoid generic phrases
      
      Create a career objective for someone in the technology field.`;

      const finalPrompt = prompt || defaultPrompt;

      const requestBody = {
        contents: [{
          parts: [{
            text: finalPrompt
          }]
        }],
        generationConfig: {
          maxOutputTokens: 300
        }
      };
      
      // FIXED: Using the correct model name - gemini-1.5-flash instead of gemini-2.5-flash-latest
      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        throw new Error('Failed to generate objective. Status: ' + response.status);
      }

      const result = await response.json();
      
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        handleChange(generatedText.trim());
        setCustomPrompt('');
        setShowCustomPrompt(false);
      } else {
        console.error("Unexpected API response structure:", result);
        throw new Error('No objective generated in the expected format.');
      }
    } catch (error) {
      console.error('Error generating objective:', error);
      const fallbackObjective = "Motivated professional seeking to leverage technical skills and innovative thinking to contribute to organizational success while pursuing continuous learning and career growth in a dynamic environment.";
      handleChange(fallbackObjective);
      alert('Unable to generate with AI at the moment. Please check console for errors.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomGeneration = async () => {
    if (!customPrompt.trim()) return;
    
    const enhancedPrompt = `Generate a professional career objective for a resume based on this specific requirement: "${customPrompt}". The objective should be professional, compelling, and 2-3 sentences long.`;
    await generateWithGemini(enhancedPrompt);
  };

  const quickPrompts = [
    { label: "Software Developer", prompt: "I am a software developer with experience in full-stack development, focusing on modern web technologies and problem-solving" },
    { label: "Data Scientist", prompt: "I am a data scientist with skills in machine learning, analytics, and statistical modeling, emphasizing data-driven insights" },
    { label: "DevOps Engineer", prompt: "I am a DevOps engineer with expertise in cloud platforms, automation, and CI/CD pipelines, highlighting efficiency and scalability" },
    { label: "Product Manager", prompt: "I am a product manager with experience in strategy, user experience, and cross-functional team leadership" },
    { label: "Fresh Graduate", prompt: "I am a recent computer science graduate eager to start my career, emphasizing learning potential and technical foundation" }
  ];

  const sampleObjectives = [
    { title: "Software Developer", text: "Seeking a challenging position as a Software Developer where I can utilize my programming skills in MERN stack development and contribute to innovative projects while continuously learning and growing in a dynamic environment.", tags: ["MERN", "Full-Stack", "Programming"] },
    { title: "Data Scientist", text: "Aspiring Data Science professional looking for opportunities to apply my analytical skills, machine learning knowledge, and statistical expertise to solve complex business problems and drive data-driven decision making.", tags: ["Analytics", "ML", "Python"] },
    { title: "DevOps Engineer", text: "Recent graduate with expertise in automation and workflow management seeking opportunities to leverage my experience with CI/CD pipelines, cloud technologies, and modern DevOps practices to drive efficiency and innovation.", tags: ["Automation", "Cloud", "DevOps"] }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Objective</h2>
        <p className="text-gray-600">Write a compelling career objective that summarizes your goals and aspirations</p>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Your Career Objective *</label>
          <div className="relative">
            <textarea
              value={data}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Write your career objective here. Focus on your goals, skills, and what you can contribute..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              <span className={charCount > maxChars * 0.8 ? 'text-orange-500' : ''}>{charCount}/{maxChars}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                onClick={() => generateWithGemini()}
                disabled={isGenerating}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-sm font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isGenerating ? '⏳' : '✨'}</span>
                <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
              </button>
              <button
                onClick={() => setShowCustomPrompt(!showCustomPrompt)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center space-x-2"
              >
                <span>🎯</span>
                <span>Custom Generate</span>
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Quick generate for specific roles:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => generateWithGemini(item.prompt)}
                    disabled={isGenerating}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs font-medium disabled:opacity-50"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            {showCustomPrompt && (
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <label className="block text-sm font-medium text-gray-700">Describe your specific requirements:</label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., 'I'm a marketing professional with 3 years experience...'"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCustomGeneration}
                    disabled={isGenerating || !customPrompt.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Custom'}
                  </button>
                  <button
                    onClick={() => { setShowCustomPrompt(false); setCustomPrompt(''); }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center"><span className="mr-2">💼</span> Sample Career Objectives</h3>
          <p className="text-sm text-gray-600">Click on any sample to use it as a starting point:</p>
          <div className="grid gap-4">
            {sampleObjectives.map((objective, index) => (
              <div key={index} onClick={() => handleChange(objective.text)} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 group">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-700">{objective.title}</h4>
                  <button className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity text-sm">Use this</button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{objective.text}</p>
                <div className="flex flex-wrap gap-2">
                  {objective.tags.map((tag, tagIndex) => (<span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-green-900 mb-3 flex items-center"><span className="mr-2">📝</span> Writing Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-green-800">
            <div>
              <h4 className="font-medium mb-2">Do:</h4>
              <ul className="space-y-1">
                <li className="flex items-start"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>Keep it concise (2-3 sentences)</li>
                <li className="flex items-start"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>Mention specific skills or technologies</li>
                <li className="flex items-start"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>Show enthusiasm and goals</li>
                <li className="flex items-start"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>Tailor to your target role</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Don't:</h4>
              <ul className="space-y-1">
                <li className="flex items-start"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>Use generic statements</li>
                <li className="flex items-start"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>Make it too long or wordy</li>
                <li className="flex items-start"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>Focus only on what you want</li>
                <li className="flex items-start"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>Include salary expectations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerObjective;