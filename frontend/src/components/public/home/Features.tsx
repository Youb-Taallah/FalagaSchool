import React from 'react';
import { BookMarked, Trophy, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BookMarked className="w-12 h-12 text-indigo-600" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: <Trophy className="w-12 h-12 text-indigo-600" />,
      title: "Earn Certificates",
      description: "Get recognized for your achievements with accredited certificates"
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      title: "Community Learning",
      description: "Join a global community of learners and experts"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;