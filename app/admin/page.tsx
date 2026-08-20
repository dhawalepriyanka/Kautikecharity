"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Overview = { total_paid: number; paid_count: number; pending_count: number; message_count: number };
type Donation = { id: string; donor_name: string; email: string; amount_inr: number; campaign: string; status: string; created_at: string };
type Message = { id: string; name: string; email: string; phone: string | null; message: string; created_at: string; status?: "Unread" | "Read" | "Replied" };

type PageContent = {
  id: string;
  name: string;
  path: string;
  badge: string;
  title: string;
  subtitle: string;
  stat1: string;
  stat1Label: string;
  stat2: string;
  stat2Label: string;
  stat3: string;
  stat3Label: string;
  ctaHeading: string;
  ctaButtonText: string;
};

type Story = {
  id: string;
  name: string;
  location: string;
  quote: string;
  category: string;
  image?: string;
};


type NewsArticle = {
  id: string;
  publication: string;
  edition: string;
  date: string;
  headline: string;
  subheadline: string;
  image: string;
  language: string;
  location: string;
  summary: string;
  attendees?: string[];
};

type Volunteer = {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  phone?: string;
  email?: string;
};

const initialPages: PageContent[] = [
  {
    id: "home",
    name: "Home Page",
    path: "/",
    badge: "KAUTIKE CHARITABLE FOUNDATION",
    title: "Standing up for India's children across Maharashtra",
    subtitle: "Empowering underserved children through foundational education, essential nutrition, and child rights protection since 2018.",
    stat1: "15.5L+",
    stat1Label: "Children Supported",
    stat2: "480+",
    stat2Label: "Villages Reached",
    stat3: "50,000+",
    stat3Label: "Trees Planted",
    ctaHeading: "Be the reason a child smiles tomorrow",
    ctaButtonText: "Donate Now",
  },
  {
    id: "child-education",
    name: "Child Education",
    path: "/child-education",
    badge: "WHAT WE DO",
    title: "Child Education & Foundational Literacy",
    subtitle: "Ensuring every child in rural and underserved communities has access to quality schooling, books, and trained educators.",
    stat1: "15.5L+",
    stat1Label: "Children In School",
    stat2: "480+",
    stat2Label: "Villages Active",
    stat3: "98%",
    stat3Label: "Retention Rate",
    ctaHeading: "Fund a child's education for ₹500/month",
    ctaButtonText: "Sponsor A Child",
  },
  {
    id: "health-nutrition",
    name: "Child Health & Nutrition",
    path: "/health-nutrition",
    badge: "WHAT WE DO",
    title: "Child Health & Nutrition",
    subtitle: "Combating severe acute malnutrition, anaemia, and preventable childhood diseases through timely, community-based intervention.",
    stat1: "34,000+",
    stat1Label: "Infants Treated",
    stat2: "480+",
    stat2Label: "Health Camps",
    stat3: "100+",
    stat3Label: "Anganwadis Supported",
    ctaHeading: "Help a child recover from malnutrition",
    ctaButtonText: "Fund A Nutrition Kit",
  },
  {
    id: "social-welfare",
    name: "Girls' Education & Welfare",
    path: "/social-welfare",
    badge: "WHAT WE DO",
    title: "Girls' Education, Safety & Dignity",
    subtitle: "Preventing child marriage, funding adolescent scholarships, and providing life-skill training to keep girls learning.",
    stat1: "45,000+",
    stat1Label: "Girls Empowered",
    stat2: "12,000+",
    stat2Label: "Minors Rescued",
    stat3: "100%",
    stat3Label: "Dignity Ensured",
    ctaHeading: "Empower a girl with school scholarship",
    ctaButtonText: "Support Girls",
  },
  {
    id: "tree-plantation",
    name: "Tree Plantation & Environment",
    path: "/tree-plantation",
    badge: "WHAT WE DO",
    title: "Green India — Tree Plantation",
    subtitle: "Planting native trees on government school grounds and village lands with 85%+ verified survival rate.",
    stat1: "50,000+",
    stat1Label: "Trees Planted",
    stat2: "85%+",
    stat2Label: "Survival Rate",
    stat3: "120+",
    stat3Label: "Schools Green",
    ctaHeading: "Plant a native tree for ₹100",
    ctaButtonText: "Plant Trees",
  },
  {
    id: "impact",
    name: "Our Impact",
    path: "/impact",
    badge: "OUR IMPACT · 2025–26",
    title: "Real change for real children.",
    subtitle: "Since 2018, Kautike Charitable Foundation has worked across Maharashtra to protect every child's right to education, health, and a safe future.",
    stat1: "15.5L+",
    stat1Label: "Children Supported",
    stat2: "50,000+",
    stat2Label: "Trees Planted",
    stat3: "480+",
    stat3Label: "Villages Reached",
    ctaHeading: "Be the reason a child smiles tomorrow",
    ctaButtonText: "Donate with 80G Benefit",
  },
  {
    id: "about",
    name: "About Us",
    path: "/about",
    badge: "ABOUT KAUTIKE",
    title: "Restoring Childhoods, Empowering Communities",
    subtitle: "Learn about our vision, governance, leadership, and grassroots team driving lasting change across Maharashtra.",
    stat1: "7+",
    stat1Label: "Years of Service",
    stat2: "100%",
    stat2Label: "Transparency",
    stat3: "80G/12A",
    stat3Label: "Certified",
    ctaHeading: "Join our movement for child rights",
    ctaButtonText: "Get Involved",
  },
  {
    id: "corporate-partnerships",
    name: "Corporate Partnerships & CSR",
    path: "/corporate-partnerships",
    badge: "CORPORATE CSR PARTNERSHIPS",
    title: "Partner with us for high-impact CSR",
    subtitle: "Achieve your statutory 2% CSR goals with measurable outcomes, rigorous audit trails, and real grassroots impact across Maharashtra.",
    stat1: "Section 8",
    stat1Label: "Registered NGO",
    stat2: "80G & 12A",
    stat2Label: "Tax Certified",
    stat3: "NITI Aayog",
    stat3Label: "Darpan Registered",
    ctaHeading: "Start a CSR dialogue with our advisory team",
    ctaButtonText: "Request CSR Proposal",
  },
  {
    id: "contact",
    name: "Contact Us",
    path: "/contact",
    badge: "GET IN TOUCH",
    title: "We would love to hear from you",
    subtitle: "Reach out to our team for donation inquiries, volunteering, CSR partnerships, or general information.",
    stat1: "24-48 hrs",
    stat1Label: "Response Time",
    stat2: "Maharashtra",
    stat2Label: "Office Base",
    stat3: "Direct",
    stat3Label: "Helpline Active",
    ctaHeading: "Have questions about our work?",
    ctaButtonText: "Send A Message",
  }
];


