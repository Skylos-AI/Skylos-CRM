"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChatWidget } from "@/components/ai-assistant/chat-widget"
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  MessageSquare, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Headphones
} from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: "Intuitive Dashboard",
      description: "Get a complete overview of your business with real-time analytics and insights."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Lead Management",
      description: "Track and manage your sales pipeline with our powerful kanban board interface."
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Company & Contact Management",
      description: "Organize your business relationships with comprehensive contact management."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Multi-Channel Communication",
      description: "Connect with customers across email, WhatsApp, SMS, and social media platforms."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Make data-driven decisions with detailed reports and performance metrics."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automation",
      description: "Streamline your workflow with automated follow-ups and task management."
    }
  ]

  const benefits = [
    "Increase sales conversion by up to 30%",
    "Save 5+ hours per week on manual tasks",
    "Improve customer satisfaction scores",
    "Scale your business operations efficiently"
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sales Manager",
      company: "TechCorp Inc.",
      content: "This CRM has transformed how we manage our sales pipeline. The kanban board is incredibly intuitive.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      company: "Growth Solutions",
      content: "The multi-channel communication feature has helped us stay connected with customers across all platforms.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Digital Dynamics",
      content: "The analytics dashboard provides exactly the insights we need to make informed business decisions.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">CRM System</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 New: Multi-Channel Integration
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Grow Your Business with Smart{" "}
                  <span className="text-primary">CRM Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Streamline your sales process, manage customer relationships, and boost revenue with our comprehensive CRM platform designed for modern businesses.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In to Dashboard
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            <div className="lg:pl-8">
              <div className="relative">
                <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="mx-auto h-16 w-16 bg-background rounded-lg flex items-center justify-center">
                      <LayoutDashboard className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Dashboard Preview</p>
                      <p className="text-sm text-muted-foreground">Add your product screenshot here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive CRM platform provides all the tools you need to manage customers, track sales, and grow your business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Proven Results for Growing Businesses
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of businesses that have transformed their sales process and achieved remarkable growth with our CRM platform.
                </p>
              </div>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup">
                <Button size="lg">
                  Start Your Success Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:pl-8">
              <div className="aspect-square bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto h-16 w-16 bg-background rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Analytics Chart</p>
                    <p className="text-sm text-muted-foreground">Add your analytics visualization here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real customers have to say about their experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands of businesses that trust our CRM platform to manage their customer relationships and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold">CRM System</span>
              </div>
              <p className="text-muted-foreground">
                The complete CRM solution for modern businesses.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm">
                <Link href="#features" className="block text-muted-foreground hover:text-foreground">Features</Link>
                <Link href="#pricing" className="block text-muted-foreground hover:text-foreground">Pricing</Link>
                <Link href="/login" className="block text-muted-foreground hover:text-foreground">Sign In</Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-muted-foreground hover:text-foreground">About</Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground">Contact</Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground">Support</Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-muted-foreground hover:text-foreground">Privacy</Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground">Terms</Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground">Security</Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CRM System. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <ChatWidget />
    </div>
  )
}