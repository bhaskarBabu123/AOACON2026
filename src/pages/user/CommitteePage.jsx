import { Users, Calendar, MapPin, Star } from 'lucide-react';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';

const PLACEHOLDER_IMAGE =
  'https://thumbs.dreamstime.com/b/profile-placeholder-image-gray-silhouette-no-photo-person-avatar-default-pic-used-web-design-173998594.jpg';

const committees = [
  {
    sectionTitle: 'Core Organizing Committee',
    accent: 'from-emerald-500/10 to-emerald-500/0',
    roles: [
      {
        role: 'Organizing Chairperson',
        members: [
          {
            name: 'Dr Ravindra G L',
            designation: 'Organizing Chairperson',
            image: PLACEHOLDER_IMAGE,
          },
        ],
      },
      {
        role: 'Organizing Secretary',
        members: [
          {
            name: 'Dr Champa B V',
            designation: 'Organizing Secretary',
            image: PLACEHOLDER_IMAGE,
          },
        ],
      },
      {
        role: 'Treasurer',
        members: [
          {
            name: 'Dr Ashwini S',
            designation: 'Treasurer',
            image: PLACEHOLDER_IMAGE,
          },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Scientific Committee',
    accent: 'from-sky-500/10 to-sky-500/0',
    roles: [
      {
        role: 'Scientific Chairpersons',
        members: [
          {
            name: 'Dr Ravindra G L',
            designation: 'Scientific Chairperson',
            image: PLACEHOLDER_IMAGE,
          },
          {
            name: 'Dr Shivakumar M C',
            designation: 'Scientific Chairperson',
            image: PLACEHOLDER_IMAGE,
          },
        ],
      },
      {
        role: 'Co‑Chairperson',
        members: [
          {
            name: 'Dr Kumara A B',
            designation: 'Scientific Co‑Chairperson',
            image: PLACEHOLDER_IMAGE,
          },
        ],
      },
      {
        role: 'Members',
        members: [
          { name: 'Dr Namratha L', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Pooja Shah', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Swathi Hegde', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Shashank', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Shreehari', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Soumya Rao', designation: 'Member', image: PLACEHOLDER_IMAGE },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Reception & Registration Committee',
    accent: 'from-amber-500/10 to-amber-500/0',
    roles: [
      {
        role: 'Members',
        members: [
          { name: 'Dr Shruthi Hiremath', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Vikram', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Manasa S', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Sushma Pattar', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Kavya', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Bindu (NH)', designation: 'Member', image: PLACEHOLDER_IMAGE },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Travel & Accommodation Committee',
    accent: 'from-violet-500/10 to-violet-500/0',
    roles: [
      {
        role: 'Members',
        members: [
          { name: 'Dr Manjunath B N', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Sandeep Koti', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Karthik', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Praveen S', designation: 'Member', image: PLACEHOLDER_IMAGE },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Venue Detailing Committee',
    accent: 'from-teal-500/10 to-teal-500/0',
    roles: [
      {
        role: 'Members',
        members: [
          { name: 'Dr Praveen S', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Vandana Hebballi', designation: 'Member', image: PLACEHOLDER_IMAGE },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Workshop & Courses Committee',
    accent: 'from-rose-500/10 to-rose-500/0',
    roles: [
      {
        role: 'Workshop Committee Members',
        members: [
          { name: 'Dr Yashoda V', designation: 'Workshop Coordinator', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Sandhya', designation: 'Workshop Coordinator', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Vikram', designation: 'Workshop Coordinator', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Bharath', designation: 'Workshop Coordinator', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Praveen Kumar', designation: 'Workshop Coordinator', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Vadiraj Kulkarni', designation: 'Workshop Coordinator', image: PLACEHOLDER_IMAGE },
        ],
      },
      {
        role: 'AOA Obstetric Critical Care Certification Course (2 days)',
        members: [
          { name: 'Dr Yashoda V', designation: 'Course Lead', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Rashmi', designation: 'Course Faculty', image: PLACEHOLDER_IMAGE },
        ],
      },
      {
        role: 'Labour Analgesia (1 day)',
        members: [{ name: 'Dr Bharath', designation: 'Course Lead', image: PLACEHOLDER_IMAGE }],
      },
      {
        role: 'Critical Incidents in Obstetric Anaesthesia (1 day)',
        members: [{ name: 'Dr Sandhya', designation: 'Course Lead', image: PLACEHOLDER_IMAGE }],
      },
      {
        role: 'POCUS in Obstetric Anaesthesia (1 day)',
        members: [{ name: 'Dr Praveen Kumar', designation: 'Course Lead', image: PLACEHOLDER_IMAGE }],
      },
      {
        role: 'Maternal Collapse & Resuscitation / Obstetric RA Blocks (1 day)',
        members: [{ name: 'Dr Vikram', designation: 'Course Lead', image: PLACEHOLDER_IMAGE }],
      },
    ],
  },
  {
    sectionTitle: 'Food & Banquet Committee',
    accent: 'from-amber-500/10 to-amber-500/0',
    roles: [
      {
        role: 'Members',
        members: [
          { name: 'Dr Basavaraj', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Praveen B J', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Kiran M', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Hemanth K J', designation: 'Member', image: PLACEHOLDER_IMAGE },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Cultural Committee',
    accent: 'from-indigo-500/10 to-indigo-500/0',
    roles: [
      {
        role: 'Members',
        members: [
          { name: 'Dr Shobha M M', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Shwetha Purohit', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Vandana Hebballi', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Manasa S', designation: 'Member', image: PLACEHOLDER_IMAGE },
        ],
      },
    ],
  },
  {
    sectionTitle: 'Memento & Kits Committee',
    accent: 'from-fuchsia-500/10 to-fuchsia-500/0',
    roles: [
      {
        role: 'Members',
        members: [
          { name: 'Dr Rashmi', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Bindu', designation: 'Member', image: PLACEHOLDER_IMAGE },
          { name: 'Dr Sowmya Rao', designation: 'Member', image: PLACEHOLDER_IMAGE },
        ],
      },
    ],
  },
];

const CommitteePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pb-20">
        {}
        <div className="relative overflow-hidden rounded-3xl mt-4 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#005aa9] via-sky-700 to-indigo-700 opacity-90" />
          <div
            className="absolute inset-0 mix-blend-soft-light opacity-40"
            style={{
              backgroundImage:
                'url(https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=1200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative px-5 sm:px-8 py-8 sm:py-10 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-white/15 backdrop-blur">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  AOACON 2026 • Committees
                </h1>
                <p className="text-[12px] sm:text-[13px] text-slate-100/90">
                  Organizing teams behind AOA Shivamogga 2026 – structure, roles and responsibilities.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] sm:text-[12px]">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                <Calendar className="w-3.5 h-3.5" />
                30 Oct – 1 Nov 2026
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                <MapPin className="w-3.5 h-3.5" />
                Shivamogga, Karnataka
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                <Star className="w-3.5 h-3.5" />
                National Conference • AOA
              </span>
            </div>
          </div>
        </div>

        {}
        <div className="mb-4 text-[12px] text-slate-700">
          <p>
            The conference is supported by dedicated committees overseeing scientific content,
            hospitality, workshops, cultural events, logistics, and delegate experience. Each section
            lists the key office bearers and committee members with their designated roles.
          </p>
        </div>

        {}
        <div className="space-y-6">
          {committees.map((section) => (
            <section
              key={section.sectionTitle}
              className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${section.accent} px-4 py-4 sm:px-5 sm:py-5`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="inline-flex w-6 h-6 rounded-xl bg-white/70 text-[#005aa9] items-center justify-center text-[11px]">
                    <Users className="w-3.5 h-3.5" />
                  </span>
                  {section.sectionTitle}
                </h2>
              </div>

              {section.roles.map((roleBlock) => (
                <div key={roleBlock.role} className="mb-4 last:mb-0">
                  <p className="text-[11px] font-semibold text-slate-800 mb-2 uppercase tracking-wide">
                    {roleBlock.role}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {roleBlock.members.map((m) => (
                      <div
                        key={`${roleBlock.role}-${m.name}`}
                        className="flex items-center gap-3 rounded-2xl bg-white/90 border border-white/70 px-3 py-3 shadow-[0_0_0_1px_rgba(15,23,42,0.02)]"
                      >
                        {}
                        <div className="w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-slate-100 shadow-sm bg-slate-100 flex-shrink-0">
                          <img
                            src={m.image}
                            alt={m.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {}
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-slate-900 truncate">
                            {m.name}
                          </p>
                          <p className="text-[11px] text-slate-600 truncate">{m.designation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default CommitteePage;
