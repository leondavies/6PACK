import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages";
import Shop from "./pages/shop";
import Subscription from "./pages/subscription";
import Brewery from "./pages/brewery";
import Articles from "./pages/articles";
import ArticlePage from "./pages/articles/[slug]";
import Calculators from "./pages/calculators";
import BMICalculator from "./pages/calculators/bmi";
import BMRCalculator from "./pages/calculators/bmr";
import BodyFatCalculator from "./pages/calculators/body-fat";
import OneRepMaxCalculator from "./pages/calculators/one-rep-max";
import MacroCalculator from "./pages/calculators/macro";
import IdealWeightCalculator from "./pages/calculators/ideal-weight";
import Layout from "./components/layout";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/brewery" element={<Brewery />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/bmi" element={<BMICalculator />} />
          <Route path="/calculators/bmr" element={<BMRCalculator />} />
          <Route path="/calculators/body-fat" element={<BodyFatCalculator />} />
          <Route path="/calculators/one-rep-max" element={<OneRepMaxCalculator />} />
          <Route path="/calculators/macro" element={<MacroCalculator />} />
          <Route path="/calculators/ideal-weight" element={<IdealWeightCalculator />} />
        </Routes>
        <Toaster position="top-right" />
      </Layout>
    </Router>
  );
}

export default App;
