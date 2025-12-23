import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Download,
  Building2,
  Award,
  ArrowRight,
  MapPin,
  Users,
  ChevronRight,
  Hotel
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { registrationAPI, accommodationAPI, abstractAPI, feedbackAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    registration: null,
    accommodations: [],
    abstract: null,
    feedback: null
  });
  
  const { user } = useAuth();
  const { stepperProgress, setRegistration, setAccommodationBookings, setAbstract, setFeedback } = useApp();
  const navigate = useNavigate();

  const steps = [
    { key: 'registration', label: 'Register', short: 'Reg' },
    { key: 'accommodation', label: 'Stay', short: 'Stay' },
    { key: 'conferenceDays', label: 'Days', short: 'Days' },
    { key: 'abstractUpload', label: 'Abstract', short: 'Abs' },
    { key: 'feedback', label: 'Feedback', short: 'Fdbk' }
  ];

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

  const getStatusBadge = (status) => {
    const badges = {
      PAID: { color: 'bg-[#005aa9]/20 text-[#005aa9]', icon: CheckCircle },
      PENDING: { color: 'bg-amber-100 text-amber-700', icon: Clock },
      FAILED: { color: 'bg-red-100 text-red-700', icon: Clock },
      CONFIRMED: { color: 'bg-[#005aa9]/20 text-[#005aa9]', icon: CheckCircle },
      APPROVED: { color: 'bg-[#005aa9]/20 text-[#005aa9]', icon: CheckCircle },
      REJECTED: { color: 'bg-red-100 text-red-700', icon: Clock }
    };
    
    const badge = badges[status] || { color: 'bg-slate-100 text-slate-700', icon: Clock };
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium ${badge.color}`}>
        <Icon className="w-3 h-3 mr-1 flex-shrink-0" />
        {status}
      </span>
    );
  };

  const getCurrentStep = () => {
    if (!stepperProgress.registration) return 0;
    if (!stepperProgress.accommodation) return 1;
    if (!stepperProgress.conferenceDays) return 2;
    if (!stepperProgress.abstractUpload) return 3;
    return 4;
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      try {
        const regResponse = await registrationAPI.getMyRegistration();
        setStats(prev => ({ ...prev, registration: regResponse.data }));
        setRegistration(regResponse.data);
      } catch (error) {}

      try {
        const accResponse = await accommodationAPI.getMyBookings();
        setStats(prev => ({ ...prev, accommodations: accResponse.data }));
        setAccommodationBookings(accResponse.data);
      } catch (error) {}

      try {
        const abstractResponse = await abstractAPI.getMyAbstract();
        setStats(prev => ({ ...prev, abstract: abstractResponse.data }));
        setAbstract(abstractResponse.data);
      } catch (error) {}

      try {
        const feedbackResponse = await feedbackAPI.getMyFeedback();
        setStats(prev => ({ ...prev, feedback: feedbackResponse.data }));
        setFeedback(feedbackResponse.data);
      } catch (error) {}
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="sm" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 pb-20">
        {}
        <div className="flex items-center gap-3 mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
          <div className="w-12 h-12 bg-[#005aa9] rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-900">{user?.name}</p>
            <p className="text-[12px] text-slate-600">{getRoleText(user?.role)}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-500">AOACON 2026</p>
            <p className="text-[10px] text-slate-400">Shivamogga</p>
          </div>
        </div>

        {}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/30 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-medium text-slate-900">Progress</h2>
            <span className="ml-auto text-[11px] text-slate-500">{getCurrentStep() + 1}/5</span>
          </div>
          <div className="flex items-center -space-x-1">
            {steps.map((step, index) => (
              <div key={step.key} className="flex flex-col items-center flex-1 min-w-0">
                <div className={`w-4 h-4 rounded-full transition-all ${
                  index <= getCurrentStep() 
                    ? 'bg-[#005aa9]' 
                    : 'bg-slate-200 hover:bg-slate-300'
                }`} />
                <span className={`text-[10px] text-center mt-2 px-1 truncate ${
                  index <= getCurrentStep() ? 'text-[#005aa9] font-medium' : 'text-slate-500'
                }`}>
                  {window.innerWidth < 640 ? step.short : step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="grid grid-cols-2 sm:hidden gap-3 mb-6">
          {!stats.registration && (
            <button
              onClick={() => navigate('/registration')}
              className="p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-[12px] transition-colors"
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1 text-slate-600" />
              <div className="text-center">
                <p className="font-medium text-slate-900">Register</p>
                <p className="text-[10px] text-slate-500">Start now</p>
              </div>
            </button>
          )}
          <button
            onClick={() => navigate('/accommodation')}
            className="p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-[12px] transition-colors"
          >
            <Hotel className="w-5 h-5 mx-auto mb-1 text-slate-600" />
            <div className="text-center">
              <p className="font-medium text-slate-900">Stay</p>
              <p className="text-[10px] text-slate-500">Book hotel</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/abstract/rules')}
            className="p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-[12px] transition-colors"
          >
            <FileText className="w-5 h-5 mx-auto mb-1 text-slate-600" />
            <div className="text-center">
              <p className="font-medium text-slate-900">Abstract</p>
              <p className="text-[10px] text-slate-500">Submit paper</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/feedback')}
            className="p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-[12px] transition-colors"
          >
            <MessageSquare className="w-5 h-5 mx-auto mb-1 text-slate-600" />
            <div className="text-center">
              <p className="font-medium text-slate-900">Feedback</p>
              <p className="text-[10px] text-slate-500">Share experience</p>
            </div>
          </button>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {}
          <section className="lg:col-span-2 space-y-4">
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-sm font-medium text-slate-900 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-slate-500" />
                  Registration #{stats.registration?.registrationNumber || 'Pending'}
                </h2>
                {stats.registration && (
                  <button className="text-[11px] text-[#005aa9] hover:text-[#009688] flex items-center">
                    <Download className="w-3.5 h-3.5 mr-1" />
                    Invoice
                  </button>
                )}
              </div>

              {stats.registration ? (
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-sm text-slate-900">{getRegistrationTypeText(stats.registration.registrationType)}</p>
                        <p className="text-[12px] text-slate-600">#{stats.registration.registrationNumber}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(stats.registration.paymentStatus)}
                        <p className="text-sm font-medium text-slate-900 mt-1">
                          ₹{stats.registration.totalAmount?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {stats.registration.lifetimeMembershipId && (
                    <div className="p-3 bg-[#005aa9]/10 border border-[#005aa9]/20 rounded-lg text-[12px]">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-[#005aa9] mr-2" />
                        <span>Lifetime ID: {stats.registration.lifetimeMembershipId}</span>
                      </div>
                    </div>
                  )}

                  {stats.registration.paymentStatus === 'PENDING' && (
                    <button
                      onClick={() => navigate('/checkout')}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-[#005aa9] text-white text-sm font-medium hover:from-[#00695c] hover:to-[#005aa9] transition-colors flex items-center justify-center"
                    >
                      Pay Now <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl p-6">
                  <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-[13px] text-slate-600 mb-3">No registration found</p>
                  <p className="text-[11px] text-slate-500 mb-6">Join 5000+ delegates at AOACON 2026</p>
                  <button
                    onClick={() => navigate('/registration')}
                    className="w-full px-4 py-2.5 border border-[#005aa9] text-[#005aa9] hover:bg-[#005aa9]/5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Register Now
                  </button>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-sm font-medium text-slate-900 flex items-center">
                  <Hotel className="w-4 h-4 mr-2 text-slate-500" />
                  Accommodation ({stats.accommodations.length})
                </h2>
                <button
                  onClick={() => navigate('/accommodation')}
                  className="text-[11px] text-[#009688] hover:text-[#005aa9]"
                >
                  All
                </button>
              </div>

              {stats.accommodations.length > 0 ? (
                <div className="space-y-3">
                  {stats.accommodations.slice(0, 3).map((booking) => (
                    <div key={booking._id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm text-slate-900 truncate">{booking.accommodationId?.name}</p>
                        {getStatusBadge(booking.paymentStatus)}
                      </div>
                      <p className="text-[12px] text-slate-600 mb-1">
                        {new Date(booking.checkInDate).toLocaleDateString('short')} - {new Date(booking.checkOutDate).toLocaleDateString('short')}
                      </p>
                      <div className="flex items-center justify-between text-[11px]">
                        <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                        <span className="font-medium text-slate-900">₹{booking.totalAmount?.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">#{booking.bookingNumber}</p>
                    </div>
                  ))}
                  {stats.accommodations.length > 3 && (
                    <button className="w-full text-[12px] text-[#009688] py-2 font-medium">
                      +{stats.accommodations.length - 3} more
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl p-6">
                  <Hotel className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-[13px] text-slate-600 mb-3">No accommodation booked</p>
                  <p className="text-[11px] text-slate-500 mb-6">Multiple hotels available near venue</p>
                  <button
                    onClick={() => navigate('/accommodation')}
                    className="w-full px-4 py-2.5 border border-[#009688] text-[#009688] hover:bg-[#009688]/5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Book Stay
                  </button>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-slate-50/30">
              <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                Recent Activity
              </h3>
              <div className="space-y-3 text-[11px]">
                {stats.registration && (
                  <div className="flex items-center p-3 border border-slate-200 rounded-lg bg-white">
                    <CheckCircle className="w-4 h-4 text-[#005aa9] mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900 text-[12px]">Registration #{stats.registration.registrationNumber}</p>
                      <p className="text-slate-600">{stats.registration.paymentStatus} • {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
                {stats.accommodations[0] && (
                  <div className="flex items-center p-3 border border-slate-200 rounded-lg bg-white">
                    <Hotel className="w-4 h-4 text-[#009688] mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900 text-[12px] truncate">{stats.accommodations[0].accommodationId?.name}</p>
                      <p className="text-slate-600">Booked • {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
                {stats.abstract && (
                  <div className="flex items-center p-3 border border-slate-200 rounded-lg bg-white">
                    <FileText className="w-4 h-4 text-[#005aa9] mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900 text-[12px] truncate">{stats.abstract.title}</p>
                      <p className="text-slate-600">{stats.abstract.status} • {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {}
          <section className="lg:col-span-1 space-y-4">
            {}
            <div className="border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm font-medium text-slate-900 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-slate-500" />
                Abstract
              </h3>
              
              {stats.abstract ? (
                <div className="space-y-3 text-[12px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600">Status</span>
                    {getStatusBadge(stats.abstract.status)}
                  </div>
                  <p className="font-medium text-slate-900 text-sm truncate">{stats.abstract.title}</p>
                  <p className="text-[11px] text-slate-600">#{stats.abstract.submissionNumber}</p>
                  <button
                    onClick={() => navigate('/abstract')}
                    className="w-full text-[11px] text-[#005aa9] py-2 font-medium hover:text-[#009688]"
                  >
                    View Details
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <button
                    onClick={() => navigate('/abstract/rules')}
                    className="text-[#005aa9] hover:text-[#009688] text-[12px] font-medium block mx-auto w-full"
                  >
                    Submit Abstract
                  </button>
                  <p className="text-[10px] text-slate-500 mt-2">Deadline: Aug 15</p>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm font-medium text-slate-900 mb-3 flex items-center">
                <MessageSquare className="w-4 h-4 mr-1.5 text-slate-500" />
                Feedback
              </h3>
              
              {stats.feedback ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-10 h-10 text-[#005aa9] mx-auto mb-2" />
                  <p className="text-[12px] text-[#005aa9] font-medium">Submitted</p>
                  <p className="text-[10px] text-slate-500">{new Date(stats.feedback.createdAt).toLocaleDateString()}</p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <button
                    onClick={() => navigate('/feedback')}
                    className="text-[#005aa9] hover:text-[#009688] text-[12px] font-medium block mx-auto w-full"
                  >
                    Submit Feedback
                  </button>
                  <p className="text-[10px] text-slate-500 mt-2">After Nov 1</p>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
              <h3 className="text-sm font-medium text-slate-900 mb-3">Conference Details</h3>
              <div className="space-y-3 text-[11px] text-slate-600">
                <div className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-slate-500" />
                  Oct 30 - Nov 1, 2026
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-slate-500" />
                  Hotel Royal Orchid, Shivamogga
                </div>
                <div className="flex items-center">
                  <Users className="w-3.5 h-3.5 mr-2 text-[#005aa9]" />
                  5000+ Delegates Expected
                </div>
                <button
                  onClick={() => navigate('/program')}
                  className="w-full text-[11px] text-[#005aa9] py-2 font-medium hover:text-[#009688] text-left"
                >
                  Full Program →
                </button>
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-2xl font-semibold text-slate-900">{stats.registration ? 1 : 0}</div>
                <div className="text-[11px] text-slate-600">Registration</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-slate-900">{stats.accommodations.length}</div>
                <div className="text-[11px] text-slate-600">Bookings</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default DashboardPage;
