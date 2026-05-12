const CONFIG = {
  github: {
    username: "ADEBOWALELENS",
    reposToShow: 6
  },
  personal: {
    name: "Emmanuel Adebowale",
    titles: ["Data Analyst", "Electrical Electronics Engineer", "Power BI & Tableau Expert", "Problem Solver"],
    tagline: "Transforming complex datasets into actionable business insights.",
    location: "Lagos, Nigeria",
    email: "teaswarg@gmail.com",
    phone: "+234 806 950 8849",
    cvPath: "assets/cv/resume.pdf",
    formspreeId: "YOUR_FORM_ID",
    availableForWork: true
  },
  social: {
    github: "https://github.com/ADEBOWALELENS",
    linkedin: "https://www.linkedin.com/in/adebowale-emmanuel-44404b1b8",
    email: "mailto:teaswarg@gmail.com"
  },
  skills: {
    dataAnalytics: ["Excel (Advanced)", "Power BI", "Tableau", "Data Cleaning", "Reporting"],
    engineering: ["Electrical Systems", "Technical Reporting", "Regulatory Compliance", "Troubleshooting"],
    soft: ["Problem-Solving", "Communication", "Cross-functional Collaboration", "Analytical Thinking"]
  },
  experience: [
    {
      role: "Data Analyst",
      company: "Greatworth Multi Service Limited",
      location: "Lagos",
      period: "Present",
      current: true,
      bullets: [
        "Collected, cleaned, and analyzed large datasets to support business decision-making",
        "Designed and maintained interactive dashboards using Power BI and Tableau to visualize KPIs",
        "Collaborated with cross-functional teams to identify trends and recommend data-driven strategies",
        "Automated reporting processes using Excel, reducing manual workload and improving accuracy"
      ],
      tech: ["Excel", "Power BI", "Tableau"]
    },
    {
      role: "Electrical Electronics Engineer",
      company: "Nigerian Airspace Management Agency (NAMA)",
      location: "Lagos",
      period: "Past",
      current: false,
      bullets: [
        "Maintained navigational and communication equipment for aviation safety",
        "Conducted routine inspections and troubleshooting of electrical and electronic systems",
        "Ensured compliance with regulatory standards and prepared technical reports"
      ],
      tech: ["Electrical Systems", "Technical Reporting"]
    },
    {
      role: "Data Analytics Intern",
      company: "Evergreen Digital Tech Solution (EDTS)",
      location: "Lagos",
      period: "07/2025 – 09/2025",
      current: false,
      bullets: [
        "Completed a structured data analytics internship programme",
        "Gained hands-on experience with real-world datasets and analytical workflows",
        "Applied data analytics techniques to support business decision-making"
      ],
      tech: ["Data Analytics", "Excel", "Power BI"]
    }
  ],
  education: [
    {
      degree: "B.Eng Electrical Electronics Engineering",
      school: "Olabisi Onabanjo University",
      period: "2018 – 2024",
      icon: "fa-graduation-cap"
    },
    {
      degree: "Advanced Data Analytics",
      school: "New Horizon, Ikeja Lagos",
      period: "02/2025 – 06/2025",
      icon: "fa-certificate"
    }
  ],
  dashboards: [
    {
      id: 1,
      title: "Nova HR Analytics Dashboard",
      tool: "Power BI",
      description: "Comprehensive HR dashboard for Nova tracking $9.6M total income, 1,480 employees, department headcount (HR/R&D/Sales), gender split, attrition rates, age groups, business travel, and monthly income by role.",
      image: "assets/dashboards/dashboard-1.svg",
      tags: ["Power BI", "HR Analytics", "Attrition", "Workforce"],
      featured: true
    },
    {
      id: 2,
      title: "Bank Customer Churn Analysis",
      tool: "Power BI",
      description: "Deep-dive into churn patterns for 10,000 bank customers. Analyses churn by gender, age, credit score, geography (France/Germany/Spain), and complaints — with interactive demographic filters.",
      image: "assets/dashboards/dashboard-2.svg",
      tags: ["Power BI", "Customer Analytics", "Churn Analysis", "Banking"],
      featured: true
    },
    {
      id: 3,
      title: "Churn Drivers — Behavioural Analysis",
      tool: "Power BI",
      description: "Second page of the Bank Churn dashboard examining churn by number of products, tenure, card type (Diamond/Gold/Platinum/Silver), and satisfaction score — with a business insights summary panel.",
      image: "assets/dashboards/dashboard-3.svg",
      tags: ["Power BI", "Behavioural Data", "Product Analysis"],
      featured: false
    },
    {
      id: 4,
      title: "Superstore Sales Dashboard",
      tool: "Tableau",
      description: "Sales performance overview tracking $2.3M revenue, $286K total profit, and 5,009 orders. Breaks down profit by customer segment, discount impact by category, and top customer profitability by region.",
      image: "assets/dashboards/dashboard-4.svg",
      tags: ["Tableau", "Sales Analytics", "Profitability", "Regional"],
      featured: true
    }
  ]
};
