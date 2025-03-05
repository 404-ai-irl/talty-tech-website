import { 
    Code,
    ShoppingCart,
    Layers,
    Cog,
    Brain,
    Search,
    Lightbulb
  } from "lucide-react";
  
  // Icon mapping
  export const servicesIconMap = {
    Code,
    ShoppingCart,
    Layers,
    Cog,
    Brain,
    Search,
    Lightbulb
  };
  
  export type ServiceCategory = {
    name: string;
    href: string;
  };
  
  export const serviceCategories: ServiceCategory[] = [
    {
      name: "Consulting",
      href: "/services/consulting"
    },
    {
      name: "Development",
      href: "/services/development"
    },
    
  ];
  
  export type Service = {
    title: string;
    description: string;
    href: string;
    category: ServiceCategory;
    icon: keyof typeof servicesIconMap; // Icon name from lucide-react
  };
  
  export const services: Service[] = [
    {
      title: "Custom Website Development",
      description:
        "Build modern, responsive websites tailored to each client's unique brand and business needs.",
      href: "/services/development/custom-website-development",
      category: serviceCategories[1], // Development
      icon: "Code",
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Develop full-featured online stores with secure payment integration, inventory management, and smooth user experiences.",
      href: "/services/development/e-commerce-solutions",
      category: serviceCategories[1], // Development
      icon: "ShoppingCart",
    },
    {
      title: "Interactive Web Applications",
      description:
        "Create dynamic and engaging web apps—from interactive dashboards to custom client portals—that drive user engagement.",
      href: "/services/development/interactive-web-applications",
      category: serviceCategories[1], // Development
      icon: "Layers",
    },
    {
      title: "Business Platform Automations",
      description:
        "Design end-to-end systems, like automated lead generation for wholesale real estate, to streamline business processes.",
      href: "/services/development/business-platform-automations",
      category: serviceCategories[1], // Development
      icon: "Cog",
    },
    {
      title: "AI & Machine Learning Integration",
      description:
        "Incorporate intelligent features such as chatbots, recommendation engines, and predictive analytics to enhance decision-making.",
      href: "/services/development/ai-machine-learning-integration",
      category: serviceCategories[1], // Development
      icon: "Brain",
    },
    {
      title: "SEO & Digital Marketing Optimization",
      description:
        "Optimize metadata, implement structured data, and fine-tune web performance to improve search rankings and drive organic traffic.",
      href: "/services/consulting/seo-digital-marketing-optimization",
      category: serviceCategories[0], // Consulting
      icon: "Search",
    },
    {
      title: "Digital Transformation Consulting",
      description:
        "Provide strategic guidance and customized solutions to help local businesses leverage modern web and AI technologies.",
      href: "/services/consulting/digital-transformation-consulting",
      category: serviceCategories[0], // Consulting
      icon: "Lightbulb",
    },
    
  ];