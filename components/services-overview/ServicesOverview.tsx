"use client"

import React from "react"
import Link from "next/link"
import { Code, Cog, Brain, Layers, PieChart, LineChart, Workflow, Laptop, Bot } from "lucide-react"
import { H2, H3, P, Lead } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Define Icon type using LucideIcon or React.ComponentType
type IconType = React.ComponentType<{ className?: string }>

// Core Service Card Component
interface ServiceCardProps {
  title: string
  description: string
  icon: IconType
  href: string
  delay?: number
  className?: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, href, className }) => {
  return (
    <div>
      <Card className={cn("h-full transition-all hover:shadow-md group", className)}>
        <CardHeader>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="pt-2">
          <Button asChild variant="ghost" className="p-0 h-auto text-primary font-medium group-hover:underline">
            <Link href={href}>Learn more</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Core Service Section
const coreServices = [
  {
    title: "Web Development",
    description: "Custom websites and applications using modern technologies like React, Next.js and Tailwind.",
    icon: Laptop,
    href: "/services/web-development",
  },
  {
    title: "Workflow Optimization",
    description: "Analyze and enhance business processes with custom automation solutions to increase productivity.",
    icon: Workflow,
    href: "/services/workflow-optimization",
  },
  {
    title: "AI Integration",
    description: "Incorporate cutting-edge AI solutions to automate tasks and provide valuable business insights.",
    icon: Brain,
    href: "/services/ai-integration",
  },
]

// Additional focused service areas
const focusedServices = [
  {
    title: "CRM Development",
    description: "Custom CRM solutions to manage customer relationships and streamline sales processes.",
    icon: PieChart,
    href: "/services/crm-development",
  },
  {
    title: "E-commerce Solutions",
    description: "Build and optimize online stores with secure payment processing and inventory management.",
    icon: Layers,
    href: "/services/ecommerce",
  },
  {
    title: "Custom Software",
    description: "Bespoke software applications tailored to your specific business requirements.",
    icon: Code,
    href: "/services/custom-software",
  },
  {
    title: "Business Intelligence",
    description: "Data analysis and visualization tools to make informed business decisions.",
    icon: LineChart,
    href: "/services/business-intelligence",
  },
  {
    title: "Process Automation",
    description: "Automate repetitive tasks and workflows to save time and reduce errors.",
    icon: Cog,
    href: "/services/process-automation",
  },
  {
    title: "AI Chatbots & Assistants",
    description: "Develop intelligent conversational agents to enhance customer service and support.",
    icon: Bot,
    href: "/services/ai-chatbots",
  },
]

// Main Services Overview Component
const ServicesOverview: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            Services
          </Badge>
          <H2 className="!border-none mb-4">Comprehensive Technology Solutions</H2>
          <Lead>
            With 10 years of experience in software engineering, I deliver custom technology solutions
            designed to streamline operations and drive growth for businesses across Texas and beyond.
          </Lead>
        </div>

        {/* Core Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {coreServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
              delay={index}
            />
          ))}
        </div>

        {/* Experience Badge */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-2">10+ Years Experience</Badge>
              <H3 className="mb-4">Expert Technical Background</H3>
              <P className="text-muted-foreground">
                From developing multimillion-dollar Salesforce systems to creating custom CRM platforms and e-commerce solutions, 
                I bring comprehensive expertise to every project. With formal education in Full-Stack Development at SMU and 
                Computer Science at UNT, I combine academic knowledge with practical experience to deliver exceptional results.
              </P>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-md p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <P className="text-sm text-muted-foreground m-0">Years Experience</P>
              </div>
              <div className="bg-background rounded-md p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <P className="text-sm text-muted-foreground m-0">Projects Completed</P>
              </div>
              <div className="bg-background rounded-md p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <P className="text-sm text-muted-foreground m-0">Core Specialties</P>
              </div>
              <div className="bg-background rounded-md p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <P className="text-sm text-muted-foreground m-0">Client Satisfaction</P>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <H3>Specialized Service Areas</H3>
            <P className="text-muted-foreground max-w-2xl mx-auto">
              From custom CRM systems to AI-powered chatbots, I offer a range of specialized services 
              to address your unique business challenges.
            </P>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusedServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
                delay={index}
                className="bg-muted/30 border-muted"
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="lg" className="mx-auto" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ServicesOverview