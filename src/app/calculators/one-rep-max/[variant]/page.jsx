import { notFound } from 'next/navigation';
import {
  calculatorLandingPages,
  getLandingPage,
  buildLandingMetadata,
} from '../../../../data/calculatorLandingPages';
import OneRepMaxCalculator from '../../../../components/calculators/OneRepMaxCalculator';
import CalculatorLandingTemplate from '../../../../components/calculators/CalculatorLandingTemplate';

const CALCULATOR = 'one-rep-max';

export function generateStaticParams() {
  return (calculatorLandingPages[CALCULATOR] || []).map((v) => ({ variant: v.slug }));
}

export function generateMetadata({ params }) {
  return buildLandingMetadata(CALCULATOR, params.variant);
}

export default function OneRepMaxLandingPage({ params }) {
  const page = getLandingPage(CALCULATOR, params.variant);
  if (!page) return notFound();

  return (
    <CalculatorLandingTemplate page={page} calculatorName="1RM Calculator" basePath="/calculators/one-rep-max">
      <OneRepMaxCalculator prefill={page.prefill} />
    </CalculatorLandingTemplate>
  );
}
