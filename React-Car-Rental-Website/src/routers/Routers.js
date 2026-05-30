// 1. SEMUA IMPORT HARUS DI PALING ATAS
import React, { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Import komponen non-lazy (Login & Register biasanya tidak di-lazy agar cepat diakses)
import Login from '../pages/Login';
import Register from '../pages/register';

// 2. BARU DEFINISI LAZY LOADING
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const CarListing = lazy(() => import('../pages/CarListing'));
const CarDetails = lazy(() => import('../pages/CarDetails'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Contact = lazy(() => import('../pages/Contact'));
const MyBookings = lazy(() => import('../pages/MyBookings'));

// 3. LOGIKA PROTECTED ROUTES
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const RegisterRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Navigate to="/home" /> : children;
};

// 4. KOMPONEN UTAMA ROUTERS
const Routers = () => {
  return (
    <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Route yang diproteksi login */}
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:slug" element={<CarDetails />} />

        <Route path="/contact" element={<Contact />} />

        {/* Route untuk user yang belum login */}
        <Route
          path="/login"
          element={
            <RegisterRoute>
              <Login />
            </RegisterRoute>
          }
        />

        <Route
          path="/register"
          element={
            <RegisterRoute>
              <Register />
            </RegisterRoute>
          }
        />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
