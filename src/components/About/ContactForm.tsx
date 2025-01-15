import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would typically make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
          <p className="text-text-secondary">
            Have questions or suggestions? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              placeholder="What's this about?"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
              placeholder="Your message here..."
            />
          </div>

          <motion.div
            initial={false}
            animate={submitStatus === 'success' ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-green-50 text-green-800 rounded-lg p-4 mb-4">
              Thank you for your message! We'll get back to you soon.
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={submitStatus === 'error' ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-red-50 text-red-800 rounded-lg p-4 mb-4">
              Oops! Something went wrong. Please try again later.
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 transition-colors"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm; 