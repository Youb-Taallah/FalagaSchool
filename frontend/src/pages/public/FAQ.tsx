import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, User, CreditCard, Truck, Package, RefreshCw, Shield } from 'lucide-react';

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const categories: FAQCategory[] = [
    {
      title: 'Managing your account',
      icon: <User className="w-5 h-5" />,
      questions: [
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Security > Change Password. Follow the prompts to update your password.',
        },
        {
          question: 'Can I have multiple accounts?',
          answer: 'Yes, you can create multiple accounts using different email addresses.',
        },
      ],
    },
    {
      title: 'Payment',
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, and bank transfers.',
        },
        {
          question: 'How do I update my billing information?',
          answer: 'Visit your Account Settings and select the Billing tab to update your payment details.',
        },
      ],
    },
    {
      title: 'Delivery',
      icon: <Truck className="w-5 h-5" />,
      questions: [
        {
          question: 'How long does delivery take?',
          answer: 'Standard delivery takes 3-5 business days. Express delivery is available for 1-2 business days.',
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. Shipping times may vary by location.',
        },
      ],
    },
    {
      title: 'Product Issues',
      icon: <Package className="w-5 h-5" />,
      questions: [
        {
          question: 'What if my product is damaged?',
          answer: 'Contact our support team immediately with photos of the damage for a replacement or refund.',
        },
        {
          question: 'How do I track my order?',
          answer: 'Use the tracking number provided in your confirmation email to monitor your delivery.',
        },
      ],
    },
    {
      title: 'Returns & Refunds',
      icon: <RefreshCw className="w-5 h-5" />,
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for unused items in original packaging.',
        },
        {
          question: 'How long do refunds take?',
          answer: 'Refunds are processed within 3-5 business days after we receive your return.',
        },
      ],
    },
    {
      title: 'Guarantee and Assurance',
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: 'What warranty do you provide?',
          answer: 'All products come with a 1-year manufacturer warranty against defects.',
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard encryption to protect your data.',
        },
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', contactForm);
  };

  return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.title} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50"
                onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
              >
                <div className="flex items-center space-x-3">
                  {category.icon}
                  <span className="font-medium text-gray-900">{category.title}</span>
                </div>
                {expandedCategory === category.title ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedCategory === category.title && (
                <div className="border-t border-gray-200">
                  {category.questions.map((item) => (
                    <div key={item.question} className="border-b border-gray-200 last:border-b-0">
                      <button
                        className="w-full px-6 py-4 text-left hover:bg-gray-50"
                        onClick={() => setExpandedQuestion(expandedQuestion === item.question ? null : item.question)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">{item.question}</span>
                          {expandedQuestion === item.question ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        {expandedQuestion === item.question && (
                          <p className="mt-2 text-gray-600">{item.answer}</p>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Haven't found the right help?</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="input"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="input"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;