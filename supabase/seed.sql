-- Seed file for Talty Tech Website Database
-- Empower your business with innovative solutions in AI, Automation, and Website Development
-- Focusing on core technology services to drive digital transformation and innovation

-- Clear existing data (Optional: Execute with caution in production environments)
TRUNCATE TABLE public.service_details CASCADE;
TRUNCATE TABLE public.services CASCADE;
TRUNCATE TABLE public.service_categories CASCADE;

-- Insert updated service categories with SEO-optimized names
INSERT INTO public.service_categories (category_name, category_slug) VALUES
('Custom AI Solutions', 'custom_ai'),
('Business Process Automation', 'automation'),
('Website Development Solutions', 'website_development');

-- Insert services with enhanced titles and descriptions for SEO and clarity
INSERT INTO public.services (title, description, "url-slug", icon, category_id)
VALUES
    (
        'AI Assistants',
        'Innovative AI Assistants designed to transform customer engagement and streamline operations.',
        'ai-assistants',
        'robot',
        (SELECT id FROM public.service_categories WHERE category_slug = 'custom_ai')
    ),
    (
        'Offline Private AI Assistants and Systems',
        'Secure, private AI solutions that operate completely offline to protect sensitive data and ensure compliance.',
        'offline-ai-systems',
        'shield',
        (SELECT id FROM public.service_categories WHERE category_slug = 'custom_ai')
    ),
    (
        'Predictive Analytics',
        'Advanced analytics solutions that leverage AI to forecast trends and optimize business decisions.',
        'predictive-analytics',
        'chart',
        (SELECT id FROM public.service_categories WHERE category_slug = 'custom_ai')
    ),
    (
        'Process Automation',
        'Streamline operations with advanced process automation that reduces costs and minimizes errors.',
        'process-automation',
        'repeat',
        (SELECT id FROM public.service_categories WHERE category_slug = 'automation')
    ),
    (
        'Workflow Optimization',
        'Analyze and redesign your business workflows for maximum efficiency and productivity.',
        'workflow-optimization',
        'settings',
        (SELECT id FROM public.service_categories WHERE category_slug = 'automation')
    ),
    (
        'Website Development',
        'Custom full-stack web development solutions that build responsive, scalable, and user-friendly applications to drive growth.',
        'web-development',
        'code',
        (SELECT id FROM public.service_categories WHERE category_slug = 'website_development')
    ),
    (
        'Website Enhancement',
        'Revamp and optimize your existing websites to boost performance, enhance user experience, and improve SEO rankings.',
        'website-enhancement',
        'update',
        (SELECT id FROM public.service_categories WHERE category_slug = 'website_development')
    ),
    (
        'E-commerce Solutions',
        'Build powerful online stores with seamless checkout processes and inventory management systems.',
        'ecommerce-solutions',
        'shopping-cart',
        (SELECT id FROM public.service_categories WHERE category_slug = 'website_development')
    );

