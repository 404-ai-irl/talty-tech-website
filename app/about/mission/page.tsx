import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Compass, Heart, ShieldCheck, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H1, H2, H3, P, Lead } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Mission & Values | Talty Tech",
  description: "Learn about Talty Tech's mission, vision, and core values that drive our business and service to our clients.",
};

export default function MissionPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Button variant="ghost" className="px-0" asChild>
          <Link href="/about">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to About
          </Link>
        </Button>
      </div>
      
      <div className="space-y-12">
        {/* Mission Section */}
        <section>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="p-6 bg-primary/10 rounded-full">
                <Target className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="md:w-3/4">
              <H1 className="!border-none">Our Mission</H1>
              <Lead className="text-muted-foreground">
                To lead digital transformation by developing innovative solutions to complex business challenges, making AI, business automation, 
                and modern web development accessible, actionable, and impactful.
              </Lead>
            </div>
          </div>
          <P>
            At Talty Tech, we&apos;re committed to helping businesses harness the power of technology to achieve their goals. 
            Our mission goes beyond simply building websites or implementing software—we aim to be a strategic partner 
            that understands your business challenges and creates tailored solutions that drive real results.
          </P>
          <P>
            We believe that advanced technology should be accessible to businesses of all sizes. By leveraging our expertise 
            in web development, AI integration, and workflow optimization, we help Texas businesses compete effectively in 
            a rapidly evolving digital landscape.
          </P>
        </section>
        
        <Separator />
        
        {/* Vision Section */}
        <section>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="p-6 bg-primary/10 rounded-full">
                <Compass className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="md:w-3/4">
              <H2 className="!border-none">Our Vision</H2>
              <Lead className="text-muted-foreground">
                To be the most trusted technology partner for Texas businesses, known for delivering innovative solutions 
                that create lasting value and drive sustainable growth.
              </Lead>
            </div>
          </div>
          <P>
            We envision a future where every business, regardless of size or industry, can leverage the power of 
            modern technology to operate more efficiently, serve customers better, and achieve their fullest potential. 
            By providing accessible, high-quality tech solutions, we aim to play a key role in that transformation.
          </P>
          <P>
            Our vision extends beyond creating websites or implementing software—we aim to build lasting partnerships 
            with our clients, serving as their trusted technology advisor for years to come. We measure our success not 
            just by the quality of our work, but by the impact it has on our clients&apos; businesses.
          </P>
        </section>
        
        <Separator />
        
        {/* Values Section */}
        <section>
          <div className="text-center mb-10">
            <H2 className="!border-none">Our Core Values</H2>
            <Lead className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every interaction we have with our clients.
            </Lead>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <H3 className="mb-2">Integrity & Transparency</H3>
                    <P className="text-muted-foreground">
                      We operate with complete honesty and transparency in all our dealings. 
                      We provide clear communication about processes, timelines, and costs, and we always do what&apos;s 
                      right for our clients, even when it&apos;s difficult.
                    </P>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <H3 className="mb-2">Excellence in Execution</H3>
                    <P className="text-muted-foreground">
                      We take pride in delivering high-quality work that exceeds expectations. 
                      We pay attention to details, follow industry best practices, and continuously 
                      improve our skills and processes.
                    </P>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <H3 className="mb-2">Client Partnership</H3>
                    <P className="text-muted-foreground">
                      We view our client relationships as true partnerships. We invest time in understanding 
                      your business, actively listen to your needs, and work collaboratively to achieve your goals.
                    </P>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Heart className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <H3 className="mb-2">Passion for Innovation</H3>
                    <P className="text-muted-foreground">
                      We&apos;re passionate about technology and its potential to transform businesses. 
                      We stay at the forefront of industry developments and bring creative, innovative 
                      solutions to our clients&apos; challenges.
                    </P>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA Section */}
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <H3 className="mb-4">Ready to work with a team that shares your values?</H3>
          <P className="mb-6 max-w-2xl mx-auto">
            Contact us today to discuss how Talty Tech can help your business leverage technology
            to achieve its goals and drive sustainable growth.
          </P>
          <Button size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
