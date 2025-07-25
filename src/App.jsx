import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages";
import Shop from "./pages/shop";
import Subscription from "./pages/subscription";
import Brewery from "./pages/brewery";
import Layout from "./components/layout";
import PasswordProtection from "./components/PasswordProtection";
import { Toaster } from "sonner";

function App() {
  return (
    <PasswordProtection>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/brewery" element={<Brewery />} />
          </Routes>
          <Toaster position="top-right" />
        </Layout>
      </Router>
    </PasswordProtection>
  );
}

export default App;