-- Insert detailed service information with SEO-enhanced benefits and processes
INSERT INTO public.service_details (service_id, benefits, process, related_services)
VALUES
    (
        1, -- AI Assistants
        '[
            {"title": "Increased Efficiency", "description": "Automate repetitive tasks and deliver fast, consistent responses."},
            {"title": "24/7 Availability", "description": "Provide round-the-clock support for improved customer satisfaction."},
            {"title": "Scalable Support", "description": "Efficiently manage multiple interactions for sustained business growth."}
        ]',
        '[
            {"title": "Discovery", "description": "Comprehensive discovery to align with your unique business needs."},
            {"title": "Training", "description": "Custom train the AI model using your domain-specific data."},
            {"title": "Integration", "description": "Seamless integration with your existing IT infrastructure."},
            {"title": "Refinement", "description": "Iterative improvement based on continuous user feedback."}
        ]',
        '{2, 3}'
    ),
    (
        2, -- Offline Private AI Assistants and Systems
        '[
            {"title": "Enhanced Privacy", "description": "Completely offline operation ensures your data never leaves your premises."},
            {"title": "Regulatory Compliance", "description": "Meet strict data protection and privacy regulations with ease."},
            {"title": "Customized Security", "description": "Tailored security protocols to match your organizations specific requirements."}
        ]',
        '[
            {"title": "Security Assessment", "description": "Evaluate your privacy needs and compliance requirements."},
            {"title": "Infrastructure Setup", "description": "Establish secure, isolated computing environments for your AI systems."},
            {"title": "Model Deployment", "description": "Install and configure AI models to operate within your secure environment."},
            {"title": "Ongoing Support", "description": "Regular updates and maintenance while maintaining strict security protocols."}
        ]',
        '{1, 3}'
    ),
    (
        3, -- Predictive Analytics
        '[
            {"title": "Future-Ready Planning", "description": "Make informed decisions based on data-driven forecasts."},
            {"title": "Risk Mitigation", "description": "Identify potential issues before they impact your business."},
            {"title": "Resource Optimization", "description": "Allocate resources efficiently based on predictive insights."}
        ]',
        '[
            {"title": "Data Collection", "description": "Gather and organize historical data relevant to your business objectives."},
            {"title": "Model Selection", "description": "Choose appropriate predictive models based on your specific needs."},
            {"title": "Implementation", "description": "Deploy predictive analytics tools within your business operations."},
            {"title": "Review and Adjust", "description": "Regular assessment of prediction accuracy and model refinement."}
        ]',
        '{1, 2}'
    ),
    (
        4, -- Process Automation
        '[
            {"title": "Cost Reduction", "description": "Reduce operational costs through efficient, automated workflows."},
            {"title": "Error Reduction", "description": "Minimize human error and boost process accuracy."},
            {"title": "Time Savings", "description": "Free up staff to focus on high-impact, strategic tasks."}
        ]',
        '[
            {"title": "Process Audit", "description": "Detailed audit to pinpoint processes ideal for automation."},
            {"title": "Workflow Design", "description": "Design and blueprint scalable, optimized workflows."},
            {"title": "Implementation", "description": "Deploy robust automation solutions tailored to your needs."},
            {"title": "Monitoring", "description": "Continuous monitoring and optimization for peak performance."}
        ]',
        '{5}'
    ),
    (
        5, -- Workflow Optimization
        '[
            {"title": "Streamlined Operations", "description": "Eliminate bottlenecks and improve process flow efficiency."},
            {"title": "Enhanced Collaboration", "description": "Improve team coordination and information sharing."},
            {"title": "Measurable Improvements", "description": "Track performance metrics to validate optimization efforts."}
        ]',
        '[
            {"title": "Current State Analysis", "description": "Document and analyze existing workflows to identify inefficiencies."},
            {"title": "Process Redesign", "description": "Develop improved workflow models based on best practices."},
            {"title": "Change Management", "description": "Train teams on new processes and ensure smooth transition."},
            {"title": "Performance Tracking", "description": "Implement metrics to measure the impact of workflow changes."}
        ]',
        '{4}'
    ),
    (
        6, -- Website Development
        '[
            {"title": "Custom Functionality", "description": "Bespoke functionality tailored precisely to your business requirements."},
            {"title": "Scalable Architecture", "description": "Built with a future-proof design to support your growth."},
            {"title": "Modern User Experience", "description": "Intuitive and engaging interfaces that boost user satisfaction."}
        ]',
        '[
            {"title": "Discovery and Planning", "description": "Collaborative planning to define project scope and requirements."},
            {"title": "Design and Prototyping", "description": "Creating wireframes and designs that align with your brand identity."},
            {"title": "Development", "description": "Building your website using cutting-edge technologies and best practices."},
            {"title": "Testing and Deployment", "description": "Rigorous testing and seamless deployment to ensure reliability."}
        ]',
        '{7, 8}'
    ),
    (
        7, -- Website Enhancement
        '[
            {"title": "Performance Boost", "description": "Faster load times and improved responsiveness for better user experience."},
            {"title": "SEO Improvements", "description": "Enhanced search engine visibility to attract more organic traffic."},
            {"title": "Mobile Optimization", "description": "Ensure your website works flawlessly across all devices and screen sizes."}
        ]',
        '[
            {"title": "Website Audit", "description": "Comprehensive analysis of your current website performance and issues."},
            {"title": "Prioritization", "description": "Identifying critical improvements for maximum impact."},
            {"title": "Implementation", "description": "Executing enhancements with minimal disruption to your live site."},
            {"title": "Performance Monitoring", "description": "Ongoing analysis to ensure sustained improvements."}
        ]',
        '{6, 8}'
    ),
    (
        8, -- E-commerce Solutions
        '[
            {"title": "Increased Sales", "description": "Optimized conversion paths that turn visitors into paying customers."},
            {"title": "Simplified Management", "description": "User-friendly admin interfaces for easy product and order management."},
            {"title": "Customer Insights", "description": "Valuable data on customer behavior to inform business decisions."}
        ]',
        '[
            {"title": "Requirements Analysis", "description": "Understanding your product catalog and business workflows."},
            {"title": "Platform Selection", "description": "Choosing the right e-commerce platform for your specific needs."},
            {"title": "Custom Development", "description": "Building specialized features to support your unique selling points."},
            {"title": "Integration and Testing", "description": "Connecting payment gateways and ensuring secure transactions."}
        ]',
        '{6, 7}'
    );