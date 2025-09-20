import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2024-12-31T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email notification signup
    console.log('Email submitted:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <Clock className="mx-auto h-16 w-16 text-primary-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Coming Soon</h1>
        <p className="text-lg text-gray-600 mb-8">
          We're working hard to bring you something amazing!
        </p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {Object.entries(countdown).map(([unit, value]) => (
            <div key={unit} className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-2xl font-bold text-primary-600">{value}</div>
              <div className="text-sm text-gray-500 capitalize">{unit}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="input flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComingSoon;