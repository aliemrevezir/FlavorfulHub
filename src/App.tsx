import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Home from './pages/Home';
import RecipesPage from './pages/Recipes';
import RecipeDetailsPage from './pages/Recipes/RecipeDetailsPage';
import CategoryPage from './pages/Categories';
import CategoryDetailPage from './pages/Categories/CategoryDetailPage';
import AboutPage from './pages/About';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import Favicon from './assets/favicons/Favicon';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Favicon />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/categories/:id" element={<CategoryDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignupPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
