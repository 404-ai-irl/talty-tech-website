import { H1, H2, P } from "@/components/ui/typography"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Talty Tech",
  description: "Learn more about Talty Tech, a Texas-based web development and AI company.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <H1 className="text-3xl font-bold mb-8">About Talty Tech</H1>
      
      <section id="mission" className="mb-12">
        <H2 className="text-2xl font-semibold mb-4">Our Mission</H2>
        <P className="mb-4">
          At Talty Tech, our mission is to empower Texas businesses with innovative web development 
          and AI solutions. We believe in combining cutting-edge technology with thoughtful design 
          to create digital experiences that drive business growth and enhance user engagement.
        </P>
        <P>
        At Talty Tech, our mission is to lead digital transformation by developing innovative solutions to complex business challenges, making AI, business automation, and modern web development accessible, actionable, and impactful.
        </P>
      </section>
      
      <section id="founder" className="mb-12">
        <H2 className="text-2xl font-semibold mb-4">Our Founder</H2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {/* Placeholder for founder image */}
            <div className="bg-slate-200 w-full aspect-square rounded-md flex items-center justify-center">
              <span className="text-slate-500">Founder Image</span>
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-medium mb-2">John Talty</h3>
            <P className="mb-4">
            Andrew is a passionate tech enthusiast who started coding in 2016. He learned programming through self-study and formal education, including Full-Stack Web Development at SMU and Computer Science at the University of North Texas.
            </P>
            <P>One of Andrew&apos;s key projects was creating a wholesale real estate business platform from the ground up, featuring automated lead generation. He uses his skills to combine technology with real-world business needs. He has worked on many web projects, from online stores to interactive web apps.</P>
            <P>
            Now, Andrew is launching Talty Tech, a business dedicated to bringing modern web development and AI solutions to local Texas businesses.
              
            </P>
          </div>
        </div>
      </section>
    </div>
  );
}