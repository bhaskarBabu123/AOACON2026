import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { accommodationAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AccommodationDetailPage = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    roomsBooked: 1
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccommodation();
  }, [id]);

  useEffect(() => {
    const checkIn = new Date('2025-10-29');
    const checkOut = new Date('2025-11-02');
    
    setBookingData(prev => ({
      ...prev,
      checkInDate: checkIn.toISOString().split('T')[0],
      checkOutDate: checkOut.toISOString().split('T')[0]
    }));
  }, []);

  const fetchAccommodation = async () => {
    try {
      const response = await accommodationAPI.getById(id);
      setAccommodation(response.data);
    } catch (error) {
      setError('Failed to load accommodation details');
    } finally {
      setLoading(false);
    }
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'Free Wi-Fi': Wifi,
      'Premium Wi-Fi': Wifi,
      'Parking': Car,
      'Valet Parking': Car,
      'Coffee Shop': Coffee,
      'Restaurant': Coffee,
      'Gym': Dumbbell,
      'Swimming Pool': Dumbbell,
      'Rooftop Pool': Dumbbell
    };
    return icons[amenity] || CheckCircle;
  };

  const calculateNights = () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) return 0;
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return accommodation?.pricePerNight * nights * bookingData.roomsBooked || 0;
  };

  const handleBooking = () => {
    const nights = calculateNights();
    if (nights <= 0) {
      setError('Please select valid check-in and check-out dates');
      return;
    }

    const bookingInfo = {
      ...bookingData,
      accommodationId: accommodation._id,
      numberOfNights: nights,
      totalAmount: calculateTotal()
    };

    navigate('/accommodation/checkout', { state: { bookingInfo, accommodation } });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (accommodation?.images.length - 1 || 0) ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (accommodation?.images.length - 1 || 0) : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="sm" text="Loading hotel..." />
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <h1 className="text-lg font-medium text-slate-900 mb-2">Hotel Not Found</h1>
          <p className="text-[13px] text-slate-600 mb-6">The hotel doesn't exist</p>
          <button
            onClick={() => navigate('/accommodation')}
            className="w-full px-4 py-2.5 border border-[#005aa9] text-[#005aa9] hover:bg-[#005aa9]/5 rounded-lg text-sm font-medium transition-colors"
          >
            Back to Hotels
          </button>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 lg:space-y-6 pb-20 sm:pb-8">
        {}
        <div className="lg:hidden flex items-center mb-6">
          <button
            onClick={() => navigate('/accommodation')}
            className="p-1.5 text-slate-600 hover:text-[#005aa9] mr-2.5"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium text-slate-900 truncate">{accommodation.name}</h1>
            <div className="flex items-center text-[12px] text-slate-600">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#005aa9]" />
              <span className="truncate">{accommodation.location}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 border border-red-200 text-red-700 text-[12px] rounded-lg bg-red-50">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {}
          <section className="lg:col-span-2 space-y-4 lg:space-y-6">
            {}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="relative h-64 lg:h-80">
                <img
                  src={accommodation.images[currentImageIndex]}
                  alt={accommodation.name}
                  className="w-full h-full object-cover"
                />
                
                {accommodation.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all lg:left-4 lg:p-3"
                    >
                      <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 text-slate-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all lg:right-4 lg:p-3"
                    >
                      <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-slate-700" />
                    </button>
                  </>
                )}

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-lg border lg:px-3 lg:py-2">
                  <div className="flex items-center">
                    <Star className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#005aa9] mr-1 lg:mr-1.5" />
                    <span className="text-[12px] lg:text-sm font-semibold text-slate-900">{accommodation.rating}</span>
                  </div>
                </div>

                {accommodation.availableRooms <= 5 && (
                  <div className="absolute top-3 left-3 bg-[#005aa9] text-white px-2.5 py-1 rounded-full text-[11px] font-medium shadow-lg lg:px-3 lg:py-1.5 lg:text-[12px]">
                    {accommodation.availableRooms} left
                  </div>
                )}
              </div>

              {accommodation.images.length > 1 && (
                <div className="p-3 lg:p-4 bg-slate-50/50">
                  <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
                    {accommodation.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 lg:w-24 lg:h-20 rounded-lg overflow-hidden border-3 transition-all hover:scale-105 ${
                          index === currentImageIndex ? 'border-[#005aa9] ring-2 ring-[#005aa9]/20 bg-[#005aa9]/5' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${accommodation.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-white space-y-4 lg:space-y-6">
              <p className="text-[13px] lg:text-sm text-slate-700 leading-relaxed">{accommodation.description}</p>
              
              <div className="grid grid-cols-2 gap-3 lg:gap-4 p-4 bg-slate-50/50 rounded-xl">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-[#005aa9] mr-2 lg:mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] lg:text-sm text-slate-600 uppercase tracking-wide">Check-in</p>
                    <p className="font-semibold text-slate-900 text-sm lg:text-base">{accommodation.checkInTime}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-[#005aa9] mr-2 lg:mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] lg:text-sm text-slate-600 uppercase tracking-wide">Check-out</p>
                    <p className="font-semibold text-slate-900 text-sm lg:text-base">{accommodation.checkOutTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-white">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-sm lg:text-lg font-semibold text-slate-900 flex items-center">
                  <Star className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-[#005aa9]" />
                  Amenities
                </h2>
                {accommodation.amenities.length > 6 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-[12px] lg:text-sm text-[#005aa9] hover:text-[#009688] font-medium flex items-center gap-1"
                  >
                    {showAllAmenities ? 'Show Less' : 'Show All'}
                    <ChevronDown className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform ${showAllAmenities ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
                {(showAllAmenities ? accommodation.amenities : accommodation.amenities.slice(0, 6)).map((amenity, idx) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <div key={`${amenity}-${idx}`} className="flex items-center p-3 lg:p-4 bg-[#005aa9]/5 hover:bg-[#005aa9]/10 rounded-xl transition-colors group border border-[#005aa9]/10">
                      <IconComponent className="w-4 h-4 lg:w-5 lg:h-5 text-[#005aa9] mr-2 lg:mr-3 flex-shrink-0" />
                      <span className="text-[12px] lg:text-sm text-slate-700 font-medium truncate">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-white">
                <h3 className="text-sm lg:text-lg font-semibold text-slate-900 mb-4 lg:mb-6 flex items-center">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-[#005aa9]" />
                  Included
                </h3>
                <ul className="space-y-2 text-[12px] lg:text-sm text-slate-700">
                  {accommodation.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#005aa9] mr-2 lg:mr-3 flex-shrink-0" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-white">
                <h3 className="text-sm lg:text-lg font-semibold text-slate-900 mb-4 lg:mb-6 flex items-center">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-amber-500" />
                  Excluded
                </h3>
                <ul className="space-y-2 text-[12px] lg:text-sm text-slate-700">
                  {accommodation.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-3.5 h-3.5 lg:w-4 lg:h-4 border-2 border-slate-400 rounded-full mr-2 lg:mr-3 flex-shrink-0 bg-slate-100" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {}
            {accommodation.faqs?.length > 0 && (
              <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-white">
                <h3 className="text-sm lg:text-lg font-semibold text-slate-900 mb-4 lg:mb-6">FAQs</h3>
                <div className="space-y-2">
                  {accommodation.faqs.slice(0, 3).map((faq, index) => (
                    <div key={index} className="border border-slate-200/50 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full flex items-center justify-between p-3 lg:p-4 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-[12px] lg:text-sm font-medium text-slate-900 truncate">{faq.question}</span>
                        {expandedFAQ === index ? (
                          <ChevronUp className="w-4 h-4 lg:w-5 lg:h-5 text-[#005aa9] ml-2" />
                        ) : (
                          <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-[#005aa9] ml-2" />
                        )}
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-3 lg:px-4 pb-3 lg:pb-4 bg-[#005aa9]/5">
                          <p className="text-[12px] lg:text-sm text-slate-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {}
          <aside className="lg:col-span-1">
            <div className="border border-slate-200 rounded-xl p-4 lg:p-6 bg-white shadow-sm lg:sticky lg:top-6 lg:max-h-screen lg:overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-xl lg:text-2xl xl:text-3xl font-bold text-[#005aa9]">₹{accommodation.pricePerNight?.toLocaleString()}</span>
                  <span className="text-[11px] lg:text-sm text-slate-500 ml-1 font-medium">/night</span>
                </div>
                <p className="text-[10px] lg:text-xs text-slate-500 font-medium">Taxes included</p>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <label className="block text-[11px] lg:text-sm font-medium text-slate-700 mb-1.5">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-[#005aa9]" />
                      <input
                        type="date"
                        value={bookingData.checkInDate}
                        onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-3 py-2.5 lg:py-3 border border-slate-200 rounded-lg text-[13px] lg:text-sm focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-sm font-medium text-slate-700 mb-1.5">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-[#005aa9]" />
                      <input
                        type="date"
                        value={bookingData.checkOutDate}
                        onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                        min={bookingData.checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-3 py-2.5 lg:py-3 border border-slate-200 rounded-lg text-[13px] lg:text-sm focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <label className="block text-[11px] lg:text-sm font-medium text-slate-700 mb-1.5">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-[#005aa9]" />
                      <select
                        value={bookingData.numberOfGuests}
                        onChange={(e) => setBookingData({ ...bookingData, numberOfGuests: parseInt(e.target.value) })}
                        className="w-full pl-10 pr-3 py-2.5 lg:py-3 border border-slate-200 rounded-lg text-[13px] lg:text-sm focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9] bg-white"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-sm font-medium text-slate-700 mb-1.5">Rooms</label>
                    <select
                      value={bookingData.roomsBooked}
                      onChange={(e) => setBookingData({ ...bookingData, roomsBooked: parseInt(e.target.value) })}
                      className="w-full px-3 py-2.5 lg:py-3 border border-slate-200 rounded-lg text-[13px] lg:text-sm focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9] bg-white"
                    >
                      {Array.from({ length: Math.min(accommodation.availableRooms || 5, 5) }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {calculateNights() > 0 && (
                  <div className="space-y-2 pt-3 pb-1 border-t border-slate-200">
                    <div className="flex justify-between text-[12px] lg:text-sm">
                      <span className="text-slate-600">
                        ₹{accommodation.pricePerNight} × {calculateNights()} night{calculateNights() > 1 ? 's' : ''} × {bookingData.roomsBooked} room{bookingData.roomsBooked > 1 ? 's' : ''}
                      </span>
                      <span className="font-semibold text-slate-900">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-sm lg:text-base font-bold text-slate-900">Total</span>
                      <span className="text-lg lg:text-xl font-bold text-[#005aa9]">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={calculateNights() <= 0 || (accommodation.availableRooms < bookingData.roomsBooked)}
                  className="w-full px-4 py-3 lg:py-3.5 border border-[#005aa9] rounded-xl bg-[#005aa9] text-white text-sm lg:text-base font-semibold hover:from-[#00695c] hover:to-[#005aa9] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  {accommodation.availableRooms < bookingData.roomsBooked 
                    ? 'Not enough rooms' 
                    : calculateNights() <= 0 
                    ? 'Select dates first' 
                    : 'Book Now'
                  }
                </button>

                <div className="text-center py-2">
                  <span className={`text-[11px] lg:text-sm font-semibold ${
                    accommodation.availableRooms > 10 ? 'text-[#005aa9]' : 
                    accommodation.availableRooms > 5 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {accommodation.availableRooms} rooms available
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default AccommodationDetailPage;
