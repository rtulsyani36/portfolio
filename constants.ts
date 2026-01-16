
import { Experience, Project, SkillCategory } from './types';

export const RESUME_SUMMARY = `
Rohit Tulsyani is a Creative Technologist at Ninja Studio and a system builder. He bridges the gap between creative vision and technical execution.
Currently, he architects automated content systems using N8N and LLMs, increasing production velocity by 300% for high-ticket clients.
Previously, he led content strategy at Quizzy, scaling output and managing teams.
He leverages AI tools (N8N, Gemini, etc.) to automate the tedious parts of creativity.
History includes freelance graphic design, running high-volume backlink operations, and a long-term YouTube channel featuring card tricks and gaming.
Education: Bachelor of Computer Applications (VIPS), 2022-2025.
Contact: rtulsyani36@gmail.com, +91 9213 982 666.
LinkedIn: linkedin.com/rohit-tulsyani/
`;

export const EXPERIENCES: Experience[] = [
  {
    id: 0,
    company: "Ninja Studio",
    roles: [
      {
        title: "AI Content Product Associate",
        period: "Aug 2025 – Oct 2025",
        description: [
          "Refined Product Usability: Configured and repeatedly tested N8N and Airtable setups to turn raw automations into a reliable, easy-to-use product.",
          "Expanded Features: Researched new features and techniques using new AI capabilities for data scraping, analysis, image referencing and generation, prompt generation and more to make the tool more valuable for clients.",
          "Ensured Quality: Reviewed and tweaked AI-generated results to guarantee the system produced consistent, market-ready content."
        ]
      },
      {
        title: "Social Media Manager",
        period: "Jun 2025 – Aug 2025",
        description: [
          "Client Management: Handled full social media execution and communication for key SaaS, FinTech, Medical Tourism clients and Ninja Studio itself.",
          "Strategy & Research: Shaped campaign direction by researching competitors and audience trends to see what actually works.",
          "Team Coordination: Coordinated design, copy, and editing teams using Asana and Notion to deliver platform-optimized content (LinkedIn, Instagram) and reviewed intern output alongside improving efficiency through templates, SOPs, and structured feedback."
        ]
      }
    ],
    skills_used: ["No-code AI Automation", "n8n", "UX Testing", "Prompt Engineering", "Strategic Research", "Client Management", "Content Ops"]
  },
  {
    id: 1,
    company: "Quizzy, Inc.",
    roles: [
      {
        title: "Content Strategy Analyst",
        period: "Nov 2023 – Jan 2024",
        description: [
          "Content Operations: Led a 5-member team and revamped the Trello workflow to streamline weekly production and strategy.",
          "Growth & Scaling: Increased LinkedIn output from 2 to 5 posts/week and built a rolling content bank to ensure consistent, trend-relevant publishing.",
          "Strategy & Analytics: Used weekly performance data to improve content styles and proposed new community experiments (Discord, Reddit) during a product pivot."
        ]
      },
      {
        title: "Content Distribution Intern",
        period: "Aug 2023 – Oct 2023",
        description: [
          "Executive Branding: Wrote brand-aligned posts for the company and CEO’s LinkedIn profiles.",
          "Founder Support: Assisted the founder with pitch decks, competitive research, and website updates while managing the publishing calendar."
        ]
      }
    ],
    skills_used: ["Content Strategy", "Team Leadership", "Trello", "Notion", "SEO & Analytics", "Community Management", "Copywriting"]
  },
  {
    id: 2,
    company: "Samvaad",
    roles: [
      {
        title: "Marketing Head",
        period: "2023 - 2025",
        description: [
          "Social Strategy: Directed the content strategy across Instagram and LinkedIn, directly increasing the society's engagement metrics and campus visibility.",
          "Event Promotion: Managed end-to-end marketing campaigns for college events, ensuring high student turnout and awareness.",
          "Operational Coordination: Acted as the central link between faculty, guest speakers, and student teams to ensure events ran smoothly."
        ]
      }
    ],
    skills_used: ["Event Marketing", "Social Media Strategy", "Team Leadership", "Public Relations"]
  },
  {
    id: 3,
    company: "Freelance",
    roles: [
      {
        title: "SEO",
        period: "2017 – 2020",
        description: [
          "High-Volume Delivery: Completed over 800 orders for custom backlinks and premium Wiki-links, supporting SEO agencies and individual website owners.",
          "Client Reliability: Maintained a 4.8+ star rating with 200+ positive reviews on SEOClerk.com by consistently meeting deadlines and quality standards."
        ]
      },
      {
        title: "Graphic Designer",
        period: "Project Based",
        description: [
          "Brand Identity: Designed custom logos, album covers, and T-shirt graphics that helped clients establish a unique visual presence.",
          "Digital Assets: Created high-performance YouTube thumbnails, website templates, and social media creatives optimized for clicks and engagement."
        ]
      },
      {
        title: "Video Editor",
        period: "Project Based",
        description: [
          "Commercial Production: Edited professional app tutorials and user infomercials that helped clients clearly demonstrate their products to customers.",
          "AI Video Editing: Specialized in editing \"AI talking head\" videos, seamlessly syncing audio and visuals to create polished, human-like presentations for clients."
        ]
      }
    ],
    skills_used: ["Off Page SEO", "Visual Identity", "Digital Design", "Video Post-Production", "Client Relations"]
  },
  {
    id: 4,
    company: "YouTube Channel",
    roles: [
      {
        title: "Creator & Lead Editor",
        period: "2016 – 2025",
        description: [
          "Full-Stack Production: Scripted, recorded, and edited diverse content formats—from gaming highlights (Minecraft, Fifa, Valorant) to tutorials and vlogs—adapting to changing platform trends over nearly a decade.",
          "Organic Growth: Achieved 800,000+ lifetime views without paid ads by creating viral gaming shorts, and pop-culture videos.",
          "Visual Design: Designed high-CTR thumbnails and motion graphics, serving as a self-taught testing ground for mastering Adobe Premiere Pro and Photoshop."
        ]
      }
    ],
    skills_used: ["Video Editing (Premiere Pro)", "YouTube SEO & Analytics", "Thumbnail Design", "Trend Analysis", "Content Experimentation"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Design",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Video Editing (Premiere)", "Visual Identity"]
  },
  {
    title: "Strategy",
    skills: ["Content Ops", "SEO Research", "Growth Hacking", "Data Analysis", "Market Research"]
  },
  {
    title: "Management",
    skills: ["Client Relations", "Team Leadership", "Pipeline Optimization", "Project Management", "Agile Workflows"]
  },
  {
    title: "Technical",
    skills: ["AI Automation (N8N)", "System Architecture", "Prompt Engineering", "Full Stack (React/Node)", "Python Scripting"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Social Media Profiles",
    description: "Managed full social media execution for SaaS, FinTech, and Medical Tourism clients. Includes strategy decks, post designs, and analytics reports.",
    tags: ["Strategy", "Growth", "Management"],
    image: "/assets/projects/social-manager/thumb.svg",
    gallery: [
         { url: "/assets/projects/social-manager/ninja-studio.png", name: "Ninja_Studio_Feed.png", type: 'image' },
         { url: "/assets/projects/social-manager/tenant-pay.png", name: "Tenant_Pay_Campaign.png", type: 'image' },
         { url: "/assets/projects/social-manager/beautiful-tourist.png", name: "Medical_Tourism_Ad.png", type: 'image' },
         { url: "/assets/projects/social-manager/goklaim.png", name: "GoKlaim_Brand_Kit.png", type: 'image' },
         { url: "/assets/projects/social-manager/quizzy.png", name: "Quizzy_Growth_Stats.png", type: 'image' }
    ],
    link: "#"
  },
  {
    title: "Graphic Design",
    description: "A collection of freelance branding projects, including logos, merchandising, and social assets for diverse clients.",
    tags: ["Photoshop", "Illustrator", "Branding"],
    image: "/assets/projects/freelance/thumb.svg",
    gallery: [
        { url: "/assets/projects/freelance/thumb.svg", name: "Logo_Collection.svg", type: 'image' },
        { url: "/assets/projects/gallery-placeholder.svg", name: "Merch_Design_Final.png", type: 'image' },
        { url: "/assets/projects/gallery-placeholder.svg", name: "Social_Assets_Kit.png", type: 'image' },
        { url: "/assets/projects/gallery-placeholder.svg", name: "Event_Poster_v3.jpg", type: 'image' }
    ],
    link: "#"
  },
  {
    title: "UI/UX Design",
    description: "User interfaces designed for web and mobile applications. Click on the files to view the live Figma prototypes or case studies.",
    tags: ["Figma", "Prototyping", "User Flow"],
    image: "/assets/projects/automated-content/thumb.svg",
    gallery: [
        { 
            url: "/assets/projects/gallery-placeholder.svg", 
            name: "TrustX", 
            type: 'link', 
            externalLink: "https://www.figma.com/proto/sGhryXhGEsfZaFvry2TiHK/TrustX?node-id=2-3&p=f&t=CP5NOEAV4UtrjpCN-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A3&show-proto-sidebar=1" 
        },
        { 
            url: "/assets/projects/gallery-placeholder.svg", 
            name: "SaaS_Dashboard_Wireframe.url", 
            type: 'link', 
            externalLink: "https://dragonflyinn.vercel.app/" 
        },
        { 
            url: "/assets/projects/gallery-placeholder.svg", 
            name: "Mobile_Banking_App.url", 
            type: 'link', 
            externalLink: "https://www.figma.com/" 
        }
    ],
    link: "#"
  },
  {
    title: "Video Editing & AI Vids",
    description: "Commercial editing work and experimental AI video generation. Features 'AI talking head' projects and gaming highlights.",
    tags: ["Premiere Pro", "AI Video", "Motion Graphics"],
    image: "/assets/projects/stealth/thumb.svg",
    gallery: [
        { 
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
            name: "AI_Talking_Head_Demo.mp4", 
            type: 'video' 
        },
        { 
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
            name: "Commercial_Edit_v2.mp4", 
            type: 'video' 
        },
        { 
            url: "/assets/projects/gallery-placeholder.svg", 
            name: "Gaming_Montage_Thumbnail.jpg", 
            type: 'image' 
        }
    ],
    link: "#"
  }
];

export const INTERESTS = [
  "Football", "YouTube Creation", "Gaming", "Exploring AI Tools"
];
