import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages";
import Shop from "./pages/shop";
import Subscription from "./pages/subscription";
import Brewery from "./pages/brewery";
import Articles from "./pages/articles";
import ArticlePage from "./pages/articles/[slug]";
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
        </Routes>
        <Toaster position="top-right" />
      </Layout>
    </Router>
  );
}

export default App;
