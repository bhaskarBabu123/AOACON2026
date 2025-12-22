import { useEffect, useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Stethoscope,
  HeartPulse,
  Building2,
  Image as ImageIcon,
} from 'lucide-react';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import logo from '../../images/main-logo.jpg'
const targetDate = new Date('2026-10-30T09:00:00+05:30'); // 30 Oct 2026, 9 AM IST

const HomePage = () => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      {/* HERO – SIMS BANNER + COUNTDOWN */}
      <section className="relative border-b border-slate-200 bg-slate-900 text-white">
        {/* SIMS GIF background */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'url(https://secureadmissions.in/wp-content/uploads/2025/06/10980_index_20.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Color overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-sky-800/90 to-[#00796b]/90" />

        <div className="relative max-w-6xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left hero text */}
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 text-xs font-medium">
                <Users className="w-4 h-4" />
                19th Annual Conference • AOA
              </div>
              <div>
                <p className="text-xs tracking-[0.14em] uppercase text-sky-100 mb-1">
                  AOACON 2026 • Shivamogga
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                  Association of Obstetric Anaesthesiologists Conference
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-100/90">
                Hosted by the Department of Anaesthesiology, Shimoga Institute of Medical Sciences
                (SIMS) and ISA City Chapter, Shivamogga – at the gateway to the Western Ghats.
              </p>

              <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/25">
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  30 Oct – 1 Nov 2026
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/25">
                  <MapPin className="w-4 h-4 text-sky-100" />
                  Shimoga Institute of Medical Sciences, Shivamogga
                </span>
              </div>
            </div>

            {/* Countdown + side card */}
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              {/* Countdown */}
              <div className="rounded-2xl bg-slate-950/40 border border-sky-200/60 px-4 py-4 shadow-xl backdrop-blur text-slate-50">
                <div className="flex items-center gap-2 mb-3 text-xs text-sky-50">
                  <Clock className="w-4 h-4 text-emerald-200" />
                  <span>Conference starts in</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Days', value: countdown.days },
                    { label: 'Hours', value: countdown.hours },
                    { label: 'Minutes', value: countdown.minutes },
                    { label: 'Seconds', value: countdown.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center justify-center rounded-xl bg-slate-900/70 border border-sky-200/60 px-3 py-2"
                    >
                      <span className="text-lg font-semibold leading-none">
                        {item.value}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-sky-100 mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side photo card */}
              <div className="hidden sm:block rounded-2xl overflow-hidden border border-sky-200/70 bg-slate-900/60">
                <img
                  src={logo}
                  alt="Conference auditorium"
                  className="w-full h-56 lg:h-50 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VENUE STRIP UNDER HERO */}
      <section className="border-b border-slate-200 bg-slate-100/80">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-white border border-slate-200">
              <Building2 className="w-5 h-5 text-[#00796b]" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-600">
                Official Venue
              </p>
              <p className="text-sm font-semibold text-slate-900">
                Shimoga Institute of Medical Sciences (SIMS), Shivamogga, Karnataka
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Operation theatre complex and academic blocks provide dedicated spaces for plenaries,
            workshops and hands‑on training.
          </p>
        </div>
      </section>

      {/* WELCOME + THEME */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Welcome to the 19th Annual Conference of Association of Obstetric Anaesthesiologists
            </h2>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                It gives great pleasure to welcome you to the 19th Annual Conference of Obstetric
                Anaesthesiologists, hosted by the Department of Anaesthesiology, SIMS, and the ISA
                City Chapter, Shivamogga. The conference will be held at Shimoga Institute of
                Medical Sciences in the culturally rich city that forms the gateway to the Western
                Ghats.
              </p>
              <p>
                Despite advances, gaps persist between urban and rural perioperative maternal care,
                contributing significantly to maternal mortality in India. The meeting focuses on
                delivering equitable, evidence‑based, and safe obstetric anaesthesia across all
                levels of healthcare.
              </p>
              <p>
                AOACON 2026 brings together experts, practitioners, and learners to share
                knowledge, discuss advances, and explore innovations that shape safe motherhood in
                both resource‑rich and resource‑limited environments. Expect distinguished
                speakers, interactive discussions, skills labs, and meaningful networking.
              </p>
              <p>
                Amidst the lush landscapes of Karnataka, Shivamogga offers a balance of academic
                intensity and natural rejuvenation. Join the effort to narrow the urban–rural gap
                and support safe motherhood everywhere.
              </p>
              <p className="font-semibold text-slate-900">
                We look forward to your participation.
                <br />
                <span className="font-normal text-slate-700">
                  Organising Committee, AOACON 2026
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-sky-50 to-rose-50 border border-emerald-200 px-4 py-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-white border border-emerald-200">
                <HeartPulse className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-emerald-700">
                  Theme 2026
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  Bridging the Urban–Rural Gap in Obstetric Anaesthesia
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-700">
              Emphasis on equitable access, critical care readiness, and context‑appropriate
              protocols for every mother, everywhere.
            </p>

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxvHBBYogt3GOpiDFNm90puXa7oo2DlPP2Qg&s" alt="" className='w-full rounded-md' />
          </div>
        </div>
      </section>

      {/* TRACKS + IMAGE STRIP */}
      <section className="border-b border-teal-100 bg-teal-50/70">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="lg:col-span-2">
            <div className="flex  items-center gap-2 mb-4">
              <Stethoscope className="w-5 h-5 text-teal-700" />
              <h2 className="text-lg font-semibold text-slate-900">
                Focus Tracks & Hands‑On Workshops
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-white border border-emerald-200 px-4 py-3">
                <p className="font-semibold text-emerald-800 mb-1">
                  Obstetric Critical Care & Resuscitation
                </p>
                <p className="text-slate-700">
                  Protocol‑driven management of haemorrhage, sepsis, shock, and peri‑arrest
                  scenarios with simulation‑supported learning.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-sky-200 px-4 py-3">
                <p className="font-semibold text-sky-800 mb-1">Obstetric RA & POCUS</p>
                <p className="text-slate-700">
                  Neuraxial techniques, peripheral nerve blocks, and bedside ultrasound for
                  optimised obstetric anaesthesia and critical care.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-amber-200 px-4 py-3">
                <p className="font-semibold text-amber-800 mb-1">Labour Analgesia</p>
                <p className="text-slate-700">
                  Practical epidural strategies, combined techniques, and labour analgesia pathways
                  tailored to different practice settings.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-rose-200 px-4 py-3">
                <p className="font-semibold text-rose-800 mb-1">
                  Critical Incidences, Simulation & Nursing Track
                </p>
                <p className="text-slate-700">
                  High‑impact scenarios, crisis resource management, and essential obstetric
                  emergencies for nurses and allied staff.
                </p>
              </div>
            </div>
          </div>

        
        </div>
      </section>

      {/* CITY & VENUE */}
      <section className="border-b border-indigo-100 bg-indigo-50/70">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden border border-indigo-200 bg-white">
              <img
                src="https://thecollegesphere.com/wp-content/uploads/2025/09/Shimoga-Institute-of-Medical-Sciences.gif"
                alt="Shivamogga landscape"
                className="w-full h-56 lg:h-64 object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-indigo-200 bg-white">
              <iframe
                title="SIMS Shivamogga Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.4355478976645!2d75.56427190859682!3d13.932652586421902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba8d0bb6c8adf%3A0xc7be084ea62ac67d!2sSHIVAMOGGA%20INSTITUTE%20OF%20MEDICAL%20SCIENCES!5e0!3m2!1sen!2sin!4v1766322471387!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-700" />
              <h2 className="text-lg font-semibold text-slate-900">
                Shivamogga & Shimoga Institute of Medical Sciences
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Shivamogga, known as the gateway to the Western Ghats, offers rivers, waterfalls, and
              dense greenery along with a vibrant educational ecosystem. The city provides a calm yet
              energetic setting for high‑quality academic engagement.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Shimoga Institute of Medical Sciences (SIMS) is a government medical college with a
              busy tertiary‑care hospital and well‑equipped operation theatre complex. The campus
              supports large‑volume clinical work, teaching, and simulation‑based training – an
              ideal hub for an obstetric anaesthesia conference.
            </p>

            <div className="rounded-2xl bg-white border border-indigo-200 px-4 py-3 text-sm">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-[#00796b]" />
                <p className="font-semibold text-slate-900">Venue Snapshot</p>
              </div>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• Plenary halls, seminar rooms, and skills‑lab spaces</li>
                <li>• Proximity to district hospital and critical care areas</li>
                <li>• Easy access from bus stand and railway station</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANISING TEAM */}
      <section className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:py-10">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#00796b]" />
            <h2 className="text-lg font-semibold text-slate-900">Organising Team Highlights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-4">
              <p className="font-semibold text-slate-900 mb-1">Core Committee</p>
              <p className="text-slate-700">
                Organising Chairperson, Secretary, Treasurer and senior SIMS faculty overseeing
                academic content, logistics, and delegate experience.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-4">
              <p className="font-semibold text-slate-900 mb-1">Scientific & Workshop Committee</p>
              <p className="text-slate-700">
                Multi‑disciplinary team curating symposia, panel discussions, simulation tracks and
                hands‑on workshops across critical themes.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-4">
              <p className="font-semibold text-slate-900 mb-1">Hospitality & Cultural</p>
              <p className="text-slate-700">
                Reception, travel, food and cultural teams ensuring smooth registrations, stay,
                social events and a memorable cultural flavour of Shivamogga.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MobileNav />
    </div>
  );
};

export default HomePage;
