import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaGithub, FaLinkedin, FaCopy, FaCheck, FaPhoneAlt } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/FormElements';
import { useToast } from '../components/ui/Toast';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(4, { message: 'Subject must be at least 4 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const Contact: React.FC = () => {
  const { profile } = portfolioData;
  const { showToast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.socials.email);
    setIsCopied(true);
    showToast('Email copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const [isPhoneCopied, setIsPhoneCopied] = useState(false);

  const handleCopyPhone = () => {
    if (profile.socials.phone) {
      navigator.clipboard.writeText(profile.socials.phone);
      setIsPhoneCopied(true);
      showToast('Phone number copied to clipboard!', 'success');
      setTimeout(() => setIsPhoneCopied(false), 2500);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        // Commercial send via EmailJS
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_name: profile.name,
          },
          publicKey
        );
      } else {
        // Safe simulation Mode for sandbox testing
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Contact form mock payload:', data);
      }

      showToast('Thank you! Your message has been sent successfully.', 'success');
      reset();
    } catch (err) {
      console.error(err);
      showToast('Something went wrong. Please try again later or email directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative">
      {/* Background radial highlight */}
      <div className="absolute top-[40%] left-[-10%] w-[35%] h-[35%] rounded-full bg-indigo-500/3 dark:bg-indigo-500/1.5 blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed"
        >
          Have an exciting project or vacancy? Drop a line, I'd love to chat.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        {/* Contact Info (Column 1) */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="glass" className="p-6 md:p-8 space-y-6">
              <h3 className="font-heading font-bold text-lg md:text-xl text-text-primary">
                Contact Information
              </h3>
              
              <div className="space-y-4 font-sans">
                {/* Email item */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-bg-tertiary border border-border-primary/50 group">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-lg bg-accent-muted text-accent">
                      <FaEnvelope className="w-4 h-4" />
                    </span>
                    <div className="text-left">
                      <span className="block text-[11px] font-semibold uppercase text-text-secondary tracking-wider">
                        Email Address
                      </span>
                      <a href={`mailto:${profile.socials.email}`} className="text-sm font-semibold text-text-primary hover:text-accent transition-colors">
                        {profile.socials.email}
                      </a>
                    </div>
                  </div>
                  
                  {/* Clipboard trigger */}
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors cursor-pointer border border-transparent hover:border-border-primary/50"
                    title="Copy to clipboard"
                  >
                    {isCopied ? <FaCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FaCopy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone item */}
                {profile.socials.phone && (
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-bg-tertiary border border-border-primary/50 group">
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 rounded-lg bg-accent-muted text-accent">
                        <FaPhoneAlt className="w-3.5 h-3.5" />
                      </span>
                      <div className="text-left">
                        <span className="block text-[11px] font-semibold uppercase text-text-secondary tracking-wider">
                          Mobile Number
                        </span>
                        <a href={`tel:${profile.socials.phone}`} className="text-sm font-semibold text-text-primary hover:text-accent transition-colors">
                          {profile.socials.phone}
                        </a>
                      </div>
                    </div>
                    
                    {/* Clipboard trigger */}
                    <button
                      onClick={handleCopyPhone}
                      className="p-2 rounded-lg hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors cursor-pointer border border-transparent hover:border-border-primary/50"
                      title="Copy to clipboard"
                    >
                      {isPhoneCopied ? <FaCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FaCopy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {/* GitHub link card */}
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-bg-tertiary border border-border-primary/50 hover:border-accent-border/40 hover:bg-accent-muted/10 transition-all group"
                >
                  <span className="p-2.5 rounded-lg bg-bg-secondary border border-border-primary text-text-secondary group-hover:text-accent group-hover:border-accent-border/40 transition-colors">
                    <FaGithub className="w-4.5 h-4.5" />
                  </span>
                  <div className="text-left">
                    <span className="block text-[11px] font-semibold uppercase text-text-secondary tracking-wider">
                      GitHub Profile
                    </span>
                    <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                      https://github.com/nandakishor-Dev
                    </span>
                  </div>
                </a>

                {/* LinkedIn link card */}
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-bg-tertiary border border-border-primary/50 hover:border-accent-border/40 hover:bg-accent-muted/10 transition-all group"
                >
                  <span className="p-2.5 rounded-lg bg-bg-secondary border border-border-primary text-text-secondary group-hover:text-accent group-hover:border-accent-border/40 transition-colors">
                    <FaLinkedin className="w-4.5 h-4.5" />
                  </span>
                  <div className="text-left">
                    <span className="block text-[11px] font-semibold uppercase text-text-secondary tracking-wider">
                      LinkedIn Profile
                    </span>
                    <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                      linkedin.com/in/nandakishor-pg
                    </span>
                  </div>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Contact Form (Column 2) */}
        <div className="lg:col-span-7 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="default" className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Name"
                    id="name"
                    placeholder="Enter your name"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>
                <Input
                  label="Subject"
                  id="subject"
                  placeholder="What is this regarding?"
                  error={errors.subject?.message}
                  {...register('subject')}
                />
                <Textarea
                  label="Message"
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  error={errors.message?.message}
                  {...register('message')}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full shadow-md shadow-accent/10 cursor-pointer"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
