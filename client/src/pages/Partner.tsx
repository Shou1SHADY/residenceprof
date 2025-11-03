import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertPartnershipSchema, type InsertPartnership } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Handshake, TrendingUp, Users, Award } from 'lucide-react';

export default function Partner() {
  const { toast } = useToast();

  const form = useForm<InsertPartnership>({
    resolver: zodResolver(insertPartnershipSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InsertPartnership) => apiRequest('POST', '/api/partnerships', data),
    onSuccess: () => {
      toast({
        title: 'Application submitted successfully!',
        description: 'Our partnership team will review your application and contact you soon.',
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: InsertPartnership) => {
    mutation.mutate(data);
  };

  const benefits = [
    {
      icon: Handshake,
      title: 'Strategic Alliance',
      description: 'Join a network of premium partners and collaborate on exclusive opportunities in the luxury real estate market.',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Unlock new revenue streams through our referral program and co-marketing initiatives with competitive returns.',
    },
    {
      icon: Users,
      title: 'Client Network',
      description: 'Access our extensive database of high-net-worth individuals and corporate clients seeking luxury accommodations.',
    },
    {
      icon: Award,
      title: 'Brand Recognition',
      description: 'Benefit from association with an award-winning luxury brand and enhance your market positioning.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Partner with Excellence
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join our network of distinguished partners and unlock exclusive opportunities 
              in Cairo's luxury serviced apartment market
            </motion.p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
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
              Partnership Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the advantages of partnering with SkyLine Residence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="p-8 rounded-lg bg-card border border-card-border hover-elevate transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <benefit.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Apply for Partnership
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our partnership team will be in touch
            </p>
          </motion.div>

          <motion.div
            className="bg-card border border-card-border rounded-lg p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Company Ltd."
                            {...field}
                            className="h-12"
                            data-testid="input-company-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Contact Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="h-12"
                            data-testid="input-contact-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@company.com"
                            {...field}
                            className="h-12"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+20 123 456 7890"
                            {...field}
                            className="h-12"
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Partnership Interest</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your company and your interest in partnering with SkyLine Residence..."
                          className="min-h-40 resize-none"
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-12"
                  disabled={mutation.isPending}
                  data-testid="button-submit-partnership"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
