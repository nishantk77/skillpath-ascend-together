
import { User, Skill, Discussion, Module, Badge, AdminCredentials } from '@/types';

// Admin credentials
export const adminCredentials: AdminCredentials = {
  username: "admin",
  password: "skillpath123"
};

// Sample skills
export const skills: Skill[] = [
  {
    id: "web-dev",
    name: "Web Development",
    description: "Learn modern web development with HTML, CSS, JavaScript, and React",
    category: "Development",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop",
    modules: [],
    estimatedWeeks: 10
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description: "Master the principles of user interface and user experience design",
    category: "Design",
    difficulty: "intermediate",
    imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2036&auto=format&fit=crop",
    modules: [],
    estimatedWeeks: 8
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Dive into data analysis, visualization, and machine learning",
    category: "Data",
    difficulty: "advanced",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    modules: [],
    estimatedWeeks: 12
  }
];

// Web Dev modules
const webDevModules: Module[] = [
  {
    id: "web-dev-1",
    title: "HTML & CSS Fundamentals",
    description: "Learn the building blocks of web pages: HTML structure and CSS styling",
    week: 1,
    status: "not-started",
    resources: [
      {
        id: "res-1",
        title: "HTML Crash Course",
        description: "A comprehensive introduction to HTML5",
        type: "video",
        url: "#",
        estimatedMinutes: 45,
        creator: "Web Dev Simplified",
        createdAt: new Date("2023-01-15")
      },
      {
        id: "res-2",
        title: "CSS Basics Tutorial",
        description: "Learn CSS from scratch",
        type: "article",
        url: "#",
        estimatedMinutes: 30,
        creator: "MDN Web Docs",
        createdAt: new Date("2023-01-20")
      },
      {
        id: "res-3",
        title: "Build Your First Web Page",
        description: "Apply HTML and CSS concepts by building a simple page",
        type: "exercise",
        url: "#",
        estimatedMinutes: 60,
        creator: "SkillPath",
        createdAt: new Date("2023-01-25")
      }
    ],
    estimatedHours: 6,
    xpReward: 100
  },
  {
    id: "web-dev-2",
    title: "Responsive Web Design",
    description: "Create websites that look great on any device",
    week: 2,
    status: "not-started",
    resources: [
      {
        id: "res-4",
        title: "Responsive Design Principles",
        description: "Learn the core concepts of responsive web design",
        type: "video",
        url: "#",
        estimatedMinutes: 55,
        creator: "Traversy Media",
        createdAt: new Date("2023-02-01")
      },
      {
        id: "res-5",
        title: "Flexbox and Grid Systems",
        description: "Master modern CSS layout techniques",
        type: "article",
        url: "#",
        estimatedMinutes: 40,
        creator: "CSS-Tricks",
        createdAt: new Date("2023-02-05")
      },
      {
        id: "res-6",
        title: "Media Queries Quiz",
        description: "Test your knowledge of media queries",
        type: "quiz",
        url: "#",
        estimatedMinutes: 15,
        creator: "SkillPath",
        createdAt: new Date("2023-02-10")
      }
    ],
    estimatedHours: 7,
    xpReward: 120
  },
  {
    id: "web-dev-3",
    title: "JavaScript Basics",
    description: "Add interactivity to your websites with JavaScript",
    week: 3,
    status: "not-started",
    resources: [
      {
        id: "res-7",
        title: "JavaScript Fundamentals",
        description: "Learn the core concepts of JavaScript",
        type: "video",
        url: "#",
        estimatedMinutes: 60,
        creator: "Academind",
        createdAt: new Date("2023-02-15")
      },
      {
        id: "res-8",
        title: "DOM Manipulation",
        description: "How to interact with HTML using JavaScript",
        type: "article",
        url: "#",
        estimatedMinutes: 25,
        creator: "JavaScript.info",
        createdAt: new Date("2023-02-20")
      },
      {
        id: "res-9",
        title: "Build an Interactive Form",
        description: "Create a form with validation using JavaScript",
        type: "exercise",
        url: "#",
        estimatedMinutes: 90,
        creator: "SkillPath",
        createdAt: new Date("2023-02-25")
      }
    ],
    estimatedHours: 8,
    xpReward: 150
  }
];

