
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  Download, 
  ArrowRight, 
  RefreshCw, 
  ArrowLeft, 
  CreditCard,
  Hotel, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee 
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { registrationAPI, accommodationAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setRegistration: setAppRegistration } = useApp();
  const { user } = useAuth();

  const status = searchParams.get('status') || 'failed';
  const type = searchParams.get('type') || 'registration'; 
  const isSuccess = status === 'success';

  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'accommodation') {
          const res = await accommodationAPI.getMyBooking(); 
          setData(res.data);
        } else {
          const res = await registrationAPI.getMyRegistration();
          setData(res.data);
          setAppRegistration(res.data);
        }
      } catch (err) {
        setError('Failed to load payment details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, setAppRegistration]);

  const handleRetry = () => {
    navigate(type === 'accommodation' ? '/accommodation/checkout' : '/checkout');
  };

 const handleDownloadInvoice = () => {
  if (!data) return;

  const doc = new jsPDF();

  
  import('jspdf-autotable').then(({ default: autoTable }) => {
    
    autoTable(doc);

    
    doc.setFontSize(20);
    doc.setTextColor(0, 90, 169); 
    doc.text('AOA 19th Conference Shivamogga 2026', 105, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Invoice', 105, 32, { align: 'center' });

    
    doc.setFontSize(10);
    const invoiceNumber = data.registrationNumber || data.bookingNumber || data._id?.slice(-8) || 'N/A';
    doc.text(`Invoice Number: ${invoiceNumber}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 20, 58);
    doc.text(`Billed To: ${user?.name || 'N/A'}`, 20, 66);
    doc.text(`Email: ${user?.email || 'N/A'}`, 20, 74);
    if (user?.phone) {
      doc.text(`Phone: ${user?.phone}`, 20, 82);
    }

    
    doc.setFontSize(12);
    doc.text('Event Details', 20, 100);
    doc.setFontSize(10);
    doc.text('Event: AOA Shivamogga 2026', 20, 110);
    doc.text('Dates: October 30 - November 1, 2026', 20, 118);
    doc.text('Venue: Hotel Royal Orchid, Shivamogga', 20, 126);

    
    let detailsY = 144;
    if (type === 'registration') {
      doc.setFontSize(12);
      doc.text('Registration Details', 20, detailsY);
      detailsY += 12;
      doc.setFontSize(10);
      doc.text(`Package: ${data.registrationType?.replace('_', ' + ') || 'N/A'}`, 20, detailsY);
      detailsY += 8;
      if (data.lifetimeMembershipId) {
        doc.text(`Lifetime Membership ID: ${data.lifetimeMembershipId}`, 20, detailsY);
        detailsY += 8;
      }
      if (data.role) {
        doc.text(`Category: ${data.role}`, 20, detailsY);
        detailsY += 8;
      }
      if (data.membershipId) {
        doc.text(`Membership ID: ${data.membershipId}`, 20, detailsY);
        detailsY += 8;
      }
      if (data.bookingPhase) {
        doc.text(`Booking Phase: ${data.bookingPhase}`, 20, detailsY);
        detailsY += 8;
      }
    } else {
      doc.setFontSize(12);
      doc.text('Accommodation Details', 20, detailsY);
      detailsY += 12;
      doc.setFontSize(10);
      doc.text(`Hotel: ${data.hotel?.name || 'N/A'}`, 20, detailsY);
      detailsY += 8;
      doc.text(`Location: ${data.hotel?.location || 'N/A'}`, 20, detailsY);
      detailsY += 8;
      doc.text(`Check-in: ${data.checkInDate ? new Date(data.checkInDate).toLocaleDateString('en-IN') : 'N/A'}`, 20, detailsY);
      detailsY += 8;
      doc.text(`Check-out: ${data.checkOutDate ? new Date(data.checkOutDate).toLocaleDateString('en-IN') : 'N/A'}`, 20, detailsY);
      detailsY += 8;
      doc.text(`Guests: ${data.numberOfGuests || 'N/A'}`, 20, detailsY);
      detailsY += 8;
      doc.text(`Rooms: ${data.roomsBooked || 'N/A'}`, 20, detailsY);
      detailsY += 8;
      doc.text(`Nights: ${data.numberOfNights || 'N/A'}`, 20, detailsY);
      detailsY += 8;
      if (data.specialRequests) {
        doc.text(`Special Requests: ${data.specialRequests}`, 20, detailsY);
        detailsY += 8;
      }
    }

    
    const baseAmount = data.basePrice || (data.totalAmount / 1.18) || 0;
    const workshopPrice = data.workshopPrice || 0;
    const comboDiscount = data.comboDiscount || 0;
    const gst = data.gst || (baseAmount * 0.18) || 0;
    const total = data.totalAmount || 0;

    doc.setFontSize(12);
    doc.text('Payment Breakdown', 20, detailsY + 10);

    
    doc.autoTable({
      startY: detailsY + 20,
      head: [['Description', 'Amount (₹)']],
      body: [
        ['Base Amount', baseAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })],
        ...(workshopPrice > 0 ? [['Workshop Fee', workshopPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })]] : []),
        ...(comboDiscount > 0 ? [['Combo Discount', `-${comboDiscount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`]] : []),
        ['GST (18%)', gst.toLocaleString('en-IN', { maximumFractionDigits: 2 })],
        ['Total Amount', total.toLocaleString('en-IN', { maximumFractionDigits: 2 })],
      ],
      theme: 'grid',
      headStyles: { fillColor: [0, 90, 169], textColor: 255 },
      styles: { fontSize: 10 },
    });

    
    const footerY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for your participation!', 105, footerY, { align: 'center' });
    doc.text('AOA Shivamogga 2026 Organizing Team', 105, footerY + 8, { align: 'center' });

    doc.save(`AOA_Invoice_${type}_${invoiceNumber}.pdf`);
  });
};

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner size="sm" text="Loading payment details..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-6">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-600 mb-4">{error || 'No payment details found'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#005aa9] text-white rounded-xl"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  
  const isRegistration = type === 'registration';
  const title = isRegistration ? 'Registration' : 'Accommodation Booking';
  const number = isRegistration ? data.registrationNumber : data.bookingNumber || data._id.slice(-8);
  const amount = data.totalAmount || data.amount || 0;
  const currency = '₹';

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 pb-20 lg:pb-8">
        {}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {}
          <div className="lg:col-span-1 lg:row-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 text-center shadow-sm">
              <div className={`w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center border-4 ${
                isSuccess ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
              }`}>
                {isSuccess ? (
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600" />
                )}
              </div>

              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-3">
                {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
              </h2>

              <p className="text-base text-slate-600 mb-8">
                {isSuccess
                  ? `Your ${title.toLowerCase()} has been confirmed!`
                  : 'The payment was not successful. Please try again.'}
              </p>

              {}
              <div className="inline-block bg-gradient-to-r from-[#005aa9]/5 to-[#009688]/5 border border-[#005aa9]/20 rounded-xl px-8 py-4 mb-8">
                <p className="text-3xl font-bold text-[#005aa9]">
                  {currency}{amount.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-slate-600 mt-1">Total Amount Paid</p>
              </div>

              <div className="space-y-4">
                {isSuccess ? (
                  <>
                    {}
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-xl bg-gradient-to-r from-[#005aa9] to-[#009688] text-white font-medium hover:brightness-110 transition-all"
                    >
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleRetry}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-xl bg-gradient-to-r from-[#005aa9] to-[#009688] text-white font-medium hover:brightness-110 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retry Payment
                    </button>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium"
                    >
                      Go to Dashboard
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-3">
              {isRegistration ? (
                <CreditCard className="w-5 h-5 text-[#005aa9]" />
              ) : (
                <Hotel className="w-5 h-5 text-[#005aa9]" />
              )}
              {title} #{number}
            </h3>

            <div className="space-y-4 text-sm">
              {isRegistration ? (
                <>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Package</span>
                    <span className="font-medium capitalize">
                      {data.registrationType.replace('_', ' + ')}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Amount Paid</span>
                    <span className="font-semibold text-[#005aa9]">
                      {currency}{data.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {data.lifetimeMembershipId && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-600">Lifetime Membership ID</span>
                      <span className="font-medium text-sky-600 bg-sky-50 px-3 py-1 rounded-full text-xs">
                        {data.lifetimeMembershipId}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Payment Status</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      Confirmed
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {}
                  <div className="flex items-center gap-4">
                    <img
                      src={data.hotel?.images?.[0] || '/placeholder-hotel.jpg'}
                      alt={data.hotel?.name}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{data.hotel?.name}</p>
                      <p className="text-slate-600 text-sm">{data.hotel?.location}</p>
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Check-in - Check-out</span>
                    <span className="font-medium">
                      {new Date(data.checkInDate).toLocaleDateString('en-IN')} – 
                      {new Date(data.checkOutDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Guests / Rooms</span>
                    <span className="font-medium">
                      {data.numberOfGuests} Guest{data.numberOfGuests > 1 ? 's' : ''} • 
                      {data.roomsBooked} Room{data.roomsBooked > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Nights</span>
                    <span className="font-medium">{data.numberOfNights} Night{data.numberOfNights > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Total Amount</span>
                    <span className="font-semibold text-[#005aa9]">
                      {currency}{data.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {}
          {isSuccess && (
            <div className="bg-gradient-to-br from-emerald-50 to-sky-50 border border-emerald-200 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Next Steps
              </h4>
              <ul className="space-y-3 text-sm text-slate-700">
                {isRegistration ? (
                  <>
                    <li className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Book your accommodation now</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Submit your abstract</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>View conference schedule</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-3">
                      <Hotel className="w-4 h-4 text-emerald-600" />
                      <span>Check-in at {data.hotel?.name}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Enjoy your stay in Shivamogga</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Join the conference sessions</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default PaymentStatusPage;
