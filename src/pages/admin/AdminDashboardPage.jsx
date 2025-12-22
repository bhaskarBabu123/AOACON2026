import { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  FileText, 
  MessageSquare,
  DollarSign,
  Calendar,
  Award,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin
} from 'lucide-react';
import { adminAPI } from '../../utils/api';
import Sidebar from '../../components/admin/Sidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <LoadingSpinner size="sm" text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-sm">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-sm font-medium text-slate-900 mb-1">Error Loading Dashboard</h2>
            <p className="text-xs text-slate-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-lg sm:text-xl text-slate-900 mb-1">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-600">AOACON 2026 Shivamogga Management</p>
          </div>

          {/* Stats Grid - Mobile stacked, Desktop grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Total Registrations</p>
                <p className="text-sm font-medium text-slate-900">{dashboardData.registrations.total}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Paid</p>
                <p className="text-sm font-medium text-slate-900">{dashboardData.registrations.paid}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Pending</p>
                <p className="text-sm font-medium text-slate-900">{dashboardData.registrations.pending}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-600">Revenue</p>
                <p className="text-xs text-indigo-600">{formatCurrency(dashboardData.revenue.total)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Content - Full width on mobile */}
            <div className="lg:col-span-2 space-y-4">
              {/* Registration by Category */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-sky-600" />
                  <h3 className="text-sm font-medium text-slate-900">Registrations by Category</h3>
                </div>
                <div className="space-y-2">
                  {dashboardData.registrations.byRole.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg">
                      <div>
                        <p className="text-xs font-medium text-slate-900">
                          {role._id === 'AOA' ? 'AOA Members' : 
                           role._id === 'NON_AOA' ? 'Non-AOA' : 'PGS & Fellows'}
                        </p>
                        <p className="text-xs text-slate-600">
                          {role.paidCount} paid / {role.count} total
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm text-slate-900">{role.count}</p>
                        <div className="w-16 bg-slate-200 rounded-full h-1.5 mt-0.5">
                          <div 
                            className="bg-sky-500 h-1.5 rounded-full" 
                            style={{ width: `${(role.paidCount / role.count) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Payments - Horizontal scroll on mobile */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-medium text-slate-900">Recent Payments</h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {dashboardData.recentPayments.slice(0, 5).map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-lg text-xs">
                      <div className="truncate">
                        <p className="font-medium text-slate-900">{payment.userId?.name}</p>
                        <p className="text-slate-600">{payment.userId?.email}</p>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="font-medium text-emerald-600">{formatCurrency(payment.amount)}</p>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800">
                          {payment.paymentType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Revenue Breakdown */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-medium text-slate-900">Revenue</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Registration</span>
                    <span>{formatCurrency(dashboardData.revenue.registration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Accommodation</span>
                    <span>{formatCurrency(dashboardData.revenue.accommodation)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-medium text-indigo-600">
                    <span>Total</span>
                    <span>{formatCurrency(dashboardData.revenue.total)}</span>
                  </div>
                </div>
              </div>

              {/* Abstracts */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-medium text-slate-900">Abstracts</h3>
                </div>
                <div className="space-y-1 text-xs">
                  {dashboardData.abstracts.map((abstract, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-slate-600 capitalize">{abstract._id.toLowerCase()}</span>
                      <span className={`font-medium ${
                        abstract._id === 'PENDING' ? 'text-amber-600' :
                        abstract._id === 'APPROVED' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {abstract.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <h3 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <span>Quick Actions</span>
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 p-2.5 text-xs rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    <Users className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                    <span>All Registrations</span>
                  </button>
                  <button className="w-full flex items-center gap-2 p-2.5 text-xs rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Payments</span>
                  </button>
                  <button className="w-full flex items-center gap-2 p-2.5 text-xs rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    <FileText className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span>Abstracts</span>
                  </button>
                </div>
              </div>

              {/* Conference Info */}
              <div className="bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-100 rounded-2xl p-4">
                <h3 className="text-sm font-medium text-slate-900 mb-2">Conference</h3>
                <div className="space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>30 Oct - 1 Nov 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>SIMS, Shivamogga</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3 h-3" />
                    <span>19th Annual AOA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
