import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Code, FileCode, Globe, MessageCircle, Trophy, Users, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H1, H2, H3, P, Lead } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import andrew from "@/public/tt-owner-picure.jpeg";

export const metadata: Metadata = {
  title: "About Talty Tech",
  description: "Learn more about Talty Tech, a Texas-based company specializing in web development, AI integration, and workflow optimization solutions.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16 -mt-6 -mx-6 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge variant="outline" className="mb-4">Our Story</Badge>
          <H1 className="!border-none mb-4">Bringing Modern Technology to Texas Businesses</H1>
          <Lead className="max-w-3xl mx-auto mb-8">
            Talty Tech is a technology company dedicated to helping businesses grow through innovative web development, AI integration, and workflow optimization solutions.
          </Lead>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <H2 className="mb-4">Who We Are</H2>
            <P className="mb-4">
              Founded in Talty, Texas, we&apos;re a technology company with a vision to make cutting-edge digital solutions accessible to businesses of all sizes. We specialize in creating custom web applications, implementing AI-powered tools, and optimizing business workflows.
            </P>
            <P className="mb-6">
              Our approach combines technical expertise with a deep understanding of business challenges, allowing us to deliver solutions that not only solve immediate problems but also position our clients for long-term success in an increasingly digital world.
            </P>
            <div className="flex gap-4">
              <Link href="/about/mission" className="text-primary font-medium hover:underline flex items-center">
                Our Mission & Values <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-muted/40">
              <CardContent className="pt-6 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <H3 className="text-lg mb-1">Texas-Based</H3>
                <P className="text-sm text-muted-foreground">Proudly serving businesses across Texas</P>
              </CardContent>
            </Card>
            <Card className="bg-muted/40">
              <CardContent className="pt-6 text-center">
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <H3 className="text-lg mb-1">AI Experts</H3>
                <P className="text-sm text-muted-foreground">Leveraging AI for business growth</P>
              </CardContent>
            </Card>
            <Card className="bg-muted/40">
              <CardContent className="pt-6 text-center">
                <FileCode className="h-8 w-8 text-primary mx-auto mb-2" />
                <H3 className="text-lg mb-1">Full-Stack</H3>
                <P className="text-sm text-muted-foreground">Comprehensive development services</P>
              </CardContent>
            </Card>
            <Card className="bg-muted/40">
              <CardContent className="pt-6 text-center">
                <Workflow className="h-8 w-8 text-primary mx-auto mb-2" />
                <H3 className="text-lg mb-1">Process-Driven</H3>
                <P className="text-sm text-muted-foreground">Optimizing business operations</P>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Mission Section - Brief Version */}
      <section className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <H2 className="mb-4">Our Mission</H2>
          <Lead className="max-w-3xl mx-auto">
            To lead digital transformation by developing innovative solutions to complex business challenges, making AI, business automation, and modern web development accessible, actionable, and impactful.
          </Lead>
          <Button variant="outline" className="mt-6" asChild>
            <Link href="/about/mission">
              Learn More About Our Mission <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <H3 className="mb-2">Excellence</H3>
            <P className="text-muted-foreground">
              Delivering high-quality work that exceeds expectations through attention to detail and adherence to best practices.
            </P>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <H3 className="mb-2">Partnership</H3>
            <P className="text-muted-foreground">
              Building lasting relationships with our clients through collaborative work and deep understanding of their needs.
            </P>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <H3 className="mb-2">Innovation</H3>
            <P className="text-muted-foreground">
              Staying at the forefront of technology trends to bring creative, forward-thinking solutions to our clients.
            </P>
          </div>
        </div>
      </section>

      <Separator />

      {/* Founder Section */}
      <section className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden shadow-md">
              <Image 
                src={andrew} 
                alt="Andrew Thompson, Founder of Talty Tech" 
                className="w-full h-auto" 
                priority
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <H2 className="mb-4">Meet Our Founder</H2>
            <H3 className="mb-2">Andrew Thompson</H3>
            <P className="mb-4">
              Andrew is a passionate technologist who began his coding journey in 2016 and quickly developed expertise in web development, AI integration, and business process optimization.
            </P>
            <P className="mb-4">
              With a background in Full-Stack Web Development from SMU and Computer Science studies at the University of North Texas, Andrew combines formal education with practical experience to deliver technology solutions that solve real business problems.
            </P>
            <P className="mb-6">
              His experience includes creating a wholesale real estate platform with automated lead generation, demonstrating his ability to blend technology with practical business applications.
            </P>
            <Button variant="outline" asChild>
              <Link href="/about/story">
                Read Our Full Story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-12 rounded-lg">
        <div className="container mx-auto max-w-4xl text-center">
          <H2 className="!border-none mb-4">Ready to Transform Your Business?</H2>
          <P className="mb-6 max-w-2xl mx-auto">
            Connect with us today to discuss how our web development, AI integration, and workflow optimization solutions can help your business thrive in the digital age.
          </P>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                <MessageCircle className="mr-2 h-5 w-5" /> Schedule a Consultation
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/services">
                Explore Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
