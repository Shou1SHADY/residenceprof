import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Ruler, ArrowLeft, MapPin, Phone, Mail, Calendar, Home, Building, Layers, X, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertContactSchema, type InsertContact } from '@shared/schema';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface PropertyDetails {
  id: string;
  name: string;
  location: string;
  description: string;
  rentalPrice: string | null;
  salePrice: string | null;
  size: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  featured: string;
  createdAt: string;
}

interface ContactFormData extends Omit<InsertContact, 'propertyInterest'> {
  propertyInterest: string;
  preferredDate?: Date;
  preferredTime?: string;
  message: string;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function PropertyDetails() {
  const params = useParams();
  const [_, navigate] = useLocation();
  const propertyId = params.id;
  const { toast } = useToast();
  
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      propertyInterest: propertyId,
      preferredDate: undefined,
      preferredTime: ''
    },
  });

  const isScheduling = contactForm.watch('preferredDate');

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      const { preferredDate, preferredTime, ...contactData } = data;
      const submissionData: any = { ...contactData };
      
      if (preferredDate && preferredTime) {
        const [hours, minutes] = preferredTime.split(':').map(Number);
        const date = new Date(preferredDate);
        date.setHours(hours, minutes);
        submissionData.preferredViewing = date.toISOString();
      }
      
      return apiRequest('POST', '/api/contacts', submissionData);
    },
    onSuccess: () => {
      toast({
        title: 'Message sent successfully!',
        description: 'We will get back to you as soon as possible.',
      });
      contactForm.reset();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const { data: property, isLoading, error } = useQuery<PropertyDetails>({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${propertyId}`);
      if (!response.ok) {
        throw new Error('Property not found');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
              <Skeleton className="h-12 w-full mt-8" />
            </div>
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Property Not Found</h1>
          <p className="text-muted-foreground">The property you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()} 
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>

        <div className="max-w-6xl mx-auto bg-card rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <MapPin className="h-3 w-3 mr-1" />
                  {property.location}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {property.name}
                </h1>
                <p className="mt-4 text-muted-foreground">
                  {property.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Bed className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">{property.bedrooms} Beds</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Bath className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">{property.bathrooms} Baths</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Ruler className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm font-medium">{property.size} m²</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Property Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Type: Apartment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Floors: 1</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Year Built: 2023</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Pricing</h3>
                <div className="space-y-3">
                  {property.rentalPrice && (
                    <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Rental Price</p>
                        <p className="text-xs text-muted-foreground">Per month</p>
                      </div>
                      <span className="text-xl font-bold text-primary">
                        ${Number(property.rentalPrice).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {property.salePrice && (
                    <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Sale Price</p>
                        <p className="text-xs text-muted-foreground">One-time payment</p>
                      </div>
                      <span className="text-xl font-bold text-primary">
                        ${Number(property.salePrice).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary/90 h-12">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Agent
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Contact Agent</DialogTitle>
                    </DialogHeader>
                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-4">
                        <input type="hidden" {...contactForm.register('propertyInterest')} />
                        
                        <FormField
                          control={contactForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 000-0000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Preferred Viewing Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date()
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {contactForm.watch('preferredDate') && (
                          <FormField
                            control={contactForm.control}
                            name="preferredTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Time</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        <Button 
                          type="submit" 
                          className="w-full mt-4"
                          disabled={contactMutation.isPending}
                        >
                          {contactMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full h-12"
                      onClick={() => {
                        // Set default values for scheduling a viewing
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow by default
                        contactForm.reset({
                          ...contactForm.getValues(),
                          preferredDate: tomorrow,
                          message: `I would like to schedule a viewing for ${property.name}.`
                        });
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Viewing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Schedule a Viewing</DialogTitle>
                    </DialogHeader>
                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(onSubmit)} className="space-y-4">
                        <input type="hidden" {...contactForm.register('propertyInterest')} />
                        
                        <FormField
                          control={contactForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 000-0000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Preferred Viewing Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => field.onChange(date as Date)}
                                    disabled={(date: Date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {contactForm.watch('preferredDate') && (
                          <FormField
                            control={contactForm.control}
                            name="preferredTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Time</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={contactForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="I'm interested in this property and would like to schedule a viewing..."
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full mt-4"
                          disabled={contactMutation.isPending}
                        >
                          {contactMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Scheduling...
                            </>
                          ) : (
                            'Schedule Viewing'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 transition-colors">
                  {property.featured === "true" ? "Featured" : "Available"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
