import React from 'react';

export default function Experience() {
  const experiences = [
    {
      company: 'Freelance',
      position: 'Full Stack Developer',
      period: '2023-2024',
      description: [
        'Developed web applications using modern technologies including React and Node.js',
        'Collaborated with clients to understand requirements and deliver optimal solutions',
        'Specialized in creating responsive and user-friendly interfaces',
      ],
    },
    {
      company: 'Ministry of Information, Eritrea',
      position: 'Journalist',
      period: '2003 - 2010',
      description: [
        'Conducted research and wrote articles for publication',
        'Developed strong communication and analytical skills',
        'Managed time-sensitive projects and deadlines',
      ],
    },
    {
      company: 'MOI',
      position: 'Digital Editing Specialist',
      period: '2003 - 2010',
      description: [
        'Edited news segments, documentaries, and short films',
        'Utilized professional editing tools including Adobe Premiere Pro',
        'Managed post-production processes and quality control',
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Experience</h2>
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {exp.position}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}