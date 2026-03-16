import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, MessageSquare, Send, Loader2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { PoliciesandSchemes } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [policies, setPolicies] = useState<PoliciesandSchemes[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<PoliciesandSchemes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPolicy, setSelectedPolicy] = useState<PoliciesandSchemes | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [caseTypeFilter, setCaseTypeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hello! I\'m your AI legislative assistant. Ask me about policies, compliance requirements, or next steps for your case.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Extract unique categories and case types
  const categories = Array.from(new Set(policies.map(p => p.category).filter(Boolean)));
  const caseTypes = Array.from(new Set(policies.map(p => p.caseType).filter(Boolean)));

  useEffect(() => {
    loadPolicies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [policies, searchQuery, categoryFilter, caseTypeFilter]);

  // Handle URL parameters for deep linking to specific policy
  useEffect(() => {
    const policyId = searchParams.get('policy');
    if (policyId && policies.length > 0) {
      const policy = policies.find(p => p._id === policyId);
      if (policy) {
        setSelectedPolicy(policy);
      }
    }
  }, [searchParams, policies]);

  const loadPolicies = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<PoliciesandSchemes>('policiesandschemes');
      setPolicies(result.items);
    } catch (error) {
      console.error('Failed to load policies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...policies];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.policyTitle?.toLowerCase().includes(query) ||
        p.policyDescription?.toLowerCase().includes(query) ||
        p.keywords?.toLowerCase().includes(query)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (caseTypeFilter) {
      filtered = filtered.filter(p => p.caseType === caseTypeFilter);
    }

    setFilteredPolicies(filtered);
  };

  const handlePolicyClick = (policy: PoliciesandSchemes) => {
    setSelectedPolicy(policy);
    setSearchParams({ policy: policy._id });
  };

  const handleCloseDetail = () => {
    setSelectedPolicy(null);
    setSearchParams({});
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Based on your query about "${userMessage}", I recommend reviewing the relevant policies in our database. Would you like me to filter policies related to this topic?`,
        `I understand you're asking about "${userMessage}". Here are the next steps: 1) Review applicable policies, 2) Check compliance requirements, 3) Consult with legal advisors if needed.`,
        `Regarding "${userMessage}", I found several relevant policies in our system. The key considerations are regulatory compliance, documentation requirements, and timeline constraints.`,
        `For "${userMessage}", I suggest starting with policies in the related category. Make sure to check recent updates and amendments that might affect your case.`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsChatLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-textprimary mb-4">
            Legislative Dashboard
          </h1>
          <p className="font-paragraph text-base text-textprimary/70">
            Explore policies, schemes, and regulations with advanced filtering and AI assistance.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textprimary/40" />
              <input
                type="text"
                placeholder="Search policies by title, description, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-textprimary/20 font-paragraph text-base text-textprimary placeholder:text-textprimary/40 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 border border-textprimary/20 font-paragraph text-base text-textprimary hover:border-primary hover:text-primary transition-colors flex items-center gap-2 justify-center"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border border-textprimary/20 p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="font-paragraph text-sm text-textprimary font-semibold mb-2 block">
                        Category
                      </label>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full px-4 py-3 border border-textprimary/20 font-paragraph text-base text-textprimary focus:outline-none focus:border-primary"
                      >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Case Type Filter */}
                    <div>
                      <label className="font-paragraph text-sm text-textprimary font-semibold mb-2 block">
                        Case Type
                      </label>
                      <select
                        value={caseTypeFilter}
                        onChange={(e) => setCaseTypeFilter(e.target.value)}
                        className="w-full px-4 py-3 border border-textprimary/20 font-paragraph text-base text-textprimary focus:outline-none focus:border-primary"
                      >
                        <option value="">All Case Types</option>
                        {caseTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(categoryFilter || caseTypeFilter) && (
                    <button
                      onClick={() => {
                        setCategoryFilter('');
                        setCaseTypeFilter('');
                      }}
                      className="font-paragraph text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-paragraph text-sm text-textprimary/60">
            {isLoading ? 'Loading...' : `${filteredPolicies.length} ${filteredPolicies.length === 1 ? 'policy' : 'policies'} found`}
          </p>
        </div>

        {/* Policy List */}
        <div className="min-h-[600px]">
          {isLoading ? null : filteredPolicies.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredPolicies.map((policy, index) => (
                <motion.div
                  key={policy._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handlePolicyClick(policy)}
                  className="border border-textprimary/20 p-6 hover:border-primary transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-paragraph text-lg text-textprimary font-semibold group-hover:text-primary transition-colors">
                      {policy.policyTitle || 'Untitled Policy'}
                    </h3>
                  </div>
                  
                  <p className="font-paragraph text-sm text-textprimary/70 mb-4 line-clamp-3">
                    {policy.policyDescription || 'No description available'}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {policy.category && (
                      <span className="font-paragraph text-xs px-3 py-1 bg-textprimary/5 text-textprimary border border-textprimary/10">
                        {policy.category}
                      </span>
                    )}
                    {policy.caseType && (
                      <span className="font-paragraph text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                        {policy.caseType}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-base text-textprimary/60">
                No policies found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Policy Detail Modal */}
      <AnimatePresence>
        {selectedPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-darkbackground/80 z-50 flex items-center justify-center p-4"
            onClick={handleCloseDetail}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative"
            >
              <button
                onClick={handleCloseDetail}
                className="absolute top-6 right-6 text-textprimary hover:text-primary transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-heading text-3xl md:text-4xl text-textprimary mb-6 pr-8">
                {selectedPolicy.policyTitle || 'Untitled Policy'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-paragraph text-sm text-textprimary/60 font-semibold mb-2">Description</h3>
                  <p className="font-paragraph text-base text-textprimary/80">
                    {selectedPolicy.policyDescription || 'No description available'}
                  </p>
                </div>

                {selectedPolicy.category && (
                  <div>
                    <h3 className="font-paragraph text-sm text-textprimary/60 font-semibold mb-2">Category</h3>
                    <p className="font-paragraph text-base text-textprimary">
                      {selectedPolicy.category}
                    </p>
                  </div>
                )}

                {selectedPolicy.caseType && (
                  <div>
                    <h3 className="font-paragraph text-sm text-textprimary/60 font-semibold mb-2">Case Type</h3>
                    <p className="font-paragraph text-base text-textprimary">
                      {selectedPolicy.caseType}
                    </p>
                  </div>
                )}

                {selectedPolicy.keywords && (
                  <div>
                    <h3 className="font-paragraph text-sm text-textprimary/60 font-semibold mb-2">Keywords</h3>
                    <p className="font-paragraph text-base text-textprimary">
                      {selectedPolicy.keywords}
                    </p>
                  </div>
                )}

                {selectedPolicy._createdDate && (
                  <div>
                    <h3 className="font-paragraph text-sm text-textprimary/60 font-semibold mb-2">Created Date</h3>
                    <p className="font-paragraph text-base text-textprimary">
                      {new Date(selectedPolicy._createdDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chatbot */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 w-full max-w-md bg-background border-2 border-textprimary/20 shadow-2xl z-50"
          >
            {/* Chat Header */}
            <div className="bg-darkbackground px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="font-paragraph text-base text-secondary-foreground font-semibold">
                  AI Assistant
                </h3>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-secondary-foreground hover:text-primary transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-textprimary/5 text-textprimary border border-textprimary/10'
                    }`}
                  >
                    <p className="font-paragraph text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-textprimary/5 text-textprimary border border-textprimary/10 px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="border-t border-textprimary/20 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about policies or next steps..."
                  className="flex-1 px-4 py-3 border border-textprimary/20 font-paragraph text-sm text-textprimary placeholder:text-textprimary/40 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-colors z-40"
        aria-label="Toggle chat"
      >
        {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      <Footer />
    </div>
  );
}
