import React from 'react';
import { BookOpen, Code, Brain, Award } from 'lucide-react';

const LearningPath = () => {
  const steps = [
    {
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
      title: "Choose Your Path",
      description: "Select from our wide range of courses and learning tracks tailored to your goals."
    },
    {
      icon: <Code className="w-8 h-8 text-indigo-600" />,
      title: "Learn by Doing",
      description: "Practice with hands-on projects and real-world examples to reinforce your learning."
    },
    {
      icon: <Brain className="w-8 h-8 text-indigo-600" />,
      title: "Master Skills",
      description: "Build expertise through comprehensive lessons and expert guidance."
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: "Get Certified",
      description: "Earn recognized certificates to showcase your achievements."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
          <p className="text-lg text-gray-600">Follow these steps to achieve your learning goals</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-indigo-50 rounded-full">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-indigo-100 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPath;