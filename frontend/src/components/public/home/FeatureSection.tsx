import { BookOpen, Video, Users, Award, PenTool, Globe } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: 'دورات متنوعة',
      description: 'استكشف المئات من الدورات عبر مختلف التخصصات ومستويات المهارة.',
    },
    {
      icon: <Video className="h-6 w-6 text-purple-600" />,
      title: 'محاضرات فيديو',
      description: 'محتوى فيديو عالي الجودة مع عروض وتجارب جذابة.',
    },
    {
      icon: <PenTool className="h-6 w-6 text-teal-600" />,
      title: 'مشاريع عملية',
      description: 'طبق معرفتك من خلال مشاريع وتدريبات عملية من العالم الحقيقي.',
    },
    {
      icon: <Users className="h-6 w-6 text-yellow-600" />,
      title: 'مجتمع تعليمي',
      description: 'تواصل مع زملائك المتعلمين والمعلمين في مجتمعنا النشط.',
    },
    {
      icon: <Award className="h-6 w-6 text-red-600" />,
      title: 'شهادات معتمدة',
      description: 'احصل على شهادات معترف بها لعرض إنجازاتك ومهاراتك.',
    },
    {
      icon: <Globe className="h-6 w-6 text-green-600" />,
      title: 'وصول عالمي',
      description: 'تعلم في أي وقت ومن أي مكان مع منصتنا.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ميزات تجعل التعلم ممتعًا
          </h2>
          <p className="text-lg text-gray-700">
            تم تصميم منصتنا لتزويدك بجميع الأدوات والموارد التي تحتاجها لتجربة تعلم فعالة وجذابة.
          </p>
        </div>
        
        <div dir='rtl' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-blue-50 rounded-xl p-6 shadow-md cursor-default hover:shadow-lg hover:bg-blue-50 transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="p-3 rounded-full bg-gray-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;