import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Play, Clock, Target, Users, Zap, Info, CheckCircle, Shield } from "lucide-react";
import BlurIn from "../../components/blurText";

function CoreWorkout() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");
  const [workoutLocation, setWorkoutLocation] = useState("home");

  const workouts = {
    beginner: {
      home: {
        title: "Beginner Home Core Workout",
        duration: "15-20 minutes",
        exercises: [
        {
          name: "Dead Bug",
          sets: "3 sets",
          reps: "8-10 each side",
          rest: "45-60 seconds",
          description: "Lie on back, arms up, knees at 90°. Lower opposite arm and leg slowly.",
          tips: "Keep lower back pressed to floor throughout the entire movement."
        },
        {
          name: "Modified Plank",
          sets: "3 sets", 
          reps: "15-30 seconds",
          rest: "60 seconds",
          description: "Hold plank position on knees instead of toes to build initial strength.",
          tips: "Keep straight line from head to knees, engage core and breathe normally."
        },
        {
          name: "Bird Dog",
          sets: "3 sets",
          reps: "8-10 each side", 
          rest: "45 seconds",
          description: "On hands and knees, extend opposite arm and leg, hold briefly.",
          tips: "Focus on balance and control, don't let hips rotate or drop."
        },
        {
          name: "Glute Bridge Hold",
          sets: "3 sets",
          reps: "15-20 seconds",
          rest: "45 seconds", 
          description: "Bridge position with focus on engaging core and glutes together.",
          tips: "Squeeze glutes at top, keep core tight to prevent back arch."
        },
        {
          name: "Standing Marches",
          sets: "2 sets",
          reps: "10-15 each leg",
          rest: "30 seconds",
          description: "Stand tall, lift knees to 90° alternating legs while keeping core tight.",
          tips: "Keep torso upright and still, only legs should move."
        }
      ]
      },
      gym: {
        title: "Beginner Gym Core Workout",
        duration: "20-25 minutes",
        exercises: [
          {
            name: "Assisted Hanging Knee Raises",
            sets: "3 sets",
            reps: "8-12 reps",
            rest: "60-75 seconds",
            description: "Use assisted pull-up machine or captain's chair for knee raises.",
            tips: "Control the movement, don't swing, focus on lifting knees to chest."
          },
          {
            name: "Cable Crunches",
            sets: "3 sets", 
            reps: "12-15 reps",
            rest: "60 seconds",
            description: "Kneel in front of cable machine, crunch down with light weight.",
            tips: "Keep hips stationary, crunch using abs, not arms or back."
          },
          {
            name: "Machine Crunches",
            sets: "3 sets",
            reps: "15-20 reps", 
            rest: "45 seconds",
            description: "Seated ab crunch machine with light resistance.",
            tips: "Slow controlled movement, squeeze abs at bottom position."
          },
          {
            name: "Stability Ball Plank",
            sets: "3 sets",
            reps: "20-30 seconds",
            rest: "60 seconds", 
            description: "Forearms on stability ball, hold plank position.",
            tips: "Keep straight line from head to toes, engage core throughout."
          },
          {
            name: "Cable Wood Chops (Light)",
            sets: "2 sets",
            reps: "10-12 each side",
            rest: "45 seconds",
            description: "Light weight cable rotation from high to low position.",
            tips: "Rotate through your core, keep arms relatively straight."
          }
        ]
      }
    },
    intermediate: {
      home: {
        title: "Intermediate Home Core Workout",
        duration: "25-30 minutes", 
        exercises: [
        {
          name: "Standard Plank",
          sets: "4 sets",
          reps: "30-60 seconds",
          rest: "60-75 seconds",
          description: "Full plank on toes, maintain straight line from head to heels.",
          tips: "Don't let hips sag or pike up. Breathe steadily throughout hold."
        },
        {
          name: "Bicycle Crunches", 
          sets: "3 sets",
          reps: "15-20 each side",
          rest: "60 seconds",
          description: "Alternate bringing elbow to opposite knee in cycling motion.",
          tips: "Focus on rotation, don't just move your elbows - twist your torso."
        },
        {
          name: "Russian Twists",
          sets: "3 sets",
          reps: "20-30 total", 
          rest: "60 seconds",
          description: "Seated position, lean back slightly, rotate torso side to side.",
          tips: "Keep chest up and core engaged, movement comes from torso rotation."
        },
        {
          name: "Mountain Climbers",
          sets: "3 sets",
          reps: "20-30 total",
          rest: "75 seconds",
          description: "Plank position, alternate bringing knees to chest in running motion.",
          tips: "Keep hips level and core tight, start slow and build speed."
        },
        {
          name: "Side Plank",
          sets: "3 sets", 
          reps: "20-40 seconds each side",
          rest: "90 seconds",
          description: "Side-lying plank, body in straight line supported by forearm.",
          tips: "Stack hips and shoulders, lift hips up to create straight line."
        }
      ]
      },
      gym: {
        title: "Intermediate Gym Core Workout",
        duration: "30-35 minutes",
        exercises: [
          {
            name: "Hanging Knee Raises",
            sets: "4 sets",
            reps: "10-15 reps",
            rest: "75-90 seconds",
            description: "Hang from pull-up bar, raise knees to chest level.",
            tips: "Control the swing, focus on using abs to lift knees."
          },
          {
            name: "Cable Crunches (Weighted)", 
            sets: "3 sets",
            reps: "12-18 reps",
            rest: "60 seconds",
            description: "Increase weight from beginner version, maintain form.",
            tips: "Progressive overload while maintaining perfect technique."
          },
          {
            name: "Russian Twists with Weight",
            sets: "3 sets",
            reps: "20-30 total", 
            rest: "60 seconds",
            description: "Hold weight plate or medicine ball while rotating.",
            tips: "Keep feet off ground if possible, control the rotation."
          },
          {
            name: "Decline Sit-ups",
            sets: "3 sets",
            reps: "15-20 reps",
            rest: "75 seconds",
            description: "Use decline bench for increased range of motion.",
            tips: "Don't go too steep initially, maintain control throughout."
          },
          {
            name: "Cable Pallof Press",
            sets: "3 sets", 
            reps: "10-12 each side",
            rest: "60 seconds",
            description: "Anti-rotation exercise holding cable at chest level.",
            tips: "Resist the pull of the cable, keep torso perfectly straight."
          }
        ]
      }
    },
    advanced: {
      home: {
        title: "Advanced Home Core Workout",
        duration: "35-40 minutes",
        exercises: [
        {
          name: "L-Sit Hold",
          sets: "4 sets",
          reps: "10-30 seconds", 
          rest: "90-120 seconds",
          description: "Seated position, hands beside hips, lift entire lower body off ground.",
          tips: "Start with knees bent, gradually work toward straight legs."
        },
        {
          name: "Dragon Flags",
          sets: "3 sets",
          reps: "5-10 reps",
          rest: "2 minutes",
          description: "Lie on bench, hold behind head, lift entire body using only shoulders.",
          tips: "Extremely advanced - work up with negatives and partial reps."
        },
        {
          name: "Hollow Body Rocks",
          sets: "3 sets", 
          reps: "15-25 reps",
          rest: "75 seconds",
          description: "Hollow position on back, rock forward and backward while maintaining shape.",
          tips: "Lower back should not touch ground, maintain constant core tension."
        },
        {
          name: "Single-Arm Plank",
          sets: "3 sets",
          reps: "15-30 seconds each arm",
          rest: "90 seconds", 
          description: "Standard plank but lift one arm forward, alternate arms.",
          tips: "Don't let hips rotate, keep body perfectly straight and stable."
        },
        {
          name: "V-Ups",
          sets: "3 sets",
          reps: "12-20 reps",
          rest: "75 seconds",
          description: "Lie flat, simultaneously lift legs and torso to form V-shape.",
          tips: "Touch hands to feet at top, control the descent slowly."
        }
      ]
      },
      gym: {
        title: "Advanced Gym Core Workout",
        duration: "40-50 minutes",
        exercises: [
          {
            name: "Weighted Hanging Leg Raises",
            sets: "4 sets",
            reps: "8-12 reps", 
            rest: "2-3 minutes",
            description: "Add ankle weights or dumbbell between feet for extra resistance.",
            tips: "Extremely challenging - build up gradually, perfect form essential."
          },
          {
            name: "Cable Crunches (Heavy)",
            sets: "4 sets",
            reps: "10-15 reps",
            rest: "90 seconds",
            description: "Heavy weight cable crunches for maximum ab development.",
            tips: "Focus on the crunch movement, not just pulling the weight down."
          },
          {
            name: "Barbell Rollouts",
            sets: "3 sets", 
            reps: "8-12 reps",
            rest: "2 minutes",
            description: "Use barbell instead of ab wheel for rollout movement.",
            tips: "Control the extension and contraction, extremely advanced movement."
          },
          {
            name: "Weighted Decline Sit-ups",
            sets: "3 sets",
            reps: "12-18 reps",
            rest: "90 seconds", 
            description: "Hold weight plate across chest during decline sit-ups.",
            tips: "Increase weight gradually, maintain full range of motion."
          },
          {
            name: "Dragon Flags (Assisted)",
            sets: "3 sets",
            reps: "5-8 reps",
            rest: "2-3 minutes",
            description: "Use bench for dragon flags with assistance if needed.",
            tips: "Master the negative portion first before full dragon flags."
          }
        ]
      }
    }
  };

  const selectedWorkout = workouts[selectedDifficulty][workoutLocation];

  return (
    <>
      <Helmet>
        <title>Ultimate Core Workout Guide NZ | Build Six Pack Abs at Home | 6Pack</title>
        <meta
          name="description"
          content="Build incredible core strength and six-pack abs with our ultimate core workout guide for New Zealanders. Planks, crunches, and advanced ab exercises - no gym required!"
        />
        <meta
          name="keywords"
          content="core workout NZ, abs exercises, six pack workout, core training New Zealand, plank exercises, ab workout, core strength, home ab workout, 6 pack abs"
        />
        <meta property="og:title" content="Ultimate Core Workout Guide | Build Six Pack Abs at Home" />
        <meta property="og:description" content="Transform your core with our complete ab workout guide. Build strength and definition with proven exercises for all fitness levels." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85" />
        <meta property="og:url" content="https://6pack.co.nz/workouts/core" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ultimate Core Workout Guide | 6Pack NZ" />
        <meta name="twitter:description" content="Build six-pack abs and core strength at home with our comprehensive workout guide." />
        <link rel="canonical" href="https://6pack.co.nz/workouts/core" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Ultimate Core Workout Guide - Build Six Pack Abs at Home",
            "description": "Comprehensive core and abs workout guide with exercises for all fitness levels",
            "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85",
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
              "@id": "https://6pack.co.nz/workouts/core"
            },
            "articleSection": "Fitness",
            "keywords": "core workout, abs exercises, six pack, plank, core training"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85"
              alt="Strong core and abs workout"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <Link
              to="/workouts"
              className="inline-flex items-center text-emerald-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Workouts
            </Link>
            
            <BlurIn
              className="text-5xl md:text-6xl font-bold mb-6"
              word="Build Your Six Pack"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
              Develop incredible core strength and definition with our comprehensive workout guide. From beginner planks to advanced movements - build the abs you've always wanted.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="mr-2" size={16} />
                15-40 min workouts
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Shield className="mr-2" size={16} />
                Core stability
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Target className="mr-2" size={16} />
                Visible abs
              </div>
            </div>
          </div>
        </div>

        {/* Location & Difficulty Selection */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Workout Location Toggle */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Where are you training your core?
            </h2>
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button
                  onClick={() => setWorkoutLocation("home")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    workoutLocation === "home"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  🏠 Home Workout
                </button>
                <button
                  onClick={() => setWorkoutLocation("gym")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    workoutLocation === "gym"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  🏋️ Gym Workout
                </button>
              </div>
            </div>
            <p className="text-center text-gray-600">
              {workoutLocation === "home" 
                ? "Build six-pack abs with bodyweight core exercises!" 
                : "Maximize core development with gym equipment and weights!"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Choose Your Core Level
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
                      ? "bg-emerald-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    selectedDifficulty === level ? "bg-white/20" : "bg-emerald-100"
                  }`}>
                    {level === "beginner" && <Users className={`${selectedDifficulty === level ? "text-white" : "text-emerald-600"}`} size={24} />}
                    {level === "intermediate" && <Target className={`${selectedDifficulty === level ? "text-white" : "text-emerald-600"}`} size={24} />}
                    {level === "advanced" && <Zap className={`${selectedDifficulty === level ? "text-white" : "text-emerald-600"}`} size={24} />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 capitalize">{level}</h3>
                  <p className="text-sm opacity-80">{workout.duration}</p>
                </button>
              )})}
            </div>
          </div>

          {/* Workout Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8">
              <h2 className="text-3xl font-bold mb-2">{selectedWorkout.title}</h2>
              <div className="flex items-center gap-6 text-emerald-100">
                <div className="flex items-center">
                  <Clock className="mr-2" size={18} />
                  {selectedWorkout.duration}
                </div>
                <div className="flex items-center">
                  <Target className="mr-2" size={18} />
                  {selectedWorkout.exercises.length} exercises
                </div>
                <div className="flex items-center">
                  <Shield className="mr-2" size={18} />
                  Core stability
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Exercise List */}
              <div className="space-y-6">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">{exercise.name}</h3>
                        
                        {/* Exercise Stats */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                          <div className="bg-emerald-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-emerald-600 font-semibold text-sm sm:text-base">{exercise.sets}</div>
                            <div className="text-xs sm:text-sm text-emerald-800">Sets</div>
                          </div>
                          <div className="bg-teal-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-teal-600 font-semibold text-sm sm:text-base">{exercise.reps}</div>
                            <div className="text-xs sm:text-sm text-teal-800">Reps/Time</div>
                          </div>
                          <div className="bg-cyan-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-cyan-600 font-semibold text-sm sm:text-base">{exercise.rest}</div>
                            <div className="text-xs sm:text-sm text-cyan-800">Rest</div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {exercise.description}
                        </p>
                        
                        {/* Tips */}
                        <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
                          <div className="flex items-start">
                            <Info className="text-emerald-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                            <div>
                              <div className="font-medium text-emerald-800 mb-1">Core Focus</div>
                              <div className="text-emerald-700 text-sm">{exercise.tips}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Benefits */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="text-emerald-600 mr-3" size={28} />
              Why Core Training is Essential
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Improved posture and spinal alignment
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Enhanced balance and stability
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Better power transfer in all movements
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Reduced lower back pain risk
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aesthetic Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Visible six-pack abs development
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Improved waist definition and shape
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Better overall physique proportions
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Enhanced confidence and body awareness
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Training Tips */}
          <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Core Training Success Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Training Frequency</h3>
                <ul className="space-y-2 text-emerald-100">
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Train core 3-4 times per week
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Allow 48 hours rest between intense sessions
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Focus on quality over quantity
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Progress gradually to avoid injury
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Nutrition for Abs</h3>
                <ul className="space-y-2 text-emerald-100">
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Maintain caloric deficit for fat loss
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Prioritise protein for muscle recovery
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Stay hydrated for optimal performance
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-emerald-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Abs are made in the kitchen - diet is key!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoreWorkout; 