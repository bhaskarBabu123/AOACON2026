import { Calendar, Users, CreditCard, Info, Phone, Mail } from 'lucide-react';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import { Link } from 'react-router-dom';

const RegistrationFeesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-6 pb-20">
        {/* Page Header */}
        <div className="flex flex-col gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50/60">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#005aa9]" />
            <h1 className="text-lg font-semibold text-slate-900">
              Registration Fees • AOA Shivamogga 2026
            </h1>
          </div>
          <div className="flex flex-wrap gap-3 text-[12px] text-slate-600">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#005aa9]/10 text-[#005aa9] border border-[#005aa9]/20">
              <Calendar className="w-3.5 h-3.5" />
              October 30 – November 1, 2026
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              <Users className="w-3.5 h-3.5" />
              AOA 19th Annual Conference
            </span>
          </div>
          <p className="text-[12px] text-slate-700">
            Below are the registration fees for different delegate categories and plans:
            Conference only, Workshop + Conference (WS + Conf), and Combo (AOA Life Membership + Conference).
          </p>
        </div>

        {/* EARLY BIRD TABLE */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Early Bird (upto August 15th)
            </h2>
            <span className="px-2.5 py-1 rounded-full text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">
              Best Value
            </span>
          </div>
          <div className="w-full overflow-x-auto border border-emerald-200 rounded-xl bg-emerald-50/40">
            <table className="w-full text-[12px] md:text-[13px] border-collapse">
              <thead>
                <tr className="bg-emerald-100 text-emerald-900">
                  <th className="border border-emerald-200 px-3 py-2 text-left font-semibold">
                    Category
                  </th>
                  <th className="border border-emerald-200 px-3 py-2 text-left font-semibold">
                    Conference
                  </th>
                  <th className="border border-emerald-200 px-3 py-2 text-left font-semibold">
                    WS + Conf
                  </th>
                  <th className="border border-emerald-200 px-3 py-2 text-left font-semibold">
                    Combo (AOA Life + Conf)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-emerald-200 px-3 py-2 font-semibold text-slate-900">
                    AOA Member
                  </td>
                  <td className="border border-emerald-200 px-3 py-2">₹ 8,000</td>
                  <td className="border border-emerald-200 px-3 py-2">₹ 10,000</td>
                  <td className="border border-emerald-200 px-3 py-2 text-slate-400">—</td>
                </tr>
                <tr className="bg-emerald-50/40">
                  <td className="border border-emerald-200 px-3 py-2 font-semibold text-slate-900">
                    Non‑Member
                  </td>
                  <td className="border border-emerald-200 px-3 py-2">₹ 11,000</td>
                  <td className="border border-emerald-200 px-3 py-2">₹ 13,000</td>
                  <td className="border border-emerald-200 px-3 py-2 font-semibold text-emerald-800">
                    ₹ 16,000
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-emerald-200 px-3 py-2 font-semibold text-slate-900">
                    PGs & Fellows
                  </td>
                  <td className="border border-emerald-200 px-3 py-2">₹ 7,000</td>
                  <td className="border border-emerald-200 px-3 py-2">₹ 9,000</td>
                  <td className="border border-emerald-200 px-3 py-2">₹ 12,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* REGULAR TABLE */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600" />
              Regular (Aug 15th to Oct 15th)
            </h2>
            <span className="px-2.5 py-1 rounded-full text-[11px] bg-sky-50 text-sky-700 border border-sky-200">
              Standard
            </span>
          </div>
          <div className="w-full overflow-x-auto border border-sky-200 rounded-xl bg-sky-50/40">
            <table className="w-full text-[12px] md:text-[13px] border-collapse">
              <thead>
                <tr className="bg-sky-100 text-sky-900">
                  <th className="border border-sky-200 px-3 py-2 text-left font-semibold">
                    Category
                  </th>
                  <th className="border border-sky-200 px-3 py-2 text-left font-semibold">
                    Conference
                  </th>
                  <th className="border border-sky-200 px-3 py-2 text-left font-semibold">
                    WS + Conf
                  </th>
                  <th className="border border-sky-200 px-3 py-2 text-left font-semibold">
                    Combo (AOA Life + Conf)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-sky-200 px-3 py-2 font-semibold text-slate-900">
                    AOA Member
                  </td>
                  <td className="border border-sky-200 px-3 py-2">₹ 10,000</td>
                  <td className="border border-sky-200 px-3 py-2">₹ 12,000</td>
                  <td className="border border-sky-200 px-3 py-2 text-slate-400">—</td>
                </tr>
                <tr className="bg-sky-50/40">
                  <td className="border border-sky-200 px-3 py-2 font-semibold text-slate-900">
                    Non‑Member
                  </td>
                  <td className="border border-sky-200 px-3 py-2">₹ 13,000</td>
                  <td className="border border-sky-200 px-3 py-2">₹ 15,000</td>
                  <td className="border border-sky-200 px-3 py-2 font-semibold text-sky-900">
                    ₹ 18,000
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-sky-200 px-3 py-2 font-semibold text-slate-900">
                    PGs & Fellows
                  </td>
                  <td className="border border-sky-200 px-3 py-2">₹ 9,000</td>
                  <td className="border border-sky-200 px-3 py-2">₹ 11,000</td>
                  <td className="border border-sky-200 px-3 py-2 text-slate-900">
                    ₹ 14,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SPOT TABLE */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-600" />
              Spot (Oct 16th onwards)
            </h2>
            <span className="px-2.5 py-1 rounded-full text-[11px] bg-rose-50 text-rose-700 border border-rose-200">
              On‑site
            </span>
          </div>
          <div className="w-full overflow-x-auto border border-rose-200 rounded-xl bg-rose-50/40">
            <table className="w-full text-[12px] md:text-[13px] border-collapse">
              <thead>
                <tr className="bg-rose-100 text-rose-900">
                  <th className="border border-rose-200 px-3 py-2 text-left font-semibold">
                    Category
                  </th>
                  <th className="border border-rose-200 px-3 py-2 text-left font-semibold">
                    Conference Only
                  </th>
                  <th className="border border-rose-200 px-3 py-2 text-left font-semibold">
                    WS + Conf
                  </th>
                  <th className="border border-rose-200 px-3 py-2 text-left font-semibold">
                    Combo (AOA Life + Conf)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-rose-200 px-3 py-2 font-semibold text-slate-900">
                    AOA Member
                  </td>
                  <td className="border border-rose-200 px-3 py-2">₹ 13,000</td>
                  <td className="border border-rose-200 px-3 py-2 text-slate-400">—</td>
                  <td className="border border-rose-200 px-3 py-2 text-slate-400">—</td>
                </tr>
                <tr className="bg-rose-50/40">
                  <td className="border border-rose-200 px-3 py-2 font-semibold text-slate-900">
                    Non‑Member
                  </td>
                  <td className="border border-rose-200 px-3 py-2">₹ 16,000</td>
                  <td className="border border-rose-200 px-3 py-2 text-slate-400">—</td>
                  <td className="border border-rose-200 px-3 py-2 text-slate-400">—</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-rose-200 px-3 py-2 font-semibold text-slate-900">
                    PGs & Fellows
                  </td>
                  <td className="border border-rose-200 px-3 py-2">₹ 12,000</td>
                  <td className="border border-rose-200 px-3 py-2 text-slate-400">—</td>
                  <td className="border border-rose-200 px-3 py-2 text-slate-400">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* GST NOTE */}
        <section className="p-4 border border-emerald-200 rounded-xl bg-emerald-50/80 flex gap-2">
          <Info className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-emerald-900">
            * All the registration fees are inclusive of 18% GST.
          </p>
        </section>

        {/* TERMS & CONDITIONS */}
        <section className="p-5 border border-slate-200 rounded-xl bg-slate-50/70 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#005aa9]" />
            Conference Registration Terms and Conditions
          </h2>

          <div className="space-y-3 text-[12px] leading-relaxed text-slate-700">
            <div>
              <p className="font-semibold text-slate-900 mb-1">1. Eligibility</p>
              <p>The conference is open to registered delegates only.</p>
              <p>Delegates must complete the registration process and pay the applicable fees to confirm participation.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">2. Payment Terms</p>
              <p>All registration fees must be paid in full at the time of registration via the available payment methods.</p>
              <p>Registrations will only be confirmed upon receipt of full payment.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">3. Delegate Information</p>
              <p>The information provided during registration must be accurate. Any errors should be reported immediately.</p>
              <p>Transfer of registration is subject to approval and must be requested in writing.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">4. Liability Disclaimer</p>
              <p>The organizers will not be responsible for any personal injury, loss, or damage to personal belongings during the conference.</p>
              <p>Travel and accommodation arrangements are the responsibility of the delegate.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">5. Changes to the Program</p>
              <p>The organizers reserve the right to modify the conference program, including speakers, sessions, and schedules, without prior notice.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">6. Includes</p>
              <p>Registration includes 3 lunches, 1 dinner, delegate kit, and access to scientific halls and exhibition area.</p>
            </div>
          </div>
        </section>

        {/* CANCELLATION POLICY */}
        <section className="p-5 border border-slate-200 rounded-xl bg-white space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#005aa9]" />
            Cancellation and Refund Policy
          </h2>

          <div className="space-y-3 text-[12px] leading-relaxed text-slate-700">
            <div>
              <p className="font-semibold text-slate-900 mb-1">1. Cancellation by Delegate</p>
              <p>All cancellation requests must be made in writing via email to the conference secretariat.</p>
              <p className="mt-1">Refund schedule:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Up to 120 days before the event: 75% refund of the registration fee.</li>
                <li>Between 119 to 60 days before the event: 50% refund of the registration fee.</li>
                <li>Less than 60 days before the event: No refund will be issued.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">2. Cancellation by the Organizer</p>
              <p>If the conference is canceled due to unforeseen circumstances, all registered delegates will receive a full refund of the registration fee.</p>
              <p>The organizers are not responsible for other costs such as travel or accommodation.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">3. Force Majeure</p>
              <p>
                In case of cancellation or rescheduling due to circumstances beyond control (natural disasters, pandemics, government restrictions, etc.), the organizers will attempt to reschedule and issue revised refund policies.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">4. Refund Processing Time</p>
              <p>Approved refunds will be processed within 30 days of the cancellation request.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">5. No‑Show Policy</p>
              <p>No refunds will be provided for delegates who do not attend the conference without prior cancellation.</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="p-5 border border-slate-200 rounded-xl bg-slate-50/80 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#005aa9]" />
            For Registration Related Query
          </h2>
          <div className="text-[12px] text-slate-700 space-y-1">
            <p className="font-semibold text-slate-900">Mr. Rohit Kamra</p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              Mobile: +91 98189 65679
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              Email:{' '}
              <a
                href="mailto:projects1@meetingsnmore.com"
                className="text-[#005aa9] hover:underline"
              >
                projects1@meetingsnmore.com
              </a>
            </p>
          </div>
        </section>
        <center>
          {/* // */}
          <Link
          to="/registration"
             className="w-full px-6 py-3.5 rounded-xl border border-slate-200 bg-[#005aa9] text-white text-sm font-medium hover:from-[#00695c] hover:to-[#005aa9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            Register now

          </Link>
        </center>
      </div>

      <MobileNav />
    </div>
  );
};

export default RegistrationFeesPage;
