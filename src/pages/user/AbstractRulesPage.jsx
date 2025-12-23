import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Upload,
  ArrowRight,
  Users
} from 'lucide-react';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';

const AbstractRulesPage = () => {
  const [acceptedRules, setAcceptedRules] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (acceptedRules) {
      navigate('/abstract/upload');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-6 pb-20">
        {}
        <div className="flex items-center mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
          <div className="ml-3">
            <h1 className="text-lg font-medium text-slate-900">Submission Guidelines</h1>
            <p className="text-[13px] text-slate-600">AOA Shivamogga 2026 Abstract Rules</p>
          </div>
        </div>

        {}
        <div className="space-y-6">
          {}
          <div className="border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-[#005aa9]" />
              1. Abstract Format
            </h2>
            <div className="space-y-3 text-[12px] text-slate-700">
              <div>• Maximum 300 words for abstract body (excluding title/authors)</div>
              <div>• Title should not exceed 20 words</div>
              <div>• Include all author names and affiliations</div>
              <div>• Structure: Background, Methods, Results, Conclusion</div>
              <div>• Times New Roman, 12pt font, 1.5 line spacing</div>
              <div>• No images, tables, graphs, or references in abstract</div>
            </div>
          </div>

          {}
          <div className="border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-[#005aa9]" />
              2. File Requirements
            </h2>
            <div className="space-y-3 text-[12px] text-slate-700">
              <div>• PDF format only</div>
              <div>• Maximum file size: 5MB</div>
              <div>• File name: LastName_FirstName_Abstract.pdf</div>
              <div>• Single column layout, A4 page size</div>
            </div>
          </div>

          {}
          {}

          {}
          {}

          {}
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
            <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-[#005aa9]" />
              5. Important Dates
            </h2>
            <div className="space-y-2 text-[12px]">
              <div className="flex items-center justify-between py-1">
                <span>Regular Submission Deadline</span>
                <span className="font-semibold text-[#005aa9]">October 15, 2025</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Final Submission Deadline</span>
                <span className="font-semibold">October 25, 2025</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Review Results</span>
                <span className="font-semibold">October 28, 2025</span>
              </div>
            </div>
          </div>

          {}
          <div className="border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
              6. Rules & Regulations
            </h2>
            <div className="space-y-3 text-[12px] text-slate-700">
              <div className="p-3 bg-amber-50/50 border border-amber-200/50 rounded-lg">
                <div className="font-semibold text-amber-800 mb-2">Eligibility:</div>
                <div>• Only registered conference participants</div>
                <div>• First author must be medical professional</div>
                <div>• Maximum 2 abstracts per first author</div>
              </div>
              <div className="p-3 bg-red-50/50 border border-red-200/50 rounded-lg">
                <div className="font-semibold text-red-800 mb-2">Restrictions:</div>
                <div>• No previously published work</div>
                <div>• No simultaneous submissions elsewhere</div>
                <div>• Plagiarism = immediate rejection</div>
                <div>• No commercial content allowed</div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-6 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-[#005aa9]" />
            Terms & Conditions
          </h2>
          
          <div className="prose prose-sm mb-8 text-[12px] text-slate-700 max-w-none leading-relaxed">
            <ol className="space-y-3 list-decimal list-inside">
              <li><strong>Originality:</strong> Work must be original and unpublished. Plagiarism detection mandatory.</li>
              <li><strong>Copyright:</strong> Authors retain copyright but grant AOA Shivamogga rights to publish accepted abstracts.</li>
              <li><strong>Review:</strong> Double-blind peer review. Organizing committee decision final and binding.</li>
              <li><strong>Presentation:</strong> At least one author must register and present. No-shows result in rejection.</li>
              <li><strong>Publication:</strong> Accepted abstracts published in proceedings. May be invited for full papers.</li>
              <li><strong>Withdrawal:</strong> Allowed before review begins. No registration fee refunds.</li>
            </ol>
          </div>

          {}
          <label className="flex items-start gap-4 p-5 border border-[#005aa9]/20 rounded-xl bg-[#005aa9]/5 hover:border-[#005aa9]/40 transition-all cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={acceptedRules}
              onChange={(e) => setAcceptedRules(e.target.checked)}
              className="mt-1 h-5 w-5 text-[#005aa9] border-2 border-[#005aa9]/50 focus:ring-[#005aa9] rounded-lg"
            />
            <span className="text-[13px] text-slate-800 leading-relaxed flex-1">
              I have read, understood, and agree to all Submission Guidelines, Rules & Regulations, and Terms & Conditions above.
            </span>
          </label>

          {}
          <button
            onClick={handleProceed}
            disabled={!acceptedRules}
            className="w-auto px-6 py-4 rounded-xl border border-[#005aa9] bg-[#005aa9] text-white text-sm font-semibold hover:from-[#00695c] hover:to-[#005aa9] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base"
          >
            <Upload className="w-5 h-5" />
            Proceed to Upload Abstract
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default AbstractRulesPage;
