import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  Award,
  Mail,
  Phone
} from 'lucide-react';
import { adminAPI } from '../../utils/api';
import Sidebar from '../../components/admin/Sidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { X } from 'lucide-react';

const RegistrationsManagementPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm, statusFilter, roleFilter, phaseFilter]);

  const fetchRegistrations = async () => {
    try {
      const response = await adminAPI.getRegistrations();
      setRegistrations(response.data);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.userId?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(reg => reg.paymentStatus === statusFilter);
    }

    if (roleFilter) {
      filtered = filtered.filter(reg => reg.userId?.role === roleFilter);
    }

    if (phaseFilter) {
      filtered = filtered.filter(reg => reg.bookingPhase === phaseFilter);
    }

    setFilteredRegistrations(filtered);
  };

  const getStatusBadge = (status) => {
    const badges = {
      PAID: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
      PENDING: { color: 'bg-amber-100 text-amber-800', icon: Clock },
      FAILED: { color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    
    const badge = badges[status] || { color: 'bg-slate-100 text-slate-800', icon: Clock };
    const IconComponent = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${badge.color}`}>
        <IconComponent className="w-2.5 h-2.5 mr-1 flex-shrink-0" />
        {status}
      </span>
    );
  };

  const getRoleText = (role) => {
    const texts = {
      AOA: 'AOA Member',
      NON_AOA: 'Non-AOA',
      PGS: 'PGS & Fellows'
    };
    return texts[role] || role;
  };

  const getPhaseText = (phase) => {
    const texts = {
      EARLY_BIRD: 'Early Bird',
      REGULAR: 'Regular',
      SPOT: 'Spot'
    };
    return texts[phase] || phase;
  };

  const getRegistrationTypeText = (type) => {
    const texts = {
      CONFERENCE_ONLY: 'Conf Only',
      WORKSHOP_CONFERENCE: 'Workshop+Conf',
      COMBO: 'Combo'
    };
    return texts[type] || type;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const exportToCSV = () => {
    const headers = [
      'Registration Number', 'Name', 'Email', 'Phone', 'Role',
      'Registration Type', 'Booking Phase', 'Amount', 'Payment Status', 'Registration Date'
    ];

    const csvData = filteredRegistrations.map(reg => [
      reg.registrationNumber,
      reg.userId?.name,
      reg.userId?.email,
      reg.userId?.phone,
      getRoleText(reg.userId?.role),
      getRegistrationTypeText(reg.registrationType),
      getPhaseText(reg.bookingPhase),
      reg.totalAmount,
      reg.paymentStatus,
      new Date(reg.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const viewDetails = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <LoadingSpinner size="sm" text="Loading registrations..." />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h1 className="text-base sm:text-lg text-slate-900">Registrations</h1>
              <p className="text-xs text-slate-600">{filteredRegistrations.length} of {registrations.length} total</p>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#005aa9] text-white rounded-xl hover:bg-[#004684] transition-colors"
            >
              <Download className="w-3 h-3" />
              Export CSV
            </button>
          </div>

          {/* Stats - Mobile stacked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div className="flex items-center gap-2.5 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Total</p>
                <p className="text-sm text-slate-900">{registrations.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Paid</p>
                <p className="text-sm text-slate-900">
                  {registrations.filter(r => r.paymentStatus === 'PAID').length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Pending</p>
                <p className="text-sm text-slate-900">
                  {registrations.filter(r => r.paymentStatus === 'PENDING').length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Award className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Combo</p>
                <p className="text-sm text-slate-900">
                  {registrations.filter(r => r.registrationType === 'COMBO').length}
                </p>
              </div>
            </div>
          </div>

          {/* Filters - Mobile stacked */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                <input
                  type="text"
                  placeholder="Search name, email, reg#..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#005aa9] focus:border-[#005aa9]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#005aa9] focus:border-[#005aa9]"
              >
                <option value="">Status</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#005aa9] focus:border-[#005aa9]"
              >
                <option value="">Role</option>
                <option value="AOA">AOA</option>
                <option value="NON_AOA">Non-AOA</option>
                <option value="PGS">PGS</option>
              </select>
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#005aa9] focus:border-[#005aa9]"
              >
                <option value="">Phase</option>
                <option value="EARLY_BIRD">Early</option>
                <option value="REGULAR">Regular</option>
                <option value="SPOT">Spot</option>
              </select>
            </div>
          </div>

          {/* Table - Cards on mobile */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              {/* Mobile: Card layout */}
              <div className="sm:hidden space-y-2 p-3">
                {filteredRegistrations.map((registration) => (
                  <div key={registration._id} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{registration.userId?.name}</p>
                        <p className="text-xs text-slate-600 truncate">{registration.userId?.email}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        {getStatusBadge(registration.paymentStatus)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div>
                        <span className="text-slate-500">Reg#:</span>
                        <span className="ml-1 font-medium">{registration.registrationNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Type:</span>
                        <span className="ml-1">{getRegistrationTypeText(registration.registrationType)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{getPhaseText(registration.bookingPhase)}</span>
                      <span className="font-medium text-slate-900">{formatCurrency(registration.totalAmount)}</span>
                    </div>
                    <button
                      onClick={() => viewDetails(registration)}
                      className="mt-2 w-full flex items-center justify-center gap-1 text-xs text-[#005aa9] hover:text-[#004684] py-1.5 rounded-lg border border-[#005aa9]/20 hover:bg-[#005aa9]/5 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </div>
                ))}
              </div>

              {/* Desktop: Table */}
              <div className="hidden sm:block">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Participant</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Reg#</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-24">Date</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-20">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRegistrations.map((registration) => (
                      <tr key={registration._id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-xs">
                            <div className="font-medium text-slate-900">{registration.userId?.name}</div>
                            <div className="text-slate-600 truncate max-w-[150px]">{registration.userId?.email}</div>
                            <div className="text-[10px] text-slate-500">{getRoleText(registration.userId?.role)}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-xs font-medium text-slate-900">{registration.registrationNumber}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs">
                          <div>{getRegistrationTypeText(registration.registrationType)}</div>
                          <div className="text-slate-500 text-[10px]">{getPhaseText(registration.bookingPhase)}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-xs font-medium text-slate-900">{formatCurrency(registration.totalAmount)}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(registration.paymentStatus)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-600">
                          {new Date(registration.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => viewDetails(registration)}
                            className="flex items-center gap-1 text-xs text-[#005aa9] hover:text-[#004684] py-1 px-2 rounded-lg border border-[#005aa9]/20 hover:bg-[#005aa9]/5 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12 px-4">
              <Users className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-slate-900 mb-1">No registrations found</h3>
              <p className="text-xs text-slate-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal - Mobile friendly */}
      {showModal && selectedRegistration && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-900">Registration Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Participant */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Participant</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="font-medium text-slate-900">{selectedRegistration.userId?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-600 truncate">{selectedRegistration.userId?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-600">{selectedRegistration.userId?.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Registration Info */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Registration</h4>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>Reg#: <span className="font-medium">{selectedRegistration.registrationNumber}</span></div>
                    <div>Type: <span className="font-medium">{getRegistrationTypeText(selectedRegistration.registrationType)}</span></div>
                    <div>Phase: <span className="font-medium">{getPhaseText(selectedRegistration.bookingPhase)}</span></div>
                    <div>Date: <span className="font-medium">{new Date(selectedRegistration.createdAt).toLocaleDateString()}</span></div>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Payment</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span>Total:</span>
                      <span className="font-medium">{formatCurrency(selectedRegistration.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Status:</span>
                      {getStatusBadge(selectedRegistration.paymentStatus)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationsManagementPage;
