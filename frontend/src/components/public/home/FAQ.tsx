import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "كيف يمكنني البدء مع LearnHub؟",
      answer: "البدء سهل! ما عليك سوى إنشاء حساب، تصفح كتالوج الدورات لدينا، والتسجيل في أي دورة تهمك. يمكنك البدء في التعلم فور التسجيل."
    },
    {
      question: "هل الشهادات معترف بها؟",
      answer: "نعم! شهاداتنا معترف بها في المجال الصناعي ويمكن إضافتها إلى ملفك الشخصي في لينكدإن أو سيرتك الذاتية. العديد من أصحاب العمل يقدرون شهاداتنا كدليل على مهاراتك والتزامك بالتعلم."
    },
    {
      question: "هل يمكنني التعلم حسب سرعتي الخاصة؟",
      answer: "بالتأكيد! جميع دوراتنا ذاتية السرعة، مما يسمح لك بالتعلم وقتما وحيثما تريد. لديك وصول مدى الحياة إلى مواد الدورة بعد التسجيل."
    },
    {
      question: "ما هي طرق الدفع التي تقبلونها؟",
      answer: "نقبل جميع بطاقات الائتمان الرئيسية، باي بال، ومختلف طرق الدفع المحلية. نظام الدفع لدينا آمن ومشفّر لحماية معلوماتك."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">أسئلة شائعة</h2>
          <p className="text-lg text-gray-600">ابحث عن إجابات للأسئلة الشائعة حول LearnHub</p>
        </div>

        <div dir='rtl' className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-lg font-medium text-gray-900 text-right">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 text-right">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;