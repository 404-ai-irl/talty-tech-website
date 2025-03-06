import { H1, H2, P } from "@/components/ui/typography"
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
          We&apos;re committed to delivering high-quality, scalable solutions that address the unique
          challenges and opportunities of our clients, helping them thrive in an increasingly 
          digital world.
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
              John Talty founded Talty Tech with a vision to bring enterprise-level technology 
              solutions to businesses of all sizes in Texas. With over 15 years of experience 
              in software development and a deep understanding of business needs, John has 
              built a company that combines technical expertise with a client-first approach.
            </P>
            <P>
              Prior to founding Talty Tech, John worked with several Fortune 500 companies, 
              leading digital transformation initiatives and developing innovative solutions 
              to complex business challenges.
            </P>
          </div>
        </div>
      </section>
    </div>
  );
}