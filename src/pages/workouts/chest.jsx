import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Play, Clock, Target, Users, Zap, Info, CheckCircle } from "lucide-react";
import BlurIn from "../../components/blurText";

function ChestWorkout() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");
  const [workoutLocation, setWorkoutLocation] = useState("home");

  const workouts = {
    beginner: {
      home: {
        title: "Beginner Home Chest Workout",
        duration: "25-30 minutes",
        exercises: [
        {
          name: "Push-ups (Modified)",
          sets: "3 sets",
          reps: "8-12 reps",
          rest: "60-90 seconds",
          description: "Start with knee push-ups if needed. Focus on proper form over quantity.",
          tips: "Keep your core tight and maintain a straight line from head to knees."
        },
        {
          name: "Incline Push-ups",
          sets: "3 sets", 
          reps: "10-15 reps",
          rest: "60 seconds",
          description: "Use a bench, chair, or elevated surface. The higher the surface, the easier the exercise.",
          tips: "Keep hands slightly wider than shoulder-width apart."
        },
        {
          name: "Chest Squeeze",
          sets: "3 sets",
          reps: "15-20 reps", 
          rest: "45 seconds",
          description: "Press palms together in front of chest and squeeze for 2-3 seconds.",
          tips: "Focus on feeling the contraction in your chest muscles."
        },
        {
          name: "Wall Push-ups",
          sets: "2 sets",
          reps: "15-20 reps",
          rest: "45 seconds", 
          description: "Stand arm's length from wall, place palms flat against wall and push.",
          tips: "Great for building initial strength and learning push-up form."
        }
      ]
      },
      gym: {
        title: "Beginner Gym Chest Workout",
        duration: "30-35 minutes",
        exercises: [
          {
            name: "Assisted Dips",
            sets: "3 sets",
            reps: "8-12 reps",
            rest: "90 seconds",
            description: "Use assisted dip machine or resistance bands to help with the movement.",
            tips: "Focus on controlled movement and full range of motion."
          },
          {
            name: "Chest Press Machine",
            sets: "3 sets", 
            reps: "10-15 reps",
            rest: "60-75 seconds",
            description: "Seated chest press machine with light to moderate weight.",
            tips: "Squeeze chest muscles at the peak contraction, control the negative."
          },
          {
            name: "Incline Dumbbell Press (Light)",
            sets: "3 sets",
            reps: "8-12 reps", 
            rest: "75 seconds",
            description: "Light dumbbells on incline bench, focus on form over weight.",
            tips: "Keep shoulders back and down, press dumbbells in slight arc motion."
          },
          {
            name: "Cable Crossover (Light)",
            sets: "2 sets",
            reps: "12-15 reps",
            rest: "60 seconds", 
            description: "Light weight on cable machine, focus on chest squeeze.",
            tips: "Bring handles together in front of chest, squeeze and hold briefly."
          }
        ]
      }
    },
    intermediate: {
      home: {
        title: "Intermediate Home Chest Workout",
        duration: "35-40 minutes", 
        exercises: [
        {
          name: "Standard Push-ups",
          sets: "4 sets",
          reps: "12-18 reps",
          rest: "60-90 seconds",
          description: "Full push-ups with proper form. Focus on controlled movement.",
          tips: "Lower chest to just above ground, then push up explosively."
        },
        {
          name: "Wide-Grip Push-ups", 
          sets: "3 sets",
          reps: "10-15 reps",
          rest: "60 seconds",
          description: "Hands placed wider than shoulders to target outer chest.",
          tips: "Don't go too wide - about 1.5x shoulder width is optimal."
        },
        {
          name: "Diamond Push-ups",
          sets: "3 sets",
          reps: "8-12 reps", 
          rest: "90 seconds",
          description: "Form diamond shape with hands. Targets inner chest and triceps.",
          tips: "This is challenging - modify on knees if needed."
        },
        {
          name: "Decline Push-ups",
          sets: "3 sets",
          reps: "10-15 reps",
          rest: "75 seconds",
          description: "Feet elevated on bench or chair. Targets upper chest.",
          tips: "Start with low elevation and gradually increase height."
        },
        {
          name: "Chest Dips (Chair)",
          sets: "3 sets", 
          reps: "8-15 reps",
          rest: "90 seconds",
          description: "Use two sturdy chairs or parallel surfaces.",
          tips: "Lean slightly forward to target chest more than triceps."
        }
      ]
      },
      gym: {
        title: "Intermediate Gym Chest Workout",
        duration: "40-45 minutes",
        exercises: [
          {
            name: "Barbell Bench Press",
            sets: "4 sets",
            reps: "8-12 reps",
            rest: "2-3 minutes",
            description: "Classic bench press with proper form and progressive overload.",
            tips: "Arch back slightly, drive through feet, control the bar to chest."
          },
          {
            name: "Incline Dumbbell Press", 
            sets: "3 sets",
            reps: "10-12 reps",
            rest: "90 seconds",
            description: "45-degree incline with moderate weight dumbbells.",
            tips: "Full range of motion, squeeze at top, control the negative."
          },
          {
            name: "Dips (Weighted if possible)",
            sets: "3 sets",
            reps: "8-15 reps", 
            rest: "90 seconds",
            description: "Bodyweight or lightly weighted dips on parallel bars.",
            tips: "Lean slightly forward to target chest, control the descent."
          },
          {
            name: "Cable Fly",
            sets: "3 sets",
            reps: "12-15 reps",
            rest: "75 seconds",
            description: "Cables set at chest height, focus on stretch and contraction.",
            tips: "Slight bend in elbows, bring hands together in wide arc."
          },
          {
            name: "Decline Barbell Press",
            sets: "3 sets", 
            reps: "10-12 reps",
            rest: "90 seconds",
            description: "Decline bench position targets lower chest effectively.",
            tips: "Secure feet properly, control weight, don't bounce off chest."
          }
        ]
      }
    },
    advanced: {
      home: {
        title: "Advanced Home Chest Workout",
        duration: "45-50 minutes",
        exercises: [
        {
          name: "Archer Push-ups",
          sets: "4 sets",
          reps: "6-10 each side", 
          rest: "90-120 seconds",
          description: "Shift weight to one arm while extending the other. Builds unilateral strength.",
          tips: "Keep both hands on ground but shift 80% weight to working arm."
        },
        {
          name: "One-Arm Push-ups (Progression)",
          sets: "3 sets",
          reps: "3-8 each side",
          rest: "2 minutes",
          description: "Ultimate chest exercise. Use progression variations if needed.",
          tips: "Start with elevated one-arm push-ups before attempting full range."
        },
        {
          name: "Explosive Push-ups",
          sets: "4 sets", 
          reps: "8-12 reps",
          rest: "90 seconds",
          description: "Push up explosively, hands leave ground at top.",
          tips: "Land softly and control the descent for maximum benefit."
        },
        {
          name: "Pseudo Planche Push-ups",
          sets: "3 sets",
          reps: "5-10 reps",
          rest: "2 minutes", 
          description: "Hands positioned lower, lean forward. Extreme chest activation.",
          tips: "This is very advanced - build up gradually to avoid injury."
        },
        {
          name: "Ring/TRX Chest Fly",
          sets: "3 sets",
          reps: "10-15 reps",
          rest: "90 seconds",
          description: "Use suspension trainer for chest fly movement.",
          tips: "Control the eccentric (lowering) portion for maximum muscle activation."
        }
      ]
      },
      gym: {
        title: "Advanced Gym Chest Workout",
        duration: "50-60 minutes",
        exercises: [
          {
            name: "Heavy Barbell Bench Press",
            sets: "5 sets",
            reps: "5-8 reps", 
            rest: "3-4 minutes",
            description: "Heavy compound movement for maximum strength and mass.",
            tips: "Perfect form essential, use spotter for safety, progressive overload."
          },
          {
            name: "Weighted Dips",
            sets: "4 sets",
            reps: "6-10 reps",
            rest: "2-3 minutes",
            description: "Add weight plate or dip belt for increased resistance.",
            tips: "Control the movement, pause at bottom, explosive push up."
          },
          {
            name: "Incline Barbell Press",
            sets: "4 sets", 
            reps: "8-10 reps",
            rest: "2-3 minutes",
            description: "Heavy incline movement for upper chest development.",
            tips: "45-degree incline, full range of motion, squeeze at top."
          },
          {
            name: "Cable Crossover (High to Low)",
            sets: "3 sets",
            reps: "12-15 reps",
            rest: "75 seconds", 
            description: "Cables set high, pull down and across for lower chest.",
            tips: "Focus on the stretch and contraction, control the weight."
          },
          {
            name: "Dumbbell Pullovers",
            sets: "3 sets",
            reps: "10-12 reps",
            rest: "90 seconds",
            description: "Lying across bench, dumbbell pullover for chest expansion.",
            tips: "Focus on stretch in chest, not just tricep movement."
          }
        ]
      }
    }
  };

  const selectedWorkout = workouts[selectedDifficulty][workoutLocation];

  return (
    <>
      <Helmet>
        <title>Complete Chest Workout Guide NZ | Build Chest Muscle at Home | 6Pack</title>
        <meta
          name="description"
          content="Complete chest workout guide for New Zealanders. Build powerful chest muscles at home or gym with our beginner to advanced chest exercises. Home & gym routines included!"
        />
        <meta
          name="keywords"
          content="chest workout NZ, chest exercises, push ups, build chest muscle, home chest workout New Zealand, gym chest workout, chest training, pectoral exercises, bodyweight chest workout, bench press"
        />
        <meta property="og:title" content="Complete Chest Workout Guide | Build Chest Muscle at Home" />
        <meta property="og:description" content="Transform your chest with our complete workout guide. Beginner to advanced exercises for building powerful chest muscles at home." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
        <meta property="og:url" content="https://6pack.co.nz/workouts/chest" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Complete Chest Workout Guide | 6Pack NZ" />
        <meta name="twitter:description" content="Build powerful chest muscles at home with our comprehensive workout guide." />
        <link rel="canonical" href="https://6pack.co.nz/workouts/chest" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Complete Chest Workout Guide - Build Chest Muscle at Home",
            "description": "Comprehensive chest workout guide with exercises for all fitness levels",
            "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            "author": {
              "@type": "Organization",
              "name": "6Pack"
            },
            "publisher": {
              "@type": "Organization", 
              "name": "6Pack",
              "logo": {
                "@type": "ImageObject",
                "url": "https://6pack.co.nz/logo.png"
              }
            },
            "datePublished": "2024-01-15",
            "dateModified": "2024-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://6pack.co.nz/workouts/chest"
            },
            "articleSection": "Fitness",
            "keywords": "chest workout, push ups, chest exercises, bodyweight training"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Muscular chest workout"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <Link
              to="/workouts"
              className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Workouts
            </Link>
            
            <BlurIn
              className="text-5xl md:text-6xl font-bold mb-6"
              word="Build a Powerful Chest"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
              Transform your chest with our complete workout guide. From beginner-friendly exercises to advanced techniques - build strength and muscle at home, no gym required.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="mr-2" size={16} />
                25-50 min workouts
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Target className="mr-2" size={16} />
                All fitness levels
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Users className="mr-2" size={16} />
                No equipment needed
              </div>
            </div>
          </div>
        </div>

        {/* Location & Difficulty Selection */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Workout Location Toggle */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Where are you working out?
            </h2>
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button
                  onClick={() => setWorkoutLocation("home")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    workoutLocation === "home"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  🏠 Home Workout
                </button>
                <button
                  onClick={() => setWorkoutLocation("gym")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    workoutLocation === "gym"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  🏋️ Gym Workout
                </button>
              </div>
            </div>
            <p className="text-center text-gray-600">
              {workoutLocation === "home" 
                ? "No equipment needed - use your bodyweight to build an impressive chest!" 
                : "Access to gym equipment - maximize your chest development with weights!"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Choose Your Fitness Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(workouts).map(([level, locationWorkouts]) => {
                const workout = locationWorkouts[workoutLocation];
                return (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`p-6 rounded-xl text-center transition-all ${
                    selectedDifficulty === level
                      ? "bg-blue-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    selectedDifficulty === level ? "bg-white/20" : "bg-blue-100"
                  }`}>
                    {level === "beginner" && <Users className={`${selectedDifficulty === level ? "text-white" : "text-blue-600"}`} size={24} />}
                    {level === "intermediate" && <Target className={`${selectedDifficulty === level ? "text-white" : "text-blue-600"}`} size={24} />}
                    {level === "advanced" && <Zap className={`${selectedDifficulty === level ? "text-white" : "text-blue-600"}`} size={24} />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 capitalize">{level}</h3>
                  <p className="text-sm opacity-80">{workout.duration}</p>
                </button>
              )})}
            </div>
          </div>

          {/* Workout Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
              <h2 className="text-3xl font-bold mb-2">{selectedWorkout.title}</h2>
              <div className="flex items-center gap-6 text-blue-100">
                <div className="flex items-center">
                  <Clock className="mr-2" size={18} />
                  {selectedWorkout.duration}
                </div>
                <div className="flex items-center">
                  <Target className="mr-2" size={18} />
                  {selectedWorkout.exercises.length} exercises
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Exercise List */}
              <div className="space-y-6">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{exercise.name}</h3>
                        
                        {/* Exercise Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-lg p-3 text-center">
                            <div className="text-blue-600 font-semibold">{exercise.sets}</div>
                            <div className="text-sm text-blue-800">Sets</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 text-center">
                            <div className="text-green-600 font-semibold">{exercise.reps}</div>
                            <div className="text-sm text-green-800">Reps</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <div className="text-purple-600 font-semibold">{exercise.rest}</div>
                            <div className="text-sm text-purple-800">Rest</div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {exercise.description}
                        </p>
                        
                        {/* Tips */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                          <div className="flex items-start">
                            <Info className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                            <div>
                              <div className="font-medium text-yellow-800 mb-1">Pro Tip</div>
                              <div className="text-yellow-700 text-sm">{exercise.tips}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workout Tips */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="text-green-600 mr-3" size={28} />
              Workout Guidelines & Safety Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Before You Start</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Warm up for 5-10 minutes with light cardio
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Perform dynamic stretches for shoulders and arms
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Start with easier variations if you're new
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Have water nearby to stay hydrated
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Form & Safety</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Focus on controlled movements, not speed
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Maintain proper breathing throughout
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Stop if you feel sharp pain
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Cool down with static stretches
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>
            <p className="text-green-100 mb-6">
              Consistency is key! Aim to train your chest 2-3 times per week with at least one day rest between sessions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Week 1-2</div>
                <div className="text-green-200">Build Foundation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Week 3-4</div>
                <div className="text-green-200">Increase Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Week 5+</div>
                <div className="text-green-200">Advanced Progression</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChestWorkout; 