import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Play, Clock, Target, Users, Zap, Info, CheckCircle, Flame } from "lucide-react";
import BlurIn from "../../components/blurText";

function LegsWorkout() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");
  const [workoutLocation, setWorkoutLocation] = useState("home");

  const workouts = {
    beginner: {
      home: {
        title: "Beginner Home Leg Workout",
        duration: "20-25 minutes",
        exercises: [
        {
          name: "Bodyweight Squats",
          sets: "3 sets",
          reps: "10-15 reps",
          rest: "60-90 seconds",
          description: "Basic squat movement focusing on proper form. Sit back like sitting in a chair.",
          tips: "Keep your chest up, knees tracking over toes, and weight in your heels."
        },
        {
          name: "Static Lunges",
          sets: "3 sets", 
          reps: "8-12 each leg",
          rest: "60 seconds",
          description: "Step into lunge position and perform reps without switching legs.",
          tips: "Keep front knee over ankle, back knee nearly touching ground."
        },
        {
          name: "Glute Bridges",
          sets: "3 sets",
          reps: "12-18 reps", 
          rest: "45 seconds",
          description: "Lie on back, feet flat, squeeze glutes to lift hips up.",
          tips: "Focus on squeezing glutes at the top, not arching your back."
        },
        {
          name: "Wall Sit",
          sets: "3 sets",
          reps: "20-30 seconds",
          rest: "60 seconds", 
          description: "Back against wall, slide down until thighs parallel to ground.",
          tips: "Keep knees at 90 degrees and distribute weight evenly."
        },
        {
          name: "Calf Raises",
          sets: "3 sets",
          reps: "15-20 reps",
          rest: "45 seconds",
          description: "Rise up on toes, hold briefly, then lower slowly.",
          tips: "Use wall for balance if needed. Focus on controlled movement."
        }
      ]
      },
      gym: {
        title: "Beginner Gym Leg Workout",
        duration: "25-30 minutes",
        exercises: [
          {
            name: "Leg Press Machine",
            sets: "3 sets",
            reps: "12-15 reps",
            rest: "75-90 seconds",
            description: "Start with light weight on leg press machine to learn the movement.",
            tips: "Full range of motion, don't lock knees completely at top."
          },
          {
            name: "Assisted Squats (Smith Machine)",
            sets: "3 sets", 
            reps: "10-12 reps",
            rest: "90 seconds",
            description: "Use Smith machine for guided squat movement with safety.",
            tips: "Feet slightly ahead of bar, control the descent, drive through heels."
          },
          {
            name: "Leg Curl Machine",
            sets: "3 sets",
            reps: "10-15 reps", 
            rest: "60 seconds",
            description: "Seated or lying leg curl for hamstring development.",
            tips: "Control the movement, squeeze hamstrings at peak contraction."
          },
          {
            name: "Leg Extension Machine",
            sets: "3 sets",
            reps: "12-15 reps",
            rest: "60 seconds", 
            description: "Seated leg extension for quadriceps isolation.",
            tips: "Don't swing the weight, control both up and down phases."
          },
          {
            name: "Calf Press on Leg Press",
            sets: "3 sets",
            reps: "15-20 reps",
            rest: "45 seconds",
            description: "Use leg press machine for calf raises with controlled movement.",
            tips: "Full range of motion, pause and squeeze at the top."
          }
        ]
      }
    },
    intermediate: {
      home: {
        title: "Intermediate Home Leg Workout",
        duration: "30-35 minutes", 
        exercises: [
        {
          name: "Jump Squats",
          sets: "4 sets",
          reps: "12-18 reps",
          rest: "75-90 seconds",
          description: "Explosive squat with jump at the top. Land softly and immediately go into next rep.",
          tips: "Land softly on the balls of your feet, bend knees to absorb impact."
        },
        {
          name: "Walking Lunges", 
          sets: "3 sets",
          reps: "10-15 each leg",
          rest: "60 seconds",
          description: "Step forward into lunge, then step through to next lunge.",
          tips: "Take large steps and keep torso upright throughout movement."
        },
        {
          name: "Single-Leg Glute Bridges",
          sets: "3 sets",
          reps: "8-12 each leg", 
          rest: "60 seconds",
          description: "Glute bridge with one leg extended. Alternate legs each set.",
          tips: "Keep hips level and focus on working leg doing all the work."
        },
        {
          name: "Lateral Lunges",
          sets: "3 sets",
          reps: "10-12 each side",
          rest: "60 seconds",
          description: "Step wide to one side, sit back into hip, then return to center.",
          tips: "Keep toes pointing forward and push through heel to return."
        },
        {
          name: "Bulgarian Split Squats",
          sets: "3 sets", 
          reps: "8-12 each leg",
          rest: "90 seconds",
          description: "Rear foot elevated on bench/chair, perform single-leg squat.",
          tips: "Focus weight on front leg, keep torso upright."
        }
      ]
      },
      gym: {
        title: "Intermediate Gym Leg Workout",
        duration: "35-40 minutes",
        exercises: [
          {
            name: "Barbell Back Squats",
            sets: "4 sets",
            reps: "8-12 reps",
            rest: "2-3 minutes",
            description: "Classic barbell squat with proper form and progressive weight.",
            tips: "Feet shoulder-width apart, chest up, drive through heels."
          },
          {
            name: "Romanian Deadlifts", 
            sets: "3 sets",
            reps: "10-12 reps",
            rest: "90 seconds",
            description: "Hip hinge movement targeting hamstrings and glutes.",
            tips: "Keep bar close to body, straight back, feel stretch in hamstrings."
          },
          {
            name: "Walking Lunges with Dumbbells",
            sets: "3 sets",
            reps: "10-12 each leg", 
            rest: "75 seconds",
            description: "Add dumbbells to increase resistance and challenge.",
            tips: "Large steps, keep torso upright, control the movement."
          },
          {
            name: "Leg Press (Heavy)",
            sets: "3 sets",
            reps: "12-15 reps",
            rest: "90 seconds",
            description: "Progressive overload on leg press with heavier weight.",
            tips: "Full range of motion, don't bounce at bottom position."
          },
          {
            name: "Standing Calf Raises",
            sets: "4 sets", 
            reps: "12-18 reps",
            rest: "60 seconds",
            description: "Machine or dumbbell calf raises for maximum development.",
            tips: "Pause at top, full stretch at bottom, control the movement."
          }
        ]
      }
    },
    advanced: {
      home: {
        title: "Advanced Home Leg Workout",
        duration: "40-45 minutes",
        exercises: [
        {
          name: "Pistol Squats (Assisted)",
          sets: "4 sets",
          reps: "5-10 each leg", 
          rest: "2-3 minutes",
          description: "Single-leg squat to full depth. Use assistance if needed.",
          tips: "Start with box pistol squats, gradually decrease box height."
        },
        {
          name: "Jump Lunges",
          sets: "4 sets",
          reps: "8-12 each leg",
          rest: "90 seconds",
          description: "Explosive lunge with switch legs in mid-air.",
          tips: "Land softly and immediately go into next rep. Focus on control."
        },
        {
          name: "Single-Leg Romanian Deadlifts",
          sets: "3 sets", 
          reps: "8-12 each leg",
          rest: "75 seconds",
          description: "Hinge at hips on one leg, reach toward ground while lifting back leg.",
          tips: "Keep supporting leg slightly bent, focus on hip hinge movement."
        },
        {
          name: "Shrimp Squats (Progression)",
          sets: "3 sets",
          reps: "3-8 each leg",
          rest: "2 minutes", 
          description: "Advanced single-leg squat holding non-working leg behind you.",
          tips: "Extremely advanced - work up to this gradually with progressions."
        },
        {
          name: "Plyometric Lateral Bounds",
          sets: "3 sets",
          reps: "8-12 each side",
          rest: "90 seconds",
          description: "Explosive lateral jumps from leg to leg with pause.",
          tips: "Stick each landing for 1-2 seconds before next bound."
        }
      ]
      },
      gym: {
        title: "Advanced Gym Leg Workout",
        duration: "45-55 minutes",
        exercises: [
          {
            name: "Heavy Barbell Squats",
            sets: "5 sets",
            reps: "5-8 reps", 
            rest: "3-4 minutes",
            description: "Heavy compound squats for maximum strength and mass development.",
            tips: "Perfect form essential, use safety bars, progressive overload."
          },
          {
            name: "Stiff Leg Deadlifts",
            sets: "4 sets",
            reps: "8-10 reps",
            rest: "2-3 minutes",
            description: "Heavy deadlift variation targeting hamstrings and glutes.",
            tips: "Keep legs relatively straight, feel stretch in hamstrings."
          },
          {
            name: "Bulgarian Split Squats (Weighted)",
            sets: "4 sets", 
            reps: "8-12 each leg",
            rest: "90 seconds",
            description: "Add dumbbells or barbell for increased single-leg challenge.",
            tips: "Most weight on front leg, full range of motion."
          },
          {
            name: "Hip Thrust (Barbell)",
            sets: "4 sets",
            reps: "10-15 reps",
            rest: "90 seconds", 
            description: "Barbell hip thrust for maximum glute activation.",
            tips: "Squeeze glutes hard at top, control the descent."
          },
          {
            name: "Weighted Calf Raises",
            sets: "4 sets",
            reps: "15-20 reps",
            rest: "60 seconds",
            description: "Heavy calf raises with significant added weight.",
            tips: "Full range of motion, pause at top for maximum contraction."
          }
        ]
      }
    }
  };

  const selectedWorkout = workouts[selectedDifficulty][workoutLocation];

  return (
    <>
      <Helmet>
        <title>Ultimate Leg Workout Guide NZ | Build Strong Legs at Home | 6Pack</title>
        <meta
          name="description"
          content="Build powerful legs with our ultimate workout guide for New Zealanders. Squats, lunges, and advanced exercises. No gym needed - complete leg training at home!"
        />
        <meta
          name="keywords"
          content="leg workout NZ, leg exercises, squats, lunges, leg training New Zealand, build leg muscle, home leg workout, bodyweight leg exercises, strong legs"
        />
        <meta property="og:title" content="Ultimate Leg Workout Guide | Build Strong Legs at Home" />
        <meta property="og:description" content="Transform your legs with our complete workout guide. Build strength and muscle with proven exercises for all fitness levels." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=1200&h=600&fit=crop&fm=webp&q=85" />
        <meta property="og:url" content="https://www.6pack.co.nz/workouts/legs" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ultimate Leg Workout Guide | 6Pack NZ" />
        <meta name="twitter:description" content="Build powerful legs at home with our comprehensive workout guide." />
        <link rel="canonical" href="https://www.6pack.co.nz/workouts/legs" />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Ultimate Leg Workout Guide - Build Strong Legs at Home",
            "description": "Comprehensive leg workout guide with exercises for all fitness levels",
            "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=1200&h=600&fit=crop&fm=webp&q=85",
            "author": {
              "@type": "Organization",
              "name": "6Pack"
            },
            "publisher": {
              "@type": "Organization", 
              "name": "6Pack",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.6pack.co.nz/logo.png"
              }
            },
            "datePublished": "2024-01-15",
            "dateModified": "2024-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.6pack.co.nz/workouts/legs"
            },
            "articleSection": "Fitness",
            "keywords": "leg workout, squats, lunges, leg exercises, bodyweight training"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=1200&h=600&fit=crop&fm=webp&q=85"
              alt="Athletic legs workout training"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <Link
              to="/workouts"
              className="inline-flex items-center text-red-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Workouts
            </Link>
            
            <BlurIn
              className="text-5xl md:text-6xl font-bold mb-6"
              word="Build Unstoppable Legs"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
              Develop incredible leg strength and power with our comprehensive workout guide. From beginner squats to advanced single-leg movements - transform your lower body at home.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="mr-2" size={16} />
                20-45 min workouts
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Flame className="mr-2" size={16} />
                High calorie burn
              </div>
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Target className="mr-2" size={16} />
                Functional strength
              </div>
            </div>
          </div>
        </div>

        {/* Location & Difficulty Selection */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Workout Location Toggle */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Where are you training?
            </h2>
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button
                  onClick={() => setWorkoutLocation("home")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    workoutLocation === "home"
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  🏠 Home Workout
                </button>
                <button
                  onClick={() => setWorkoutLocation("gym")}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    workoutLocation === "gym"
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  🏋️ Gym Workout
                </button>
              </div>
            </div>
            <p className="text-center text-gray-600">
              {workoutLocation === "home" 
                ? "Build powerful legs with bodyweight exercises - no equipment needed!" 
                : "Maximize leg development with barbells, dumbbells, and machines!"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Choose Your Training Level
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
                      ? "bg-red-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    selectedDifficulty === level ? "bg-white/20" : "bg-red-100"
                  }`}>
                    {level === "beginner" && <Users className={`${selectedDifficulty === level ? "text-white" : "text-red-600"}`} size={24} />}
                    {level === "intermediate" && <Target className={`${selectedDifficulty === level ? "text-white" : "text-red-600"}`} size={24} />}
                    {level === "advanced" && <Zap className={`${selectedDifficulty === level ? "text-white" : "text-red-600"}`} size={24} />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 capitalize">{level}</h3>
                  <p className="text-sm opacity-80">{workout.duration}</p>
                </button>
              )})}
            </div>
          </div>

          {/* Workout Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8">
              <h2 className="text-3xl font-bold mb-2">{selectedWorkout.title}</h2>
              <div className="flex items-center gap-6 text-red-100">
                <div className="flex items-center">
                  <Clock className="mr-2" size={18} />
                  {selectedWorkout.duration}
                </div>
                <div className="flex items-center">
                  <Target className="mr-2" size={18} />
                  {selectedWorkout.exercises.length} exercises
                </div>
                <div className="flex items-center">
                  <Flame className="mr-2" size={18} />
                  High intensity
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Exercise List */}
              <div className="space-y-6">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">{exercise.name}</h3>
                        
                        {/* Exercise Stats */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                          <div className="bg-red-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-red-600 font-semibold text-sm sm:text-base">{exercise.sets}</div>
                            <div className="text-xs sm:text-sm text-red-800">Sets</div>
                          </div>
                          <div className="bg-orange-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-orange-600 font-semibold text-sm sm:text-base">{exercise.reps}</div>
                            <div className="text-xs sm:text-sm text-orange-800">Reps</div>
                          </div>
                          <div className="bg-yellow-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-yellow-600 font-semibold text-sm sm:text-base">{exercise.rest}</div>
                            <div className="text-xs sm:text-sm text-yellow-800">Rest</div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {exercise.description}
                        </p>
                        
                        {/* Tips */}
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <div className="flex items-start">
                            <Info className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                            <div>
                              <div className="font-medium text-amber-800 mb-1">Form Focus</div>
                              <div className="text-amber-700 text-sm">{exercise.tips}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Muscle Groups Targeted */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="text-red-600 mr-3" size={28} />
              Muscles Targeted in This Workout
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <h3 className="font-semibold text-gray-900">Quadriceps</h3>
                <p className="text-sm text-gray-600 mt-1">Front thigh muscles</p>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="w-16 h-16 bg-orange-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <h3 className="font-semibold text-gray-900">Glutes</h3>
                <p className="text-sm text-gray-600 mt-1">Hip and buttock muscles</p>
              </div>
              
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <div className="w-16 h-16 bg-amber-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <h3 className="font-semibold text-gray-900">Hamstrings</h3>
                <p className="text-sm text-gray-600 mt-1">Back thigh muscles</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="w-16 h-16 bg-yellow-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <h3 className="font-semibold text-gray-900">Calves</h3>
                <p className="text-sm text-gray-600 mt-1">Lower leg muscles</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Why Train Your Legs?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Benefits</h3>
                <ul className="space-y-2 text-red-100">
                  <li className="flex items-start">
                    <CheckCircle className="text-red-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Improved athletic performance and power
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-red-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Better balance and stability
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-red-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Enhanced jumping and running ability
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-red-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Increased daily functional strength
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Health Benefits</h3>
                <ul className="space-y-2 text-red-100">
                  <li className="flex items-start">
                    <CheckCircle className="text-red-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Highest calorie burn of any muscle group
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-red-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Improved bone density and joint health
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-red-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Better posture and back health
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-red-300 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    Reduced injury risk in daily activities
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

export default LegsWorkout; 