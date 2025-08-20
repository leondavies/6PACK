"use client";

import { useState } from "react";
import { Clock, Target, Users, Zap, Info, CheckCircle } from "lucide-react";

export default function WorkoutClient({ workout, params }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");
  const [workoutLocation, setWorkoutLocation] = useState("home");

  const selectedWorkout = workout.workouts[selectedDifficulty]?.[workoutLocation];

  return (
    <>
      {/* Location & Difficulty Selection */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              ? `No equipment needed - use your bodyweight to build an impressive ${params.slug}!` 
              : `Access to gym equipment - maximize your ${params.slug} development with weights!`}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Fitness Level
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {Object.entries(workout.workouts).map(([level, locationWorkouts]) => {
              const levelWorkout = locationWorkouts[workoutLocation];
              if (!levelWorkout) return null;
              
              return (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`p-4 sm:p-6 rounded-xl text-center transition-all ${
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
                <p className="text-sm opacity-80">{levelWorkout.duration}</p>
              </button>
            );
            })}
          </div>
        </div>

        {/* Workout Content */}
        {selectedWorkout && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${workout.color} text-white p-8`}>
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
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">{exercise.name}</h3>
                        
                        {/* Exercise Stats */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                          <div className="bg-blue-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-blue-600 font-semibold text-sm sm:text-base">{exercise.sets}</div>
                            <div className="text-xs sm:text-sm text-blue-800">Sets</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-green-600 font-semibold text-sm sm:text-base">{exercise.reps}</div>
                            <div className="text-xs sm:text-sm text-green-800">Reps</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-2 sm:p-3 text-center">
                            <div className="text-purple-600 font-semibold text-sm sm:text-base">{exercise.rest}</div>
                            <div className="text-xs sm:text-sm text-purple-800">Rest</div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-700 mb-3 leading-relaxed text-sm sm:text-base">
                          {exercise.description}
                        </p>
                        
                        {/* Tips */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded-r-lg">
                          <div className="flex items-start">
                            <Info className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                            <div className="min-w-0">
                              <div className="font-medium text-yellow-800 mb-1 text-sm">Pro Tip</div>
                              <div className="text-yellow-700 text-xs sm:text-sm leading-relaxed">{exercise.tips}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workout Tips */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="text-green-600 mr-3" size={28} />
            Workout Guidelines & Safety Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Before You Start</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  Warm up for 5-10 minutes with light cardio
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  Perform dynamic stretches for target muscles
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Form & Safety</h3>
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
            Consistency is key! Aim to train your {params.slug} 2-3 times per week with at least one day rest between sessions.
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
    </>
  );
}