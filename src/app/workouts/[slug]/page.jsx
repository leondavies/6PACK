import Link from "next/link";
import { ArrowLeft, Clock, Target, Users } from "lucide-react";
import { notFound } from "next/navigation";
import BlurIn from "../../../components/blurText";
import WorkoutClient from "./WorkoutClient";

const workoutData = {
  chest: {
    title: "Build a Powerful Chest",
    description: "Transform your chest with our complete workout guide. From beginner-friendly exercises to advanced techniques - build strength and muscle at home, no gym required.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85",
    color: "from-blue-600 to-purple-700",
    workouts: {
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
    }
  },
  legs: {
    title: "Build Unstoppable Leg Strength",
    description: "Develop powerful legs with our comprehensive training guide. From beginner squats to advanced movements - build lower body strength that translates to real-world power.",
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=1200&h=600&fit=crop&fm=webp&q=85",
    color: "from-red-600 to-orange-600",
    workouts: {
      beginner: {
        home: {
          title: "Beginner Home Leg Workout",
          duration: "20-30 minutes",
          exercises: [
            {
              name: "Bodyweight Squats",
              sets: "3 sets",
              reps: "10-15 reps",
              rest: "60 seconds",
              description: "Master the fundamental squat movement with proper form.",
              tips: "Keep knees in line with toes, sit back like sitting in a chair."
            },
            {
              name: "Lunges",
              sets: "3 sets",
              reps: "8-12 each leg",
              rest: "60 seconds",
              description: "Step forward into lunge position, alternating legs.",
              tips: "Keep front knee over ankle, drive through front heel to stand."
            },
            {
              name: "Wall Sit",
              sets: "3 sets",
              reps: "20-45 seconds",
              rest: "90 seconds",
              description: "Sit against wall with thighs parallel to ground.",
              tips: "Keep back flat against wall, distribute weight evenly."
            },
            {
              name: "Calf Raises",
              sets: "3 sets",
              reps: "15-20 reps",
              rest: "45 seconds",
              description: "Rise up on toes, squeeze calves at the top.",
              tips: "Control the movement, full range of motion up and down."
            }
          ]
        },
        gym: {
          title: "Beginner Gym Leg Workout",
          duration: "30-40 minutes",
          exercises: [
            {
              name: "Leg Press Machine",
              sets: "3 sets",
              reps: "12-15 reps",
              rest: "90 seconds",
              description: "Seated leg press with moderate weight.",
              tips: "Full range of motion, don't lock knees at top."
            },
            {
              name: "Leg Curl Machine",
              sets: "3 sets",
              reps: "10-12 reps",
              rest: "75 seconds",
              description: "Lying or seated hamstring curls.",
              tips: "Control both up and down movements, squeeze hamstrings."
            },
            {
              name: "Leg Extension Machine",
              sets: "3 sets",
              reps: "12-15 reps",
              rest: "75 seconds",
              description: "Seated quad extension with light weight.",
              tips: "Squeeze quads at top, control the negative slowly."
            },
            {
              name: "Assisted Squats",
              sets: "3 sets",
              reps: "8-12 reps",
              rest: "90 seconds",
              description: "Use Smith machine or assistance for proper form.",
              tips: "Focus on form over weight, full depth if possible."
            }
          ]
        }
      },
      intermediate: {
        home: {
          title: "Intermediate Home Leg Workout",
          duration: "35-45 minutes",
          exercises: [
            {
              name: "Jump Squats",
              sets: "4 sets",
              reps: "15-20 reps",
              rest: "75 seconds",
              description: "Explosive bodyweight squats with jump at the top.",
              tips: "Land softly on balls of feet, maintain good squat form throughout."
            },
            {
              name: "Bulgarian Split Squats",
              sets: "3 sets",
              reps: "12-15 each leg",
              rest: "90 seconds",
              description: "Rear foot elevated single-leg squats for unilateral strength.",
              tips: "Keep most weight on front leg, drive through front heel to stand."
            },
            {
              name: "Single-Leg Deadlifts",
              sets: "3 sets",
              reps: "10-12 each leg",
              rest: "75 seconds",
              description: "Balance on one leg while hinging at hip with bodyweight.",
              tips: "Keep standing leg slightly bent, reach opposite hand toward ground."
            },
            {
              name: "Lateral Lunges",
              sets: "3 sets",
              reps: "12-15 each side",
              rest: "60 seconds",
              description: "Step out to side into wide squat, alternate legs.",
              tips: "Keep chest up, push hips back, knee tracks over toe."
            },
            {
              name: "Wall Sit",
              sets: "3 sets",
              reps: "45-75 seconds",
              rest: "90 seconds",
              description: "Hold squat position against wall for time.",
              tips: "Thighs parallel to floor, back flat against wall."
            },
            {
              name: "Step-ups",
              sets: "3 sets",
              reps: "12-15 each leg",
              rest: "75 seconds",
              description: "Step up onto stable surface, control the descent.",
              tips: "Drive through heel, step down with control, alternate legs."
            }
          ]
        },
        gym: {
          title: "Intermediate Gym Leg Workout",
          duration: "40-50 minutes",
          exercises: [
            {
              name: "Barbell Back Squats",
              sets: "4 sets",
              reps: "8-12 reps",
              rest: "2-3 minutes",
              description: "Classic barbell squats with moderate weight.",
              tips: "Bar on upper traps, drive knees out, full depth if mobility allows."
            },
            {
              name: "Romanian Deadlifts",
              sets: "3 sets",
              reps: "10-12 reps",
              rest: "2 minutes",
              description: "Hip-hinge movement targeting hamstrings and glutes.",
              tips: "Keep bar close to body, push hips back first, feel stretch in hamstrings."
            },
            {
              name: "Walking Lunges",
              sets: "3 sets",
              reps: "20 steps total",
              rest: "90 seconds",
              description: "Forward walking lunges with bodyweight or light dumbbells.",
              tips: "Long step forward, back knee nearly touches ground, drive through front heel."
            },
            {
              name: "Leg Press",
              sets: "3 sets",
              reps: "12-15 reps",
              rest: "2 minutes",
              description: "Leg press machine with moderate weight and full range.",
              tips: "Feet shoulder-width apart, control both directions, don't lock knees."
            },
            {
              name: "Calf Raises",
              sets: "4 sets",
              reps: "15-20 reps",
              rest: "60 seconds",
              description: "Standing calf raises with bodyweight or light weight.",
              tips: "Full range of motion, pause briefly at top contraction."
            },
            {
              name: "Goblet Squats",
              sets: "3 sets",
              reps: "15-18 reps",
              rest: "90 seconds",
              description: "Hold dumbbell or kettlebell at chest level while squatting.",
              tips: "Weight at chest helps with squat form, sit back into heels."
            }
          ]
        }
      },
      advanced: {
        home: {
          title: "Advanced Home Leg Workout",
          duration: "45-55 minutes",
          exercises: [
            {
              name: "Pistol Squats (Assisted)",
              sets: "4 sets",
              reps: "6-10 each leg",
              rest: "2 minutes",
              description: "Single-leg squats to full depth, use assistance as needed.",
              tips: "Use TRX, band, or hold onto something for balance as you progress."
            },
            {
              name: "Jump Lunges",
              sets: "4 sets",
              reps: "16-20 total",
              rest: "90 seconds",
              description: "Explosive lunges with jump to switch legs mid-air.",
              tips: "Land in lunge position, control the landing, maintain form throughout."
            },
            {
              name: "Single-Leg Hip Thrusts",
              sets: "3 sets",
              reps: "12-15 each leg",
              rest: "75 seconds",
              description: "Hip thrust with one leg, other leg extended straight.",
              tips: "Squeeze glutes at top, keep core tight, control the descent."
            },
            {
              name: "Curtsy Lunges",
              sets: "3 sets",
              reps: "12-15 each leg",
              rest: "60 seconds",
              description: "Step back and across into curtsy position.",
              tips: "Keep chest up, majority of weight on front leg, good balance."
            },
            {
              name: "Single-Leg Glute Bridges",
              sets: "3 sets",
              reps: "15-20 each leg",
              rest: "75 seconds",
              description: "Bridge with one leg, other leg extended or bent.",
              tips: "Drive through heel, pause at top, feel glute activation."
            },
            {
              name: "Squat Pulses",
              sets: "3 sets",
              reps: "20-30 pulses",
              rest: "90 seconds",
              description: "Hold bottom of squat and pulse up and down small range.",
              tips: "Stay in squat position, small movements, burn in quads and glutes."
            },
            {
              name: "Box Step-ups (High)",
              sets: "3 sets",
              reps: "10-12 each leg",
              rest: "90 seconds",
              description: "Step up onto higher surface (20+ inches), control descent.",
              tips: "Drive through heel, full hip extension at top, slow controlled down."
            }
          ]
        },
        gym: {
          title: "Advanced Gym Leg Workout",
          duration: "50-60 minutes",
          exercises: [
            {
              name: "Front Squats",
              sets: "4 sets",
              reps: "6-10 reps",
              rest: "3 minutes",
              description: "Barbell front squats emphasizing quad development.",
              tips: "Bar on front delts, elbows high, more upright torso than back squat."
            },
            {
              name: "Sumo Deadlifts",
              sets: "4 sets",
              reps: "6-8 reps",
              rest: "3 minutes",
              description: "Wide stance deadlifts targeting glutes and inner thighs.",
              tips: "Toes pointed out, chest up, drive knees out in line with toes."
            },
            {
              name: "Bulgarian Split Squats (Weighted)",
              sets: "3 sets",
              reps: "10-12 each leg",
              rest: "2 minutes",
              description: "Add dumbbells or barbell to increase difficulty.",
              tips: "Keep most weight on front leg, full range of motion, control tempo."
            },
            {
              name: "Stiff-Leg Deadlifts",
              sets: "3 sets",
              reps: "10-12 reps",
              rest: "2 minutes",
              description: "Straight leg deadlifts focusing on hamstring stretch and strength.",
              tips: "Slight knee bend, push hips back, feel deep hamstring stretch."
            },
            {
              name: "Walking Lunges (Weighted)",
              sets: "3 sets",
              reps: "24-30 steps",
              rest: "2 minutes",
              description: "Forward lunges with dumbbells or barbell.",
              tips: "Long steps, back knee nearly touches ground, drive through front heel."
            },
            {
              name: "Single-Leg Leg Press",
              sets: "3 sets",
              reps: "12-15 each leg",
              rest: "90 seconds",
              description: "Unilateral leg press to address imbalances.",
              tips: "Full range of motion, control both directions, equal work each leg."
            },
            {
              name: "Calf Raises (Weighted)",
              sets: "4 sets",
              reps: "12-18 reps",
              rest: "75 seconds",
              description: "Standing calf raises with barbell or heavy dumbbells.",
              tips: "Full stretch at bottom, pause at peak contraction, control descent."
            }
          ]
        }
      }
    }
  },
  core: {
    title: "Build Six-Pack Abs & Core Stability",
    description: "Develop a strong, stable core with our comprehensive ab training guide. From basic planks to advanced movements - build the foundation for total body strength.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&fm=webp&q=85",
    color: "from-emerald-600 to-teal-600",
    workouts: {
      beginner: {
        home: {
          title: "Beginner Home Core Workout",
          duration: "15-25 minutes",
          exercises: [
            {
              name: "Basic Plank",
              sets: "3 sets",
              reps: "20-45 seconds",
              rest: "60 seconds",
              description: "Hold plank position maintaining straight body line.",
              tips: "Keep core tight, breathe normally, no sagging hips."
            },
            {
              name: "Crunches",
              sets: "3 sets",
              reps: "15-20 reps",
              rest: "45 seconds",
              description: "Lift shoulders off ground, focus on abs contraction.",
              tips: "Don't pull on neck, lead with chest not head."
            },
            {
              name: "Dead Bug",
              sets: "3 sets",
              reps: "8-10 each side",
              rest: "60 seconds",
              description: "Lying on back, extend opposite arm and leg.",
              tips: "Keep lower back pressed to floor throughout movement."
            },
            {
              name: "Modified Side Plank",
              sets: "2 sets",
              reps: "15-30 seconds each side",
              rest: "60 seconds",
              description: "Side plank on knees if full version too challenging.",
              tips: "Keep body in straight line, support yourself properly."
            }
          ]
        },
        gym: {
          title: "Beginner Gym Core Workout",
          duration: "20-30 minutes",
          exercises: [
            {
              name: "Cable Crunches",
              sets: "3 sets",
              reps: "12-15 reps",
              rest: "60 seconds",
              description: "Kneeling cable crunches with light weight.",
              tips: "Focus on abs pulling weight, not arms or back."
            },
            {
              name: "Captain's Chair Knee Raises",
              sets: "3 sets",
              reps: "8-12 reps",
              rest: "75 seconds",
              description: "Hanging knee raises using captain's chair.",
              tips: "Control the movement, don't swing or use momentum."
            },
            {
              name: "Stability Ball Crunches",
              sets: "3 sets",
              reps: "15-20 reps",
              rest: "60 seconds",
              description: "Crunches on exercise ball for extended range.",
              tips: "Ball should support lower back, crunch up smoothly."
            },
            {
              name: "Russian Twists",
              sets: "3 sets",
              reps: "20-30 total",
              rest: "60 seconds",
              description: "Seated twists touching ground on each side.",
              tips: "Keep core engaged, twist from the waist not shoulders."
            }
          ]
        }
      },
      intermediate: {
        home: {
          title: "Intermediate Home Core Workout",
          duration: "25-35 minutes",
          exercises: [
            {
              name: "Plank to Push-up",
              sets: "3 sets",
              reps: "8-12 reps",
              rest: "90 seconds",
              description: "Start in plank, transition to push-up position and back.",
              tips: "Keep core tight throughout, control the transition movements."
            },
            {
              name: "Bicycle Crunches",
              sets: "3 sets",
              reps: "20-30 each side",
              rest: "75 seconds",
              description: "Alternating knee-to-elbow crunches in cycling motion.",
              tips: "Don't rush the movement, focus on bringing elbow to opposite knee."
            },
            {
              name: "Mountain Climbers",
              sets: "3 sets",
              reps: "30-45 seconds",
              rest: "60 seconds",
              description: "Rapid alternating knee drives in plank position.",
              tips: "Keep hips level, drive knees toward chest, maintain plank form."
            },
            {
              name: "Dead Bug",
              sets: "3 sets",
              reps: "10-12 each side",
              rest: "60 seconds",
              description: "Lying on back, extend opposite arm and leg simultaneously.",
              tips: "Keep lower back pressed to floor, move slowly with control."
            },
            {
              name: "Russian Twists (Weighted)",
              sets: "3 sets",
              reps: "20-30 total",
              rest: "75 seconds",
              description: "Russian twists holding water bottle, book, or light weight.",
              tips: "Keep feet off ground if possible, rotate from core not arms."
            },
            {
              name: "Plank Up-Downs",
              sets: "3 sets",
              reps: "12-16 total",
              rest: "90 seconds",
              description: "Move from forearm plank to high plank and back down.",
              tips: "Keep hips stable, place hands where elbows were, control movement."
            },
            {
              name: "Reverse Crunches",
              sets: "3 sets",
              reps: "15-20 reps",
              rest: "60 seconds",
              description: "Bring knees to chest lifting hips off ground.",
              tips: "Use abs to lift hips, don't swing legs for momentum."
            }
          ]
        },
        gym: {
          title: "Intermediate Gym Core Workout",
          duration: "30-40 minutes",
          exercises: [
            {
              name: "Cable Woodchops",
              sets: "3 sets",
              reps: "12-15 each side",
              rest: "75 seconds",
              description: "Diagonal cable pulls from high to low position.",
              tips: "Rotate from core, keep arms straight, control both directions."
            },
            {
              name: "Hanging Knee Raises",
              sets: "3 sets",
              reps: "10-15 reps",
              rest: "90 seconds",
              description: "Hang from pull-up bar and raise knees to chest.",
              tips: "Control the swing, lift knees not just legs, squeeze abs at top."
            },
            {
              name: "Cable Crunches (Heavy)",
              sets: "3 sets",
              reps: "15-20 reps",
              rest: "75 seconds",
              description: "Kneeling cable crunches with moderate weight.",
              tips: "Crunch abs into weight, don't pull with arms, squeeze at bottom."
            },
            {
              name: "Medicine Ball Slams",
              sets: "3 sets",
              reps: "12-15 reps",
              rest: "90 seconds",
              description: "Overhead slam with medicine ball engaging full core.",
              tips: "Use whole body, slam hard, engage core on the lift and slam."
            },
            {
              name: "Decline Sit-ups",
              sets: "3 sets",
              reps: "12-18 reps",
              rest: "75 seconds",
              description: "Sit-ups on decline bench for increased difficulty.",
              tips: "Control the descent, don't bounce off the bench, lead with chest."
            },
            {
              name: "Plank (Weighted)",
              sets: "3 sets",
              reps: "45-75 seconds",
              rest: "90 seconds",
              description: "Standard plank with plate or weight on back.",
              tips: "Maintain perfect plank form, breathe normally, keep body straight."
            }
          ]
        }
      },
      advanced: {
        home: {
          title: "Advanced Home Core Workout",
          duration: "35-45 minutes",
          exercises: [
            {
              name: "Dragon Flags",
              sets: "3 sets",
              reps: "6-10 reps",
              rest: "2 minutes",
              description: "Advanced core exercise lying on bench, legs extended upward.",
              tips: "Extremely difficult - use progression, control the eccentric phase."
            },
            {
              name: "Human Flag Progression",
              sets: "3 sets",
              reps: "15-30 seconds",
              rest: "2 minutes",
              description: "Side plank progression toward human flag hold.",
              tips: "Build up gradually, use assistance, focus on core and lat strength."
            },
            {
              name: "L-Sits",
              sets: "3 sets",
              reps: "20-45 seconds",
              rest: "90 seconds",
              description: "Seated leg raise hold with straight legs horizontal.",
              tips: "Press down with hands, keep legs straight, build holding time gradually."
            },
            {
              name: "V-Ups",
              sets: "3 sets",
              reps: "15-20 reps",
              rest: "75 seconds",
              description: "Simultaneous leg and torso raise forming V-shape.",
              tips: "Touch toes at top, control both up and down phases, keep legs straight."
            },
            {
              name: "Hollow Body Holds",
              sets: "3 sets",
              reps: "30-60 seconds",
              rest: "90 seconds",
              description: "Lying hold with lower back pressed to floor, legs/shoulders up.",
              tips: "Press lower back down, hold tight hollow position, breathe shallowly."
            },
            {
              name: "Single-Arm Plank",
              sets: "3 sets",
              reps: "20-30 seconds each arm",
              rest: "90 seconds",
              description: "Plank hold with one arm extended forward or to side.",
              tips: "Fight rotation, keep hips level, engage entire core, alternate arms."
            },
            {
              name: "Pike Walks",
              sets: "3 sets",
              reps: "10-15 reps",
              rest: "75 seconds",
              description: "Walk feet toward hands in downward dog position.",
              tips: "Keep legs straight, walk feet as close as possible, control movement."
            }
          ]
        },
        gym: {
          title: "Advanced Gym Core Workout",
          duration: "40-50 minutes",
          exercises: [
            {
              name: "Hanging Leg Raises (Straight)",
              sets: "4 sets",
              reps: "12-15 reps",
              rest: "2 minutes",
              description: "Hanging leg raises with straight legs to horizontal.",
              tips: "Keep legs straight, raise to horizontal, control the descent slowly."
            },
            {
              name: "Cable Crunches (Heavy)",
              sets: "4 sets",
              reps: "12-15 reps",
              rest: "90 seconds",
              description: "Heavy cable crunches focusing on resistance.",
              tips: "Use significant weight, crunch hard into resistance, pause at bottom."
            },
            {
              name: "Turkish Get-ups",
              sets: "3 sets",
              reps: "6-8 each side",
              rest: "2 minutes",
              description: "Complex movement from lying to standing with weight overhead.",
              tips: "Start light, master the movement pattern, keep weight overhead throughout."
            },
            {
              name: "Weighted Decline Sit-ups",
              sets: "3 sets",
              reps: "15-20 reps",
              rest: "90 seconds",
              description: "Decline sit-ups holding plate or dumbbell.",
              tips: "Hold weight at chest, control both directions, don't bounce."
            },
            {
              name: "Anti-Extension Plank",
              sets: "3 sets",
              reps: "60-90 seconds",
              rest: "2 minutes",
              description: "Plank with feet elevated on bench or box.",
              tips: "Harder angle challenges core more, maintain perfect plank form."
            },
            {
              name: "Landmine Rotations",
              sets: "3 sets",
              reps: "12-15 each side",
              rest: "75 seconds",
              description: "Barbell landmine setup with rotational core movement.",
              tips: "Control the barbell, rotate from core, keep feet planted."
            },
            {
              name: "Weighted Russian Twists",
              sets: "3 sets",
              reps: "20-30 total",
              rest: "90 seconds",
              description: "Russian twists with significant weight (plate or medicine ball).",
              tips: "Keep feet elevated, control the weight, rotate from waist not shoulders."
            }
          ]
        }
      }
    }
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'chest' },
    { slug: 'legs' },
    { slug: 'core' }
  ];
}