// UI/UX modules
const uiUxModules: Module[] = [
  {
    id: "ui-ux-1",
    title: "Design Principles",
    description: "Learn fundamental principles of visual design",
    week: 1,
    status: "not-started",
    resources: [
      {
        id: "res-10",
        title: "Visual Design Fundamentals",
        description: "Core concepts of visual hierarchy, balance, and contrast",
        type: "video",
        url: "#",
        estimatedMinutes: 50,
        creator: "Design Course",
        createdAt: new Date("2023-03-01")
      },
      {
        id: "res-11",
        title: "Color Theory for Designers",
        description: "Understanding color psychology and color schemes",
        type: "article",
        url: "#",
        estimatedMinutes: 35,
        creator: "UX Planet",
        createdAt: new Date("2023-03-05")
      },
      {
        id: "res-12",
        title: "Typography Exercise",
        description: "Practice creating effective type hierarchies",
        type: "exercise",
        url: "#",
        estimatedMinutes: 45,
        creator: "SkillPath",
        createdAt: new Date("2023-03-10")
      }
    ],
    estimatedHours: 6,
    xpReward: 100
  },
  {
    id: "ui-ux-2",
    title: "User Research",
    description: "Learn how to understand user needs and behaviors",
    week: 2,
    status: "not-started",
    resources: [
      {
        id: "res-13",
        title: "User Research Methods",
        description: "Overview of qualitative and quantitative research techniques",
        type: "video",
        url: "#",
        estimatedMinutes: 65,
        creator: "Nielsen Norman Group",
        createdAt: new Date("2023-03-15")
      },
      {
        id: "res-14",
        title: "Creating User Personas",
        description: "How to develop effective user personas",
        type: "article",
        url: "#",
        estimatedMinutes: 30,
        creator: "Interaction Design Foundation",
        createdAt: new Date("2023-03-20")
      },
      {
        id: "res-15",
        title: "User Research Quiz",
        description: "Test your knowledge of user research methods",
        type: "quiz",
        url: "#",
        estimatedMinutes: 20,
        creator: "SkillPath",
        createdAt: new Date("2023-03-25")
      }
    ],
    estimatedHours: 7,
    xpReward: 120
  }
];

// Data Science modules
const dataScienceModules: Module[] = [
  {
    id: "data-science-1",
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis",
    week: 1,
    status: "not-started",
    resources: [
      {
        id: "res-16",
        title: "Python Basics for Data Science",
        description: "Introduction to Python syntax and data structures",
        type: "video",
        url: "#",
        estimatedMinutes: 70,
        creator: "DataCamp",
        createdAt: new Date("2023-04-01")
      },
      {
        id: "res-17",
        title: "NumPy and Pandas Introduction",
        description: "Working with numerical and tabular data in Python",
        type: "article",
        url: "#",
        estimatedMinutes: 45,
        creator: "Towards Data Science",
        createdAt: new Date("2023-04-05")
      },
      {
        id: "res-18",
        title: "Data Manipulation Exercise",
        description: "Practice data cleaning and transformation",
        type: "exercise",
        url: "#",
        estimatedMinutes: 90,
        creator: "SkillPath",
        createdAt: new Date("2023-04-10")
      }
    ],
    estimatedHours: 9,
    xpReward: 160
  },
  {
    id: "data-science-2",
    title: "Data Visualization",
    description: "Create compelling visualizations to communicate insights",
    week: 2,
    status: "not-started",
    resources: [
      {
        id: "res-19",
        title: "Data Visualization Principles",
        description: "Learn how to effectively represent data visually",
        type: "video",
        url: "#",
        estimatedMinutes: 55,
        creator: "Data School",
        createdAt: new Date("2023-04-15")
      },
      {
        id: "res-20",
        title: "Matplotlib and Seaborn Tutorial",
        description: "Create static visualizations in Python",
        type: "article",
        url: "#",
        estimatedMinutes: 40,
        creator: "Real Python",
        createdAt: new Date("2023-04-20")
      },
      {
        id: "res-21",
        title: "Visualization Challenge",
        description: "Build interactive dashboards using Plotly",
        type: "exercise",
        url: "#",
        estimatedMinutes: 100,
        creator: "SkillPath",
        createdAt: new Date("2023-04-25")
      }
    ],
    estimatedHours: 8,
    xpReward: 140
  }
];

