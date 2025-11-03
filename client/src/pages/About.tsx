import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Target, Heart, Shield, Award } from 'lucide-react';
import aboutHeroImage from '@assets/generated_images/Modern_apartment_building_exterior_1bb1aacb.png';
import teamImage from '@assets/generated_images/Professional_team_photo_dc9d5aa5.png';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We are committed to delivering the highest standards of quality in every aspect of our service, from property design to customer care.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We build lasting relationships based on trust, transparency, and ethical business practices with our residents and partners.',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Your safety and peace of mind are paramount. We provide 24/7 security and maintenance to ensure a worry-free living experience.',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We continuously evolve to incorporate the latest in smart home technology and sustainable living practices in our properties.',
    },
  ];

  const milestones = [
    { year: '2009', event: 'Founded in Cairo with our first luxury property' },
    { year: '2012', event: 'Expanded to 10 properties across premium locations' },
    { year: '2016', event: 'Received Best Serviced Apartments Award' },
    { year: '2020', event: 'Reached 2,000 happy residents milestone' },
    { year: '2024', event: 'Launched sustainable living initiative' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHeroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Redefining Luxury Living Since 2009
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A legacy of excellence in serviced apartments and personalized hospitality
            </motion.p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Story
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Sokón Residence was born from a simple yet powerful vision: to create living spaces 
              that transcend the ordinary and elevate the everyday. Founded in 2009, we recognized 
              a growing need for serviced apartments that combined the luxury of high-end hotels 
              with the comfort and flexibility of a true home.
            </p>
            <p>
              Our founder, inspired by world-class residences across Europe and Asia, sought to 
              bring this level of sophistication to Cairo's burgeoning luxury real estate market. 
              What started as a single property in New Cairo has grown into a prestigious collection 
              of over 50 residences across the city's most coveted locations.
            </p>
            <p>
              Today, Sokón Residence stands as a testament to unwavering commitment to quality, 
              innovation, and personalized service. We've hosted over 2,500 discerning residents, 
              from executives and diplomats to families seeking a refined lifestyle in Egypt's 
              vibrant capital.
            </p>
            <p>
              Every property in our portfolio is meticulously selected and designed to reflect our 
              core philosophy: luxury should be effortless, comfort should be uncompromising, and 
              service should be intuitive. This approach has earned us numerous accolades and, more 
              importantly, the trust and loyalty of our residents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">Key milestones that shaped our story</p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="flex gap-8 items-start"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-24">
                  <div className="font-mono text-2xl font-bold text-primary-foreground">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow pt-1">
                  <div className="h-full border-l-2 border-primary/30 pl-8 pb-8">
                    <p className="text-lg text-foreground">{milestone.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="p-8 rounded-lg bg-card border border-card-border hover-elevate transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`value-${value.title.toLowerCase()}`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Behind every exceptional property is a team of dedicated professionals who are 
                passionate about delivering an unparalleled living experience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From our property managers and concierge staff to our maintenance team and 
                customer service representatives, every member of the Sokón Residence family 
                is committed to making your stay extraordinary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg overflow-hidden"
            >
              <img
                src={teamImage}
                alt="Our professional team"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
