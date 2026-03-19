import React, { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Bell, ExternalLink, Calendar, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface SchemeAlert {
  _id: string;
  alertTitle?: string;
  alertMessage?: string;
  notificationDate?: Date;
  relevantLink?: string;
  schemeName?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<SchemeAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'recent' | 'important'>('all');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const result = await BaseCrudService.getAll<SchemeAlert>('schemealerts', [], { limit: 50 });
        // Sort by notification date (newest first)
        const sorted = (result.items || []).sort((a, b) => {
          const dateA = new Date(a.notificationDate || a._createdDate || 0).getTime();
          const dateB = new Date(b.notificationDate || b._createdDate || 0).getTime();
          return dateB - dateA;
        });
        setAlerts(sorted);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  // Filter alerts based on selected filter
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'recent') {
      const alertDate = new Date(alert.notificationDate || alert._createdDate || 0);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return alertDate > sevenDaysAgo;
    }
    if (filter === 'important') {
      // Mark as important if it contains certain keywords
      const text = `${alert.alertTitle} ${alert.alertMessage}`.toLowerCase();
      return text.includes('urgent') || text.includes('mandatory') || text.includes('critical') || text.includes('new');
    }
    return true;
  });

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              <Bell className="w-8 h-8 text-primary" />
              <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tighter">
                Latest Scheme<br />Updates & Alerts
              </h1>
            </div>
            <p className="text-lg max-w-2xl text-textprimary/70 leading-relaxed">
              Stay informed about the latest changes, new schemes, and important updates in Indian Constitutional acts and policies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full bg-background border-b border-black/10 py-8 px-8 sticky top-0 z-40">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-primary text-white border border-primary'
                  : 'bg-white text-textprimary border border-black/20 hover:border-primary'
              }`}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`px-6 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                filter === 'recent'
                  ? 'bg-primary text-white border border-primary'
                  : 'bg-white text-textprimary border border-black/20 hover:border-primary'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setFilter('important')}
              className={`px-6 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                filter === 'important'
                  ? 'bg-primary text-white border border-primary'
                  : 'bg-white text-textprimary border border-black/20 hover:border-primary'
              }`}
            >
              Important
            </button>
          </div>
        </div>
      </section>

      {/* Alerts List */}
      <section className="w-full bg-background py-12 px-8">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-32">
              <LoadingSpinner />
            </div>
          ) : filteredAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <AlertCircle className="w-12 h-12 text-textprimary/30 mx-auto mb-4" />
              <p className="text-lg text-textprimary/60">No alerts found for the selected filter.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert, index) => (
                <motion.div
                  key={alert._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-black/10 hover:border-primary transition-all duration-300 overflow-hidden hover:shadow-lg"
                >
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-2">
                          {alert.alertTitle}
                        </h3>
                        {alert.schemeName && (
                          <p className="text-sm text-primary font-semibold mb-2">
                            Related to: {alert.schemeName}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <Bell className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Message */}
                    {alert.alertMessage && (
                      <p className="text-sm leading-relaxed text-textprimary/80">
                        {alert.alertMessage}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/10">
                      <div className="flex items-center gap-2 text-xs text-textprimary/60">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(alert.notificationDate || alert._createdDate)}</span>
                      </div>

                      {alert.relevantLink && (
                        <a
                          href={alert.relevantLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-xs uppercase tracking-wide transition-colors duration-300"
                        >
                          Learn More
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="w-full bg-darkbackground text-white border-t border-white/20 py-16 px-8">
        <div className="max-w-[120rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
              Never Miss an Update
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-white/70">
              Enable notifications to receive instant alerts about new schemes, policy changes, and important legislative updates.
            </p>
            <button className="px-12 py-4 bg-primary hover:bg-primary/90 text-white font-bold text-sm uppercase tracking-widest transition-colors duration-300">
              Enable Notifications
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
