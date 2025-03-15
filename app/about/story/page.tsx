import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Briefcase, GraduationCap, LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H1, H2, H3, P, Lead } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import andrew from "@/public/tt-owner-picure.jpeg";

export const metadata: Metadata = {
  title: "Our Story | Talty Tech",
  description: "Learn about the journey of Talty Tech, from its founding to its mission to serve Texas businesses with innovative tech solutions.",
};

export default function StoryPage() {
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
        {/* Story Intro Section */}
        <section>
          <H1 className="mb-6">The Talty Tech Story</H1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <Image 
                src={andrew} 
                alt="Andrew Thompson, Founder of Talty Tech" 
                className="rounded-md shadow-md" 
                priority
              />
            </div>
            <div className="md:w-2/3">
              <Lead className="text-muted-foreground mb-4">
                Talty Tech was founded with a simple yet powerful vision: to make modern technology accessible and impactful for Texas businesses.
              </Lead>
              <P>
                My name is Andrew Thompson, and I founded Talty Tech to bridge the gap between advanced technology solutions and the businesses that need them. After years of working in tech and seeing how the right digital solutions could transform operations, I decided to create a company dedicated to bringing those benefits to businesses across Texas.
              </P>
            </div>
          </div>
        </section>
        
        <Separator />
        
        {/* Journey Timeline */}
        <section>
          <H2 className="mb-8">My Journey</H2>
          
          <div className="space-y-12">
            {/* Timeline Item 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center md:items-end">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                  <LightbulbIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xl font-semibold">2016</div>
                <div className="text-muted-foreground">The Beginning</div>
              </div>
              <div className="md:w-3/4">
                <Card>
                  <CardContent className="pt-6">
                    <H3 className="mb-2">First Steps into Coding</H3>
                    <P>
                      My journey began in 2016 when I wrote my first line of code. What started as curiosity quickly became a passion as I discovered the power of programming to solve real-world problems and create innovative solutions.
                    </P>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center md:items-end">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xl font-semibold">2018-2020</div>
                <div className="text-muted-foreground">Education</div>
              </div>
              <div className="md:w-3/4">
                <Card>
                  <CardContent className="pt-6">
                    <H3 className="mb-2">Formal Education</H3>
                    <P>
                      I pursued formal education in technology, completing a Full-Stack Web Development program at SMU and studying Computer Science at the University of North Texas. These experiences provided me with a strong foundation in software development principles and practices.
                    </P>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Timeline Item 3 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center md:items-end">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xl font-semibold">2020-2023</div>
                <div className="text-muted-foreground">Professional Growth</div>
              </div>
              <div className="md:w-3/4">
                <Card>
                  <CardContent className="pt-6">
                    <H3 className="mb-2">Building Experience</H3>
                    <P>
                      Over these years, I worked on numerous projects, from e-commerce websites to complex business applications. One of my key achievements was creating a wholesale real estate business platform featuring automated lead generation, which taught me how to combine technology with real-world business needs.
                    </P>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Timeline Item 4 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center md:items-end">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xl font-semibold">2024</div>
                <div className="text-muted-foreground">Talty Tech Founded</div>
              </div>
              <div className="md:w-3/4">
                <Card>
                  <CardContent className="pt-6">
                    <H3 className="mb-2">Launching Talty Tech</H3>
                    <P>
                      Drawing on my experience and passion for technology, I founded Talty Tech with the mission of helping Texas businesses leverage modern web development and AI solutions. I chose to base the company in Talty, Texas, a growing community that represents the blend of traditional values and forward-thinking that our company embodies.
                    </P>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <Separator />
        
        {/* Philosophy Section */}
        <section>
          <H2 className="mb-6">Our Philosophy</H2>
          <P className="mb-4">
            At Talty Tech, we believe that technology should serve a purpose beyond itself. Every website we build, every workflow we optimize, and every AI solution we implement is designed with a clear goal in mind: to help your business operate more efficiently, serve customers better, and achieve sustainable growth.
          </P>
          <P className="mb-4">
            We also believe in the power of personal relationships.
            As a Texas-based business, we value the opportunity to work directly with our clients,
              understand their unique challenges, and create solutions that truly meet their needs.
            We&apos;re not just building websites or implementing software—we&apos;re helping real people solve real business problems.
          </P>
          <P>
            Most importantly, we believe in doing things right.
            That means taking the time to understand your business, being transparent about what we can deliver, and standing behind our work.
            It means using best practices in our development process, staying current with industry trends, and continuously improving our skills and knowledge.
          </P>
        </section>
        
        {/* CTA Section */}
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <H3 className="mb-4">Ready to write the next chapter together?</H3>
          <P className="mb-6 max-w-2xl mx-auto">
            We&apos;re excited about the opportunity to help your business leverage technology to achieve its goals. 
            Contact us today to start a conversation about how we can work together.
          </P>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                Explore Our Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