// Assign modules to skills
skills[0].modules = webDevModules;
skills[1].modules = uiUxModules;
skills[2].modules = dataScienceModules;

// Sample user
export const sampleUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@example.com",
  role: "learner",
  xp: 350,
  interests: ["Web Development", "UI/UX Design"],
  weeklyTime: 10,
  goals: ["Build a portfolio website", "Learn React"],
  badges: [
    {
      id: "badge-1",
      name: "Fast Starter",
      description: "Completed first module within 24 hours of joining",
      iconUrl: "/badges/fast-starter.svg",
      dateEarned: new Date("2023-06-15"),
      type: "special"
    },
    {
      id: "badge-2",
      name: "Discussion Pro",
      description: "Posted 5 helpful replies in discussions",
      iconUrl: "/badges/discussion-pro.svg",
      dateEarned: new Date("2023-06-22"),
      type: "special"
    }
  ],
  joinDate: new Date("2023-06-14")
};

// Sample curator user
export const sampleCurator: User = {
  id: "curator-1",
  name: "Jamie Smith",
  email: "jamie@example.com",
  role: "curator",
  xp: 1500,
  interests: ["Web Development", "Data Science"],
  weeklyTime: 20,
  goals: ["Create quality educational content", "Help students succeed"],
  badges: [
    {
      id: "badge-3",
      name: "Content Creator",
      description: "Created 10 educational resources",
      iconUrl: "/badges/creator.svg",
      dateEarned: new Date("2023-05-10"),
      type: "special"
    }
  ],
  joinDate: new Date("2023-01-10")
};

// Sample discussions
export const discussions: Discussion[] = [
  {
    id: "disc-1",
    skillId: "web-dev",
    moduleId: "web-dev-1",
    userId: "user-2",
    userName: "Sarah Miller",
    title: "Confused about CSS Flexbox",
    content: "I'm having trouble understanding how to center items both horizontally and vertically with flexbox. Can someone explain?",
    createdAt: new Date("2023-06-18"),
    replies: [
      {
        id: "reply-1",
        discussionId: "disc-1",
        userId: "user-3",
        userName: "Michael Chen",
        content: "To center items both ways, use 'display: flex; justify-content: center; align-items: center;' on the container.",
        createdAt: new Date("2023-06-18T09:30:00")
      },
      {
        id: "reply-2",
        discussionId: "disc-1",
        userId: "user-1",
        userName: "Alex Johnson",
        content: "Here's a CodePen example that might help: [link]",
        createdAt: new Date("2023-06-18T10:15:00")
      }
    ]
  },
  {
    id: "disc-2",
    skillId: "ui-ux",
    moduleId: "ui-ux-1",
    userId: "user-4",
    userName: "Emma Wilson",
    title: "Best tools for wireframing?",
    content: "What are some recommended tools for creating wireframes as a beginner?",
    createdAt: new Date("2023-06-20"),
    replies: [
      {
        id: "reply-3",
        discussionId: "disc-2",
        userId: "user-5",
        userName: "David Park",
        content: "I'd recommend Figma - it's free to start and very powerful.",
        createdAt: new Date("2023-06-20T14:22:00")
      }
    ]
  }
];

// Available badges
export const availableBadges: Badge[] = [
  {
    id: "badge-1",
    name: "Fast Starter",
    description: "Completed first module within 24 hours of joining",
    iconUrl: "/badges/fast-starter.svg",
    dateEarned: new Date(),
    type: "special"
  },
  {
    id: "badge-2",
    name: "Discussion Pro",
    description: "Posted 5 helpful replies in discussions",
    iconUrl: "/badges/discussion-pro.svg",
    dateEarned: new Date(),
    type: "special"
  },
  {
    id: "badge-3",
    name: "Week Streak",
    description: "Completed modules for 3 weeks in a row",
    iconUrl: "/badges/week-streak.svg",
    dateEarned: new Date(),
    type: "streak"
  },
  {
    id: "badge-4",
    name: "Resource Master",
    description: "Completed all resources in a module",
    iconUrl: "/badges/resource-master.svg",
    dateEarned: new Date(),
    type: "completion"
  },
  {
    id: "badge-5",
    name: "XP Champion",
    description: "Earned over 1000 XP",
    iconUrl: "/badges/xp-champion.svg",
    dateEarned: new Date(),
    type: "special"
  }
];
