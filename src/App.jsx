import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages";
import Shop from "./pages/shop";
import Subscription from "./pages/subscription";
import Articles from "./pages/articles";
import ArticlePage from "./pages/articles/[slug]";
import Calculators from "./pages/calculators";
import BMICalculator from "./pages/calculators/bmi";
import BMRCalculator from "./pages/calculators/bmr";
import BodyFatCalculator from "./pages/calculators/body-fat";
import OneRepMaxCalculator from "./pages/calculators/one-rep-max";
import MacroCalculator from "./pages/calculators/macro";
import IdealWeightCalculator from "./pages/calculators/ideal-weight";
import Workouts from "./pages/workouts";
import ChestWorkout from "./pages/workouts/chest";
import LegsWorkout from "./pages/workouts/legs";
import CoreWorkout from "./pages/workouts/core";
import Layout from "./components/layout";
import { Toaster } from "sonner";

// ScrollToTop component to handle automatic scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/bmi" element={<BMICalculator />} />
          <Route path="/calculators/bmr" element={<BMRCalculator />} />
          <Route path="/calculators/body-fat" element={<BodyFatCalculator />} />
          <Route path="/calculators/one-rep-max" element={<OneRepMaxCalculator />} />
          <Route path="/calculators/macro" element={<MacroCalculator />} />
          <Route path="/calculators/ideal-weight" element={<IdealWeightCalculator />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/chest" element={<ChestWorkout />} />
          <Route path="/workouts/legs" element={<LegsWorkout />} />
          <Route path="/workouts/core" element={<CoreWorkout />} />
        </Routes>
        <Toaster position="top-right" />
      </Layout>
    </Router>
  );
}

export default App;
