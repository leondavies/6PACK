// Data-driven calculator landing pages (programmatic SEO).
// Each entry renders at /calculators/<calculator>/<slug>/ via the
// [variant]/page.jsx route for that calculator.
//
// Content must be genuinely distinct and useful per page (not thin keyword
// swaps). faqs use { question, answer } to feed both the on-page FAQ and the
// FAQPage JSON-LD via generateFAQSchema().

export const calculatorLandingPages = {
  bmr: [
    {
      slug: 'tdee-calculator',
      // --- SEO metadata ---
      metaTitle: 'TDEE Calculator NZ – Total Daily Energy Expenditure | 6Pack NZ',
      metaDescription:
        'Free TDEE calculator for New Zealanders. Work out your total daily energy expenditure (maintenance calories) using the Mifflin-St Jeor equation, then set a deficit or surplus.',
      keywords: [
        'TDEE calculator NZ',
        'total daily energy expenditure',
        'maintenance calories calculator',
        'daily calorie needs New Zealand',
        'how many calories do I need',
      ],
      // --- on-page content ---
      h1: 'TDEE Calculator',
      heroSubtitle:
        'Find your Total Daily Energy Expenditure — the calories you burn in a full day — then turn it into a plan.',
      intro: [
        'Your TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including everything from breathing and digestion to walking the dog and training. It is the single most useful number for managing your weight, because every diet goal — losing fat, building muscle, or maintaining — is defined relative to it.',
        'This calculator estimates your TDEE using the Mifflin-St Jeor equation (the most accurate of the common formulas) for your BMR, then multiplies it by an activity factor. Enter your details below to get your maintenance calories, plus target ranges for fat loss and muscle gain.',
      ],
      sections: [
        {
          heading: 'How your TDEE is calculated',
          body: 'TDEE starts with your Basal Metabolic Rate (BMR) — the energy you burn at complete rest — calculated from your age, height, weight and sex. We then multiply your BMR by an activity multiplier (1.2 for sedentary up to ~1.9 for athletes) to account for movement and exercise. The result is your estimated maintenance calories: eat that amount and your weight stays roughly stable.',
        },
        {
          heading: 'TDEE vs BMR — what is the difference?',
          body: 'BMR is what you would burn lying in bed all day. TDEE is BMR plus everything else you do. For example, a BMR of 1,600 calories with a moderately active lifestyle (×1.55) gives a TDEE of about 2,480 calories. You always eat relative to TDEE, not BMR — dropping to BMR would mean a severe, unsustainable deficit.',
        },
        {
          heading: 'Turning your TDEE into a goal',
          body: 'For fat loss, eat 10–20% below your TDEE (a moderate deficit that protects muscle and energy). For lean muscle gain, eat 5–15% above it. For maintenance, stay close to the number. A useful rule: a deficit of roughly 500 calories per day trends toward about 0.5 kg of fat loss per week — though real-world results vary, so adjust based on what the scale and mirror actually do over 2–3 weeks.',
        },
        {
          heading: 'A note for Kiwis: calories vs kilojoules',
          body: 'New Zealand food labels list energy in kilojoules (kJ), not calories. To convert, multiply calories by 4.184 to get kilojoules (or divide kJ by 4.184 for calories). So a 2,000 calorie TDEE is about 8,370 kJ. Keep this handy when you read the back of a packet at Pak’nSave or Countdown.',
        },
      ],
      faqs: [
        {
          question: 'Is TDEE the same as maintenance calories?',
          answer:
            'Yes. Your TDEE is your maintenance level — the number of calories that keeps your weight stable. Eat below it to lose weight and above it to gain.',
        },
        {
          question: 'How accurate is this TDEE calculator?',
          answer:
            'It uses the Mifflin-St Jeor equation, the most accurate of the standard formulas, but every calculator is an estimate (typically within ~10%). Treat the result as a starting point, then adjust your intake based on how your weight responds over 2–3 weeks.',
        },
        {
          question: 'Should I eat my TDEE to lose weight?',
          answer:
            'No — eating exactly your TDEE maintains your weight. To lose fat, eat roughly 10–20% below your TDEE. The calculator shows a suggested fat-loss calorie range with your result.',
        },
        {
          question: 'How often should I recalculate my TDEE?',
          answer:
            'Recalculate after every 5–7 kg of weight change, or if your activity level shifts noticeably (for example, starting or stopping a training block). Your TDEE drops as you lose weight, so periodic updates keep your targets accurate.',
        },
        {
          question: 'Why is my TDEE different from another calculator?',
          answer:
            'Different tools use different BMR formulas (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle) and activity multipliers. Small differences are normal. Pick one method, use it consistently, and let real-world results guide adjustments.',
        },
      ],
      relatedArticles: ['nutrition-timing-optimal-performance-recovery'],
      relatedCalculators: ['macro', 'bmi', 'ideal-weight'],
    },
  ],

  macro: [
    {
      slug: 'weight-loss',
      metaTitle: 'Macro Calculator for Weight Loss NZ | Fat-Loss Macros | 6Pack NZ',
      metaDescription:
        'Free macro calculator for weight loss. Get your daily calorie deficit plus protein, carb and fat targets to lose fat while protecting muscle. Made for New Zealanders.',
      keywords: [
        'macro calculator for weight loss',
        'fat loss macros',
        'cutting macros calculator',
        'calorie deficit macros NZ',
        'weight loss macros',
      ],
      h1: 'Macro Calculator for Weight Loss',
      heroSubtitle:
        'Get the calorie deficit and macro split that strips fat while holding onto your hard-earned muscle.',
      prefill: { goal: 'lose' },
      intro: [
        'Losing fat is not just about eating less — it is about eating the right balance of protein, carbs and fat in a controlled calorie deficit. Cut too aggressively or skimp on protein, and you lose muscle alongside fat, wreck your energy, and stall your metabolism.',
        'This calculator is pre-set to a weight-loss goal. It works out your maintenance calories, applies a sensible deficit, and splits the result into a higher-protein macro ratio (35% protein / 40% carbs / 25% fat) designed to preserve muscle and keep you full. Enter your details below to get your daily targets.',
      ],
      sections: [
        {
          heading: 'Why protein is king when cutting',
          body: 'In a deficit, adequate protein is the difference between losing fat and losing muscle. This calculator sets protein at 35% of calories — typically around 1.8–2.2g per kg of bodyweight — which research consistently links to better muscle retention and greater fullness. Build meals around a protein source first, then add carbs and fats around it.',
        },
        {
          heading: 'How big should your deficit be?',
          body: 'The calculator applies a moderate ~20% deficit below your maintenance (TDEE). That generally trends toward roughly 0.5–0.7 kg of fat loss per week — fast enough to see progress, slow enough to protect muscle and adherence. Crash deficits backfire: hunger, muscle loss and rebound eating. If the scale has not moved in 2–3 weeks, drop calories slightly or add movement, rather than slashing further.',
        },
        {
          heading: 'Eating for fat loss in New Zealand',
          body: 'Hitting high protein on a budget is very doable here: eggs, canned tuna and salmon, chicken, mince, Greek yoghurt, and milk are cost-effective staples at Pak’nSave, Countdown and New World. Remember NZ labels show energy in kilojoules — divide kJ by 4.184 to get calories. High-volume, low-calorie vegetables (broccoli, courgette, spinach, kūmara in moderation) help you stay full inside your deficit.',
        },
      ],
      faqs: [
        {
          question: 'What are the best macros for weight loss?',
          answer:
            'A higher-protein split works best for fat loss: roughly 35% protein, 40% carbs and 25% fat, eaten in a moderate calorie deficit. The high protein preserves muscle and keeps you fuller. This calculator applies that ratio automatically.',
        },
        {
          question: 'How much protein do I need to lose weight?',
          answer:
            'Aim for roughly 1.8–2.2g of protein per kg of bodyweight when cutting. The calculator sets protein to about 35% of your target calories, which lands most people in that range.',
        },
        {
          question: 'Should I cut carbs to lose fat?',
          answer:
            'Not necessarily. Fat loss is driven by a calorie deficit, not by cutting any single macro. Carbs fuel your training and recovery, so this calculator keeps a moderate carb intake rather than dropping it to zero.',
        },
        {
          question: 'How fast should I lose weight?',
          answer:
            'About 0.5–0.7 kg per week is a sustainable rate that protects muscle. Faster loss usually means more muscle loss and higher rebound risk. Recalculate your macros after every 5–7 kg lost, since your needs drop as you get lighter.',
        },
      ],
      relatedArticles: [
        'weight-loss-women-science-based-sustainable-results',
        '7-fat-loss-lies-keeping-you-overweight-science-backed-truth',
      ],
      relatedCalculators: ['bmr', 'body-fat', 'bmi'],
    },
    {
      slug: 'muscle-gain',
      metaTitle: 'Macro Calculator for Muscle Gain NZ | Bulking Macros | 6Pack NZ',
      metaDescription:
        'Free macro calculator for muscle gain. Get your lean-bulk calorie surplus plus protein, carb and fat targets to build muscle with minimal fat. Built for Kiwis.',
      keywords: [
        'macro calculator for muscle gain',
        'bulking macros calculator',
        'lean bulk macros',
        'muscle building macros NZ',
        'macros for building muscle',
      ],
      h1: 'Macro Calculator for Muscle Gain',
      heroSubtitle:
        'Dial in the calorie surplus and macro split that builds lean muscle without piling on excess fat.',
      prefill: { goal: 'gain' },
      intro: [
        'Building muscle requires three things: a progressive training stimulus, enough protein to repair and grow tissue, and a modest calorie surplus to fuel it. Eat too little and you spin your wheels; eat too much and a "bulk" just becomes fat gain.',
        'This calculator is pre-set to a muscle-gain goal. It estimates your maintenance calories, adds a lean-bulk surplus, and splits the total into a carb-forward ratio (25% protein / 50% carbs / 25% fat) that powers hard training and recovery. Enter your details below for your daily targets.',
      ],
      sections: [
        {
          heading: 'Lean bulk vs dirty bulk',
          body: 'A lean bulk uses a modest surplus (this calculator applies ~20% above maintenance) so most of the weight you gain is muscle, not fat. "Dirty bulking" — eating everything in sight — adds fat you will only have to diet off later. Aim for roughly 0.25–0.5 kg of gain per month if you are past the beginner stage; faster gains usually mean more fat.',
        },
        {
          heading: 'Protein and carbs for growth',
          body: 'Protein stays high (around 1.6–2.2g per kg) to maximise muscle protein synthesis, while carbs do the heavy lifting for energy — fuelling your sessions, replenishing glycogen, and supporting recovery. That is why the muscle-gain split leans carb-heavy at 50%. Prioritise nutrient-dense carbs like oats, rice, potatoes and fruit over empty sugars.',
        },
        {
          heading: 'Hitting a surplus as a Kiwi',
          body: 'Eating enough can be the hard part when bulking. Calorie-dense, affordable options in NZ include oats, peanut butter, full-fat milk, rice, mince and eggs. A homemade shake (milk, oats, peanut butter, banana, whey) is an easy way to add a few hundred calories. Remember NZ food labels list kilojoules — divide kJ by 4.184 to convert to calories.',
        },
      ],
      faqs: [
        {
          question: 'What are the best macros for building muscle?',
          answer:
            'A carb-forward split works well for muscle gain: roughly 25% protein, 50% carbs and 25% fat, eaten in a modest calorie surplus. High carbs fuel training and recovery while protein drives growth. This calculator applies that ratio automatically.',
        },
        {
          question: 'How big should my calorie surplus be?',
          answer:
            'A modest surplus of around 10–20% above maintenance is enough to build muscle while limiting fat gain. This calculator uses about a 20% surplus. Bigger surpluses mostly add fat, not extra muscle.',
        },
        {
          question: 'How much protein do I need to build muscle?',
          answer:
            'Around 1.6–2.2g of protein per kg of bodyweight is the evidence-based range for muscle growth. The calculator sets protein to about 25% of your (higher) bulking calories, which lands most people in that range.',
        },
        {
          question: 'How fast can I gain muscle?',
          answer:
            'Realistically about 0.25–0.5 kg of bodyweight per month for non-beginners (beginners can gain faster). If you are gaining much quicker than that, a good chunk is likely fat — ease the surplus back.',
        },
      ],
      relatedArticles: [
        'complete-guide-building-muscle-science-backed-strategies',
        'nz-protein-shake-showdown-tested-12-brands-shocking-results',
      ],
      relatedCalculators: ['bmr', 'one-rep-max', 'body-fat'],
    },
  ],

  'body-fat': [
    {
      slug: 'navy-method',
      metaTitle: 'Navy Body Fat Calculator NZ | U.S. Navy Method | 6Pack NZ',
      metaDescription:
        'Free Navy body fat calculator. Estimate your body fat percentage from neck, waist and hip measurements using the U.S. Navy formula — just a tape measure needed.',
      keywords: [
        'navy body fat calculator',
        'us navy body fat formula',
        'tape measure body fat',
        'body fat percentage calculator NZ',
        'navy method body fat',
      ],
      h1: 'Navy Body Fat Calculator',
      heroSubtitle:
        'Estimate your body fat percentage with the U.S. Navy method — all you need is a tape measure.',
      intro: [
        'The U.S. Navy body fat formula is one of the most popular ways to estimate body fat at home because it needs nothing more than a tape measure — no calipers, scales or clinic visit. It uses the circumference of your neck, waist (and hips for women) along with your height to estimate body fat percentage.',
        'Enter your measurements below to get your body fat percentage, your category (athletic, fitness, average, etc.), and personalised next steps. For the most accurate result, measure in the morning before eating and keep the tape snug but not compressing the skin.',
      ],
      sections: [
        {
          heading: 'How the Navy method works',
          body: 'The Navy formula is based on the relationship between body fat and where you carry circumference — primarily the waist relative to neck and height. For men it uses neck and waist; for women it adds hip measurement, since women tend to store more fat around the hips. It is a regression equation validated against more expensive methods, and for most people it lands within a few percentage points of a DEXA scan.',
        },
        {
          heading: 'How to measure accurately',
          body: 'Accuracy lives in the tape. Neck: measure just below the larynx (Adam’s apple), tape sloping slightly down at the front. Waist: men measure at the navel; women at the narrowest point. Hips (women): the widest part of the buttocks. Keep the tape level and snug, take each measurement twice, and average them. Measuring at the same time of day each time makes your tracking far more reliable than any single reading.',
        },
        {
          heading: 'What your number means — and its limits',
          body: 'Use the result as a trend tool, not gospel. The Navy method can be less accurate for very lean or very muscular people, and circumference-based formulas cannot tell muscle from fat directly. What matters most is the direction over weeks: a waist that shrinks while strength holds means you are losing fat, regardless of the exact percentage. Re-measure every 2–6 weeks depending on how focused your training phase is.',
        },
      ],
      faqs: [
        {
          question: 'How accurate is the Navy body fat calculator?',
          answer:
            'For most people the Navy method lands within about 3–4% of a DEXA scan, which is good for a free, tape-measure method. It can be less accurate for very lean or very muscular individuals. Use it to track the trend over time rather than as an exact figure.',
        },
        {
          question: 'What measurements do I need?',
          answer:
            'Height, neck and waist circumference for men; women also add hip circumference. That is all — no scales or calipers required.',
        },
        {
          question: 'Where exactly do I measure my waist?',
          answer:
            'Men should measure at navel level; women at the narrowest point of the waist. Keep the tape level and snug without compressing the skin, and measure in the morning before eating for consistency.',
        },
        {
          question: 'What is a healthy body fat percentage?',
          answer:
            'General ranges: men — athletic 6–13%, fitness 14–17%, average 18–24%. Women — athletic 16–20%, fitness 21–24%, average 25–31%. Women naturally carry more essential fat than men. The calculator shows your category with your result.',
        },
      ],
      relatedArticles: [
        'weight-loss-women-science-based-sustainable-results',
        'complete-guide-building-muscle-science-backed-strategies',
      ],
      relatedCalculators: ['bmr', 'macro', 'bmi'],
    },
  ],

  'one-rep-max': [
    {
      slug: 'bench-press',
      metaTitle: 'Bench Press 1RM Calculator NZ | Estimate Your Max | 6Pack NZ',
      metaDescription:
        'Free bench press 1RM calculator. Estimate your one-rep max from the weight and reps you lifted using the Brzycki and Epley formulas, plus get your training-zone weights.',
      keywords: [
        'bench press 1RM calculator',
        'bench press max calculator',
        'one rep max bench press',
        'estimate bench press max',
        'bench 1RM NZ',
      ],
      h1: 'Bench Press 1RM Calculator',
      heroSubtitle:
        'Estimate your bench press one-rep max from a set you have already done — no maxing out required.',
      prefill: { exercise: 'bench-press' },
      intro: [
        'Your bench press one-rep max (1RM) is the most you can press for a single rep. Knowing it lets you program every other set as a percentage of your max — but actually testing a true 1RM is risky and taxing. This calculator estimates it from a submaximal set instead: enter the weight and reps you lifted, and it predicts your max.',
        'It uses the Brzycki and Epley formulas (averaged for accuracy), which are most reliable in the 2–6 rep range. You will also get your bench weights for strength, power, hypertrophy and endurance training zones, plus form and safety tips.',
      ],
      sections: [
        {
          heading: 'How your bench 1RM is estimated',
          body: 'Rather than guess, the calculator blends two proven rep-max formulas. Brzycki: weight × (36 ÷ (37 − reps)). Epley: weight × (1 + reps ÷ 30). Averaging the two smooths out their individual quirks. Accuracy is highest at low reps — a set of 3–5 reps predicts your max far more reliably than a set of 12, where fatigue and rep technique vary too much.',
        },
        {
          heading: 'Bench press form for a true max',
          body: 'A bigger bench starts with position: retract and pinch your shoulder blades, plant your feet, keep a tight upper back, and maintain a slight natural arch. Lower the bar under control to the lower chest, pause briefly, then drive up and slightly back toward the shoulders. Leg drive and a tight setup can add meaningful weight — sloppy form both caps your numbers and risks the shoulders.',
        },
        {
          heading: 'Using your max to train smarter',
          body: 'Once you know your estimated 1RM, train in zones: ~85–100% for max strength (1–5 reps), ~65–85% for muscle growth (6–12 reps), and lighter loads for endurance. The calculator prints the exact bench weights for each zone. Re-test (or re-estimate) every 4–6 weeks, and always warm up thoroughly and use a spotter or safety pins before any near-maximal attempt.',
        },
      ],
      faqs: [
        {
          question: 'How do I calculate my bench press 1RM without maxing out?',
          answer:
            'Do a clean set of 2–6 reps at a challenging weight, then enter the weight and reps here. The calculator uses the Brzycki and Epley formulas to estimate your one-rep max — no true max attempt needed.',
        },
        {
          question: 'How accurate is the estimated 1RM?',
          answer:
            'Rep-max formulas are most accurate in the 2–6 rep range, typically within a few percent of a tested max. The more reps you do beyond about 6, the less precise the estimate becomes.',
        },
        {
          question: 'How many reps should I use for the most accurate estimate?',
          answer:
            'A set of 3–5 reps taken close to failure gives the best balance of accuracy and safety. Avoid using very high-rep sets, as fatigue makes the prediction less reliable.',
        },
        {
          question: 'Is it safe to test my actual bench press max?',
          answer:
            'Only with a thorough warm-up and a spotter or safety pins. For most lifters, estimating from a submaximal set (as this calculator does) is safer and accurate enough for programming.',
        },
      ],
      relatedArticles: [
        'complete-guide-building-muscle-science-backed-strategies',
        'deadlift-mastery-perfect-form-avoid-mistakes',
      ],
      relatedCalculators: ['bmr', 'macro', 'body-fat'],
    },
  ],
};

// Helpers ---------------------------------------------------------------

// All [calculator, variant] pairs, for generateStaticParams + sitemap.
export function getAllLandingPageParams() {
  return Object.entries(calculatorLandingPages).flatMap(([calculator, variants]) =>
    variants.map((variant) => ({ calculator, slug: variant.slug }))
  );
}

export function getLandingPage(calculator, slug) {
  return (calculatorLandingPages[calculator] || []).find((v) => v.slug === slug);
}

const SITE = 'https://www.6pack.co.nz';

// Builds the Next.js metadata object for a landing page. Shared by every
// calculator's [variant]/page.jsx so metadata stays consistent.
export function buildLandingMetadata(calculator, slug) {
  const page = getLandingPage(calculator, slug);
  if (!page) return { title: 'Calculator Not Found | 6Pack NZ' };

  const url = `${SITE}/calculators/${calculator}/${page.slug}/`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords?.join(', '),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
    },
    alternates: { canonical: url },
  };
}
