import React from 'react';

export default function Skills() {
  const skills = {
    'Frontend Development': ['HTML5', 'CSS3', 'SCSS', 'React', 'Angular', 'Next.js'],
    'Backend Development': ['Node.js', 'Java', 'Python', 'TypeScript'],
    'Databases & Tools': ['MySQL', 'Git', 'npm', 'Figma'],
    'Professional Skills': ['Agile/Scrum', 'Test-Driven Development', 'Leadership', 'Communication'],
    'Languages': ['English', 'Arabic', 'Tigrinya', 'Swedish'],
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}