import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import SharedLayout from './components/SharedLayout/SharedLayout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const Navigation = lazy(() => import('./components/Navigation/Navigation'));
const MovieCastInfo = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviewsInfo = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);

const AppRoutes = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:id" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCastInfo />} />
              <Route path="reviews" element={<MovieReviewsInfo />} />
            </Route>
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
