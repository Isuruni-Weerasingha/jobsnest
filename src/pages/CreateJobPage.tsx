import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const CreateJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    jobType: 'part-time',
    salary: '',
    description: '',
    requirements: [''],
    responsibilities: ['']
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleArrayInputChange = (index: number, field: 'requirements' | 'responsibilities', value: string) => {
    setFormData(prev => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return {
        ...prev,
        [field]: updatedArray
      };
    });
  };
  
  const addArrayItem = (field: 'requirements' | 'responsibilities') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  const removeArrayItem = (index: number, field: 'requirements' | 'responsibilities') => {
    setFormData(prev => {
      const updatedArray = [...prev[field]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [field]: updatedArray
      };
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.location || !formData.description) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Filter out empty requirements and responsibilities
    const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
    const filteredResponsibilities = formData.responsibilities.filter(resp => resp.trim() !== '');
    
    if (filteredRequirements.length === 0 || filteredResponsibilities.length === 0) {
      alert('Please add at least one requirement and responsibility.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send the job data to the server
      console.log('Job Posted:', {
        ...formData,
        requirements: filteredRequirements,
        responsibilities: filteredResponsibilities,
        providerId: currentUser?.id,
        company: (currentUser as any).companyName || 'Your Company',
      });
      
      // Navigate to dashboard after successful submission
      navigate('/provider-dashboard');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/provider-dashboard" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to dashboard
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-error-600">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="e.g. Frontend Developer, Marketing Assistant"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-error-600">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="e.g. San Francisco, CA or Remote"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type <span className="text-error-600">*</span>
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Salary (Optional)
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="e.g. $50,000-$70,000/year or $25-30/hour"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description <span className="text-error-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Describe the job, its purpose, and the ideal candidate"
                required
              ></textarea>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Requirements <span className="text-error-600">*</span>
                </label>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline" 
                  icon={Plus}
                  onClick={() => addArrayItem('requirements')}
                >
                  Add Requirement
                </Button>
              </div>
              
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayInputChange(index, 'requirements', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder={`Requirement ${index + 1}`}
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'requirements')}
                      className="ml-2 p-1 text-gray-400 hover:text-error-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Responsibilities <span className="text-error-600">*</span>
                </label>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline" 
                  icon={Plus}
                  onClick={() => addArrayItem('responsibilities')}
                >
                  Add Responsibility
                </Button>
              </div>
              
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayInputChange(index, 'responsibilities', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder={`Responsibility ${index + 1}`}
                  />
                  {formData.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'responsibilities')}
                      className="ml-2 p-1 text-gray-400 hover:text-error-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="mr-4"
                onClick={() => navigate('/provider-dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                Post Job
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;