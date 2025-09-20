import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const benefits = [
    'مدرسون خبراء يمتلكون خبرة في المجال',
    'تعلم ذاتي يسهل عليك تنظيم وقتك',
    'تمارين تفاعلية ومشاريع واقعية',
    'دعم من المجتمع وفرص للتواصل والتشبيك',
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 rounded-lg z-0"></div>
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                alt="Students collaborating"
                className="rounded-lg shadow-md relative z-10 w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 dir='rtl' className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              فلّاقة سكول<br/>هي منصة  تقري بالدّارجة
            </h2>
            <p dir='rtl' className="text-lg text-gray-700 mb-8">
              نحن منصة تعليمية عبر الإنترنت تقدم دروسًا تفاعلية مباشرة + فيديوات مسجلة + تمارين متنوعة بالاصلاح بأسوام مناسبة . يشرف على تقديم هذه الدروس نخبة من الأساتذة ذوي الكفاءة والخبرة العالية، بهدف دعم تعلم التلميذ وتوفير تجربة تعليمية مميزة وفعّالة  
            </p>
            <ul dir='rtl' className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 ml-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;