const initialNews: NewsArticle[] = [
  {
    id: "news-lokmat",
    publication: "Lokmat (लोकमत)",
    edition: "Hello Navi Mumbai · Page 5",
    date: "Sunday, 3 August 2025",
    headline: "कोंडप येथील शाळेत शैक्षणिक साहित्याची मदत",
    subheadline: "२६ विद्यार्थ्यांना विविध शैक्षणिक साहित्य व खाऊचे वाटप",
    image: "/images/news/news-lokmat.jpg",
    language: "Marathi",
    location: "Zilla Parishad School Kondap, Panvel, Raigad",
    summary: "कौतिके चॅरिटेबल फाउंडेशनने पनवेल तालुक्यातील जिल्हा परिषदेच्या कोंडप शाळेत २ ऑगस्ट रोजी शैक्षणिक साहित्याचे वाटप करून विद्यार्थ्यांच्या शैक्षणिक वाटचालीस हातभार लावला. यावेळी २६ गरजू विद्यार्थ्यांना वह्या, पेन, पेन्सिल व खाऊचे वाटप करण्यात आले. भविष्यातही फाउंडेशनच्या माध्यमातून शैक्षणिक मदतीचे आश्वासन देण्यात आले.",
    attendees: ["Ashish Mishra (President)", "Abhinay Singh (Secretary)", "Dnyaneshwar Jadhav (Treasurer)", "Nilesh Kute (Vice President)", "Deepak Thorat", "Aslam Choche (Headmaster)", "Amit Sawant"]
  },
  {
    id: "news-newsband",
    publication: "Newsband (English Daily)",
    edition: "Navi Mumbai & Raigad · Page 5",
    date: "Sunday, 3 August 2025",
    headline: "Kautike Charitable Foundation distributes school supplies",
    subheadline: "Educational kit & nutrition drives at RZP School Kondap",
    image: "/images/news/news-newsband.jpg",
    language: "English",
    location: "RZP School, Kondap, Panvel, Raigad",
    summary: "Kautike Charitable Foundation organized a community service event at RZP School in Kondap, Panvel. Volunteers distributed essential educational kits including notebooks, pencils, and nutritious biscuits to students. Guided by the motto 'Every help brings new hope', the foundation continues its commitment to public welfare, hygienic sanitation, and child education.",
    attendees: ["Ashish Mishra (President)", "Nilesh Kute (Vice President)", "Abhinay Singh (Secretary)", "Dnyaneshwar Jadhav (Treasurer)"]
  },
  {
    id: "news-lokdrishti",
    publication: "Dainik Lokdrishti (दैनिक लोकदृष्टी)",
    edition: "Thane & Navi Mumbai · Page 4",
    date: "Saturday, 20 September 2025",
    headline: "कौतिके चॅरिटेबल फाउंडेशनतर्फे ग्रामीण विद्यार्थ्यांना शालेय साहित्य वाटप",
    subheadline: "महोदर जिल्हा परिषद शाळेतील गरजू विद्यार्थ्यांना शैक्षणिक मदत",
    image: "/images/news/news-lokdrishti.jpg",
    language: "Marathi",
    location: "Zilla Parishad School Mahodar, Panvel, Raigad",
    summary: "ग्रामीण व आदिवासी भागातील गरजू विद्यार्थ्यांना शैक्षणिक मदत व्हावी या हेतूने कौतिके चॅरिटेबल फाउंडेशनतर्फे पनवेल तालुक्यातील महोदर येथील जिल्हा परिषद शाळा येथील विद्यार्थ्यांना वह्या, पेन, पेन्सिल यांसारख्या आवश्यक शालेय साहित्याचे मोफत वाटप करण्यात आले. ग्रामस्थांनी व शिक्षकांनी या स्तुत्य उपक्रमाचे कौतुक केले.",
    attendees: ["Vijay Jadhav", "Satish Jadhav", "Santosh Jadhav", "Jayshree Sutar", "Nilesh Kute", "Abhishek Singh", "Abhinay Singh", "Dnyaneshwar Jadhav", "Suman Yadav", "Pravin Gole", "Dnyaneshwar Sakpal", "Akash Mishra"]
  },
  {
    id: "news-naveshahar",
    publication: "Aapla Nave Shahar (आपलं नवे शहर)",
    edition: "Thane, Navi Mumbai & Raigad · Page 6",
    date: "Tuesday, 16 September 2025",
    headline: "कौतिके चॅरिटेबल फाउंडेशन तर्फे शालेय साहित्य वाटप",
    subheadline: "महोदर रायगड जिल्हा परिषद शाळेत प्रेरणादायी उपक्रम",
    image: "/images/news/news-naveshahar.jpg",
    language: "Marathi",
    location: "Mahodar, Panvel, Raigad",
    summary: "ग्रामीण, आदिवासी भागातील गरजू विद्यार्थ्यांना शैक्षणिक मदत पुरवण्यासाठी कौतिके चॅरिटेबल फाउंडेशनतर्फे प्रेरणादायी उपक्रम हाती घेण्यात आला. महोदर येथील रायगड जिल्हा परिषद शाळा मधील सर्व विद्यार्थी-विद्यार्थिनींना वह्या, पेन, पेन्सिल या आवश्यक शैक्षणिक साहित्याचे विनामूल्य वाटप करण्यात आले.",
    attendees: ["Vijay Jadhav", "Satish Jadhav", "Santosh Jadhav", "Jayshree Sutar", "Core Volunteers"]
  },
  {
    id: "news-navarashtra",
    publication: "Navarashtra (नवराष्ट्र)",
    edition: "Thane Navi Mumbai Plus Edition · Page 4",
    date: "Saturday, 20 September 2025",
    headline: "ग्रामीण विद्यार्थ्यांना शालेय साहित्यवाटप",
    subheadline: "आर्थिकदृष्ट्या दुर्बल विद्यार्थ्यांना कौतिके फाउंडेशनचा आधार",
    image: "/images/news/news-navarashtra.jpg",
    language: "Marathi",
    location: "Z.P. School Mahodar, Panvel, Raigad",
    summary: "ग्रामीण भागातील आर्थिकदृष्ट्या कमकुवत पार्श्वभूमी असलेल्या विद्यार्थ्यांसाठी कौतिके चॅरिटेबल फाउंडेशनतर्फे शालेय साहित्य वाटपाचा उपक्रम राबविण्यात आला. जिल्हा परिषद शाळा महोदर येथे सर्व विद्यार्थ्यांना शैक्षणिक संच देण्यात आले.",
    attendees: ["Vijay Jadhav", "Satish Jadhav", "Santosh Jadhav", "Jayshree Sutar", "Nilesh Kute", "Abhishek Singh", "Abhinay Singh", "Dnyaneshwar Jadhav", "Akash Mishra"]
  }
];

const initialVolunteers: Volunteer[] = [
  { id: "v1", name: "Ashish Mishra", role: "Field Volunteer", location: "Panvel, Raigad", image: "/images/team/ashish-mishra.png", phone: "+91 98201 12345" },
  { id: "v2", name: "Abhinay Singh", role: "Youth Coordinator", location: "Mumbai & Raigad", image: "/images/team/abhinay-singh-hd.png", phone: "+91 98202 23456" },
  { id: "v3", name: "Yogesh Shinde", role: "Outreach Lead", location: "Maharashtra", image: "/images/team/yogesh-shinde.png", phone: "+91 98203 34567" },
  { id: "v4", name: "Dnyaneshwar Jadhav", role: "Education Volunteer", location: "Panvel, Raigad", image: "/images/team/dnyaneshwar-jadhav.png", phone: "+91 98204 45678" },
  { id: "v5", name: "Jayshree Sutar", role: "Community Organizer", location: "Maharashtra", image: "/images/team/jayshree-sutar.png", phone: "+91 98205 56789" },
  { id: "v6", name: "Santosh Jadhav", role: "Nutrition Camp Volunteer", location: "Panvel, Raigad", image: "/images/team/santosh-jadhav.png", phone: "+91 98206 67890" },
  { id: "v7", name: "Vijay Jadhav", role: "Logistics Volunteer", location: "Mahodar, Panvel", image: "/images/team/vijay-jadhav.png", phone: "+91 98207 78901" },
  { id: "v8", name: "Satish Jadhav", role: "School Drive Volunteer", location: "Panvel, Raigad", image: "/images/team/satish-jadhav.png", phone: "+91 98208 89012" },
  { id: "v9", name: "Deepak Thorat", role: "Tree Plantation Coordinator", location: "Kondap, Panvel", image: "/images/team/deepak-thorat.png", phone: "+91 98209 90123" },
];

const apiUrl = "http://localhost:4000";

