import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CreditCard, 
  MapPin,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { accommodationAPI, paymentAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AccommodationCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const { bookingInfo, accommodation } = location.state || {};

  useEffect(() => {
    if (!bookingInfo || !accommodation) {
      navigate('/accommodation');
      return;
    }
  }, [bookingInfo, accommodation, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBooking = async () => {
    setProcessing(true);
    setError('');

    try {
      const bookingData = {
        ...bookingInfo,
        specialRequests
      };

      const bookingResponse = await accommodationAPI.book(bookingData);
      const createdBooking = bookingResponse.data.booking;
      setBooking(createdBooking);

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      const orderResponse = await paymentAPI.createOrderAccommodation(createdBooking._id);
      const { orderId, amount, currency, keyId } = orderResponse.data;

      const options = {
        key: keyId,
        amount: amount * 100,
        currency: currency,
        name: 'AOA Shivamogga 2026',
        description: `Accommodation - ${accommodation.name}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            navigate('/payment-status?status=success&type=accommodation');
          } catch (error) {
            navigate('/payment-status?status=failed&type=accommodation');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || ''
        },
        theme: {
          color: '#005aa9'
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed. Please try again.');
      setProcessing(false);
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

  if (!bookingInfo || !accommodation) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <h1 className="text-lg font-medium text-slate-900 mb-2">No Booking</h1>
          <p className="text-[13px] text-slate-600 mb-6">Select accommodation first</p>
          <button
            onClick={() => navigate('/accommodation')}
            className="w-full px-4 py-2.5 border border-[#005aa9] text-[#005aa9] hover:bg-[#005aa9]/5 rounded-xl text-sm font-medium transition-colors"
          >
            Browse Hotels
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
        {}
        <div className="flex items-center mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
          <button
            onClick={() => navigate(`/accommodation/${accommodation._id}`)}
            className="p-2 text-slate-600 hover:text-[#005aa9] rounded-lg hover:bg-slate-100 transition-colors -m-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="ml-3">
            <h1 className="text-lg font-medium text-slate-900">Secure Booking</h1>
            <p className="text-[13px] text-slate-600">Review & book {accommodation.name}</p>
          </div>
        </div>

        {error && (
          <div className="p-4 border border-red-200 text-red-700 text-[12px] rounded-xl bg-red-50">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {}
          <section className="lg:col-span-2 space-y-4">
            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-slate-50/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-slate-900 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-slate-500" />
                  Guest Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px]">
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
                  <Users className="w-4 h-4 text-[#005aa9] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Primary Guest</p>
                    <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
                  <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6">
              <h2 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-[#005aa9]" />
                Hotel #{accommodation._id?.slice(-6)}
              </h2>
              <div className="space-y-3 text-[12px]">
                <div className="flex items-center">
                  <img
                    src={accommodation.images?.[0] || '/placeholder-hotel.jpg'}
                    alt={accommodation.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="font-semibold text-slate-900 text-sm truncate">{accommodation.name}</p>
                    <p className="text-slate-600 text-[11px] truncate">{accommodation.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex text-[#005aa9]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(accommodation.rating || 0) ? 'fill-[#005aa9] text-[#005aa9]' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <span className="ml-2 text-[11px] font-medium text-slate-900">{accommodation.rating}</span>
                </div>
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-slate-50/50">
              <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-[#005aa9]" />
                Stay Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div className="flex items-center p-3 border border-slate-200 rounded-lg bg-white">
                  <Calendar className="w-4 h-4 text-[#005aa9] mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Check-in</p>
                    <p className="font-semibold text-sm">{new Date(bookingInfo.checkInDate).toLocaleDateString('en-IN')}</p>
                    <p className="text-[11px] text-slate-600">{accommodation.checkInTime}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 border border-slate-200 rounded-lg bg-white">
                  <Calendar className="w-4 h-4 text-[#009688] mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Check-out</p>
                    <p className="font-semibold text-sm">{new Date(bookingInfo.checkOutDate).toLocaleDateString('en-IN')}</p>
                    <p className="text-[11px] text-slate-600">{accommodation.checkOutTime}</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white mt-2">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{bookingInfo.numberOfGuests} Guest{bookingInfo.numberOfGuests > 1 ? 's' : ''}</p>
                      <p className="text-[11px] text-slate-600">{bookingInfo.roomsBooked} Room{bookingInfo.roomsBooked > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#005aa9] text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {bookingInfo.numberOfNights} Nights
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-slate-50/50">
              <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-[#005aa9]" />
                What's Included
              </h3>
              <ul className="space-y-2 text-[11px] text-slate-600">
                {accommodation.inclusions.slice(0, 6).map((inclusion, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                    <span>{inclusion}</span>
                  </li>
                ))}
                {accommodation.inclusions.length > 6 && (
                  <li className="flex items-center text-slate-500">
                    <span className="text-[11px]">+{accommodation.inclusions.length - 6} more amenities</span>
                  </li>
                )}
              </ul>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6">
              <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-[#005aa9]" />
                Special Requests (Optional)
              </h3>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Room near elevator? Extra pillows? Early check-in? Any special requirements..."
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-[13px] focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9] resize-vertical bg-white"
              />
              <p className="text-[11px] text-slate-500 mt-2 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                Subject to availability. May incur extra charges.
              </p>
            </div>
          </section>

          {}
          <section className="lg:col-span-1 space-y-4 lg:sticky lg:top-4">
            <div className="border border-slate-200 rounded-xl p-5 lg:p-6 bg-slate-50/50">
              <h3 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-[#005aa9]" />
                Booking Summary (₹{bookingInfo.totalAmount?.toLocaleString()})
              </h3>

              {}
              <div className="space-y-2 text-[12px] mb-5">
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Base Rate</span>
                  <span>₹{accommodation.pricePerNight?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 text-[#005aa9] font-medium">
                  <span>× {bookingInfo.numberOfNights} nights</span>
                  <span>× {bookingInfo.roomsBooked} room{bookingInfo.roomsBooked > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-600 font-medium">Total (Taxes incl.)</span>
                  <span className="font-semibold text-[#005aa9]">₹{bookingInfo.totalAmount?.toLocaleString()}</span>
                </div>
              </div>

              {}
              <div className="flex items-center justify-between mb-6 p-3 bg-slate-50 rounded-xl text-[12px]">
                <span className="text-slate-600 font-medium">Check-in/out</span>
                <span className="font-medium">{accommodation.checkInTime} - {accommodation.checkOutTime}</span>
              </div>

              {}
              <button
                onClick={handleBooking}
                disabled={processing}
                className="w-full px-6 py-4 rounded-xl border border-[#005aa9] bg-[#005aa9] text-white text-sm font-medium hover:from-[#00695c] hover:to-[#005aa9] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-4 text-base"
              >
                {processing ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Book & Pay ₹{bookingInfo.totalAmount?.toLocaleString()}
                  </>
                )}
              </button>

              {}
              <div className="space-y-3 pt-4 border-t border-slate-200 mt-6">
                <div className="flex items-center justify-center text-[11px] text-[#005aa9]">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Secured by Razorpay</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 text-center">
                  <div className="p-2 border rounded-lg bg-white">UPI</div>
                  <div className="p-2 border rounded-lg bg-white">Cards</div>
                  <div className="p-2 border rounded-lg bg-white">Netbanking</div>
                </div>
                <div className="text-[10px] text-slate-500 text-center">
                  <p>🛡️ Free cancellation up to 24hrs before check-in</p>
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

export default AccommodationCheckoutPage;
