import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  X,
  Eye,
  Users,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { abstractAPI } from '../../utils/api';
import { ABSTRACT_CATEGORIES } from '../../utils/constants';
import Header from '../../components/common/Header';
import MobileNav from '../../components/common/MobileNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AbstractUploadPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    category: ''
  });
  const [abstractFile, setAbstractFile] = useState(null);
  const [existingAbstract, setExistingAbstract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  
  const { user } = useAuth();
  const { setAbstract } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    checkExistingAbstract();
  }, []);

  const checkExistingAbstract = async () => {
    try {
      const response = await abstractAPI.getMyAbstract();
      setExistingAbstract(response.data);
      setAbstract(response.data);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (file) => {
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, file: 'Please upload a PDF file only' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: 'File size must be less than 5MB' }));
      return;
    }

    setAbstractFile(file);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().split(' ').length > 20) {
      newErrors.title = 'Title should not exceed 20 words';
    }

    if (!formData.authors.trim()) {
      newErrors.authors = 'Authors are required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!abstractFile && !existingAbstract) {
      newErrors.file = 'Abstract PDF is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      submitData.append('authors', formData.authors.trim());
      submitData.append('category', formData.category);
      
      if (abstractFile) {
        submitData.append('abstractFile', abstractFile);
      }

      const response = await abstractAPI.submit(submitData);
      setAbstract(response.data.abstract);
      
      navigate('/dashboard', { 
        state: { 
          message: 'Abstract submitted successfully! You will be notified about the review status.' 
        }
      });
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.message || 'Failed to submit abstract. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const removeFile = () => {
    setAbstractFile(null);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
      APPROVED: 'bg-[#005aa9]/20 text-[#005aa9] border-[#005aa9]/30',
      REJECTED: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="sm" text="Loading abstract submission..." />
      </div>
    );
  }

  
  if (existingAbstract) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 pb-20">
          {}
          <div className="flex items-center mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
            <button
              onClick={() => navigate('/abstract/rules')}
              className="p-2 text-slate-600 hover:text-[#005aa9] rounded-lg hover:bg-slate-100 transition-colors -m-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="ml-3">
              <h1 className="text-lg font-medium text-slate-900">Abstract Submitted</h1>
              <p className="text-[13px] text-slate-600">Status: {existingAbstract.status}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {}
            <section className="lg:col-span-2 space-y-4">
              <div className="border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-semibold text-slate-900 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-[#005aa9]" />
                    Abstract #{existingAbstract.submissionNumber}
                  </h2>
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium ${getStatusColor(existingAbstract.status)}`}>
                    {existingAbstract.status}
                  </span>
                </div>
                
                <div className="space-y-4 text-[12px]">
                  <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                    <FileText className="w-4 h-4 text-[#005aa9] flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Title</p>
                      <p className="font-semibold text-slate-900">{existingAbstract.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                    <Users className="w-4 h-4 text-[#005aa9] flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Authors</p>
                      <p className="font-semibold text-slate-900 text-[12px]">{existingAbstract.authors}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                    <CheckCircle className="w-4 h-4 text-[#005aa9] flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Category</p>
                      <p className="font-semibold text-slate-900">
                        {ABSTRACT_CATEGORIES.find(cat => cat.value === existingAbstract.category)?.label}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                    <Clock className="w-4 h-4 text-[#005aa9] flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Submitted</p>
                      <p className="font-semibold text-slate-900 text-[12px]">
                        {new Date(existingAbstract.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {existingAbstract.reviewComments && (
                <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                    Review Comments
                  </h3>
                  <div className="p-4 border border-amber-200 rounded-lg bg-amber-50 text-[12px] text-amber-800">
                    {existingAbstract.reviewComments}
                  </div>
                </div>
              )}
            </section>

            {}
            <section className="lg:col-span-1 lg:sticky lg:top-4 space-y-4">
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-900 mb-6 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#005aa9]" />
                  Submission Status
                </h3>
                
                {existingAbstract.status === 'PENDING' && (
                  <div className="text-center p-6 border-2 border-amber-200 rounded-xl bg-amber-50/50">
                    <Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-amber-800 mb-2">Under Review</p>
                    <p className="text-[12px] text-amber-700">Results by October 28, 2025</p>
                  </div>
                )}
                
                {existingAbstract.status === 'APPROVED' && (
                  <div className="text-center p-6 border-2 border-[#005aa9]/30 rounded-xl bg-[#005aa9]/10">
                    <CheckCircle className="w-12 h-12 text-[#005aa9] mx-auto mb-4" />
                    <p className="text-lg font-semibold text-[#005aa9] mb-2">Accepted ✓</p>
                    <p className="text-[12px] text-[#005aa9]">Prepare presentation slides</p>
                  </div>
                )}
                
                {existingAbstract.status === 'REJECTED' && (
                  <div className="text-center p-6 border-2 border-red-200 rounded-xl bg-red-50/50">
                    <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-red-800 mb-2">Not Accepted</p>
                    <p className="text-[12px] text-red-700">See review comments above</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full px-6 py-4 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors flex items-center justify-center"
              >
                Back to Dashboard
              </button>
            </section>
          </div>
        </div>

        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 pb-20">
        {}
        <div className="flex items-center mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
          <button
            onClick={() => navigate('/abstract/rules')}
            className="p-2 text-slate-600 hover:text-[#005aa9] rounded-lg hover:bg-slate-100 transition-colors -m-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="ml-3">
            <h1 className="text-lg font-medium text-slate-900">Submit Abstract</h1>
            <p className="text-[13px] text-slate-600">Upload your research for AOA Shivamogga 2026</p>
          </div>
        </div>

        {errors.general && (
          <div className="p-4 border border-red-200 text-red-700 text-[12px] rounded-xl bg-red-50">
            {errors.general}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {}
          <section className="lg:col-span-2 space-y-4">
            {}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2 text-[#005aa9]" />
                Primary Author
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px]">
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-white">
                  <Users className="w-4 h-4 text-[#005aa9] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Name</p>
                    <p className="font-semibold text-slate-900">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg bg-white">
                  <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                    <p className="font-semibold text-slate-900 text-[12px] truncate">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-[#005aa9]" />
                Abstract Details
              </h2>
              
              <div className="space-y-4">
                {}
                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-2">
                    Abstract Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title (max 20 words)"
                    className={`w-full px-4 py-3 border border-slate-200 rounded-lg text-[13px] focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9] ${errors.title ? 'border-red-300' : ''}`}
                  />
                  {errors.title && <p className="text-red-600 text-[11px] mt-1">{errors.title}</p>}
                  <p className="text-[11px] text-slate-500 mt-1">
                    {formData.title.trim().split(' ').filter(Boolean).length}/20 words
                  </p>
                </div>

                {}
                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-2">
                    All Authors *
                  </label>
                  <textarea
                    name="authors"
                    value={formData.authors}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Dr. John Smith¹, Dr. Jane Doe²&#10;¹Orthopedics, ABC Hospital | ²Surgery, XYZ College"
                    className={`w-full px-4 py-3 border border-slate-200 rounded-lg text-[13px] focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9] resize-vertical ${errors.authors ? 'border-red-300' : ''}`}
                  />
                  {errors.authors && <p className="text-red-600 text-[11px] mt-1">{errors.authors}</p>}
                </div>

                {}
                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border border-slate-200 rounded-lg text-[13px] focus:ring-2 focus:ring-[#005aa9] focus:border-[#005aa9] bg-white ${errors.category ? 'border-red-300' : ''}`}
                  >
                    <option value="">Select category</option>
                    {ABSTRACT_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-600 text-[11px] mt-1">{errors.category}</p>}
                </div>
              </div>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <Upload className="w-4 h-4 mr-2 text-[#005aa9]" />
                Abstract PDF *
              </h2>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all text-[13px] ${
                  dragActive 
                    ? 'border-[#005aa9] bg-[#005aa9]/5' 
                    : errors.file 
                    ? 'border-red-300 bg-red-50/50' 
                    : 'border-slate-200 hover:border-[#005aa9]/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {abstractFile ? (
                  <div className="flex flex-col items-center space-y-3">
                    <FileText className="w-12 h-12 text-[#005aa9]" />
                    <div className="flex items-center bg-[#005aa9]/10 text-[#005aa9] px-4 py-2 rounded-lg border border-[#005aa9]/20">
                      <span className="truncate max-w-[200px]">{abstractFile.name}</span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="ml-3 text-[#005aa9] hover:text-[#00695c]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <div>
                      <label htmlFor="abstract-file" className="inline-flex items-center px-6 py-3 border border-[#005aa9]/30 bg-[#005aa9]/5 text-[#005aa9] rounded-xl cursor-pointer hover:bg-[#005aa9]/10 transition-all font-medium">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload PDF
                        <input
                          id="abstract-file"
                          name="abstract-file"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e.target.files[0])}
                          className="sr-only"
                        />
                      </label>
                      <p className="text-slate-500 mt-2">or drag & drop</p>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">Max 5MB • PDF only</p>
                  </>
                )}
              </div>
              {errors.file && <p className="text-red-600 text-[11px] mt-2 text-center">{errors.file}</p>}
            </div>
          </section>

          {}
          <section className="lg:col-span-1 lg:sticky lg:top-4 space-y-4">
            {}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-[#005aa9]" />
                Checklist
              </h3>
              <ul className="space-y-2 text-[11px] text-slate-600">
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                  Title ≤ 20 words
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                  All authors listed
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                  Category selected
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005aa9] mr-2 flex-shrink-0" />
                  PDF file  5MB
                </li>
              </ul>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full px-6 py-4 rounded-xl border border-[#005aa9] bg-[#005aa9] text-white text-sm font-semibold hover:from-[#00695c] hover:to-[#005aa9] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base"
              >
                {submitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Submit Abstract
                  </>
                )}
              </button>
            </div>

            {}
            <div className="border border-slate-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                Important
              </h3>
              <div className="space-y-2 text-[11px] text-amber-700">
                <div>• One submission per participant</div>
                <div>• Cannot modify after submission</div>
                <div>• Results by Oct 28, 2025</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default AbstractUploadPage;