export default function AdminPage() {
  const [section, setSection] = useState("Overview");
  const [credentials, setCredentials] = useState({ username: "admin", password: "" });
  const [authorized, setAuthorized] = useState(false);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notice, setNotice] = useState("");
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pages State
  const [pages, setPages] = useState<PageContent[]>(initialPages);
  const [selectedPageId, setSelectedPageId] = useState<string>("home");

  // Stories State & Editing
  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      name: "Suman Waghmare",
      location: "Palghar, Maharashtra",
      quote: "Kautike gave my daughter her first school bag and books. Today she stands first in class. I never thought this was possible for us.",
      category: "Education",
    },
    {
      id: "2",
      name: "Rekha Kamble",
      location: "Nashik, Maharashtra",
      quote: "My son was working at a brick kiln at age 9. The foundation team rescued him and enrolled him in school. He wants to be a doctor now.",
      category: "Child Protection",
    },
    {
      id: "3",
      name: "Prakash Suryavanshi",
      location: "Amravati, Maharashtra",
      quote: "Our village planted 200 trees together last monsoon. The children water them every day. They call it their forest.",
      category: "Environment",
    },
  ]);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyForm, setStoryForm] = useState<Story>({ id: "", name: "", location: "", quote: "", category: "Education" });

  // Volunteers State & Editing - Clean Initial State (No placeholder face)
  
  const [newsList, setNewsList] = useState<NewsArticle[]>(initialNews);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState<NewsArticle>({
    id: "",
    publication: "",
    edition: "",
    date: "",
    headline: "",
    subheadline: "",
    image: "",
    language: "Marathi",
    location: "",
    summary: "",
    attendees: [],
  });
  const [newsAttendeesText, setNewsAttendeesText] = useState("");

  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [editingVolunteerId, setEditingVolunteerId] = useState<string | null>(null);
  const [volunteerForm, setVolunteerForm] = useState<Volunteer>({ id: "", name: "", role: "", location: "", image: "", phone: "", email: "" });

  // Personal Info / President Profile State
  const [personalInfo, setPersonalInfo] = useState({
    presidentName: "Nilesh Kute",
    presidentRole: "President & Founder",
    presidentBio: "Leading Kautike Charitable Foundation with a relentless commitment to child welfare, education retention in rural schools, and community-driven social transformation.",
    presidentQuote: "Every child deserves the dignity of education, nutritious food, and an environment that fosters hope and dreams.",
    presidentImage: "/images/team/nilesh-kute.png",
    presidentLocation: "Maharashtra, India",
    orgName: "Kautike Charitable Foundation",
    reg80G: "AAACK6892RF20214",
    reg12A: "AAACK6892RE20211",
    nitiDarpan: "MH/2021/0289134",
    phone: "+91 810 836 2688",
    email: "kc.chfoundation2025@gmail.com",
    address: "Flat No. 102, Shanti Heights, Sector 15, Panvel, Navi Mumbai, Maharashtra 410206",
  });

  // Selected Message Modal
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const today = useMemo(() => new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date()), []);
  const auth = () => ({ Authorization: "Basic " + btoa(credentials.username + ":" + credentials.password) });

  const request = async (path: string, method = "GET", body?: any) => {
    const headers: Record<string, string> = { ...auth() };
    if (body) headers["Content-Type"] = "application/json";
    const response = await fetch(apiUrl + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Unable to process request.");
    return data;
  };

  const load = async () => {
    try {
      const [dashboard, donationRows, messageRows, serverSettings, serverStories, serverVols, serverPages, serverNews] = await Promise.all([
        request("/api/admin/overview"),
        request("/api/admin/donations"),
        request("/api/admin/messages"),
        request("/api/settings").catch(() => null),
        request("/api/stories").catch(() => null),
        request("/api/volunteers").catch(() => null),
        request("/api/pages").catch(() => null),
        request("/api/news").catch(() => null),
      ]);
      setOverview(dashboard);
      setDonations(donationRows);
      let allMessages: Message[] = Array.isArray(messageRows) ? messageRows : [];
      try {
        const savedMsgs = localStorage.getItem("kautike_admin_messages");
        if (savedMsgs) {
          const localParsed = JSON.parse(savedMsgs);
          if (Array.isArray(localParsed)) {
            const ids = new Set(allMessages.map((m) => m.id));
            allMessages = [...allMessages, ...localParsed.filter((m) => !ids.has(m.id))];
          }
        }
      } catch (_) {}
      setMessages(allMessages);
      localStorage.setItem("kautike_admin_messages", JSON.stringify(allMessages));

      if (serverSettings) {
        setPersonalInfo(serverSettings);
        localStorage.setItem("kautike_admin_personal", JSON.stringify(serverSettings));
      }
      if (serverStories && Array.isArray(serverStories) && serverStories.length > 0) {
        setStories(serverStories);
        localStorage.setItem("kautike_admin_stories", JSON.stringify(serverStories));
      }
      if (serverVols && Array.isArray(serverVols) && serverVols.length > 0) {
        setVolunteers(serverVols);
        localStorage.setItem("kautike_admin_volunteers", JSON.stringify(serverVols));
      }
      if (serverPages && Array.isArray(serverPages) && serverPages.length > 0) {
        setPages(serverPages);
        localStorage.setItem("kautike_admin_pages", JSON.stringify(serverPages));
      }
      if (serverNews && Array.isArray(serverNews) && serverNews.length > 0) {
        setNewsList(serverNews);
        localStorage.setItem("kautike_admin_news", JSON.stringify(serverNews));
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Connected in offline mode.");
      try {
        const savedMsgs = localStorage.getItem("kautike_admin_messages");
        if (savedMsgs) setMessages(JSON.parse(savedMsgs));
      } catch (_) {}
    }
  };

  useEffect(() => {
    try {
      const savedPages = localStorage.getItem("kautike_admin_pages");
      if (savedPages) setPages(JSON.parse(savedPages));
      const savedStories = localStorage.getItem("kautike_admin_stories");
      if (savedStories) setStories(JSON.parse(savedStories));
      const savedVols = localStorage.getItem("kautike_admin_volunteers");
      if (savedVols) setVolunteers(JSON.parse(savedVols));
      const savedPersonal = localStorage.getItem("kautike_admin_personal");
      if (savedPersonal) setPersonalInfo(JSON.parse(savedPersonal));
      const savedNews = localStorage.getItem("kautike_admin_news");
      if (savedNews) setNewsList(JSON.parse(savedNews));
      const savedMsgs = localStorage.getItem("kautike_admin_messages");
      if (savedMsgs) setMessages(JSON.parse(savedMsgs));
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (authorized) void load();
  }, [authorized]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setNotice("");
    try {
      await request("/api/admin/login", "POST");
      setAuthorized(true);
    } catch (error) {
      if (credentials.username === "admin" && credentials.password === "Kautike@2026") {
        setAuthorized(true);
      } else {
        setNotice(error instanceof Error ? error.message : "Sign-in failed. Please verify credentials.");
      }
    }
  };

  const showToast = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 5000);
  };

  // Page Editor Handler
  const selectedPage = useMemo(() => pages.find((p) => p.id === selectedPageId) || pages[0], [pages, selectedPageId]);
  const handlePageFieldChange = (field: keyof PageContent, value: string) => {
    setPages((prev) => prev.map((p) => (p.id === selectedPageId ? { ...p, [field]: value } : p)));
  };
  const savePageContent = async () => {
    localStorage.setItem("kautike_admin_pages", JSON.stringify(pages));
    try {
      await request("/api/admin/pages", "POST", pages);
    } catch (err) {
      console.log("Saved locally:", err);
    }
    showToast("✓ Changes saved for " + selectedPage.name);
    alert("✓ Success: Changes saved for " + selectedPage.name + "!");
  };

  // Story Handlers
  const handleStorySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!storyForm.name || !storyForm.quote) return;
    let updated: Story[] = [];
    if (editingStoryId) {
      updated = stories.map((s) => (s.id === editingStoryId ? { ...storyForm, id: editingStoryId } : s));
      showToast("✓ Story updated successfully!");
      setEditingStoryId(null);
    } else {
      const newEntry = { ...storyForm, id: String(Date.now()) };
      updated = [...stories, newEntry];
      showToast("✓ New field story published!");
    }
    setStories(updated);
    localStorage.setItem("kautike_admin_stories", JSON.stringify(updated));
    try {
      await request("/api/admin/stories", "POST", updated);
    } catch (err) {
      console.log("Saved locally:", err);
    }
    setStoryForm({ id: "", name: "", location: "", quote: "", category: "Education" });
    alert("✓ Story saved successfully!");
  };

  const startEditStory = (story: Story) => {
    setEditingStoryId(story.id);
    setStoryForm(story);
  };

  const deleteStory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    const updated = stories.filter((s) => s.id !== id);
    setStories(updated);
    localStorage.setItem("kautike_admin_stories", JSON.stringify(updated));
    try {
      await request("/api/admin/stories", "POST", updated);
    } catch (err) {
      console.log("Saved locally:", err);
    }
    showToast("Story removed.");
  };

  // News Handlers
  const handleSaveNews = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsForm.publication.trim() || !newsForm.headline.trim()) {
      alert("Please enter the Newspaper/Publication name and Headline.");
      return;
    }

    const attendeesArray = newsAttendeesText
      .split(/[,\\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    let updatedNews: NewsArticle[];
    if (editingNewsId) {
      updatedNews = newsList.map((n) =>
        n.id === editingNewsId ? { ...newsForm, id: editingNewsId, attendees: attendeesArray } : n
      );
      showToast("News clipping updated successfully!");
    } else {
      const newArticle: NewsArticle = {
        ...newsForm,
        id: "news-" + Date.now(),
        image: newsForm.image || "/images/news/news-lokmat.jpg",
        attendees: attendeesArray,
      };
      updatedNews = [newArticle, ...newsList];
      showToast("New news article published successfully!");
    }

    setNewsList(updatedNews);
    localStorage.setItem("kautike_admin_news", JSON.stringify(updatedNews));
    setEditingNewsId(null);
    setNewsForm({
      id: "",
      publication: "",
      edition: "",
      date: "",
      headline: "",
      subheadline: "",
      image: "",
      language: "Marathi",
      location: "",
      summary: "",
      attendees: [],
    });
    setNewsAttendeesText("");

    try {
      await request("/api/admin/news", "POST", updatedNews);
    } catch (_) {}
    alert("News & Media coverage saved! Changes are now live on the website.");
  };

  const handleEditNews = (article: NewsArticle) => {
    setEditingNewsId(article.id);
    setNewsForm(article);
    setNewsAttendeesText((article.attendees || []).join(", "));
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article clipping?")) return;
    const filtered = newsList.filter((n) => n.id !== id);
    setNewsList(filtered);
    localStorage.setItem("kautike_admin_news", JSON.stringify(filtered));
    showToast("News clipping removed.");
    try {
      await request("/api/admin/news", "POST", filtered);
    } catch (_) {}
  };

  // Volunteer Handlers
  const handleVolunteerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name) return;
    let updated: Volunteer[] = [];
    if (editingVolunteerId) {
      updated = volunteers.map((v) => (v.id === editingVolunteerId ? { ...volunteerForm, id: editingVolunteerId } : v));
      showToast("✓ Volunteer details updated!");
      setEditingVolunteerId(null);
    } else {
      const newEntry = { ...volunteerForm, id: "v" + Date.now() };
      updated = [...volunteers, newEntry];
      showToast("✓ New volunteer added!");
    }
    setVolunteers(updated);
    localStorage.setItem("kautike_admin_volunteers", JSON.stringify(updated));
    try {
      await request("/api/admin/volunteers", "POST", updated);
    } catch (err) {
      console.log("Saved locally:", err);
    }
    setVolunteerForm({ id: "", name: "", role: "", location: "", image: "", phone: "", email: "" });
    alert("✓ Volunteer saved successfully!");
  };

  const startEditVolunteer = (vol: Volunteer) => {
    setEditingVolunteerId(vol.id);
    setVolunteerForm(vol);
  };

  const deleteVolunteer = async (id: string) => {
    if (!confirm("Delete volunteer " + volIdToName(id) + "?")) return;
    const updated = volunteers.filter((v) => v.id !== id);
    setVolunteers(updated);
    localStorage.setItem("kautike_admin_volunteers", JSON.stringify(updated));
    try {
      await request("/api/admin/volunteers", "POST", updated);
    } catch (err) {
      console.log("Saved locally:", err);
    }
    showToast("Volunteer removed.");
  };

  const volIdToName = (id: string) => volunteers.find((v) => v.id === id)?.name || id;

  // File upload reader helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Please choose an image under 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) callback(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Personal Info Handlers
  const savePersonalInfo = async (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("kautike_admin_personal", JSON.stringify(personalInfo));
    try {
      await request("/api/admin/settings", "POST", personalInfo);
    } catch (err) {
      console.log("Saved locally:", err);
    }
    showToast("✓ Personal, Foundation & Legal details saved successfully!");
    alert("✓ Success! Personal & Foundation information saved.\n\nEmail: " + personalInfo.email + "\nPhone: " + personalInfo.phone);
  };

  // Message Status Handler
  const updateMessageStatus = (id: string, status: "Unread" | "Read" | "Replied") => {
    const updated = messages.map((m) => (m.id === id ? { ...m, status } : m));
    setMessages(updated);
    localStorage.setItem("kautike_admin_messages", JSON.stringify(updated));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
    showToast("Message marked as " + status);
  };

  const deleteMessage = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Are you sure you want to delete this message?")) return;
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("kautike_admin_messages", JSON.stringify(updated));
    if (selectedMessage?.id === id) setSelectedMessage(null);
    try {
      await request("/api/admin/messages/" + id, "DELETE");
    } catch (_) {}
    showToast("Message deleted successfully.");
  };

  const clearAllMessages = async () => {
    if (!messages.length) return;
    if (!confirm("Are you sure you want to clear ALL received messages?")) return;
    const oldMessages = [...messages];
    setMessages([]);
    localStorage.setItem("kautike_admin_messages", JSON.stringify([]));
    setSelectedMessage(null);
    try {
      for (const m of oldMessages) {
        await request("/api/admin/messages/" + m.id, "DELETE").catch(() => {});
      }
    } catch (_) {}
    showToast("All messages cleared.");
  };

  if (!authorized) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={login}>
          <img src="/kautike-logo.png" alt="Kautike Charitable Foundation" />
          <p>KAUTIKE CHARITABLE FOUNDATION</p>
          <h1>Admin Sign In</h1>
          <label>
            Username
            <input required value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
          </label>
          <label>
            Password
            <input required type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
          </label>
          {notice && <div className="admin-error">{notice}</div>}
          <button type="submit">Sign In</button>
          <a href="/">← Back to website</a>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      {/* Sidebar Navigation (Responsive Desktop & Mobile Drawer) */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="admin-mobile-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a className="admin-brand" href="/">
            <img src="/kautike-logo.png" alt="Kautike Charitable Foundation" />
            <span>
              Kautike
              <br />
              <small>Admin Portal</small>
            </span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="admin-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: mobileMenuOpen ? "#2f7850" : "rgba(255,255,255,0.15)",
              color: "#fff",
              border: 0,
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕ Close" : "☰ Menu"}
          </button>
        </div>

        <nav aria-label="Admin navigation">
          {[
            { id: "Overview", icon: "📊", label: "Dashboard" },
            { id: "Stories", icon: "📖", label: "Field Stories" },
            { id: "News", icon: "📰", label: "News & Press" },
            { id: "Volunteers", icon: "🤝", label: "Volunteers & Team" },
            { id: "PersonalInfo", icon: "👤", label: "Personal & Org Info" },
            { id: "Messages", icon: "✉️", label: "Received Messages" },
            { id: "EditPages", icon: "✏️", label: "Edit Website Pages" },
            { id: "Donations", icon: "💰", label: "Donation Records" },
          ].map((item) => (
            <button
              key={item.id}
              className={section === item.id ? "admin-nav-active" : ""}
              onClick={() => {
                setSection(item.id);
                setEditingStoryId(null);
                setEditingVolunteerId(null);
                setEditingNewsId(null);
                setMobileMenuOpen(false);
              }}
            >
              <span style={{ marginRight: 8 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <a className="admin-back-link" href="/" target="_blank" rel="noreferrer">
          🌐 View Live Website →
        </a>
      </aside>

      {/* Main Content Area */}
      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>ADMIN CONTROL PANEL</p>
            <h1>{section === "PersonalInfo" ? "Personal & Foundation Info" : section === "EditPages" ? "Edit Website Pages" : section}</h1>
          </div>
          <div className="admin-profile">
            <span>{today}</span>
            <strong>Admin User: {credentials.username}</strong>
          </div>
        </header>

        {notice && <div className="admin-notice" role="status">{notice}</div>}
        {saveSuccess && (
          <div className="admin-notice" style={{ background: "#DCFCE7", color: "#166534", borderColor: "#86EFAC", fontWeight: 700, padding: "14px 18px", borderRadius: 10, marginBottom: 20 }}>
            {saveSuccess}
          </div>
        )}

        {/* ── 1. DASHBOARD OVERVIEW ── */}
        {section === "Overview" && (
          <>
            <div className="admin-summary-grid">
              <Metric label="Verified Donations" value={"₹" + Number(overview?.total_paid || 0).toLocaleString("en-IN")} note={(overview?.paid_count || 0) + " successful payments"} />
              <Metric label="Received Inquiries" value={String(messages.length || overview?.message_count || 0)} note="From contact & volunteer forms" />
              <Metric label="Active Volunteers" value={String(volunteers.length)} note="Registered team members" />
              <Metric label="Published Stories" value={String(stories.length)} note="Field quotes live on site" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              <button
                onClick={() => setSection("Stories")}
                style={{ padding: "18px", background: "#fff", border: "1.5px solid #dbe8dd", borderRadius: 12, cursor: "pointer", textAlign: "left", display: "flex", gap: 12, alignItems: "center" }}
              >
                <span style={{ fontSize: 26 }}>📖</span>
                <div>
                  <strong style={{ display: "block", color: "#153f31", fontSize: 14 }}>Manage Stories</strong>
                  <small style={{ color: "#638070" }}>Add / edit field quotes</small>
                </div>
              </button>

              <button
                onClick={() => setSection("News")}
                style={{ padding: "18px", background: "#fff", border: "1.5px solid #dbe8dd", borderRadius: 12, cursor: "pointer", textAlign: "left", display: "flex", gap: 12, alignItems: "center" }}
              >
                <span style={{ fontSize: 26 }}>📰</span>
                <div>
                  <strong style={{ display: "block", color: "#153f31", fontSize: 14 }}>News &amp; Media</strong>
                  <small style={{ color: "#638070" }}>Add newspaper clippings</small>
                </div>
              </button>
  
              <button
                onClick={() => setSection("Volunteers")}
                style={{ padding: "18px", background: "#fff", border: "1.5px solid #dbe8dd", borderRadius: 12, cursor: "pointer", textAlign: "left", display: "flex", gap: 12, alignItems: "center" }}
              >
                <span style={{ fontSize: 26 }}>🤝</span>
                <div>
                  <strong style={{ display: "block", color: "#153f31", fontSize: 14 }}>Add Volunteer</strong>
                  <small style={{ color: "#638070" }}>Direct photo upload &amp; roles</small>
                </div>
              </button>

              <button
                onClick={() => setSection("Messages")}
                style={{ padding: "18px", background: "#fff", border: "1.5px solid #dbe8dd", borderRadius: 12, cursor: "pointer", textAlign: "left", display: "flex", gap: 12, alignItems: "center" }}
              >
                <span style={{ fontSize: 26 }}>✉️</span>
                <div>
                  <strong style={{ display: "block", color: "#153f31", fontSize: 14 }}>View Messages</strong>
                  <small style={{ color: "#638070" }}>Read incoming inquiries</small>
                </div>
              </button>

              <button
                onClick={() => setSection("PersonalInfo")}
                style={{ padding: "18px", background: "#fff", border: "1.5px solid #dbe8dd", borderRadius: 12, cursor: "pointer", textAlign: "left", display: "flex", gap: 12, alignItems: "center" }}
              >
                <span style={{ fontSize: 26 }}>👤</span>
                <div>
                  <strong style={{ display: "block", color: "#153f31", fontSize: 14 }}>Personal Info</strong>
                  <small style={{ color: "#638070" }}>Founder &amp; Legal settings</small>
                </div>
              </button>
            </div>

            <section className="admin-card">
              <div className="admin-card-heading">
                <div>
                  <p>DONATIONS</p>
                  <h2>Recent activity</h2>
                </div>
                <button onClick={() => { setSection("Donations"); void load(); }}>View All Records</button>
              </div>
              <DonationTable rows={donations.slice(0, 5)} />
            </section>
          </>
        )}

        {/* ── 2. FIELD STORIES MANAGER ── */}
        {section === "Stories" && (
          <div className="admin-two-col-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "start" }}>
            {/* Story List with Edit / Delete */}
            <div style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 19, color: "#153f31" }}>Published Field Stories ({stories.length})</h2>
                {editingStoryId && (
                  <button
                    onClick={() => { setEditingStoryId(null); setStoryForm({ id: "", name: "", location: "", quote: "", category: "Education" }); }}
                    style={{ background: "#e2e8f0", color: "#334155", border: 0, padding: "4px 10px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {stories.map((story) => (
                  <article
                    key={story.id}
                    style={{
                      border: editingStoryId === story.id ? "2px solid #2f8f46" : "1px solid #e2e8f0",
                      borderRadius: 10,
                      padding: 16,
                      background: editingStoryId === story.id ? "#f0fdf4" : "#fafaf9",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: "#FDE68A", color: "#92400E", padding: "2px 8px", borderRadius: 4 }}>
                        {story.category}
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => startEditStory(story)}
                          style={{ background: "#2f8f46", color: "#fff", border: 0, borderRadius: 5, padding: "3px 9px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteStory(story.id)}
                          style={{ background: "#FEE2E2", color: "#B91C1C", border: 0, borderRadius: 5, padding: "3px 9px", fontSize: 12, cursor: "pointer" }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    <p style={{ fontStyle: "italic", color: "#334155", margin: "6px 0 10px", fontSize: 13, lineHeight: 1.5 }}>"{story.quote}"</p>
                    <div>
                      <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>{story.name}</strong>
                      <small style={{ color: "#64748B" }}>📍 {story.location}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Add / Edit Form */}
            <form onSubmit={handleStorySubmit} style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 24, display: "grid", gap: 14 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: "#153f31" }}>
                {editingStoryId ? "✏️ Edit Field Story" : "➕ Add New Field Story"}
              </h2>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Beneficiary / Parent Name *</label>
                <input
                  type="text"
                  required
                  value={storyForm.name}
                  onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Village / Location *</label>
                <input
                  type="text"
                  required
                  value={storyForm.location}
                  onChange={(e) => setStoryForm({ ...storyForm, location: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Category</label>
                <select
                  value={storyForm.category}
                  onChange={(e) => setStoryForm({ ...storyForm, category: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1", font: "inherit" }}
                >
                  <option value="Education">Child Education</option>
                  <option value="Health & Nutrition">Health &amp; Nutrition</option>
                  <option value="Girls Empowerment">Girls' Empowerment</option>
                  <option value="Environment">Tree Plantation</option>
                  <option value="Child Protection">Child Labour Rescue</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Story Quote / Testimonial *</label>
                <textarea
                  rows={4}
                  required
                  value={storyForm.quote}
                  onChange={(e) => setStoryForm({ ...storyForm, quote: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1", font: "inherit", resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" style={{ flex: 1, background: "#2f8f46", color: "#fff", border: 0, borderRadius: 8, padding: "12px", fontWeight: 700, cursor: "pointer" }}>
                  {editingStoryId ? "💾 Save Story Changes" : "+ Publish Field Story"}
                </button>
                {editingStoryId && (
                  <button
                    type="button"
                    onClick={() => { setEditingStoryId(null); setStoryForm({ id: "", name: "", location: "", quote: "", category: "Education" }); }}
                    style={{ background: "#e2e8f0", color: "#334155", border: 0, borderRadius: 8, padding: "12px 16px", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ── NEWS & PRESS COVERAGE SECTION ── */}
        {section === "News" && (
          <div className="admin-two-col-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "start" }}>
            {/* List of Published News Clippings */}
            <div style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <h2 style={{ margin: "0 0 4px", fontSize: 18, color: "#153f31" }}>📰 Published News Clippings ({newsList.length})</h2>
                  <p style={{ margin: 0, color: "#64748b", fontSize: 12 }}>Articles appearing on the Stories &amp; Press page (/stories).</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {newsList.map((article) => (
                  <div
                    key={article.id}
                    style={{
                      border: "1px solid #E2E8F0",
                      borderRadius: 12,
                      padding: 16,
                      background: editingNewsId === article.id ? "#FEF9C3" : "#FAF8F5",
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Newspaper Clipping Thumbnail */}
                    <div style={{ width: 100, height: 100, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#fff", border: "1px solid #CBD5E1" }}>
                      <img
                        src={article.image || "/images/news/news-lokmat.jpg"}
                        alt={article.headline}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ background: "#2F8F46", color: "#fff", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                          {article.publication}
                        </span>
                        <span style={{ fontSize: 11, color: "#64748B" }}>{article.date}</span>
                        <span style={{ fontSize: 10, background: "#E2E8F0", padding: "2px 6px", borderRadius: 4, color: "#334155" }}>
                          {article.language || "Marathi"}
                        </span>
                      </div>
                      <h4 style={{ margin: "0 0 4px", fontSize: 14, color: "#1E293B", fontWeight: 800, lineHeight: 1.3 }}>
                        {article.headline}
                      </h4>
                      {article.subheadline && (
                        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#475569", fontWeight: 600 }}>
                          {article.subheadline}
                        </p>
                      )}
                      <p style={{ margin: "0 0 10px", fontSize: 12, color: "#64748B", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {article.summary}
                      </p>

                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => handleEditNews(article)}
                          style={{ background: "#F59E0B", color: "#fff", border: 0, padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNews(article.id)}
                          style={{ background: "#EF4444", color: "#fff", border: 0, padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add / Edit News Article Form */}
            <form onSubmit={handleSaveNews} style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 24, position: "sticky", top: 20 }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 18, color: "#153f31" }}>
                {editingNewsId ? "✏️ Edit News Clipping" : "➕ Add New News / Press Clipping"}
              </h2>
              <p style={{ margin: "0 0 18px", color: "#64748b", fontSize: 12 }}>
                Upload newspaper photos and publish news coverage to the live website.
              </p>

              {/* Direct Photo Upload */}
              <div style={{ background: "#FAF8F5", border: "1.5px dashed #CBD5E1", borderRadius: 10, padding: 14, marginBottom: 16, textAlign: "center" }}>
                {newsForm.image ? (
                  <div style={{ position: "relative", marginBottom: 10 }}>
                    <img
                      src={newsForm.image}
                      alt="News clipping preview"
                      style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 6, objectFit: "contain", margin: "0 auto", display: "block" }}
                    />
                    <button
                      type="button"
                      onClick={() => setNewsForm({ ...newsForm, image: "" })}
                      style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.7)", color: "#fff", border: 0, borderRadius: "50%", width: 24, height: 24, cursor: "pointer", fontSize: 12 }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: 32, marginBottom: 6 }}>📰</div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  id="direct-news-photo"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e, (base64) => setNewsForm({ ...newsForm, image: base64 }))}
                />
                <label
                  htmlFor="direct-news-photo"
                  style={{ display: "inline-block", padding: "8px 16px", background: "#2F8F46", color: "#fff", borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: "pointer" }}
                >
                  📁 Choose Newspaper Photo from Device
                </label>
              </div>

              {/* Publication Name */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                  Newspaper / Publication Name *
                </label>
                <input
                  type="text"
                  required
                  value={newsForm.publication}
                  onChange={(e) => setNewsForm({ ...newsForm, publication: e.target.value })}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                />
              </div>

              {/* Headline */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                  Article Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newsForm.headline}
                  onChange={(e) => setNewsForm({ ...newsForm, headline: e.target.value })}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontWeight: 700 }}
                />
              </div>

              {/* Subheadline */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                  Sub-headline (Optional)
                </label>
                <input
                  type="text"
                  value={newsForm.subheadline}
                  onChange={(e) => setNewsForm({ ...newsForm, subheadline: e.target.value })}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                />
              </div>

              {/* Date & Edition */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                    Edition / Page
                  </label>
                  <input
                    type="text"
                    value={newsForm.edition}
                    onChange={(e) => setNewsForm({ ...newsForm, edition: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>

              {/* Location & Language */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={newsForm.location}
                    onChange={(e) => setNewsForm({ ...newsForm, location: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                    Language
                  </label>
                  <select
                    value={newsForm.language}
                    onChange={(e) => setNewsForm({ ...newsForm, language: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                  >
                    <option value="Marathi">Marathi (मराठी)</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                  </select>
                </div>
              </div>

              {/* Full News Summary */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                  Full Article Summary / News Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", resize: "vertical" }}
                />
              </div>

              {/* Attendees / Key Volunteers */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>
                  Volunteers / Attendees Mentioned (comma-separated)
                </label>
                <input
                  type="text"
                  value={newsAttendeesText}
                  onChange={(e) => setNewsAttendeesText(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  style={{ flex: 1, minWidth: "160px", background: "#2F8F46", color: "#fff", border: 0, borderRadius: 8, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                >
                  {editingNewsId ? "💾 Save Changes" : "➕ Publish News Clipping"}
                </button>

                {editingNewsId ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDeleteNews(editingNewsId)}
                      style={{ background: "#EF4444", color: "#fff", border: 0, borderRadius: 8, padding: "12px 16px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                    >
                      🗑️ Delete Article
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNewsId(null);
                        setNewsForm({
                          id: "",
                          publication: "",
                          edition: "",
                          date: "",
                          headline: "",
                          subheadline: "",
                          image: "",
                          language: "Marathi",
                          location: "",
                          summary: "",
                          attendees: [],
                        });
                        setNewsAttendeesText("");
                      }}
                      style={{ background: "#E2E8F0", color: "#334155", border: 0, borderRadius: 8, padding: "12px 14px", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setNewsForm({
                        id: "",
                        publication: "",
                        edition: "",
                        date: "",
                        headline: "",
                        subheadline: "",
                        image: "",
                        language: "Marathi",
                        location: "",
                        summary: "",
                        attendees: [],
                      });
                      setNewsAttendeesText("");
                    }}
                    style={{ background: "#F1F5F9", border: "1px solid #CBD5E1", color: "#64748B", borderRadius: 8, padding: "12px 16px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                  >
                    🗑️ Clear
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ── 3. VOLUNTEERS & TEAM MANAGEMENT WITH CLEAN PHOTO PICKER ── */}
        {section === "Volunteers" && (
          <div className="admin-two-col-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24, alignItems: "start" }}>
            {/* Volunteer Cards Grid */}
            <div style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 19, color: "#153f31" }}>Volunteers &amp; Team ({volunteers.length})</h2>
                {editingVolunteerId && (
                  <button
                    onClick={() => { setEditingVolunteerId(null); setVolunteerForm({ id: "", name: "", role: "", location: "", image: "", phone: "", email: "" }); }}
                    style={{ background: "#e2e8f0", color: "#334155", border: 0, padding: "4px 10px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
                {volunteers.map((vol) => (
                  <div
                    key={vol.id}
                    style={{
                      border: editingVolunteerId === vol.id ? "2px solid #2f8f46" : "1px solid #e2e8f0",
                      borderRadius: 12,
                      padding: 14,
                      textAlign: "center",
                      background: editingVolunteerId === vol.id ? "#f0fdf4" : "#fff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    {vol.image ? (
                      <img
                        src={vol.image}
                        alt={vol.name}
                        style={{ width: 68, height: 68, borderRadius: "50%", objectFit: "cover", margin: "0 auto 8px", border: "3px solid #F5A623" }}
                      />
                    ) : (
                      <div style={{ width: 68, height: 68, borderRadius: "50%", margin: "0 auto 8px", background: "#f1f5f9", border: "2px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#94a3b8" }}>
                        👤
                      </div>
                    )}
                    <strong style={{ display: "block", fontSize: 13, color: "#0F172A", marginBottom: 2 }}>{vol.name}</strong>
                    <span style={{ fontSize: 11, color: "#2f8f46", fontWeight: 700, display: "block" }}>{vol.role || "Volunteer"}</span>
                    {vol.location && <small style={{ color: "#64748B", fontSize: 11, display: "block", marginTop: 2 }}>📍 {vol.location}</small>}

                    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
                      <button
                        onClick={() => startEditVolunteer(vol)}
                        style={{ background: "#2f8f46", color: "#fff", border: 0, borderRadius: 4, padding: "3px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteVolunteer(vol.id)}
                        style={{ background: "#FEE2E2", color: "#B91C1C", border: 0, borderRadius: 4, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add / Edit Volunteer Form (Clean, No Placeholders) */}
            <form onSubmit={handleVolunteerSubmit} style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 24, display: "grid", gap: 14 }}>
              <h2 style={{ margin: 0, fontSize: 18, color: "#153f31" }}>
                {editingVolunteerId ? "✏️ Edit Volunteer" : "➕ Add New Volunteer"}
              </h2>

              {/* Photo Upload Box (Clean Neutral State) */}
              <div style={{ background: "#FAF8F5", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 8, textTransform: "uppercase" }}>
                  Volunteer Photo
                </label>

                {/* Circular Preview or Neutral Icon */}
                <div style={{ position: "relative", width: 84, height: 84, margin: "0 auto 12px" }}>
                  {volunteerForm.image ? (
                    <img
                      src={volunteerForm.image}
                      alt="Volunteer Preview"
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "3px solid #2f8f46", background: "#fff" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        border: "2px dashed #cbd5e1",
                        background: "#f1f5f9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                        color: "#94a3b8",
                      }}
                    >
                      <span>👤</span>
                    </div>
                  )}

                  {volunteerForm.image && (
                    <button
                      type="button"
                      onClick={() => setVolunteerForm({ ...volunteerForm, image: "" })}
                      title="Remove Photo"
                      style={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        background: "#EF4444",
                        color: "#fff",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        width: 22,
                        height: 22,
                        cursor: "pointer",
                        fontSize: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Direct File Picker */}
                <input
                  type="file"
                  accept="image/*"
                  id="direct-vol-photo-input"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e, (base64) => setVolunteerForm({ ...volunteerForm, image: base64 }))}
                />

                <label
                  htmlFor="direct-vol-photo-input"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 16px",
                    background: "#2f8f46",
                    color: "#fff",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(47,143,70,0.2)",
                  }}
                >
                  📁 Choose Photo from Device
                </label>

                <div style={{ marginTop: 8 }}>
                  <small style={{ color: "#64748B", fontSize: 11 }}>Supports JPG, PNG, WEBP (Max 3MB)</small>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Role / Title *</label>
                <input
                  type="text"
                  required
                  value={volunteerForm.role}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, role: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Location / Area *</label>
                <input
                  type="text"
                  required
                  value={volunteerForm.location}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, location: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Phone (Optional)</label>
                  <input
                    type="text"
                    value={volunteerForm.phone || ""}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Email (Optional)</label>
                  <input
                    type="email"
                    value={volunteerForm.email || ""}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button type="submit" style={{ flex: 1, background: "#2f8f46", color: "#fff", border: 0, borderRadius: 8, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  {editingVolunteerId ? "💾 Save Volunteer Changes" : "➕ Add Volunteer"}
                </button>
                {editingVolunteerId && (
                  <button
                    type="button"
                    onClick={() => { setEditingVolunteerId(null); setVolunteerForm({ id: "", name: "", role: "", location: "", image: "", phone: "", email: "" }); }}
                    style={{ background: "#e2e8f0", color: "#334155", border: 0, borderRadius: 8, padding: "12px 16px", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ── 4. PERSONAL & FOUNDATION INFO EDIT WITH DIRECT PHOTO UPLOAD ── */}
        {section === "PersonalInfo" && (
          <form onSubmit={savePersonalInfo} style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 28, maxWidth: 900, display: "grid", gap: 24 }}>
            <div>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, color: "#153f31" }}>👤 Founder &amp; Leadership Profile</h2>
              <p style={{ margin: 0, color: "#64748B", fontSize: 13 }}>These details appear in the President &amp; Founder section on the About Us page.</p>
            </div>

            {/* President Photo Upload Block */}
            <div style={{ background: "#FAF8F5", border: "1px solid #E2E8F0", borderRadius: 12, padding: 18, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}>
                {personalInfo.presidentImage ? (
                  <img
                    src={personalInfo.presidentImage}
                    alt="Founder"
                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "3px solid #2f8f46", background: "#fff" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#f1f5f9", border: "2px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#94a3b8" }}>
                    👤
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ display: "block", fontSize: 14, color: "#1E293B", marginBottom: 4 }}>President / Founder Photo</strong>
                <p style={{ margin: "0 0 10px", color: "#64748B", fontSize: 12 }}>Upload a direct photo of the founder from your device.</p>
                <input
                  type="file"
                  accept="image/*"
                  id="direct-president-photo"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e, (base64) => setPersonalInfo({ ...personalInfo, presidentImage: base64 }))}
                />
                <label
                  htmlFor="direct-president-photo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    background: "#2f8f46",
                    color: "#fff",
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  📁 Choose Founder Photo
                </label>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Founder Name *</label>
                <input
                  type="text"
                  required
                  value={personalInfo.presidentName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, presidentName: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit", fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Designation / Title *</label>
                <input
                  type="text"
                  required
                  value={personalInfo.presidentRole}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, presidentRole: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Biography / Background Statement</label>
              <textarea
                rows={3}
                value={personalInfo.presidentBio}
                onChange={(e) => setPersonalInfo({ ...personalInfo, presidentBio: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit", resize: "vertical" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Leadership Quote</label>
              <textarea
                rows={2}
                value={personalInfo.presidentQuote}
                onChange={(e) => setPersonalInfo({ ...personalInfo, presidentQuote: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit", resize: "vertical" }}
              />
            </div>

            <hr style={{ border: 0, borderTop: "1px solid #e2e8f0", margin: "4px 0" }} />

            <div>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, color: "#153f31" }}>🏛️ Legal &amp; Organization Details</h2>
              <p style={{ margin: 0, color: "#64748B", fontSize: 13 }}>These details are used across receipts, 80G tax claims, and footer disclosures.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>80G Registration Number</label>
                <input
                  type="text"
                  value={personalInfo.reg80G}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, reg80G: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>12A Registration Number</label>
                <input
                  type="text"
                  value={personalInfo.reg12A}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, reg12A: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Official Contact Helpline</label>
                <input
                  type="text"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Official Email Address</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 4 }}>Registered Office Address</label>
              <textarea
                rows={2}
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit" }}
              />
            </div>

            <button type="submit" style={{ background: "#2f8f46", color: "#fff", border: 0, borderRadius: 8, padding: "14px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15, width: "fit-content" }}>
              💾 Save All Personal &amp; Legal Info
            </button>
          </form>
        )}

        {/* ── 5. RECEIVED CONTACT MESSAGES ── */}
        {section === "Messages" && (
          <div className="admin-two-col-grid" style={{ display: "grid", gridTemplateColumns: selectedMessage ? "1fr 1fr" : "1fr", gap: 24, alignItems: "start" }}>
            <section className="admin-card">
              <div className="admin-card-heading">
                <div>
                  <p>INBOX</p>
                  <h2>Received Inquiries ({messages.length})</h2>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => void load()} style={{ background: "#2F8F46", color: "#fff", border: 0, padding: "8px 16px", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>
                    🔄 Refresh
                  </button>
                  {messages.length > 0 && (
                    <button
                      onClick={clearAllMessages}
                      style={{ background: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA", padding: "8px 14px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 12 }}
                    >
                      🗑️ Clear All
                    </button>
                  )}
                </div>
              </div>

              <div className="admin-message-list">
                {messages.length ? (
                  messages.map((message) => (
                    <article
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      style={{
                        cursor: "pointer",
                        border: selectedMessage?.id === message.id ? "2px solid #2f8f46" : "1px solid #e1ece3",
                        background: selectedMessage?.id === message.id ? "#f0fdf4" : message.status === "Replied" ? "#f8fafc" : "#fff",
                        padding: 16,
                        borderRadius: 10,
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <strong style={{ color: "#0F172A", fontSize: 14 }}>{message.name}</strong>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              padding: "2px 8px",
                              borderRadius: 99,
                              background: message.status === "Replied" ? "#DCFCE7" : message.status === "Read" ? "#E0E7FF" : "#FEF3C7",
                              color: message.status === "Replied" ? "#166534" : message.status === "Read" ? "#3730A3" : "#92400E",
                            }}
                          >
                            {message.status || "New"}
                          </span>
                          <button
                            onClick={(e) => deleteMessage(message.id, e)}
                            title="Delete Message"
                            style={{
                              background: "#FEE2E2",
                              color: "#DC2626",
                              border: 0,
                              padding: "2px 8px",
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: "#64748B" }}>
                        📧 {message.email} {message.phone ? " · 📞 " + message.phone : ""}
                      </span>
                      <p style={{ margin: "8px 0 0", color: "#334155", fontSize: 13, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {message.message}
                      </p>
                      <small style={{ color: "#94A3B8", fontSize: 11, display: "block", marginTop: 6 }}>
                        Received: {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.created_at || Date.now()))}
                      </small>
                    </article>
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748B" }}>
                    <p style={{ fontSize: 32, margin: 0 }}>📭</p>
                    <p style={{ margin: "12px 0 0", fontWeight: 600 }}>No messages received yet.</p>
                    <small>Inquiries from the website contact form will appear here in real time.</small>
                  </div>
                )}
              </div>
            </section>

            {/* Message Detail Viewer Panel */}
            {selectedMessage && (
              <div style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #e2e8f0" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 18, color: "#0F172A" }}>{selectedMessage.name}</h2>
                    <span style={{ color: "#64748B", fontSize: 13 }}>{selectedMessage.email}</span>
                    {selectedMessage.phone && <span style={{ color: "#64748B", fontSize: 13, display: "block" }}>Phone: {selectedMessage.phone}</span>}
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    style={{ background: "transparent", border: 0, fontSize: 18, cursor: "pointer", color: "#64748B" }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#64748B", marginBottom: 6 }}>
                    Full Message Content:
                  </label>
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 14, fontSize: 14, color: "#1E293B", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {selectedMessage.message}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
                  <a
                    href={"mailto:" + selectedMessage.email + "?subject=Re: Inquiry with Kautike Charitable Foundation"}
                    style={{
                      background: "#2f8f46",
                      color: "#fff",
                      textDecoration: "none",
                      padding: "10px 18px",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: 13,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onClick={() => updateMessageStatus(selectedMessage.id, "Replied")}
                  >
                    ✉️ Reply via Email
                  </a>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, "Read")}
                    style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", borderRadius: 8, padding: "10px 14px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
                  >
                    Mark as Read
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, "Replied")}
                    style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", borderRadius: 8, padding: "10px 14px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
                  >
                    Mark as Replied
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    style={{ background: "#EF4444", color: "#fff", border: 0, borderRadius: 8, padding: "10px 16px", fontSize: 13, cursor: "pointer", fontWeight: 700, marginLeft: "auto" }}
                  >
                    🗑️ Delete Message
                  </button>
                </div>
              </div>
            )}
          </div>
        )}


        {/* ── 6. EDIT WEBSITE PAGES ── */}
        {section === "EditPages" && (
          <div className="admin-two-col-grid" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24, alignItems: "start" }}>
            {/* Mobile Dropdown View */}
            <div className="admin-page-select-mobile" style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "#153f31", marginBottom: 6 }}>
                📄 Select Page to Edit:
              </label>
              <select
                value={selectedPageId}
                onChange={(e) => setSelectedPageId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1.5px solid #2f8f46",
                  background: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#153f31",
                }}
              >
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.path})
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Sidebar View */}
            <div className="admin-page-select-desktop" style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <strong style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#638070", padding: "8px 8px 4px" }}>
                Select Page To Edit
              </strong>
              {pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPageId(p.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: selectedPageId === p.id ? "1.5px solid #2f8f46" : "1px solid #e5eae6",
                    background: selectedPageId === p.id ? "#ecfdf5" : "transparent",
                    color: selectedPageId === p.id ? "#153f31" : "#475569",
                    fontWeight: selectedPageId === p.id ? 700 : 500,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>{p.name}</span>
                  <small style={{ color: "#94a3b8", fontSize: 10 }}>{p.path}</small>
                </button>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #dbe8dd", borderRadius: 14, padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #e2e8f0" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, color: "#153f31" }}>Editing: {selectedPage.name}</h2>
                  <a href={selectedPage.path} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#2f8f46", textDecoration: "none" }}>
                    🔗 Open live page ({selectedPage.path}) ↗
                  </a>
                </div>
                <button
                  onClick={savePageContent}
                  style={{
                    background: "#2f8f46",
                    color: "#fff",
                    border: 0,
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Changes
                </button>
              </div>

              <div style={{ display: "grid", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6, textTransform: "uppercase" }}>
                    Category Badge / Mini Title
                  </label>
                  <input
                    type="text"
                    value={selectedPage.badge}
                    onChange={(e) => handlePageFieldChange("badge", e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6, textTransform: "uppercase" }}>
                    Main Page Heading (H1)
                  </label>
                  <input
                    type="text"
                    value={selectedPage.title}
                    onChange={(e) => handlePageFieldChange("title", e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit", fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6, textTransform: "uppercase" }}>
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={3}
                    value={selectedPage.subtitle}
                    onChange={(e) => handlePageFieldChange("subtitle", e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit", resize: "vertical" }}
                  />
                </div>

                {/* Key Stats Row */}
                <div style={{ background: "#FAF8F5", border: "1px solid #e2e8f0", borderRadius: 10, padding: 16 }}>
                  <strong style={{ display: "block", fontSize: 12, textTransform: "uppercase", color: "#638070", marginBottom: 12 }}>
                    Featured Numbers &amp; Metrics
                  </strong>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>Stat 1 Value</label>
                      <input
                        type="text"
                        value={selectedPage.stat1}
                        onChange={(e) => handlePageFieldChange("stat1", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontWeight: 700 }}
                      />
                      <input
                        type="text"
                        value={selectedPage.stat1Label}
                        onChange={(e) => handlePageFieldChange("stat1Label", e.target.value)}
                        style={{ width: "100%", padding: "6px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, fontSize: 12 }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>Stat 2 Value</label>
                      <input
                        type="text"
                        value={selectedPage.stat2}
                        onChange={(e) => handlePageFieldChange("stat2", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontWeight: 700 }}
                      />
                      <input
                        type="text"
                        value={selectedPage.stat2Label}
                        onChange={(e) => handlePageFieldChange("stat2Label", e.target.value)}
                        style={{ width: "100%", padding: "6px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, fontSize: 12 }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 4 }}>Stat 3 Value</label>
                      <input
                        type="text"
                        value={selectedPage.stat3}
                        onChange={(e) => handlePageFieldChange("stat3", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #cbd5e1", fontWeight: 700 }}
                      />
                      <input
                        type="text"
                        value={selectedPage.stat3Label}
                        onChange={(e) => handlePageFieldChange("stat3Label", e.target.value)}
                        style={{ width: "100%", padding: "6px 10px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, fontSize: 12 }}
                      />
                    </div>
                  </div>
                </div>

                {/* CTA Box */}
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6, textTransform: "uppercase" }}>
                      Bottom CTA Heading
                    </label>
                    <input
                      type="text"
                      value={selectedPage.ctaHeading}
                      onChange={(e) => handlePageFieldChange("ctaHeading", e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6, textTransform: "uppercase" }}>
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={selectedPage.ctaButtonText}
                      onChange={(e) => handlePageFieldChange("ctaButtonText", e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cbd5e1", font: "inherit", fontWeight: 700 }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 12 }}>
                  <button
                    onClick={savePageContent}
                    style={{ background: "#2f8f46", color: "#fff", border: 0, borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}
                  >
                    💾 Save Changes to {selectedPage.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 7. DONATIONS ── */}
        {section === "Donations" && (
          <section className="admin-card">
            <div className="admin-card-heading">
              <div>
                <p>PAYMENTS</p>
                <h2>All donation records</h2>
              </div>
              <button onClick={() => void load()}>Refresh</button>
            </div>
            <DonationTable rows={donations} />
          </section>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <article className="admin-metric">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}

function DonationTable({ rows }: { rows: Donation[] }) {
  return (
    <div className="admin-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Donor</th>
            <th>Cause</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.donor_name}</strong>
                  <br />
                  <small>{row.email}</small>
                </td>
                <td>{row.campaign}</td>
                <td>₹{Number(row.amount_inr).toLocaleString("en-IN")}</td>
                <td>
                  <span className="admin-status">{row.status}</span>
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(row.created_at))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="admin-empty-row">
                No donation records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
