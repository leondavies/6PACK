import { notFound } from 'next/navigation';
import {
  calculatorLandingPages,
  getLandingPage,
  buildLandingMetadata,
} from '../../../../data/calculatorLandingPages';
import MacroCalculator from '../../../../components/calculators/MacroCalculator';
import CalculatorLandingTemplate from '../../../../components/calculators/CalculatorLandingTemplate';

const CALCULATOR = 'macro';

export function generateStaticParams() {
  return (calculatorLandingPages[CALCULATOR] || []).map((v) => ({ variant: v.slug }));
}

export function generateMetadata({ params }) {
  return buildLandingMetadata(CALCULATOR, params.variant);
}

export default function MacroLandingPage({ params }) {
  const page = getLandingPage(CALCULATOR, params.variant);
  if (!page) return notFound();

  return (
    <CalculatorLandingTemplate page={page} calculatorName="Macro Calculator" basePath="/calculators/macro">
      <MacroCalculator prefill={page.prefill} />
    </CalculatorLandingTemplate>
  );
}
