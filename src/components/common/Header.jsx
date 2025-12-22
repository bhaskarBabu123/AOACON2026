import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight,
  Home, 
  Users,
  Hotel,
  FileText,
  MapPin,
  Download,
  Phone,
  Calendar,
  User,
  Map
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  const navItems = [
    { 
      label: 'Conference', 
      icon: Users,
      items: [
        { label: 'Committee', path: '/committee', icon: Users },
        // { label: 'Office Bearers', path: '/committee/office-bearers', icon: User },
        // { label: 'Organising Committee', path: '/committee/organising', icon: User },
        // { label: 'Faculty', path: '/faculty', icon: Users },
        // { label: 'National Faculty', path: '/faculty/national', icon: User },
        // { label: 'International Faculty', path: '/faculty/international', icon: User },
        { label: 'Program', path: '/program', icon: Calendar },
        { label: 'Workshops', path: '/program/workshops', icon: Calendar },
        { label: 'Program Schedule', path: '/conference-days', icon: Calendar }
      ]
    },
    { 
      label: 'Attendee', 
      icon: Hotel,
      items: [
        { label: 'Venue', path: '/venue', icon: MapPin },
        { label: 'Accommodation', path: '/accommodation', icon: Hotel },
        { label: 'Abstract', path: '/abstract/rules', icon: FileText },
        { label: 'Contact', path: '/contact', icon: User },
      ]
    }
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Users,
      User,
      Hotel,
      FileText,
      MapPin,
      Download,
      Phone,
      Calendar,
    };
    return icons[iconName] || ChevronRight;
  };

  const getRoleText = (role) => {
    const texts = {
      AOA: 'AOA Member',
      NON_AOA: 'Non-AOA Member',
      PGS: 'PGS & Fellows',
    };
    return texts[role] || role;
  };

  return (
    <header className="bg-[#005aa9] py-3 border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Logo */}
          <div 
            className="flex items-center p-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer -m-1.5"
            onClick={() => navigate('/')}
          >
           <img src={logo}  width="100px"/>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
             <Link
             to="/"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white  border-b-2 border-transparent transition-colors duration-200 relative"
                >
                  <Home className="w-4 h-4 text-white hover:text-yellow-900 transition-colors" />
                  <span>Home</span>
                 
                </Link>
                 <Link
             to="/venue"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white  border-b-2 border-transparent transition-colors duration-200 relative"
                >
                  <Map className="w-4 h-4 text-white hover:text-yellow-900 transition-colors" />
                  <span>Venue</span>
                 
                </Link>
            {navItems.map((item, index) => (
              <div key={item.label} className="relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white  border-b-2 border-transparent transition-colors duration-200 relative"
                >
                  <item.icon className="w-4 h-4 text-white hover:text-yellow-900 transition-colors" />
                  <span>{item.label}</span>
                  <ChevronDown className={`w-4 h-4 ml-1 text-white transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-0 w-72 bg-white border border-slate-200 shadow-md rounded-b-lg z-50">
                    <div className="">
                      {item.items.map((subItem) => {
                        const IconComponent = getIconComponent(subItem.icon);
                        return (
                          <button
                            key={subItem.label}
                            onClick={() => {
                              navigate(subItem.path);
                              setActiveDropdown(null);
                            }}
                            className="flex items-center gap-3 w-full px-5 py-3.5 text-sm text-slate-700 hover:bg-[#005aa9] hover:text-white hover:border-l-[#005aa9]/30 border-l-4 border-transparent transition-all duration-200 group hover:shadow-sm"
                          >
                            {/* <IconComponent className="w-4 h-4 text-slate-500 group-hover:text-[#005aa9] flex-shrink-0" /> */}
                            <span className="font-medium">{subItem.label}</span>
                          </button>
                        );
                      })}
                      
                    </div>
                  </div>
                )}
              </div>
            ))}
             <Link
             to="/download"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white  border-b-2 border-transparent transition-colors duration-200 relative"
                >
                  <Download className="w-4 h-4 text-white hover:text-yellow-900 transition-colors" />
                  <span>Download</span>
                 
                </Link>
             <Link
             to="/registration"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white  border-b-2 border-transparent transition-colors duration-200 relative"
                >
                  <User className="w-4 h-4 text-white hover:text-yellow-900 transition-colors" />
                  <span>Registration</span>
                 
                </Link>

                 <Link
             to="/dashboard"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white  border-b-2 border-transparent transition-colors duration-200 relative"
                >
                  <User className="w-4 h-4 text-white hover:text-yellow-900 transition-colors" />
                  <span>Profile</span>
                 
                </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              /* Profile */
              <div className="relative lg:ml-4">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white  rounded-lg transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center  transition-all">
                    <User className="w-4 h-4 text-[#005aa9]" />
                  </div>
                  <div className="hidden lg:block">
                    <div className="font-medium text-sm text-white truncate max-w-[100px]">{user?.name}</div>
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 shadow-lg rounded-lg z-50 overflow-hidden">
                    <div className="px-4 py-4 border-b border-slate-100 bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#005aa9] rounded-full flex items-center justify-center border-2 border-[#005aa9]/30">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{user?.name}</div>
                          <div className="text-xs text-[#005aa9] font-medium">{getRoleText(user?.role)}</div>
                          <div className="text-xs text-slate-500">{user?.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-slate-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-2 text-sm font-semibold text-[#005aa9] bg-white hover:from-[#00695c] hover:to-[#005aa9] rounded-lg hover:shadow-md  transition-all duration-200 whitespace-nowrap"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              <button
                onClick={() => {
                  navigate('/');
                  setShowMobileMenu(false);
                }}
                className="flex items-center w-full px-4 py-4 text-base font-semibold text-white  hover:border-[#005aa9] transition-all duration-200"
              >
                <Home className="w-5 h-5 mr-4 flex-shrink-0" />
                <span>Home</span>
              </button>
              
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center w-full px-4 py-4 text-left text-base font-semibold text-slate-800 hover:text-[#005aa9] hover:bg-[#005aa9]/5 border-l-4 border-transparent hover:border-[#005aa9] transition-all cursor-default">
                    <div className="flex items-center gap-4 flex-1">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </div>
                  <div className="ml-12 space-y-1 mb-6 px-4 pb-4">
                    {item.items.map((subItem) => {
                      const IconComponent = getIconComponent(subItem.icon);
                      return (
                        <button
                          key={subItem.label}
                          onClick={() => {
                            navigate(subItem.path);
                            setShowMobileMenu(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#005aa9] hover:bg-[#005aa9]/5 border-l-2 border-slate-200 hover:border-[#005aa9]/50 transition-all duration-200 w-full text-left"
                        >
                          <IconComponent className="w-4 h-4 text-slate-500 hover:text-[#005aa9] flex-shrink-0" />
                          <span>{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
