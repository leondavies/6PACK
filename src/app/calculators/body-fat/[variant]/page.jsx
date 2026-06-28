import { notFound } from 'next/navigation';
import {
  calculatorLandingPages,
  getLandingPage,
  buildLandingMetadata,
} from '../../../../data/calculatorLandingPages';
import BodyFatCalculator from '../../../../components/calculators/BodyFatCalculator';
import CalculatorLandingTemplate from '../../../../components/calculators/CalculatorLandingTemplate';

const CALCULATOR = 'body-fat';

export function generateStaticParams() {
  return (calculatorLandingPages[CALCULATOR] || []).map((v) => ({ variant: v.slug }));
}

export function generateMetadata({ params }) {
  return buildLandingMetadata(CALCULATOR, params.variant);
}

export default function BodyFatLandingPage({ params }) {
  const page = getLandingPage(CALCULATOR, params.variant);
  if (!page) return notFound();

  return (
    <CalculatorLandingTemplate page={page} calculatorName="Body Fat Calculator" basePath="/calculators/body-fat">
      <BodyFatCalculator prefill={page.prefill} />
    </CalculatorLandingTemplate>
  );
}
