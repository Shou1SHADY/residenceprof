import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Luxury Boulevard', 'New Cairo, Egypt', '11835'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+20 123 456 7890', '+20 123 456 7891', 'Mon-Sat: 9AM-6PM'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@sokonresidence.com', 'support@sokonresidence.com', 'partnerships@sokonresidence.com'],
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're here to help you find your perfect luxury residence
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="p-6 rounded-lg bg-card border border-card-border hover-elevate transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`contact-info-${info.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <info.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and our team will get back to you within 24 hours
              </p>
              <ContactForm />
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-24">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Find Us
                </h3>
                <div className="rounded-lg overflow-hidden border border-card-border mb-6 h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37709939894!2d31.49519187910156!3d30.06263799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d14c5fb0cb1%3A0x35a8a98d787d4ce0!2sNew%20Cairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1699999999999!5m2!1sen!2seg"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sokón Residence Location"
                  />
                </div>

                <div className="bg-card border border-card-border rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-4">Why Choose Us?</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-foreground mt-0.5">✓</span>
                      <span>15+ years of excellence in luxury serviced apartments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-foreground mt-0.5">✓</span>
                      <span>24/7 concierge and customer support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-foreground mt-0.5">✓</span>
                      <span>Premium locations across Cairo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-foreground mt-0.5">✓</span>
                      <span>Flexible rental and purchase options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
