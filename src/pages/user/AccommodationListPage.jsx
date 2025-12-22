import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell,
  ArrowRight,
  Filter,
  Search,
  ArrowLeft
} from 'lucide-react';
import { accommodationAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AccommodationListPage = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await accommodationAPI.getAll();
      setAccommodations(response.data);
    } catch (error) {
      setError('Failed to load accommodations');
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
    return icons[amenity] || null;
  };

  const filteredAndSortedAccommodations = accommodations
    .filter(acc => 
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerNight - b.pricePerNight;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="sm" text="Loading hotels..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 pb-20 sm:pb-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-1.5 text-slate-600 hover:text-[#005aa9] mr-2.5 lg:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium text-slate-900">Accommodation</h1>
            <p className="text-[13px] text-slate-600">AOACON 2026 Shivamogga</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="space-y-3">
          {/* Mobile Search */}
          <div className="lg:hidden relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-[13px] focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9]"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center bg-slate-50/50 border border-slate-200 rounded-lg p-2">
            <Filter className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 bg-transparent border-none text-[13px] text-slate-700 focus:ring-0 p-1.5"
            >
              <option value="price">Price: Low to High</option>
              <option value="rating">Rating: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 border border-red-200 text-red-700 text-[12px] rounded-lg bg-red-50">
            {error}
          </div>
        )}

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedAccommodations.map((accommodation) => (
            <div 
              key={accommodation._id} 
              className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-all hover:border-[#005aa9]/30"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-44 lg:h-48 bg-slate-100">
                <img
                  src={accommodation.images?.[0] || '/placeholder-hotel.jpg'}
                  alt={accommodation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
                  <div className="flex items-center">
                    <Star className="w-3.5 h-3.5 text-[#005aa9] mr-1" />
                    <span className="text-[12px] font-medium text-slate-900">{accommodation.rating}</span>
                  </div>
                </div>
                {accommodation.availableRooms <= 5 && (
                  <div className="absolute top-2 left-2 bg-[#005aa9] text-white px-2 py-1 rounded-full text-[11px] font-medium">
                    {accommodation.availableRooms} left
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Name & Location */}
                <div>
                  <h3 className="font-medium text-slate-900 text-sm leading-tight line-clamp-2">{accommodation.name}</h3>
                  <div className="flex items-center text-[12px] text-slate-600 mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#005aa9] flex-shrink-0" />
                    <span className="truncate">{accommodation.location}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5">
                  {accommodation.amenities.slice(0, 3).map((amenity) => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <div key={amenity} className="flex items-center bg-[#005aa9]/10 px-2 py-1 rounded-full text-[10px] border border-[#005aa9]/20">
                        {IconComponent && <IconComponent className="w-3 h-3 mr-1 text-[#005aa9] flex-shrink-0" />}
                        <span className="truncate text-[#005aa9]">{amenity}</span>
                      </div>
                    );
                  })}
                  {accommodation.amenities.length > 3 && (
                    <div className="flex items-center bg-[#009688]/10 px-2 py-1 rounded-full text-[10px] border border-[#009688]/20">
                      <span className="text-[#009688]">+{accommodation.amenities.length - 3}</span>
                    </div>
                  )}
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 pb-2">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-lg font-semibold text-[#005aa9]">₹{accommodation.pricePerNight}</span>
                      <span className="text-[11px] text-slate-500 ml-1">/night</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Taxes incl.</p>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/accommodation/${accommodation._id}`)}
                    className="px-3 py-2 border border-[#005aa9] rounded-lg bg-[#005aa9] text-white text-[12px] font-medium hover:from-[#00695c] hover:to-[#005aa9] flex items-center gap-1 transition-all"
                  >
                    View
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Availability */}
                {accommodation.availableRooms < accommodation.totalRooms && (
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600">Rooms left</span>
                      <span className={`font-medium ${
                        accommodation.availableRooms > 10 ? 'text-[#005aa9]' : 
                        accommodation.availableRooms > 5 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {accommodation.availableRooms}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedAccommodations.length === 0 && !loading && (
          <div className="text-center py-12 space-y-3 col-span-full">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
              <Search className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-[13px] text-slate-600">No hotels found</p>
            <p className="text-[11px] text-slate-500">Try different search or filters</p>
          </div>
        )}

        {/* Venue Info */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 mt-6 lg:col-span-4">
          <div className="flex items-center text-[12px] text-slate-700">
            <MapPin className="w-4 h-4 mr-2 text-[#005aa9]" />
            <span>All hotels within 15 mins of Shivamogga Convention Center</span>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default AccommodationListPage;
