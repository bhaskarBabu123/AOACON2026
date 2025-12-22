import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  User,
  Mail,
  Award,
  Edit,
  CheckCircle,
  Clock,
  ArrowLeft,
  Hotel,
  Users,
  Calendar,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { registrationAPI, paymentAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CheckoutPage = () => {
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const { setRegistration: setAppRegistration } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegistration();
  }, []);

  const fetchRegistration = async () => {
    try {
      const response = await registrationAPI.getMyRegistration();
      setRegistration(response.data);
      setAppRegistration(response.data);
    } catch (error) {
      setError('Registration not found. Please complete registration first.');
      setTimeout(() => navigate('/registration'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (registration?.paymentStatus === 'PAID') {
      navigate('/dashboard');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Failed to load payment gateway');

      const orderResponse = await paymentAPI.createOrderRegistration();
      const { orderId, amount, currency, keyId } = orderResponse.data;

      const options = {
        key: keyId,
        amount: amount * 100,
        currency,
        name: 'AOA Shivamogga 2026',
        description: 'Conference Registration',
        order_id: orderId,
        handler: async (response) => {
          try {
            await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            navigate('/payment-status?status=success');
          } catch (error) {
            navigate('/payment-status?status=failed');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: {
          color: '#005aa9',
        },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const getRoleText = (role) => {
    const texts = {
      AOA: 'AOA Member',
      NON_AOA: 'Non-AOA Member',
      PGS: 'PGS & Fellows',
    };
    return texts[role] || role;
  };

  const getRegistrationTypeText = (type) => {
    const texts = {
      CONFERENCE_ONLY: 'Conference Only',
      WORKSHOP_CONFERENCE: 'Workshop + Conference',
      COMBO: 'Combo Package',
    };
    return texts[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="sm" text="Loading checkout..." />
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <h1 className="text-lg font-medium text-slate-900 mb-2">No Registration</h1>
          <p className="text-[13px] text-slate-600 mb-6">Complete registration first</p>
          <button
            onClick={() => navigate('/registration')}
            className="w-full px-4 py-2.5 border border-[#005aa9] text-[#005aa9] hover:bg-[#005aa9]/5 rounded-xl text-sm font-medium transition-colors"
          >
            Go to Registration
          </button>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
          <button
            onClick={() => navigate('/registration')}
            className="p-2 text-slate-600 hover:text-[#005aa9] rounded-lg hover:bg-slate-100 transition-colors -m-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="ml-3">
            <h1 className="text-lg font-medium text-slate-900">Secure Checkout</h1>
            <p className="text-[13px] text-slate-600">Review your registration & pay securely</p>
          </div>
        </div>

        {error && (
          <div className="p-4 border border-red-200 text-red-700 text-[12px] rounded-xl bg-red-50">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Registration Details */}
          <section className="lg:col-span-2 space-y-4">
            {/* User Info */}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-slate-50/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-slate-900 flex items-center">
                  <User className="w-4 h-4 mr-2 text-slate-500" />
                  Personal Information
                </h2>
                {/* <button
                  onClick={() => navigate('/registration')}
                  className="text-[12px] text-[#005aa9] hover:text-[#009688] flex items-center transition-colors"
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit Details
                </button> */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px]">
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
                {registration?.collegeLetter && (
                  <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
                    <FileText className="w-4 h-4 text-[#005aa9] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">College Letter</p>
                      <p className="text-sm font-medium text-slate-900 text-[12px]">✓ Uploaded</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Registration Summary */}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6">
              <h2 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-[#005aa9]" />
                Registration #{registration.registrationNumber}
              </h2>
              <div className="space-y-3 text-[12px]">
                <p className="text-slate-600 font-medium">{getRegistrationTypeText(registration.registrationType)}</p>
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium ${getBookingPhaseColor(registration.bookingPhase)}`}>
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {registration.bookingPhase}
                </div>
              </div>

              {registration.lifetimeMembershipId && (
                <div className="mt-4 p-4 bg-[#005aa9]/10 border border-[#005aa9]/20 rounded-xl text-[12px]">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-[#005aa9] mr-2 flex-shrink-0" />
                    <span className="font-medium">Lifetime Membership: {registration.lifetimeMembershipId}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-slate-50/50">
              <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-[#005aa9]" />
                What's Included
              </h3>
              <ul className="space-y-2 text-[11px] text-slate-600">
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                  All conference sessions (3 days)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                  Conference kit & materials
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                  Certificate of participation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                  Lunch & tea breaks (3 days)
                </li>
                {registration.registrationType === 'COMBO' && (
                  <>
                    <li className="flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                      Lifetime AOA membership
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                      All workshop sessions
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Event Info */}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-slate-50/30">
              <h3 className="text-sm font-medium text-slate-900 mb-4">Event Details</h3>
              <div className="space-y-3 text-[11px] text-slate-600">
                <div className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-[#005aa9]" />
                  Oct 30 - Nov 1, 2026
                </div>
                <div className="flex items-center">
                  <Hotel className="w-3.5 h-3.5 mr-2 text-[#009688]" />
                  Hotel Royal Orchid, Shivamogga
                </div>
                <div className="flex items-center">
                  <Users className="w-3.5 h-3.5 mr-2 text-[#005aa9]" />
                  5000+ Delegates Expected
                </div>
              </div>
            </div>
          </section>

          {/* Payment Summary */}
          <section className="lg:col-span-1 space-y-4 lg:sticky lg:top-4">
            <div className="border border-slate-200 rounded-xl p-5 lg:p-6 bg-slate-50/50">
              <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-[#005aa9]" />
                Payment Summary
              </h3>

              {/* Amount Display */}
              <div className="text-center mb-6 p-4 bg-gradient-to-r from-[#005aa9]/5 to-[#009688]/5 border border-[#005aa9]/20 rounded-xl">
                <p className="text-3xl font-semibold text-[#005aa9]">
                  ₹{registration.totalAmount?.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-600 mt-1">Total Amount (Incl. GST)</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-[12px] mb-5">
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Base Registration</span>
                  <span>₹{registration.basePrice?.toLocaleString()}</span>
                </div>
                
                {registration.workshopPrice > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600">Workshop Fee</span>
                    <span>₹{registration.workshopPrice.toLocaleString()}</span>
                  </div>
                )}
                
                {registration.comboDiscount > 0 && (
                  <div className="flex justify-between text-[#005aa9] py-1 font-medium">
                    <span>Combo Discount</span>
                    <span>-₹{registration.comboDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-600 font-medium">GST (18%)</span>
                  <span className="font-medium">₹{registration.gst?.toLocaleString()}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-6 p-3 bg-slate-50 rounded-xl text-[12px]">
                <span className="text-slate-600 font-medium">Payment Status</span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
                  registration.paymentStatus === 'PAID'
                    ? 'bg-[#005aa9]/20 text-[#005aa9] border border-[#005aa9]/30' 
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {registration.paymentStatus === 'PAID' ? (
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                  )}
                  {registration.paymentStatus}
                </span>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={processing || registration.paymentStatus === 'PAID'}
                className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-[#005aa9] text-white text-sm font-medium hover:from-[#00695c] hover:to-[#005aa9] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-4 text-base"
              >
                {processing ? (
                  <LoadingSpinner size="sm" />
                ) : registration.paymentStatus === 'PAID' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Payment Complete
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay ₹{registration.totalAmount?.toLocaleString()}
                  </>
                )}
              </button>

              {registration.paymentStatus === 'PAID' && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full px-6 py-3 border border-[#005aa9] text-[#005aa9] hover:bg-[#005aa9]/5 rounded-xl text-sm font-medium transition-colors"
                >
                  Go to Dashboard
                </button>
              )}

              {/* Security & Methods */}
              <div className="space-y-3 pt-4 border-t border-slate-200 mt-6">
                <div className="flex items-center justify-center text-[11px] text-[#005aa9]">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Secured by Razorpay</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 text-center">
                  <div>UPI</div>
                  <div>Cards</div>
                  <div>Netbanking</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

const getBookingPhaseColor = (phase) => {
  const colors = {
    EARLY_BIRD: 'bg-[#005aa9] text-white',
    REGULAR: 'bg-[#009688] text-white',
    SPOT: 'bg-amber-500 text-white',
  };
  return colors[phase] || 'bg-slate-500 text-white';
};

export default CheckoutPage;
