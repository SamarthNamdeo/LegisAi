import React, { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { PoliciesandSchemes } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, BookOpen } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<PoliciesandSchemes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        const result = await BaseCrudService.getAll<PoliciesandSchemes>('policiesandschemes');
        setPolicies(result.items || []);
      } catch (error) {
        console.error('Error fetching policies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // Get unique categories and case types
  const categories = Array.from(new Set(policies.map(p => p.category).filter(Boolean)));
  const caseTypes = Array.from(new Set(policies.map(p => p.caseType).filter(Boolean)));

  // Filter policies based on search and filters
  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = 
      !searchTerm || 
      policy.policyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.keywords?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || policy.category === selectedCategory;
    const matchesCaseType = !selectedCaseType || policy.caseType === selectedCaseType;

    return matchesSearch && matchesCategory && matchesCaseType;
  });

  return (
    <div className="min-h-screen bg-background text-textprimary font-paragraph">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-background to-white/50 border-b border-black py-16 px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tighter">
                Indian Constitutional<br />Acts & Schemes
              </h1>
            </div>
            <p className="text-lg max-w-2xl text-textprimary/70 leading-relaxed">
              Comprehensive database of Indian Constitutional acts, schemes, policies, and dharas covering various case types and legal problems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="w-full bg-background border-b border-black/10 py-8 px-8 sticky top-0 z-40">
        <div className="max-w-[120rem] mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textprimary/50" />
            <input
              type="text"
              placeholder="Search policies, acts, schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-black/20 bg-white text-textprimary placeholder-textprimary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-black/20 bg-white text-textprimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-10 w-4 h-4 text-textprimary/50 pointer-events-none" />
            </div>

            <div className="relative">
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Case Type</label>
              <select
                value={selectedCaseType}
                onChange={(e) => setSelectedCaseType(e.target.value)}
                className="w-full px-4 py-3 border border-black/20 bg-white text-textprimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="">All Case Types</option>
                {caseTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-10 w-4 h-4 text-textprimary/50 pointer-events-none" />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-textprimary/60">
            Showing {filteredPolicies.length} of {policies.length} policies
          </div>
        </div>
      </section>

      {/* Policies List */}
      <section className="w-full bg-background py-12 px-8">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-32">
              <LoadingSpinner />
            </div>
          ) : filteredPolicies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-lg text-textprimary/60">No policies found matching your criteria.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredPolicies.map((policy, index) => (
                <motion.div
                  key={policy._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-black/10 hover:border-primary transition-colors duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === policy._id ? null : policy._id)}
                    className="w-full text-left p-6 hover:bg-black/2 transition-colors duration-300 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-xl font-bold uppercase tracking-tight">
                          {policy.policyTitle}
                        </h3>
                        {policy.category && (
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                            {policy.category}
                          </span>
                        )}
                        {policy.caseType && (
                          <span className="inline-block px-3 py-1 bg-textprimary/10 text-textprimary text-xs font-bold uppercase tracking-wide">
                            {policy.caseType}
                          </span>
                        )}
                      </div>
                      {!expandedId && (
                        <p className="text-sm text-textprimary/70 line-clamp-2">
                          {policy.policyDescription}
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                        expandedId === policy._id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Content */}
                  {expandedId === policy._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-black/10 bg-black/2 p-6 space-y-4"
                    >
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Description</h4>
                        <p className="text-sm leading-relaxed text-textprimary/80">
                          {policy.policyDescription}
                        </p>
                      </div>

                      {policy.keywords && (
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {policy.keywords.split(',').map((keyword, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-sm"
                              >
                                {keyword.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10">
                        {policy.category && (
                          <div>
                            <p className="text-xs text-textprimary/60 uppercase tracking-wide font-bold">Category</p>
                            <p className="text-sm font-semibold">{policy.category}</p>
                          </div>
                        )}
                        {policy.caseType && (
                          <div>
                            <p className="text-xs text-textprimary/60 uppercase tracking-wide font-bold">Case Type</p>
                            <p className="text-sm font-semibold">{policy.caseType}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
