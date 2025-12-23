import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  CreditCard,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  FileText,
  Hotel,
  Users,
  Calendar,
  XCircle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { registrationAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    registrationType: '',
  });
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [collegeLetter, setCollegeLetter] = useState(null);

  const { user, loading: authLoading } = useAuth();
  const { setRegistration } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchPricing();
    }
  }, [authLoading, user]);

  const fetchPricing = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await registrationAPI.getPricing();
      setPricing(response.data);
    } catch (err) {
      console.error('Pricing fetch error:', err);
      setError(
        err.response?.data?.message ||
        'Failed to load pricing. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file only');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setCollegeLetter(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.registrationType) {
      setError('Please select a registration type');
      return;
    }

    if (user.role === 'PGS' && !collegeLetter) {
      setError('College letter is required for PGS & Fellows');
      return;
    }

    
    if (pricing?.pricing?.[formData.registrationType]?.totalAmount <= 0) {
      setError('This package is not available in the current booking phase');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('registrationType', formData.registrationType);

      if (user.role === 'PGS' && collegeLetter) {
        submitData.append('collegeLetter', collegeLetter);
      }

      const response = await registrationAPI.create(submitData);
      setRegistration(response.data.registration);
      navigate('/checkout');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getBookingPhaseColor = (phase) => {
    const colors = {
      EARLY_BIRD: 'bg-[#005aa9] text-white',
      REGULAR: 'bg-[#009688] text-white',
      SPOT: 'bg-amber-500 text-white',
    };
    return colors[phase] || 'bg-slate-500 text-white';
  };

  const getBookingPhaseText = (phase) => {
    const texts = {
      EARLY_BIRD: 'Early Bird',
      REGULAR: 'Regular',
      SPOT: 'Spot Booking',
    };
    return texts[phase] || phase;
  };

  const getRoleText = (role) => {
    const texts = {
      AOA: 'AOA Member',
      NON_AOA: 'Non-AOA Member',
      PGS: 'PGS & Fellows',
    };
    return texts[role] || role;
  };

  const getRegistrationTypeDisplay = (type) => {
    const display = {
      CONFERENCE_ONLY: 'Conference Only',
      WORKSHOP_CONFERENCE: 'Workshop + Conference',
      COMBO: 'Combo Package',
    };
    return display[type] || type;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="sm" text="Loading registration..." />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 pb-20">
        {}
        <div className="text-center mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
          <h1 className="text-lg font-medium text-slate-900 mb-1">Conference Registration</h1>
          <p className="text-[13px] text-slate-600 mb-2">AOACON 2026 Shivamogga</p>
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Oct 30 - Nov 1, 2026</span>
          </div>
        </div>

        {}
        {pricing && (
          <div className={`inline-flex px-4 py-2 rounded-full mx-auto block max-w-max ${getBookingPhaseColor(pricing.bookingPhase)} mb-6`}>
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-[12px] font-medium">{getBookingPhaseText(pricing.bookingPhase)}</span>
          </div>
        )}

        {}
        {error && (
          <div className="p-4 border border-red-200 text-red-700 text-[12px] rounded-xl bg-red-50 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {}
          <section className="lg:col-span-2 space-y-4">
            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-slate-50/50">
              <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <User className="w-4 h-4 mr-2 text-slate-500" />
                Your Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px]">
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
                  <User className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Name</p>
                    <p className="text-sm font-medium text-slate-900">{user?.name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
                  <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-medium text-slate-900 truncate">{user?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
                  <Award className="w-4 h-4 text-[#005aa9] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Category</p>
                    <p className="text-sm font-medium text-slate-900">{getRoleText(user?.role)}</p>
                  </div>
                </div>
                {user?.membershipId && (
                  <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
                    <CreditCard className="w-4 h-4 text-[#009688] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Membership ID</p>
                      <p className="text-sm font-medium text-slate-900">{user.membershipId}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {}
            {user?.role === 'PGS' && (
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/30">
                <h4 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  College Recommendation Letter
                </h4>
                <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-[13px] text-slate-900 mb-2">Upload College Letter</p>
                  <label
                    htmlFor="college-letter"
                    className="inline-flex items-center px-4 py-2 border border-[#005aa9] text-[#005aa9] rounded-lg text-sm font-medium hover:bg-[#005aa9]/5 transition-colors cursor-pointer"
                  >
                    Choose PDF File
                    <input
                      id="college-letter"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-[11px] text-slate-500 mt-2">Max 5MB, PDF only (Required for PGS)</p>
                </div>
                {collegeLetter && (
                  <div className="mt-4 p-3 bg-[#005aa9]/10 border border-[#005aa9]/20 rounded-lg text-[12px]">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-[#005aa9] mr-2 flex-shrink-0" />
                      <span className="truncate">{collegeLetter.name}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {pricing ? (
                  Object.entries(pricing.pricing).map(([type, priceData]) => {
                    const isAvailable = priceData.totalAmount > 0;
                    const isSelected = formData.registrationType === type;

                    return (
                      <label
                        key={type}
                        className={`block p-5 lg:p-6 border rounded-xl transition-colors ${
                          isAvailable
                            ? isSelected
                              ? 'border-[#005aa9] bg-[#005aa9]/5 cursor-pointer'
                              : 'border-slate-200 hover:border-[#005aa9]/40 cursor-pointer'
                            : 'border-slate-300 bg-slate-100 opacity-60 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (isAvailable) {
                            setFormData({ ...formData, registrationType: type });
                            setError('');
                          }
                        }}
                      >
                        <div className="flex items-start lg:items-center justify-between gap-4">
                          <div className="flex items-center flex-1">
                            <input
                              type="radio"
                              name="registrationType"
                              value={type}
                              checked={isSelected}
                              disabled={!isAvailable}
                              onChange={(e) => {
                                if (isAvailable) {
                                  setFormData({ ...formData, registrationType: e.target.value });
                                  setError('');
                                }
                              }}
                              className="h-5 w-5 text-[#005aa9] focus:ring-[#005aa9] border-slate-300 mt-0.5 flex-shrink-0 disabled:opacity-50"
                            />
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-slate-900">
                                {getRegistrationTypeDisplay(type)}
                              </h4>
                              <p className="text-[12px] text-slate-600 mt-1 leading-tight">
                                {type === 'CONFERENCE_ONLY' && 'All conference sessions + materials + certificate'}
                                {type === 'WORKSHOP_CONFERENCE' && 'Workshops + all conference sessions + lunch'}
                                {type === 'COMBO' && 'Conference + workshops + lifetime AOA membership'}
                              </p>
                              {!isAvailable && (
                                <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Not Available in {getBookingPhaseText(pricing.bookingPhase)}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {isAvailable ? (
                              <>
                                <p className="text-xl font-medium text-slate-900">
                                  ₹{priceData.totalAmount.toLocaleString()}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  +18% GST included
                                </p>
                                {priceData.comboDiscount > 0 && (
                                  <p className="text-[12px] text-[#005aa9] mt-1 font-medium">
                                    Save ₹{priceData.comboDiscount.toLocaleString()}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-[12px] text-slate-500">N/A</p>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <div className="text-center py-10 text-slate-600">
                    <p>No pricing information available right now.</p>
                    <button
                      onClick={fetchPricing}
                      className="mt-4 px-4 py-2 bg-[#005aa9] text-white rounded-lg text-sm"
                    >
                      Retry Loading Pricing
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.registrationType}
                className="w-full px-6 py-3.5 rounded-xl border border-slate-200 bg-[#005aa9] text-white text-sm font-medium hover:from-[#00695c] hover:to-[#005aa9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </section>

          {}
         {}
<div className="border border-slate-200 rounded-xl p-5 lg:p-6 bg-slate-50/50 sticky top-4">
  <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
    <CreditCard className="w-4 h-4 mr-2 text-[#005aa9]" />
    Order Summary
  </h3>

  {formData.registrationType && pricing?.pricing?.[formData.registrationType] ? (
    <div className="space-y-3 text-[12px]">
      <div className="p-3 bg-white border border-slate-200 rounded-lg mb-4">
        <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">
          {getRegistrationTypeDisplay(formData.registrationType)}
        </p>
      </div>

      <div className="space-y-2">
        {}
        <div className="flex justify-between text-[12px] font-medium">
          <span className="text-slate-600">Package Price (excl. GST)</span>
          <span>₹{pricing.pricing[formData.registrationType].totalWithoutGST.toLocaleString()}</span>
        </div>

        {}
        {pricing.pricing[formData.registrationType].basePrice > 0 && (
          <div className="flex justify-between text-[11px] text-slate-600">
            <span className="text-slate-600">Base Price</span>
            <span>₹{pricing.pricing[formData.registrationType].basePrice.toLocaleString()}</span>
          </div>
        )}

        {pricing.pricing[formData.registrationType].workshopPrice > 0 && (
          <div className="flex justify-between text-[11px] text-slate-600">
            <span className="text-slate-600">Workshop Fee</span>
            <span>₹{pricing.pricing[formData.registrationType].workshopPrice.toLocaleString()}</span>
          </div>
        )}

        {pricing.pricing[formData.registrationType].comboDiscount > 0 && (
          <div className="flex justify-between text-[#005aa9] text-[11px] font-medium">
            <span>Combo Discount</span>
            <span>-₹{pricing.pricing[formData.registrationType].comboDiscount.toLocaleString()}</span>
          </div>
        )}

        {}
        <div className="flex justify-between text-[12px]">
          <span className="text-slate-600">GST (18%)</span>
          <span>₹{pricing.pricing[formData.registrationType].gst.toLocaleString()}</span>
        </div>
      </div>

      {}
      <div className="pt-3 border-t border-slate-200 mt-4">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-slate-900">Total Amount (incl. GST)</span>
          <span className="text-lg font-semibold text-[#005aa9]">
            ₹{pricing.pricing[formData.registrationType].totalAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-10">
      <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
      <p className="text-[13px] text-slate-600 mb-2">Select a registration package</p>
      <p className="text-[11px] text-slate-500">Choose from available options above</p>
    </div>
  )}
</div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default RegistrationPage;