export async function generateMetadata({ params }) {
  const workout = workoutData[params.slug];
  
  if (!workout) {
    return {
      title: 'Workout Not Found | 6Pack NZ'
    };
  }

  return {
    title: `Complete ${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Workout Guide NZ | Build ${params.slug === 'core' ? 'Abs & Core' : params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Muscle at Home | 6Pack`,
    description: workout.description,
    keywords: `${params.slug} workout NZ, ${params.slug} exercises, build ${params.slug} muscle, home ${params.slug} workout New Zealand, gym ${params.slug} workout, ${params.slug} training, bodyweight ${params.slug} workout`,
    openGraph: {
      title: `Complete ${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Workout Guide | Build ${params.slug === 'core' ? 'Abs & Core' : params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Muscle at Home`,
      description: workout.description,
      images: [
        {
          url: workout.image,
          width: 1200,
          height: 600,
          alt: `${params.slug} workout guide`,
        },
      ],
      url: `https://www.6pack.co.nz/workouts/${params.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Complete ${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Workout Guide | 6Pack NZ`,
      description: workout.description,
      images: [workout.image],
    },
    alternates: {
      canonical: `https://www.6pack.co.nz/workouts/${params.slug}`,
    },
  };
}

export default function WorkoutPage({ params }) {
  const workout = workoutData[params.slug];
  
  if (!workout) {
    return notFound();
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `Complete ${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Workout Guide - Build ${params.slug === 'core' ? 'Abs & Core' : params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Muscle at Home`,
            "description": workout.description,
            "image": workout.image,
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
              "@id": `https://www.6pack.co.nz/workouts/${params.slug}`
            },
            "articleSection": "Fitness",
            "keywords": `${params.slug} workout, ${params.slug} exercises, bodyweight training`
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className={`relative bg-gradient-to-r ${workout.color} text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img
              src={workout.image}
              alt={`${params.slug} workout`}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <Link
              href="/workouts"
              className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Workouts
            </Link>
            
            <BlurIn
              className="text-5xl md:text-6xl font-bold mb-6"
              word={workout.title}
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
              {workout.description}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                <Clock className="mr-2" size={16} />
                15-60 min workouts
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

        {/* Client Components with interactivity */}
        <WorkoutClient workout={workout} params={params} />
      </div>
    </>
  );
}