import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../utils/api';
import { USER_ROLES } from '../../utils/constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    membershipId: '',
    collegeLetter: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const selectCategory = (role) => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
    setStep(2);
  };

  const goBack = () => {
    setStep(1);
    setSelectedRole('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.role === 'AOA' && !formData.membershipId.trim()) {
      newErrors.membershipId = 'Membership ID is required for AOA members';
    }
    
    if (formData.role === 'PGS' && !formData.collegeLetter.trim()) {
      newErrors.collegeLetter = 'College letter is required for PGS users';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'AOA' && { membershipId: formData.membershipId.trim() }),
        ...(formData.role === 'PGS' && { collegeLetter: formData.collegeLetter.trim() })
      };

      const response = await authAPI.register(submitData);
      const { token, user } = response.data;
      
      login(token, user);
      navigate('/registration');
    } catch (error) {
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-white ">
    <Header/>
     <div className="flex items-center justify-center px-4 py-8 mb-20">
      <div className="w-full max-w-lg">
          <div className="flex justify-center mb-5">
          <img src="./logo.png" alt="" width="200" />
      </div>
        <h1 className="text-center text-lg font-semibold text-slate-900 mb-1">
          AOACON 2026 Register
        </h1>

        {step === 1 ? (
          // Step 1: Category Selection Cards
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-600">Select your registration category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* AOA Member Card */}
              <div 
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                  selectedRole === USER_ROLES.AOA 
                    ? 'border-sky-500 bg-sky-50 shadow-md' 
                    : 'border-slate-200 hover:border-sky-300'
                }`}
                onClick={() => selectCategory(USER_ROLES.AOA)}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-sky-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 text-center mb-1">AOA Member</h3>
                <p className="text-xs text-slate-500 text-center">Association of Obstetric Anaesthesiologists member</p>
                {selectedRole === USER_ROLES.AOA && (
                  <div className="mt-2 w-full h-1 bg-sky-500 rounded-full" />
                )}
              </div>

              {/* Non-AOA Member Card */}
              <div 
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                  selectedRole === USER_ROLES.NON_AOA 
                    ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
                onClick={() => selectCategory(USER_ROLES.NON_AOA)}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 text-center mb-1">Non-AOA Member</h3>
                <p className="text-xs text-slate-500 text-center">Other medical professionals</p>
                {selectedRole === USER_ROLES.NON_AOA && (
                  <div className="mt-2 w-full h-1 bg-emerald-500 rounded-full" />
                )}
              </div>

              {/* PGS & Fellows Card */}
              <div 
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                  selectedRole === USER_ROLES.PGS 
                    ? 'border-purple-500 bg-purple-50 shadow-md' 
                    : 'border-slate-200 hover:border-purple-300'
                }`}
                onClick={() => selectCategory(USER_ROLES.PGS)}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-purple-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 text-center mb-1">PGS & Fellows</h3>
                <p className="text-xs text-slate-500 text-center">Postgraduate students & fellows</p>
                {selectedRole === USER_ROLES.PGS && (
                  <div className="mt-2 w-full h-1 bg-purple-500 rounded-full" />
                )}
              </div>
            </div>
          </div>
        ) : (
          // Step 2: Registration Form
          <>
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
              >
                ← Back
              </button>
              <div className="text-xs text-slate-500">
                Step 2/2: {selectedRole === USER_ROLES.AOA ? 'AOA Member' : 
                          selectedRole === USER_ROLES.NON_AOA ? 'Non-AOA Member' : 'PGS & Fellows'}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="text-xs text-red-600 p-2 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border ${
                      errors.name 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
                    } bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-1`}
                    placeholder="Full name"
                  />
                </div>
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
                      } bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-1`}
                      placeholder="email@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border ${
                        errors.phone 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
                      } bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-1`}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {formData.role === 'AOA' && (
                <div>
                  <label htmlFor="membershipId" className="block text-xs font-medium text-slate-700 mb-1">
                    AOA Membership ID *
                  </label>
                  <input
                    id="membershipId"
                    name="membershipId"
                    type="text"
                    value={formData.membershipId}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2.5 text-sm rounded-lg border ${
                      errors.membershipId 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
                    } bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-1`}
                    placeholder="AOA123456"
                  />
                  {errors.membershipId && <p className="text-red-600 text-xs mt-1">{errors.membershipId}</p>}
                </div>
              )}

              {formData.role === 'PGS' && (
                <div>
                  <label htmlFor="collegeLetter" className="block text-xs font-medium text-slate-700 mb-1">
                    College Letter Ref *
                  </label>
                  <input
                    id="collegeLetter"
                    name="collegeLetter"
                    type="text"
                    value={formData.collegeLetter}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2.5 text-sm rounded-lg border ${
                      errors.collegeLetter 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
                    } bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-1`}
                    placeholder="SIMS/PGS/2026/001"
                  />
                  {errors.collegeLetter && <p className="text-red-600 text-xs mt-1">{errors.collegeLetter}</p>}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-slate-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-8 pr-8 py-2.5 text-sm rounded-lg border ${
                        errors.password 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
                      } bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-1`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-slate-700 mb-1">
                    Confirm *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-8 pr-8 py-2.5 text-sm rounded-lg border ${
                        errors.confirmPassword 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-slate-200 focus:ring-sky-500 focus:border-sky-500'
                      } bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-1`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  inline-flex items-center justify-center gap-2
                  rounded-lg
                  bg-sky-600
                  text-white
                  text-sm font-semibold
                  py-3
                  hover:bg-sky-700
                  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all
                "
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}

        <div className="flex items-center justify-center pt-6">
          <p className="text-xs text-slate-600">
            Have account?{' '}
            <Link to="/login" className="font-medium text-sky-600 hover:text-sky-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
    <MobileNav/>
   </div>
  );
};

export default RegisterPage;
