import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import logo from '../../images/main-logo.jpg'
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data;

      login(token, user);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-white py-20">
    <Header/>
     <div className=" flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-sm">
        {}
      <div className="flex justify-center mb-5">
          <img src={logo} alt="" width="200px" />
      </div>
        <h1 className="text-center text-base font-semibold text-slate-900">
          AOACON 2026 Login
        </h1>

        {}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="text-xs text-red-600">
              {error}
            </div>
          )}

          {}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="
                  block w-full
                  pl-8 pr-3 py-2
                  text-sm
                  rounded-md
                  border border-slate-200
                  bg-white
                  placeholder:text-slate-400
                  text-slate-900
                  focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500
                "
                placeholder="name@example.com"
              />
            </div>
          </div>

          {}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="
                  block w-full
                  pl-8 pr-8 py-2
                  text-sm
                  rounded-md
                  border border-slate-200
                  bg-white
                  placeholder:text-slate-400
                  text-slate-900
                  focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500
                "
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              inline-flex items-center justify-center gap-2
              rounded-md
              bg-sky-600
              text-white
              text-sm font-medium
              py-2
              hover:bg-sky-700
              focus:outline-none focus:ring-1 focus:ring-sky-500
              disabled:opacity-60 disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign in</span>
              </>
            )}
          </button>

          {}
          <div className="flex items-center justify-between mt-1">
            <Link
            to="/admin/login"
              type="button"
              className="text-[11px] text-slate-600 hover:text-slate-800"
            >
              Admin Login
            </Link>
            <p className="text-[11px] text-slate-600">
              No account?{' '}
              <Link
                to="/register"
                className="font-medium text-sky-600 hover:text-sky-700"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    <MobileNav/>
   </div>
  );
};

export default LoginPage;
