import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowRight, Clock, Target, Users, Zap, Heart, Dumbbell } from "lucide-react";
import BlurIn from "../../components/blurText";

function WorkoutsIndex() {
  const workoutCategories = [
    {
      slug: "chest",
      title: "Chest Workouts",
      description: "Build a powerful chest with bodyweight exercises and advanced techniques.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&fm=webp&q=85",
      duration: "25-50 min",
      difficulty: "All Levels",
      exercises: "15+ exercises",
      color: "from-blue-600 to-purple-700",
      icon: <Dumbbell className="w-8 h-8" />,
      benefits: ["Upper body strength", "Muscle definition", "Push power"]
    },
    {
      slug: "legs", 
      title: "Leg Workouts",
      description: "Develop unstoppable leg strength with squats, lunges, and advanced movements.",
      image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&h=400&fit=crop&fm=webp&q=85",
      duration: "20-45 min",
      difficulty: "All Levels", 
      exercises: "15+ exercises",
      color: "from-red-600 to-orange-600",
      icon: <Zap className="w-8 h-8" />,
      benefits: ["Lower body power", "Functional strength", "Athletic performance"]
    },
    {
      slug: "core",
      title: "Core & Abs Workouts", 
      description: "Build six-pack abs and core stability with targeted exercises.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&fm=webp&q=85",
      duration: "15-40 min",
      difficulty: "All Levels",
      exercises: "15+ exercises", 
      color: "from-emerald-600 to-teal-600",
      icon: <Target className="w-8 h-8" />,
      benefits: ["Six-pack abs", "Core stability", "Better posture"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Complete Workout Programs NZ | Home Fitness Routines | 6Pack</title>
        <meta
          name="description"
          content="Complete workout programs for New Zealanders. Build muscle at home with our chest, leg, and core workouts. Expert fitness routines for all levels - no gym required!"
        />
        <meta
          name="keywords"
          content="workout programs NZ, home workouts New Zealand, fitness routines, chest workout, leg workout, core workout, bodyweight exercises, home gym NZ"
        />
        <meta property="og:title" content="Complete Workout Programs | Home Fitness Routines" />
        <meta property="og:description" content="Transform your body with our complete workout programs. Expert fitness routines for chest, legs, and core - all levels welcome." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85" />
        <meta property="og:url" content="https://www.6pack.co.nz/workouts" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Complete Workout Programs | 6Pack NZ" />
        <meta name="twitter:description" content="Transform your body with our complete workout programs for all fitness levels." />
        <link rel="canonical" href="https://www.6pack.co.nz/workouts" />
        
        {/* CollectionPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Complete Workout Programs",
            "description": "Comprehensive workout programs for building muscle and strength at home",
            "url": "https://www.6pack.co.nz/workouts",
            "publisher": {
              "@type": "Organization",
              "name": "6Pack",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.6pack.co.nz/logo.png"
              }
            },
            "hasPart": workoutCategories.map(workout => ({
              "@type": "Article",
              "name": workout.title,
              "description": workout.description,
              "url": `https://www.6pack.co.nz/workouts/${workout.slug}`,
              "image": workout.image
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85"
              alt="Complete fitness workout programs"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <BlurIn
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                word="Complete Workout Programs"
              />
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your body with our expertly designed workout programs. From beginner-friendly routines to advanced challenges - build strength, muscle, and confidence at home.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Users className="mr-2" size={16} />
                  All fitness levels
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Heart className="mr-2" size={16} />
                  No equipment needed
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Target className="mr-2" size={16} />
                  Proven results
                </div>
              </div>

              <Link
                to="/workouts/chest"
                className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Your First Workout
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Workout Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Workout Focus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each program is designed to deliver maximum results with clear progression paths from beginner to advanced levels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {workoutCategories.map((workout, index) => (
              <Link
                key={workout.slug}
                to={`/workouts/${workout.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={workout.image}
                      alt={workout.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${workout.color} opacity-60`}></div>
                    <div className="absolute top-4 left-4 text-white">
                      {workout.icon}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{workout.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {workout.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="text-gray-500" size={16} />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{workout.duration}</div>
                        <div className="text-xs text-gray-500">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="text-gray-500" size={16} />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{workout.difficulty}</div>
                        <div className="text-xs text-gray-500">Difficulty</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Target className="text-gray-500" size={16} />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{workout.exercises}</div>
                        <div className="text-xs text-gray-500">Exercises</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {workout.benefits.map((benefit, benefitIndex) => (
                          <span
                            key={benefitIndex}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Free program</span>
                      <div className="flex items-center text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">
                        Start Workout
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Workout Programs?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed by fitness experts specifically for New Zealanders who want to build muscle and strength at home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">All Levels Welcome</h3>
                <p className="text-gray-600 text-sm">Beginner to advanced progressions for every exercise</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-green-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">No Equipment Needed</h3>
                <p className="text-gray-600 text-sm">Use your bodyweight to build incredible strength</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-purple-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Time Efficient</h3>
                <p className="text-gray-600 text-sm">Effective workouts in 15-50 minutes</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-red-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
                <p className="text-gray-600 text-sm">Science-backed exercises that deliver results</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Body?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of Kiwis who are building strength and confidence with our workout programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/workouts/chest"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Start Chest Workout
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/calculators"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center"
              >
                Use Our Calculators
                <Target className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkoutsIndex; 