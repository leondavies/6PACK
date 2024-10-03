import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages";
import Layout from "./components/layout";

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
