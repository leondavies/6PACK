import { User, Award, BookOpen } from 'lucide-react';

const authorData = {
  'Dr. Sarah Chen': {
    name: 'Dr. Sarah Chen',
    title: 'Sport Science PhD, Certified Strength Coach',
    bio: 'Dr. Chen has over 15 years of experience in exercise physiology and sports nutrition. She holds a PhD in Sport Science and has worked with elite athletes and everyday fitness enthusiasts across New Zealand.',
    credentials: ['PhD Sport Science', 'CSCS Certified', 'Registered Nutritionist'],
    articlesCount: 8,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&fm=webp&q=85'
  },
  'Mike Thompson': {
    name: 'Mike Thompson',
    title: 'Certified Personal Trainer & Nutrition Coach',
    bio: 'Mike is a certified personal trainer with 10+ years helping Kiwis achieve their fitness goals. He specializes in strength training, body recomposition, and sustainable nutrition strategies.',
    credentials: ['Level 4 Personal Trainer', 'Precision Nutrition Certified', 'Olympic Weightlifting Coach'],
    articlesCount: 6,
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&fm=webp&q=85'
  },
  'Emma Williams': {
    name: 'Emma Williams',
    title: 'Exercise Physiologist & HIIT Specialist',
    bio: 'Emma combines evidence-based exercise science with practical training experience. She has helped hundreds of New Zealanders improve their fitness through smart programming and nutrition.',
    credentials: ['MSc Exercise Physiology', 'NASM CPT', 'Metabolic Conditioning Specialist'],
    articlesCount: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&fm=webp&q=85'
  },
  'David Lee': {
    name: 'David Lee',
    title: 'Registered Dietitian & Performance Nutritionist',
    bio: 'David is a registered dietitian specializing in sports nutrition and body composition. He works with athletes and fitness enthusiasts to optimize their nutrition for performance and health.',
    credentials: ['Registered Dietitian', 'Sports Nutrition Specialist', 'Body Composition Expert'],
    articlesCount: 4,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&fm=webp&q=85'
  },
  'Rachel Park': {
    name: 'Rachel Park',
    title: 'Strength Coach & Movement Specialist',
    bio: 'Rachel has dedicated her career to helping people move better and get stronger. With a background in biomechanics, she brings a scientific approach to training and injury prevention.',
    credentials: ['CSCS Certified', 'FMS Level 2', 'Biomechanics Specialist'],
    articlesCount: 7,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&fm=webp&q=85'
  }
};

const AuthorBio = ({ authorName }) => {
  const author = authorData[authorName] || {
    name: authorName || '6Pack NZ Team',
    title: 'Fitness & Nutrition Experts',
    bio: 'The 6Pack NZ team consists of certified trainers, registered nutritionists, and exercise scientists dedicated to providing evidence-based fitness guidance for New Zealanders.',
    credentials: ['Certified Professionals', 'Science-Backed Content', 'New Zealand Focused'],
    articlesCount: 15,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&fm=webp&q=85'
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-6 my-8">
      <div className="flex items-start space-x-4">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <img
            src={author.image}
            alt={author.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary-300"
            loading="lazy"
          />
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <User className="text-primary-600 mr-2" size={20} />
            <h3 className="text-xl font-bold text-gray-900">{author.name}</h3>
          </div>
          <p className="text-primary-700 font-semibold mb-3">{author.title}</p>
          <p className="text-gray-700 mb-4 leading-relaxed">{author.bio}</p>

          {/* Credentials */}
          <div className="flex flex-wrap gap-2 mb-3">
            {author.credentials.map((credential, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-700 border border-primary-300"
              >
                <Award className="mr-1" size={14} />
                {credential}
              </span>
            ))}
          </div>

          {/* Article Count */}
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="mr-2 text-primary-600" size={16} />
            <span>{author.articlesCount}+ articles published on 6Pack NZ</span>
          </div>
        </div>
      </div>

      {/* Expert Note */}
      <div className="mt-4 pt-4 border-t border-primary-200">
        <p className="text-sm text-gray-600 italic">
          <strong className="text-primary-700">Expert Verified:</strong> This article has been reviewed by our team of certified fitness professionals to ensure accuracy and adherence to evidence-based practices.
        </p>
      </div>
    </div>
  );
};

export default AuthorBio;
