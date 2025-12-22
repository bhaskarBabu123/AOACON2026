import { MapPin, Calendar, Building2, Navigation2 } from 'lucide-react';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';

const VenuePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pb-20">
        {/* SECTION 1 – TOP BANNER */}
      <section className="mt-4 mb-4 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white">
  <div className="relative">
    {/* Background image + overlay */}
    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          'url(https://secureadmissions.in/wp-content/uploads/2025/06/10980_index_20.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-800/85" />

    {/* Content */}
    <div className="relative px-4 sm:px-6 py-6 sm:py-7">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Conference Venue – AOACON 2026
        </h1>
      </div>
      <p className="text-sm sm:text-[15px] max-w-3xl text-slate-100/95">
        AOACON 2026 will be held at Shivamogga Institute of Medical Sciences (SIMS),
        Shivamogga. The operation theatre complex and academic areas provide a dedicated
        setting for scientific sessions, workshops, and hands‑on training.
      </p>
      <div className="flex flex-wrap gap-2 mt-3 text-xs sm:text-sm">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/25">
          <Calendar className="w-4 h-4 text-emerald-200" />
          30 Oct – 1 Nov 2026
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/25">
          <MapPin className="w-4 h-4 text-sky-200" />
          SIMS, Shivamogga, Karnataka, India
        </span>
      </div>
    </div>
  </div>
</section>


        {/* SECTION 2 – VENUE DESCRIPTION */}
        <section className="mb-4 rounded-2xl bg-slate-50 border border-slate-200 px-4 sm:px-6 py-5">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#005aa9]" />
            Shivamogga Institute of Medical Sciences (SIMS), Shivamogga
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-2">
            Shivamogga Institute of Medical Sciences is a government medical college and teaching
            hospital that caters to a large population of central Karnataka. The institute combines
            a busy tertiary‑care hospital, modern operation theatre complex, and dedicated academic
            spaces, making it an ideal venue for AOACON 2026.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Scientific sessions, symposia, and workshops will be conducted in lecture halls,
            seminar rooms, and OT‑adjacent areas, closely integrating academic content with live
            clinical practice and case‑based discussions.
          </p>
        </section>

        {/* SECTION 3 – CONFERENCE SECRETARIAT */}
        <section className="mb-4 rounded-2xl bg-[#e5f1ff] border border-[#c4dcff] px-4 sm:px-6 py-5">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
            Conference Secretariat
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            3rd floor, Department of Anaesthesia,
            <br />
            Operation Theatre Complex,
            <br />
            Shivamogga Institute of Medical Sciences (SIMS),
            <br />
            Shivamogga, Karnataka, India.
          </p>
          <p className="mt-2 text-sm text-slate-700">
            All scientific communication, registration‑related queries, and on‑site coordination
            will be handled through the conference secretariat located in the OT complex at SIMS.
          </p>
        </section>

        {/* SECTION 4 – CAMPUS HIGHLIGHTS */}
        <section className="mb-4 rounded-2xl bg-[#f3ecff] border border-[#dcc8ff] px-4 sm:px-6 py-5">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
            Campus & Facility Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-800">
            <div className="bg-white/80 rounded-xl border border-[#dcc8ff] px-3 py-3">
              <p className="font-semibold text-sm mb-1">Academic Spaces</p>
              <ul className="space-y-1">
                <li>• Lecture theatres with AV support</li>
                <li>• Seminar rooms for symposia</li>
                <li>• Break‑out areas for small‑group sessions</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl border border-[#dcc8ff] px-3 py-3">
              <p className="font-semibold text-sm mb-1">Clinical Infrastructure</p>
              <ul className="space-y-1">
                <li>• Multi‑theatre OT complex</li>
                <li>• High‑dependency and ICU facilities</li>
                <li>• Large obstetric & surgical case load</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl border border-[#dcc8ff] px-3 py-3">
              <p className="font-semibold text-sm mb-1">Delegate Comfort</p>
              <ul className="space-y-1">
                <li>• Easy access from bus stand and station</li>
                <li>• Nearby hotels & guest houses</li>
                <li>• Cafeteria, pharmacy & ATM around campus</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5 – IMAGE STRIP */}
        <section className="mb-4 rounded-2xl bg-[#fff4e5] border border-[#ffd7a8] px-4 sm:px-6 py-5">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
            Campus
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://secureadmissions.in/wp-content/uploads/2025/06/10980_index_20.gif',
              'https://thecollegesphere.com/wp-content/uploads/2025/09/Shimoga-Institute-of-Medical-Sciences.gif',
              'https://content.jdmagicbox.com/comp/shimoga/k9/9999p8182.8182.221202231357.f7k9/catalogue/shimoga-institute-of-medical-sciences-sagar-road-shimoga-institutes-for-medical-courses-pwuinlqaru.jpg',
              'https://i3c-medical-colleges-assets.blr1.digitaloceanspaces.com/2020/10/28/117b72f6af5344d68ab4fa1e47b758b8.jpg',
            ].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl border border-[#ffd7a8] bg-white"
              >
                <img
                  src={src}
                  alt="SIMS campus"
                  className="w-full h-28 md:h-32 object-cover hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
         
        </section>

        {/* SECTION 6 – MAP */}
        <section className="rounded-2xl bg-[#e7f7ef] border border-[#b9e4cf] px-4 sm:px-6 py-5">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Navigation2 className="w-5 h-5 text-[#005aa9]" />
            How to Reach SIMS, Shivamogga
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
            <div className="lg:col-span-2 rounded-xl overflow-hidden border border-[#b9e4cf] bg-white">
              <iframe
                title="SIMS Shivamogga Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.24364409746!2d75.5607!3d13.9345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbbaef6b7f5ad4b%3A0x7a27d2c2db4c9f82!2sShimoga%20Institute%20of%20Medical%20Sciences!5e0!3m2!1sen!2sin!4v1700000000001"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-sm text-slate-700">
              <p className="font-semibold text-sm mb-1">Travel Information</p>
              <ul className="space-y-1 mb-3">
                <li>• Nearest railway stations: Shivamogga Town / Shivamogga Central.</li>
                <li>• KSRTC bus stand within short driving distance.</li>
                <li>• Taxis and auto‑rickshaws easily available.</li>
              </ul>
              <p className="font-semibold text-sm mb-1">Local Tips</p>
              <ul className="space-y-1">
                <li>• Keep some time buffer for city traffic during peak hours.</li>
                <li>• October–November usually offers comfortable weather.</li>
                <li>• Ideal time to plan nearby sightseeing before/after conference.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <MobileNav />
    </div>
  );
};

export default VenuePage;
