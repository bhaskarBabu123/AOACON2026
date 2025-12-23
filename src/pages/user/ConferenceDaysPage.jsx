import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, Lock, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { registrationAPI } from '../../utils/api';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ConferenceDaysPage = () => {
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { updateStepperProgress } = useApp();

  useEffect(() => {
    fetchRegistration();
  }, []);

  const fetchRegistration = async () => {
    try {
      const response = await registrationAPI.getMyRegistration();
      setRegistration(response.data);
      
      if (response.data.paymentStatus === 'PAID') {
        updateStepperProgress('conferenceDays', true);
      }
    } catch (error) {
      console.error('Failed to fetch registration:', error);
    } finally {
      setLoading(false);
    }
  };

  const conferenceDays = [
    {
      date: '2025-10-30',
      day: 'Day 1',
      title: 'Opening Ceremony & Keynote Sessions',
      sessions: [
        { time: '09:00 - 10:00', title: 'Registration & Welcome Coffee', speaker: 'Conference Team', type: 'registration' },
        { time: '10:00 - 11:00', title: 'Opening Ceremony', speaker: 'Chief Guest & Organizing Committee', type: 'ceremony' },
        { time: '11:00 - 12:00', title: 'Keynote: Advances in Orthopedic Surgery', speaker: 'Dr. Rajesh Kumar, AIIMS Delhi', type: 'keynote' },
        { time: '12:00 - 13:00', title: 'Panel Discussion: Future of Joint Replacement', speaker: 'Expert Panel', type: 'panel' },
        { time: '13:00 - 14:00', title: 'Lunch Break', speaker: 'Networking Opportunity', type: 'break' },
        { time: '14:00 - 15:30', title: 'Workshop: Arthroscopic Techniques', speaker: 'Dr. Priya Sharma, Manipal Hospital', type: 'workshop' },
        { time: '15:30 - 16:00', title: 'Tea Break', speaker: 'Networking', type: 'break' },
        { time: '16:00 - 17:30', title: 'Scientific Paper Presentations', speaker: 'Selected Participants', type: 'presentation' }
      ]
    },
    {
      date: '2025-10-31',
      day: 'Day 2',
      title: 'Clinical Sessions & Workshops',
      sessions: [
        { time: '09:00 - 10:00', title: 'Morning Coffee & Networking', speaker: 'Conference Team', type: 'networking' },
        { time: '10:00 - 11:30', title: 'Symposium: Trauma Management', speaker: 'Dr. Anil Gupta, PGIMER Chandigarh', type: 'symposium' },
        { time: '11:30 - 12:00', title: 'Coffee Break', speaker: 'Networking', type: 'break' },
        { time: '12:00 - 13:30', title: 'Live Surgery Demonstration', speaker: 'Dr. Suresh Reddy, Apollo Hospitals', type: 'demonstration' },
        { time: '13:30 - 14:30', title: 'Lunch & Poster Session', speaker: 'Research Presentations', type: 'poster' },
        { time: '14:30 - 16:00', title: 'Workshop: Spine Surgery Techniques', speaker: 'Dr. Meera Patel, Fortis Hospital', type: 'workshop' },
        { time: '16:00 - 16:30', title: 'Tea Break', speaker: 'Networking', type: 'break' },
        { time: '16:30 - 18:00', title: 'Case Discussions & Q&A', speaker: 'Interactive Session', type: 'discussion' },
        { time: '19:00 - 22:00', title: 'Gala Dinner & Cultural Program', speaker: 'Entertainment & Networking', type: 'social' }
      ]
    },
    {
      date: '2025-11-01',
      day: 'Day 3',
      title: 'Research Presentations & Closing',
      sessions: [
        { time: '09:00 - 10:00', title: 'Morning Coffee', speaker: 'Conference Team', type: 'networking' },
        { time: '10:00 - 11:30', title: 'Young Orthopedist Forum', speaker: 'Emerging Professionals', type: 'forum' },
        { time: '11:30 - 12:00', title: 'Coffee Break', speaker: 'Networking', type: 'break' },
        { time: '12:00 - 13:30', title: 'Research Paper Presentations', speaker: 'Selected Researchers', type: 'research' },
        { time: '13:30 - 14:30', title: 'Lunch Break', speaker: 'Final Networking', type: 'break' },
        { time: '14:30 - 15:30', title: 'Award Ceremony', speaker: 'Recognition of Excellence', type: 'awards' },
        { time: '15:30 - 16:30', title: 'Closing Ceremony', speaker: 'Organizing Committee', type: 'ceremony' },
        { time: '16:30 - 17:00', title: 'Vote of Thanks & Departure', speaker: 'Conference Team', type: 'closing' }
      ]
    }
  ];

  const getSessionTypeColor = (type) => {
    const colors = {
      registration: 'bg-[#005aa9]/20 text-[#005aa9]',
      ceremony: 'bg-purple-100 text-purple-800',
      keynote: 'bg-emerald-100 text-emerald-800',
      panel: 'bg-amber-100 text-amber-800',
      workshop: 'bg-[#005aa9]/20 text-[#005aa9]',
      presentation: 'bg-indigo-100 text-indigo-800',
      symposium: 'bg-red-100 text-red-800',
      demonstration: 'bg-pink-100 text-pink-800',
      discussion: 'bg-yellow-100 text-yellow-800',
      networking: 'bg-slate-100 text-slate-700',
      break: 'bg-slate-50 text-slate-500',
      poster: 'bg-cyan-100 text-cyan-800',
      social: 'bg-rose-100 text-rose-800',
      forum: 'bg-lime-100 text-lime-800',
      research: 'bg-emerald-100 text-emerald-800',
      awards: 'bg-amber-100 text-amber-800',
      closing: 'bg-slate-100 text-slate-800'
    };
    return colors[type] || 'bg-slate-100 text-slate-700';
  };

  const isDateAccessible = (dateString) => {
    if (!registration || registration.paymentStatus !== 'PAID') return false;
    
    const conferenceDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return conferenceDate >= today;
  };

  const isPastDate = (dateString) => {
    const conferenceDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return conferenceDate < today;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <LoadingSpinner size="sm" text="Loading conference schedule..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-6 pb-20">
        {}
        <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-[#005aa9] mr-3" />
            <h1 className="text-lg font-medium text-slate-900">Conference Schedule</h1>
          </div>
          <p className="text-[13px] text-slate-600 mb-2">AOA Shivamogga 2026 • 3-Day Program</p>
          <div className="flex items-center text-[12px] text-slate-600">
            <MapPin className="w-4 h-4 mr-2" />
            Shivamogga Convention Center, MG Road
          </div>
        </div>

        {}
        <div className="border border-slate-200 rounded-xl p-6">
          {registration && registration.paymentStatus === 'PAID' ? (
            <div className="flex items-start gap-4 p-4 bg-[#005aa9]/5 border border-[#005aa9]/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-[#005aa9] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-[#005aa9]">Registration Confirmed</h3>
                <p className="text-[12px] text-slate-700">Welcome! Full access to all sessions and materials granted.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <Lock className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-amber-800">Complete Registration</h3>
                <p className="text-[12px] text-amber-700">Complete payment to unlock full schedule and conference access.</p>
              </div>
            </div>
          )}
        </div>

        {}
        <div className="border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-xl">
            <div>
              <div className="flex items-center text-[12px] text-slate-600 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                Thursday, October 30, 2025
              </div>
              <h2 className="text-sm font-semibold text-slate-900">Day 1: Opening Ceremony & Keynote Sessions</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${
              isPastDate(conferenceDays[0].date) ? 'bg-slate-100 text-slate-600' :
              isDateAccessible(conferenceDays[0].date) ? 'bg-[#005aa9]/20 text-[#005aa9]' : 'bg-slate-100 text-slate-500'
            }`}>
              {isPastDate(conferenceDays[0].date) ? 'Completed' : isDateAccessible(conferenceDays[0].date) ? 'Live' : 'Upcoming'}
            </span>
          </div>
          
          <div className="space-y-3 text-[12px]">
            {conferenceDays[0].sessions.map((session, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                <div className="w-14 h-14 bg-[#005aa9]/10 border border-[#005aa9]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#005aa9]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-slate-900 text-[13px]">{session.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ml-3 ${getSessionTypeColor(session.type)}`}>
                      {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mb-1">{session.speaker}</p>
                  <p className="text-sm font-medium text-slate-900">{session.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-xl">
            <div>
              <div className="flex items-center text-[12px] text-slate-600 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                Friday, October 31, 2025
              </div>
              <h2 className="text-sm font-semibold text-slate-900">Day 2: Clinical Sessions & Workshops</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${
              isPastDate(conferenceDays[1].date) ? 'bg-slate-100 text-slate-600' :
              isDateAccessible(conferenceDays[1].date) ? 'bg-[#005aa9]/20 text-[#005aa9]' : 'bg-slate-100 text-slate-500'
            }`}>
              {isPastDate(conferenceDays[1].date) ? 'Completed' : isDateAccessible(conferenceDays[1].date) ? 'Live' : 'Upcoming'}
            </span>
          </div>
          
          <div className="space-y-3 text-[12px]">
            {conferenceDays[1].sessions.map((session, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                <div className="w-14 h-14 bg-[#005aa9]/10 border border-[#005aa9]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#005aa9]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-slate-900 text-[13px]">{session.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ml-3 ${getSessionTypeColor(session.type)}`}>
                      {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mb-1">{session.speaker}</p>
                  <p className="text-sm font-medium text-slate-900">{session.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-xl">
            <div>
              <div className="flex items-center text-[12px] text-slate-600 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                Saturday, November 1, 2025
              </div>
              <h2 className="text-sm font-semibold text-slate-900">Day 3: Research Presentations & Closing</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${
              isPastDate(conferenceDays[2].date) ? 'bg-slate-100 text-slate-600' :
              isDateAccessible(conferenceDays[2].date) ? 'bg-[#005aa9]/20 text-[#005aa9]' : 'bg-slate-100 text-slate-500'
            }`}>
              {isPastDate(conferenceDays[2].date) ? 'Completed' : isDateAccessible(conferenceDays[2].date) ? 'Live' : 'Upcoming'}
            </span>
          </div>
          
          <div className="space-y-3 text-[12px]">
            {conferenceDays[2].sessions.map((session, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                <div className="w-14 h-14 bg-[#005aa9]/10 border border-[#005aa9]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#005aa9]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-slate-900 text-[13px]">{session.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ml-3 ${getSessionTypeColor(session.type)}`}>
                      {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mb-1">{session.speaker}</p>
                  <p className="text-sm font-medium text-slate-900">{session.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-[#005aa9]" />
              Venue Details
            </h3>
            <div className="space-y-3 text-[12px] text-slate-700">
              <div>Shivamogga Convention Center</div>
              <div>MG Road, Shivamogga, Karnataka 577201</div>
              <div className="flex items-center mt-3">
                <Clock className="w-4 h-4 mr-2 text-[#005aa9]" />
                <span>Daily: 9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-[#005aa9]" />
                <span>500+ Medical Professionals</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-amber-500" />
              Important Notes
            </h3>
            <div className="space-y-2 text-[12px] text-slate-700">
              <div>• Registration desk opens 8:30 AM Day 1</div>
              <div>• Meals & refreshments included</div>
              <div>• CME credits for all sessions</div>
              <div>• Business formal dress code</div>
              <div>• Phones on silent during sessions</div>
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default ConferenceDaysPage;
