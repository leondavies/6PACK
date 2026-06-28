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
