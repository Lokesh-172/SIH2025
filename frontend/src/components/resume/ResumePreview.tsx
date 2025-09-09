import React from 'react';

interface ResumePreviewProps {
  data: any;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, careerObjective, education, workExperience, skills, projects, accomplishments, trainings } = data;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="max-w-3xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
        
        {/* Header - Exact Match to Sample */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black mb-3 tracking-wide text-center">
            {personalInfo?.fullName?.toUpperCase() || 'YOUR NAME'}
          </h1>
          
          {/* Contact Information - Professional Single Line */}
          <div className="text-center text-sm text-black leading-relaxed">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
              {personalInfo?.linkedIn && (
                <span>{personalInfo.linkedIn}</span>
              )}
              {personalInfo?.github && (
                <span>{personalInfo.github}</span>
              )}
              {personalInfo?.email && (
                <span>{personalInfo.email}</span>
              )}
              {personalInfo?.portfolio && (
                <span>{personalInfo.portfolio}</span>
              )}
            </div>
            {personalInfo?.phone && (
              <div className="mt-1">{personalInfo.phone}</div>
            )}
          </div>
        </div>

        {/* Education Section - Exact Format */}
        {education?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-bold text-black mb-3 uppercase">Education</h2>
            <div className="space-y-4">
              {education.map((edu: any, index: number) => (
                <div key={index} className="text-sm text-black">
                  <div className="font-bold">
                    {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                  </div>
                  {edu.endYear && (
                    <div>Expected Graduation: {edu.endYear}</div>
                  )}
                  <div>
                    {edu.degree}{edu.specialization ? ` in ${edu.specialization}` : ''}
                  </div>
                  {edu.cgpa && (
                    <div>CGPA: {edu.cgpa}</div>
                  )}
                  {edu.percentage && !edu.cgpa && (
                    <>
                      <div>
                        {edu.startYear && `Year: ${edu.startYear}`}
                      </div>
                      <div>
                        {edu.degree === 'High School' ? 'High School' : 'Secondary School'}
                      </div>
                      <div>{edu.degree === 'High School' ? '10th' : '12th'} Grade: {edu.percentage}%</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section - Professional Format */}
        {workExperience?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-bold text-black mb-3 uppercase">Experience</h2>
            <div className="space-y-4">
              {workExperience.map((work: any, index: number) => (
                <div key={index} className="text-sm text-black">
                  <div className="font-bold mb-1">
                    {work.position} – {work.company}
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      {work.type && (
                        <div>[{work.type === 'internship' ? 'Certificate' : 'Full-time'}]</div>
                      )}
                    </div>
                    <div>
                      {work.startDate && (
                        <span>
                          {new Date(work.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – {' '}
                          {work.isCurrentlyWorking ? 'Present' : 
                           work.endDate ? new Date(work.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {work.description?.length > 0 && (
                    <ul className="space-y-1">
                      {work.description.map((desc: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section - Professional Category Format */}
        {skills?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-bold text-black mb-3 uppercase">Skills</h2>
            <div className="space-y-1 text-sm text-black">
              {skills.map((skillGroup: any, index: number) => (
                <div key={index}>
                  <span className="font-medium">{skillGroup.category}: </span>
                  <span>{skillGroup.skills?.join(', ')}</span>
                </div>
              ))}
              
              {/* Coursework from trainings */}
              {trainings?.length > 0 && (
                <div>
                  <span className="font-medium">Coursework: </span>
                  <span>
                    {trainings.map((training: any) => training.title).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Projects Section - Clean Professional Format */}
        {projects?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-bold text-black mb-3 uppercase">Projects</h2>
            <div className="space-y-4">
              {projects.map((project: any, index: number) => (
                <div key={index} className="text-sm text-black">
                  <div className="font-bold mb-1">
                    {project.title}
                    {(project.liveLink || project.githubLink) && (
                      <span className="ml-4 font-normal">
                        {project.liveLink && (
                          <span className="text-blue-600 underline mr-4">Live Link</span>
                        )}
                        {project.githubLink && (
                          <span className="text-blue-600 underline">GitHub</span>
                        )}
                      </span>
                    )}
                  </div>
                  
                  {(project.description || project.achievements?.length > 0) && (
                    <ul className="space-y-1">
                      {project.description && (
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{project.description}</span>
                        </li>
                      )}
                      {project.achievements?.map((achievement: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements Section - Clean Bullet Format */}
        {accomplishments?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-bold text-black mb-3 uppercase">Achievements</h2>
            <ul className="space-y-1 text-sm text-black">
              {accomplishments.map((achievement: any, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    {achievement.title}
                    {achievement.description && `. ${achievement.description}`}
                    {achievement.issuer && ` among ${achievement.issuer}`}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
