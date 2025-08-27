import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function Modules() {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [certificateEarned, setCertificateEarned] = useState(false);
  const [showModuleQuiz, setShowModuleQuiz] = useState(false);
  const [moduleQuizAnswers, setModuleQuizAnswers] = useState({});
  const [moduleQuizSubmitted, setModuleQuizSubmitted] = useState(false);
  const [moduleQuizPassed, setModuleQuizPassed] = useState(false);
  const certificateCanvasRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: "Introduction to Media and Information Literacy",
      icon: "📘",
      description: "Module 1: Understand MIL, its importance, principles, and daily use.",
      content: [
        { type: "text", title: "1.1 What is Media and Information Literacy (MIL)?", content: "Media and Information Literacy (MIL) is the ability to access, analyze, evaluate, create, and communicate information and media in various forms (print, digital, audio, video, etc.).\n\nIn simple words:\nMIL helps us to understand the messages we see in news, social media, or advertisements, check if they are true, and use media responsibly.\n\nUNESCO's idea:\nMIL combines three literacies:\n• Media Literacy – understanding media messages\n• Information Literacy – finding and evaluating information\n• Digital Literacy – using digital technology responsibly" },
        { type: "text", title: "1.2 Why is MIL important in today's world?", content: "🌍 We live in an information-rich society where news, ads, and posts constantly influence us.\n\n📱 Every person with a smartphone is both a consumer and a creator of media.\n\n🚨 Rise of misinformation & fake news makes critical thinking necessary.\n\n🗳 MIL supports democracy, by helping citizens make informed decisions.\n\n👩‍💻 Helps in education, work, and personal growth.\n\nExample:\nIf you see a viral WhatsApp message claiming \"drinking hot water cures COVID-19,\" MIL teaches you to check if it comes from a credible health source like WHO, instead of blindly believing it." },
        { type: "text", title: "1.3 Core Concepts of MIL", content: "• All media messages are constructed – nothing is 100% neutral.\n• Media messages have purposes – to inform, entertain, or persuade.\n• People interpret media differently – the same movie or news may be understood differently by two people.\n• Media has embedded values & biases – ownership, culture, or politics may influence content.\n• Media and information shape perceptions – what we see/hear affects how we think about the world." },
        { type: "text", title: "1.4 MIL in Daily Life", content: "📺 Watching news channels → Who owns this channel? Is there bias?\n📱 Using social media → Are the posts verified? Is it misinformation?\n📖 Doing research for homework → Which website is trustworthy?\n🎬 Watching movies/ads → What stereotypes or hidden messages are being promoted?\n\nQuick Example:\nTwo news channels report on the same protest. One shows protesters as \"freedom fighters,\" the other as \"troublemakers.\"\nMIL helps us analyze both sides before forming an opinion." },
        { type: "text", title: "1.5 Learning Outcomes of Module 1", content: "After completing this module, you will be able to:\n✔ Explain what MIL means.\n✔ Understand why MIL is important in modern society.\n✔ Identify basic principles of media messages.\n✔ Recognize how MIL applies to everyday life." },
        { type: "text", title: "1.6 Activity / Exercise", content: "Think-Pair-Share:\n• Pick a news headline from two different sources about the same event.\n• Compare how each presents the story.\n• Discuss: What differences do you notice? Which seems more reliable and why?\n\nPersonal Reflection:\n• Write down one example of when you believed something online that turned out to be false.\n• How would MIL skills have helped you in that situation?" }
      ]
    },
    {
      id: 2,
      title: "Understanding Media",
      icon: "📰",
      description: "Module 2: Types of media, production, influence, and activities.",
      content: [
        { type: "text", title: "2.1 What is Media?", content: "Definition: Media is any channel or tool used to store, deliver, and exchange information with the public. It includes traditional platforms like newspapers and radio as well as modern platforms like YouTube, WhatsApp, and podcasts.\n\nMedia ≠ Neutral: Media does not simply \"show reality\" — it selects, frames, and presents reality in specific ways.\n\nExample:\nA cricket match is the same event, but:\n• A sports newspaper may highlight the statistics and player performance.\n• A TV channel may focus on visuals, celebrations, and drama.\n• A social media post may show memes or short clips of funny moments." },
        { type: "text", title: "2.2 Types of Media", content: "Print Media\n• Examples: Newspapers, magazines, books, flyers.\n• Features: In-depth analysis, permanent record.\n• Limitation: Slower than digital, declining in readership.\n\nBroadcast Media\n• Examples: Radio, television.\n• Features: Wide reach, live coverage, powerful visuals and sound.\n• Limitation: One-way communication, less interactive.\n\nDigital Media\n• Examples: Websites, blogs, podcasts, YouTube, Facebook, Instagram, TikTok.\n• Features: Fast, interactive, user-generated content.\n• Limitation: Fake news, echo chambers, algorithmic bias.\n\nFolk/Traditional Media\n• Examples: Street plays, posters, folk songs, puppet shows.\n• Features: Local relevance, cultural connection.\n• Limitation: Limited reach, less influence compared to digital." },
        { type: "text", title: "2.3 How Media Content is Produced", content: "Gatekeeping: Editors/journalists decide which news is \"worthy.\"\n\nOwnership: Who owns a media company can influence content. For example, a corporate-owned channel may avoid stories critical of business.\n\nAdvertising Pressure: Media often relies on ads for funding; this may lead to \"soft\" coverage of advertisers.\n\nAlgorithms: Social media platforms filter and recommend content based on your browsing history, creating \"filter bubbles.\"\n\nExample:\nIf you search for fitness content on YouTube, the algorithm will keep recommending fitness-related videos, narrowing your exposure to other topics." },
        { type: "text", title: "2.4 Media and Society", content: "Positive Role:\n• Educates (documentaries, awareness campaigns).\n• Gives voice to marginalized groups.\n• Holds governments accountable (investigative journalism).\n\nNegative Role:\n• Can spread hate speech or stereotypes.\n• May promote consumerism through heavy advertising.\n• Can manipulate public opinion with propaganda.\n\nCase Study:\nDuring a natural disaster, news media can spread life-saving information (relief camps, helplines).\nAt the same time, false rumors spread on WhatsApp can cause panic." },
        { type: "text", title: "2.5 Learning Outcomes of Module 2", content: "By the end of this module, learners will be able to:\n✔ Distinguish between different types of media.\n✔ Explain how media content is shaped by ownership, advertising, and algorithms.\n✔ Analyze how media influences society positively and negatively." },
        { type: "text", title: "2.6 Activities", content: "Daily Media Log:\n• Write down everything you read, watch, or listen to in a day.\n• Categorize into print, broadcast, digital, or traditional.\n• Reflect: Which do you trust most, and why?\n\nBias Spotting:\n• Choose two different news channels reporting the same political event.\n• Compare headlines, visuals, and tone.\n• Discuss: What biases can you detect?" }
      ]
    },
    {
      id: 3,
      title: "Information Literacy",
      icon: "📚",
      description: "Module 3: Data vs information, CRAAP test, ethics, and activities.",
      content: [
        { type: "text", title: "3.1 What is Information?", content: "Data vs. Information:\n• Data = raw facts (numbers, figures).\n• Information = data that has been processed and given meaning.\n• Knowledge = information you understand and apply.\n\nExample:\n• Data: \"28°C, 70% humidity.\"\n• Information: \"Today's weather is hot and humid.\"\n• Knowledge: \"I should wear light clothes and carry water.\"" },
        { type: "text", title: "3.2 What is Information Literacy?", content: "Definition: The set of skills that helps individuals locate, evaluate, and use information effectively and ethically.\n\nWhy it matters: In the digital age, we are flooded with information — some true, some false. Information literacy helps us separate signal from noise." },
        { type: "text", title: "3.3 Sources of Information", content: "Primary Sources\n• Original, firsthand evidence (research papers, eyewitness accounts, surveys).\n• Example: A scientist's published study on climate change.\n\nSecondary Sources\n• Interpretations or analyses of primary sources (textbooks, journalistic reports).\n• Example: A newspaper summarizing that climate change study.\n\nTertiary Sources\n• Summaries or digests (encyclopedias, Wikipedia, databases).\n• Example: A Wikipedia entry summarizing multiple articles on climate change." },
        { type: "text", title: "3.4 Evaluating Information: The CRAAP Test", content: "To test the reliability of any information, ask:\n\nCurrency – Is it up to date?\n• A 2005 tech article may be outdated today.\n\nRelevance – Does it answer your question?\n• A general lifestyle blog may not help for a medical project.\n\nAuthority – Who is the author/publisher? Are they credible?\n• A government website is more reliable than a random forum.\n\nAccuracy – Is it supported by evidence? Are there citations?\n• \"Garlic cures cancer\" without proof = unreliable.\n\nPurpose – Why was it created? To inform, persuade, sell, or entertain?\n• A skincare brand's blog about \"best creams\" may be biased." },
        { type: "text", title: "3.5 Information Ethics", content: "Plagiarism: Copying without giving credit is unethical.\n\nCopyright: Legal protection for creators of content.\n\nFair Use: Limited use of copyrighted material for education, commentary, or parody.\n\nOpen Access: Free, legal resources for the public (e.g., Creative Commons, PubMed Central)." },
        { type: "text", title: "3.6 Learning Outcomes of Module 3", content: "By the end of this module, learners will be able to:\n✔ Differentiate between data, information, and knowledge.\n✔ Identify and categorize sources of information.\n✔ Evaluate sources using the CRAAP test.\n✔ Apply ethical practices when using information." },
        { type: "text", title: "3.7 Activities", content: "Source Hunt:\n• Search for information about \"Artificial Intelligence in Education.\"\n• Collect one primary, one secondary, and one tertiary source.\n• Share how each one differs in content and depth.\n\nFact-Check:\n• Take a viral WhatsApp/Instagram post.\n• Apply the CRAAP test step by step.\n• Decide if it is trustworthy.\n\nPlagiarism Practice:\n• Take a short paragraph from Wikipedia.\n• Rewrite it in your own words and cite the source.\n• Compare original vs. paraphrased." }
      ]
    },
    {
      id: 4,
      title: "Digital Literacy",
      icon: "💻",
      description: "Module 4: Using technology effectively, safely, and responsibly.",
      content: [
        { type: "text", title: "4.1 What is Digital Literacy?", content: "Definition: The ability to use digital technologies (computers, smartphones, internet) effectively, responsibly, and safely.\n\nGoes beyond technical skills → also includes critical thinking, online safety, and responsible behavior.\n\nSimple Example:\nKnowing how to Google something = technical skill.\nKnowing which result is trustworthy = digital literacy." },
        { type: "text", title: "4.2 Key Components of Digital Literacy", content: "Access\n• Being able to use devices (PCs, smartphones, tablets).\n• Understanding software (apps, browsers, tools).\n\nNavigation\n• Using search engines effectively.\n• Understanding how websites and apps are structured.\n\nDigital Footprint\n• Everything you post online leaves a trace.\n• Example: A tweet from 10 years ago may still affect your job interview.\n\nCyber Safety & Security\n• Protecting passwords, avoiding phishing scams, safe online banking.\n• Awareness of online fraud, cyberbullying, identity theft.\n\nDigital Responsibility\n• Respecting others online (no trolling, no hate speech).\n• Avoiding piracy, respecting copyrights.\n• Practicing netiquette (polite online communication)." },
        { type: "text", title: "4.3 Benefits of Digital Literacy", content: "• Better opportunities for education (online courses, e-books).\n• Enhances employment prospects (digital jobs, freelancing).\n• Enables global communication (email, Zoom, social media).\n• Helps in civic participation (e-voting, online petitions, social movements)." },
        { type: "text", title: "4.4 Risks of Poor Digital Literacy", content: "• Falling for scams or fake websites.\n• Oversharing personal data.\n• Getting trapped in echo chambers (only seeing one-sided content).\n• Spreading misinformation unknowingly.\n\nCase Example:\nMany people share \"fake bank SMS alerts\" without verifying, leading to fraud.\nA digitally literate person would check sender details, URL, and confirm with the official bank website." },
        { type: "text", title: "4.5 Learning Outcomes of Module 4", content: "By the end of this module, learners will be able to:\n✔ Define digital literacy and explain its importance.\n✔ Navigate search engines and online platforms responsibly.\n✔ Understand risks like phishing, cyberbullying, and echo chambers.\n✔ Practice safe and ethical behavior online." },
        { type: "text", title: "4.6 Activities", content: "Digital Footprint Check:\n• Google your name.\n• List what kind of personal information is visible publicly.\n• Reflect: Would you be comfortable if a future employer saw this?\n\nPhishing Awareness Game:\n• Look at 3 email samples (one genuine, two fake).\n• Identify which are phishing attempts (clues: spelling errors, fake URLs, urgency).\n\nSearch Challenge:\n• Search for: \"Impact of social media on teenagers.\"\n• Compare results from a news website, a blog, and a research journal.\n• Which seems most reliable, and why?" }
      ]
    },
    {
      id: 5,
      title: "Media Analysis & Critical Thinking",
      icon: "🧠",
      description: "Module 5: Analyze media, detect bias, and fact-check effectively.",
      content: [
        { type: "text", title: "5.1 What is Media Analysis?", content: "Definition: The process of studying, questioning, and interpreting media messages to understand their hidden meanings, values, and impact.\n\nMedia analysis helps us move from passive consumers → to active, critical thinkers." },
        { type: "text", title: "5.2 Why Critical Thinking is Important in Media", content: "Media is not just \"what happened\" → it's \"how someone chose to show what happened.\"\n\nCritical thinking protects us from:\n• Bias → Favoritism towards one side.\n• Stereotypes → Oversimplified views about groups.\n• Propaganda → Manipulation to support an agenda.\n• Fake News → False info spread to mislead." },
        { type: "text", title: "5.3 Techniques of Media Analysis", content: "Who created this message?\n• Individual, company, government, activist group?\n\nWhat is the purpose?\n• To inform, persuade, sell, or entertain?\n\nWhat techniques are used to attract attention?\n• Music, colors, celebrity endorsements, emotional words?\n\nWhat values or beliefs are represented?\n• Cultural, political, or economic biases.\n\nWho benefits and who is harmed?\nExample: A fast-food ad benefits the company but may harm public health if it encourages junk food." },
        { type: "text", title: "5.4 Misinformation, Disinformation, and Malinformation", content: "Misinformation = False info shared without intent to harm.\n• Example: Sharing a wrong fact about COVID unknowingly.\n\nDisinformation = False info created to deliberately mislead.\n• Example: Fake news claiming a celebrity has died.\n\nMalinformation = Genuine info shared with harmful intent.\n• Example: Leaking private photos or documents." },
        { type: "text", title: "5.5 Tools for Fact-Checking", content: "• Google Fact Check tools.\n• Reverse Image Search (to check if viral images are old/reused).\n• Websites like AltNews, Snopes, FactCheck.org." },
        { type: "text", title: "5.6 Learning Outcomes of Module 5", content: "By the end of this module, learners will be able to:\n✔ Apply critical thinking questions to any media message.\n✔ Identify bias, stereotypes, and propaganda in media.\n✔ Differentiate between misinformation, disinformation, and malinformation.\n✔ Use tools and methods for fact-checking." },
        { type: "text", title: "5.7 Activities", content: "Ad Breakdown:\n• Pick a TV commercial or Instagram ad.\n• Answer: Who created it? What techniques are used? What values are shown? Who benefits?\n\nFake News Spotting:\n• Take a viral WhatsApp forward or Twitter post.\n• Investigate using Google search/reverse image search.\n• Decide: Is it misinformation, disinformation, or malinformation?\n\nBias Comparison:\n• Compare headlines from two newspapers on the same protest.\n• Identify differences in wording, images, and framing.\n• Discuss: Which one seems more balanced?" }
      ]
    },
    {
      id: 6,
      title: "Communication & Media Creation",
      icon: "🎥",
      description: "Module 6: Communication process, ethical creation, and practical tools.",
      content: [
        { type: "text", title: "6.1 What is Communication?", content: "Definition: The process of exchanging information, ideas, or feelings between people through words, visuals, sounds, or gestures.\n\nTypes of Communication:\n• Verbal – spoken/written words.\n• Non-verbal – gestures, expressions, body language.\n• Visual – images, videos, graphics.\n• Digital – emails, chats, social media posts." },
        { type: "text", title: "6.2 Basics of Communication Theory", content: "Sender → Message → Channel → Receiver → Feedback\n\nExample:\n• Sender: Teacher\n• Message: Lesson on climate change\n• Channel: PowerPoint presentation\n• Receiver: Students\n• Feedback: Students' questions" },
        { type: "text", title: "6.3 Media Creation in the Digital Age", content: "• Anyone with a smartphone is now a content creator.\n• Examples: Blogging, YouTube, TikTok, Instagram reels, podcasts.\n• Citizen Journalism: Ordinary people reporting news via social media." },
        { type: "text", title: "6.4 Principles of Ethical & Effective Media Creation", content: "Accuracy – Verify facts before publishing.\n\nClarity – Simple and understandable messages.\n\nRespect & Inclusivity – Avoid hate speech, stereotypes, and offensive content.\n\nCopyright Awareness – Don't copy music/images without permission.\n\nResponsibility – Think of consequences before sharing.\n\nExample:\nIf you make a video about health tips, cite doctors/research instead of random blogs.\nIf using background music, choose royalty-free tracks." },
        { type: "text", title: "6.5 Tools for Media Creation", content: "Text: Blogs (WordPress, Medium), Canva for posters.\n\nAudio: Audacity, Anchor (podcasts).\n\nVideo: YouTube, CapCut, Adobe Premiere Rush.\n\nGraphics: Canva, Figma, Photoshop." },
        { type: "text", title: "6.6 Learning Outcomes of Module 6", content: "By the end of this module, learners will be able to:\n✔ Explain the communication process.\n✔ Create media messages responsibly and ethically.\n✔ Use digital tools for content creation.\n✔ Understand the role of citizen journalism." },
        { type: "text", title: "6.7 Activities", content: "Poster Creation\n• Make a digital poster about \"Say No to Fake News\" using Canva.\n• Share with peers for feedback.\n\nMini-News Report\n• Record a 1-minute video reporting a real event in your neighborhood (e.g., a college fest).\n• Apply accuracy, clarity, and respect.\n\nCopyright Challenge\n• Find an image online.\n• Identify if it's copyright protected or under Creative Commons.\n• Reflect: Would you be allowed to use it in a project?" }
      ]
    },
    {
      id: 7,
      title: "MIL in Society & Future Trends",
      icon: "🚀",
      description: "Module 7: MIL for citizenship, culture, SDGs, and future tech.",
      content: [
        { type: "text", title: "7.1 MIL for Active Citizenship", content: "MIL equips citizens to:\n• Participate in democracy (informed voting, debates).\n• Demand transparency from governments.\n• Advocate for social justice using media platforms.\n\nExample:\nMovements like #MeToo and #FridaysForFuture spread awareness through social media." },
        { type: "text", title: "7.2 MIL and Culture", content: "• Media shapes culture (movies, music, memes).\n• Globalization → Cultures mix (K-pop in India, Bollywood in the US).\n• Need for cultural sensitivity when creating or consuming media." },
        { type: "text", title: "7.3 MIL and Sustainable Development", content: "• Media campaigns raise awareness on climate change, gender equality, health.\n• UNESCO highlights MIL as key to achieving SDG 16 (Peace, Justice, Strong Institutions).\n\nExample:\nSocial media campaigns against plastic pollution encourage eco-friendly practices." },
        { type: "text", title: "7.4 Future of Media & Information Literacy", content: "Artificial Intelligence (AI)\n• Algorithms decide what you see online.\n• Deepfakes challenge truth verification.\n\nVirtual Reality (VR) & Augmented Reality (AR)\n• Immersive storytelling → education, gaming, journalism.\n\nBig Data & Privacy\n• Companies track user behavior → raises concerns about surveillance.\n\nDigital Divide\n• Not everyone has equal access to internet and digital skills.\n• Future MIL must focus on inclusivity." },
        { type: "text", title: "7.5 Skills for the Future", content: "• Critical Thinking → to evaluate AI-driven media.\n• Adaptability → as new media tools emerge.\n• Ethical Responsibility → to counter misuse of tech.\n• Lifelong Learning → MIL isn't a one-time skill; it evolves." },
        { type: "text", title: "7.6 Learning Outcomes of Module 7", content: "By the end of this module, learners will be able to:\n✔ Recognize the role of MIL in democracy, culture, and sustainable development.\n✔ Identify challenges and opportunities of emerging technologies.\n✔ Apply MIL skills to become responsible digital citizens.\n✔ Understand the importance of lifelong learning in MIL." },
        { type: "text", title: "7.7 Activities", content: "Case Study Discussion\n• Research how social media influenced one global movement (#MeToo, Arab Spring, Black Lives Matter).\n• Present positives and negatives.\n\nDeepfake Awareness Exercise\n• Watch a deepfake video online (search on YouTube for educational examples).\n• Discuss: How can you identify it? What dangers do deepfakes pose?\n\nFuture Vision\n• Write a short essay: \"How will media literacy look in 2035?\"\n• Imagine new technologies and new risks." }
      ]
    }
  ];

  // 2-3 quick questions for each module, mapped by index
  const moduleQuizzes = [
    [
      { q: "MIL combines media, information, and digital literacies.", options: ["True", "False"], correct: 0 },
      { q: "All media messages are:", options: ["Neutral", "Constructed"], correct: 1 },
      { q: "Two people can interpret the same news differently.", options: ["True", "False"], correct: 0 }
    ],
    [
      { q: "Media is best described as:", options: ["A way to store and share info", "Only newspapers"], correct: 0 },
      { q: "Which is a limitation of digital media?", options: ["Interactive content", "Algorithmic bias"], correct: 1 },
      { q: "Editors deciding what is newsworthy is called:", options: ["Gatekeeping", "Crowdsourcing"], correct: 0 }
    ],
    [
      { q: "In CRAAP, A stands for:", options: ["Accuracy", "Availability"], correct: 0 },
      { q: "Primary sources are:", options: ["Original evidence", "Summaries of research"], correct: 0 },
      { q: "Copying without credit is:", options: ["Plagiarism", "Paraphrasing"], correct: 0 }
    ],
    [
      { q: "Digital footprint means:", options: ["Offline behavior", "Traces you leave online"], correct: 1 },
      { q: "A common phishing clue is:", options: ["Urgent language", "Calm tone"], correct: 0 },
      { q: "Good digital behavior includes:", options: ["Sharing unverified info", "Respecting privacy"], correct: 1 }
    ],
    [
      { q: "Propaganda aims to:", options: ["Inform neutrally", "Push an agenda"], correct: 1 },
      { q: "Disinformation is:", options: ["False info shared by mistake", "False info shared to mislead"], correct: 1 },
      { q: "A tool to verify images is:", options: ["Reverse image search", "Random meme page"], correct: 0 }
    ],
    [
      { q: "Citizen journalism means:", options: ["Only professionals report", "Ordinary people report news"], correct: 1 },
      { q: "Ethical creation requires:", options: ["Accuracy and respect", "Clickbait"], correct: 0 },
      { q: "Using copyright music without permission is:", options: ["Okay", "Not allowed"], correct: 1 }
    ],
    [
      { q: "Deepfakes are enabled by:", options: ["AI", "Paper editing"], correct: 0 },
      { q: "MIL supports which SDG noted by UNESCO?", options: ["SDG 16", "SDG 2"], correct: 0 },
      { q: "Digital divide refers to:", options: ["Equal access for all", "Unequal access to internet/skills"], correct: 1 }
    ]
  ];

  const assessmentQuestions = [
    {
      question: "What is the primary purpose of media literacy?",
      options: [
        "To consume more media content",
        "To access, analyze, evaluate, create, and act using all forms of communication",
        "To avoid all media sources",
        "To only trust official news sources"
      ],
      correct: 1
    },
    {
      question: "Which of the following is NOT part of the CRAAP test for evaluating sources?",
      options: [
        "Currency",
        "Relevance", 
        "Authority",
        "Popularity"
      ],
      correct: 3
    },
    {
      question: "What is confirmation bias?",
      options: [
        "A type of fact-checking tool",
        "Seeking information that confirms existing beliefs",
        "A reliable source of information",
        "A method for detecting deepfakes"
      ],
      correct: 1
    },
    {
      question: "Which of these is a reliable fact-checking website?",
      options: [
        "Random blog posts",
        "Social media rumors",
        "Snopes.com",
        "Anonymous online forums"
      ],
      correct: 2
    },
    {
      question: "What is an echo chamber in social media?",
      options: [
        "A type of social media platform",
        "An environment where people only encounter information that confirms their existing beliefs",
        "A tool for fact-checking",
        "A method for detecting bias"
      ],
      correct: 1
    }
  ];

  const handleModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleAssessmentAnswer = (questionIndex, selectedOption) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
  };

  const calculateAssessmentScore = () => {
    let correct = 0;
    assessmentQuestions.forEach((question, index) => {
      if (assessmentAnswers[index] === question.correct) {
        correct++;
      }
    });
    return { correct, total: assessmentQuestions.length };
  };

  const handleSubmitAssessment = () => {
    const { correct, total } = calculateAssessmentScore();
    const passed = correct >= Math.ceil(total * 0.7); // 70% passing score
    
    if (passed) {
      setCertificateEarned(true);
    }
    
    setShowResults(true);
  };

  const handleRetryAssessment = () => {
    setAssessmentAnswers({});
    setShowResults(false);
    setCertificateEarned(false);
  };

  const handleContinue = () => {
    navigate("/", { replace: true });
  };

  const canTakeAssessment = completedModules.length >= 6 || currentModule === 6;

  // Module quiz handlers
  const openModuleQuiz = () => {
    setModuleQuizAnswers({});
    setModuleQuizSubmitted(false);
    setModuleQuizPassed(false);
    setShowModuleQuiz(true);
  };

  const handleModuleQuizAnswer = (questionIndex, selectedOption) => {
    setModuleQuizAnswers(prev => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const calculateModuleQuizScore = () => {
    const quiz = moduleQuizzes[currentModule] || [];
    let correct = 0;
    quiz.forEach((q, i) => {
      if (moduleQuizAnswers[i] === q.correct) correct++;
    });
    return { correct, total: quiz.length };
  };

  const submitModuleQuiz = () => {
    const { correct, total } = calculateModuleQuizScore();
    const passed = correct >= Math.max(1, Math.ceil(total * 0.6)); // 60% pass, at least 1
    setModuleQuizSubmitted(true);
    setModuleQuizPassed(passed);
    if (passed) {
      handleModuleComplete(modules[currentModule].id);
    }
  };

  const proceedAfterQuiz = () => {
    setShowModuleQuiz(false);
    setModuleQuizSubmitted(false);
    setModuleQuizPassed(false);
    setModuleQuizAnswers({});
    if (currentModule < modules.length - 1) {
      setCurrentModule(prev => prev + 1);
    } else {
      setShowAssessment(true);
    }
  };

  // Download certificate as PNG drawn on a canvas (no external deps)
  const downloadCertificate = () => {
    const username = user?.username || "Learner";
    const date = new Date().toLocaleDateString();
    const { correct, total } = calculateAssessmentScore();

    // Create canvas
    const canvas = document.createElement("canvas");
    const width = 1400;
    const height = 900;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#fbbf24");
    grad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 16;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 72px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Completion", width / 2, 200);

    // Subtitle
    ctx.font = "bold 42px Arial";
    ctx.fillText("Media and Information Literacy", width / 2, 280);

    // Trophy
    ctx.font = "72px Arial";
    ctx.fillText("🏆", width / 2, 360);

    // Name
    ctx.font = "bold 56px Arial";
    ctx.fillText(username, width / 2, 460);

    // Body
    ctx.font = "28px Arial";
    ctx.fillText("has successfully completed all 7 modules and the final assessment.", width / 2, 520);
    ctx.fillText(`Score: ${correct}/${total}  |  Issued on ${date}`, width / 2, 570);

    // Signature line
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#1e293b";
    ctx.beginPath();
    ctx.moveTo(width / 2 - 200, 680);
    ctx.lineTo(width / 2 + 200, 680);
    ctx.stroke();
    ctx.font = "bold 22px Arial";
    ctx.fillText("Director, MIL Program", width / 2, 715);

    // Download
    const link = document.createElement("a");
    link.download = `MIL-Certificate-${username.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
      padding: "40px 20px",
      color: "#e5e5e5"
    }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 60,
        maxWidth: "1200px",
        margin: "0 auto 60px auto",
        padding: "0 20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div>
            <h1 style={{ 
              fontSize: 42, 
              fontWeight: 800, 
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              textShadow: "0 4px 8px rgba(0,0,0,0.3)"
            }}>
              MIL Modules
            </h1>
            <p style={{ 
              fontSize: 16, 
              color: "#94a3b8", 
              margin: "6px 0 0 0",
              fontWeight: 500,
              letterSpacing: "0.5px"
            }}>
              Master media and information literacy
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/app")}
          style={{
            padding: "14px 28px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #374151, #4b5563)",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 15,
            transition: "all 0.3s ease"
          }}
        >
          🌳 Back to Tree
        </button>
      </div>

      {!showAssessment ? (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Progress Indicator */}
          <div style={{ 
            marginBottom: 40,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: "24px 32px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 600 }}>
                Module {currentModule + 1} of {modules.length}
              </span>
              <span style={{ 
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: 16, 
                fontWeight: 700 
              }}>
                {Math.round(((currentModule + 1) / modules.length) * 100)}%
              </span>
            </div>
            <div style={{ 
              width: "100%", 
              height: 12, 
              background: "rgba(255, 255, 255, 0.1)", 
              borderRadius: 6,
              overflow: "hidden"
            }}>
              <div 
                style={{ 
                  width: `${((currentModule + 1) / modules.length) * 100}%`, 
                  height: "100%", 
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b)", 
                  borderRadius: 6,
                  transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
                }} 
              />
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#94a3b8" }}>
              Completed: {completedModules.length}/7 modules
            </div>
          </div>

          {/* Module Content */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: 40, 
            borderRadius: 24, 
            marginBottom: 40,
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40
              }}>
                {modules[currentModule].icon}
              </div>
              <div>
                <h2 style={{ 
                  fontSize: 32, 
                  marginBottom: 8, 
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 700
                }}>
                  {modules[currentModule].title}
                </h2>
                <p style={{ 
                  fontSize: 18, 
                  color: "#94a3b8", 
                  fontWeight: 500
                }}>
                  {modules[currentModule].description}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {modules[currentModule].content.map((section, index) => (
                <div key={index} style={{
                  padding: 24,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 16,
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <h3 style={{ 
                    fontSize: 24, 
                    marginBottom: 16, 
                    color: "#fbbf24",
                    fontWeight: 600
                  }}>
                    {section.title}
                  </h3>
                  <div style={{ 
                    fontSize: 16, 
                    color: "#e2e8f0", 
                    lineHeight: 1.6,
                    whiteSpace: "pre-line"
                  }}>
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation / Quiz gate */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
              <button
                onClick={() => setCurrentModule(prev => Math.max(0, prev - 1))}
                disabled={currentModule === 0}
                style={{
                  padding: "16px 32px",
                  borderRadius: 16,
                  background: currentModule === 0 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "linear-gradient(135deg, #6b7280, #4b5563)",
                  color: "#ffffff",
                  border: "none",
                  cursor: currentModule === 0 ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  fontSize: 16,
                  opacity: currentModule === 0 ? 0.5 : 1
                }}
              >
                ← Previous Module
              </button>
              
              {!showModuleQuiz ? (
                <button
                  onClick={openModuleQuiz}
                  style={{
                    padding: "16px 32px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    color: "#1e293b",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 16
                  }}
                >
                  📝 Take Module {currentModule + 1} Quiz
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Module Quiz Modal/Section */}
          {showModuleQuiz && (
            <div style={{ maxWidth: 900, margin: "0 auto 60px auto" }}>
              <div style={{ 
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
                padding: 40, 
                borderRadius: 24, 
                border: "1px solid rgba(255, 255, 255, 0.15)"
              }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <h3 style={{ 
                    fontSize: 28, 
                    marginBottom: 8, 
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 800
                  }}>
                    Module {currentModule + 1} Quick Quiz
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: 16 }}>Answer the questions to proceed</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {(moduleQuizzes[currentModule] || []).map((q, i) => (
                    <div key={i} style={{
                      padding: 24,
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 16,
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                      <div style={{ fontSize: 18, color: "#e2e8f0", marginBottom: 12, fontWeight: 600 }}>
                        {i + 1}. {q.q}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {q.options.map((opt, oi) => (
                          <button
                            key={oi}
                            onClick={() => handleModuleQuizAnswer(i, oi)}
                            style={{
                              padding: "14px 16px",
                              borderRadius: 12,
                              border: "2px solid",
                              borderColor: moduleQuizAnswers[i] === oi ? "#fbbf24" : "rgba(255,255,255,0.2)",
                              background: moduleQuizAnswers[i] === oi ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.05)",
                              color: moduleQuizAnswers[i] === oi ? "#fbbf24" : "#e2e8f0",
                              textAlign: "left",
                              cursor: "pointer",
                              fontSize: 15,
                              fontWeight: 500
                            }}
                          >
                            {String.fromCharCode(65 + oi)}. {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {!moduleQuizSubmitted ? (
                  <div style={{ textAlign: "center", marginTop: 24 }}>
                    <button
                      onClick={submitModuleQuiz}
                      disabled={Object.keys(moduleQuizAnswers).length < (moduleQuizzes[currentModule]?.length || 0)}
                      style={{
                        padding: "16px 32px",
                        borderRadius: 16,
                        background: Object.keys(moduleQuizAnswers).length < (moduleQuizzes[currentModule]?.length || 0)
                          ? "rgba(255,255,255,0.1)"
                          : "linear-gradient(135deg, #10b981, #059669)",
                        color: "#ffffff",
                        border: "none",
                        cursor: Object.keys(moduleQuizAnswers).length < (moduleQuizzes[currentModule]?.length || 0) ? "not-allowed" : "pointer",
                        fontWeight: 700,
                        fontSize: 16,
                        opacity: Object.keys(moduleQuizAnswers).length < (moduleQuizzes[currentModule]?.length || 0) ? 0.5 : 1
                      }}
                    >
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginTop: 24 }}>
                    {moduleQuizPassed ? (
                      <>
                        <div style={{ color: "#10b981", fontWeight: 700, marginBottom: 12 }}>Great! You passed.</div>
                        <button
                          onClick={proceedAfterQuiz}
                          style={{
                            padding: "16px 32px",
                            borderRadius: 16,
                            background: currentModule < modules.length - 1 ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "linear-gradient(135deg, #10b981, #059669)",
                            color: currentModule < modules.length - 1 ? "#1e293b" : "#ffffff",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: 16
                          }}
                        >
                          {currentModule < modules.length - 1 ? "Next Module →" : "Proceed to Final Assessment"}
                        </button>
                      </>
                    ) : (
                      <>
                        <div style={{ color: "#ef4444", fontWeight: 700, marginBottom: 12 }}>Not quite. Try again.</div>
                        <button
                          onClick={() => { setModuleQuizSubmitted(false); setModuleQuizAnswers({}); }}
                          style={{
                            padding: "16px 32px",
                            borderRadius: 16,
                            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                            color: "#1e293b",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: 16
                          }}
                        >
                          Retry Quiz
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : !showResults ? (
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Assessment */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: 40, 
            borderRadius: 24, 
            marginBottom: 40,
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ 
                fontSize: 36, 
                marginBottom: 16, 
                background: "linear-gradient(135deg, #10b981, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 700
              }}>
                Final Assessment
              </h2>
              <p style={{ 
                fontSize: 18, 
                color: "#94a3b8", 
                fontWeight: 500
              }}>
                Test your knowledge of Media and Information Literacy
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {assessmentQuestions.map((question, index) => (
                <div key={index} style={{
                  padding: 24,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 16,
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <h3 style={{ 
                    fontSize: 20, 
                    marginBottom: 20, 
                    color: "#e2e8f0",
                    fontWeight: 600
                  }}>
                    {index + 1}. {question.question}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAssessmentAnswer(index, optionIndex)}
                        style={{
                          padding: "16px 20px",
                          borderRadius: 12,
                          border: "2px solid",
                          borderColor: assessmentAnswers[index] === optionIndex 
                            ? "#10b981" 
                            : "rgba(255, 255, 255, 0.2)",
                          background: assessmentAnswers[index] === optionIndex 
                            ? "rgba(16, 185, 129, 0.15)" 
                            : "rgba(255, 255, 255, 0.05)",
                          color: assessmentAnswers[index] === optionIndex ? "#10b981" : "#e2e8f0",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: 16,
                          fontWeight: 500
                        }}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button
                onClick={handleSubmitAssessment}
                disabled={Object.keys(assessmentAnswers).length < assessmentQuestions.length}
                style={{
                  padding: "20px 40px",
                  borderRadius: 16,
                  background: Object.keys(assessmentAnswers).length < assessmentQuestions.length
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "linear-gradient(135deg, #10b981, #059669)",
                  color: "#ffffff",
                  border: "none",
                  cursor: Object.keys(assessmentAnswers).length < assessmentQuestions.length ? "not-allowed" : "pointer",
                  fontWeight: 700,
                  fontSize: 18,
                  opacity: Object.keys(assessmentAnswers).length < assessmentQuestions.length ? 0.5 : 1
                }}
              >
                🎯 Submit Assessment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Results */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            padding: 50, 
            borderRadius: 24, 
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            {certificateEarned ? (
              <>
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 30px auto",
                  fontSize: 48,
                  animation: "pulse 2s infinite"
                }}>
                  🏆
                </div>
                
                <h2 style={{ 
                  fontSize: 36, 
                  marginBottom: 20, 
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800
                }}>
                  Congratulations!
                </h2>
                
                <div style={{ marginBottom: 40 }}>
                  <div style={{ 
                    fontSize: 24, 
                    marginBottom: 12,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700
                  }}>
                    Your Score: {calculateAssessmentScore().correct}/{calculateAssessmentScore().total}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <button
                    onClick={downloadCertificate}
                    style={{
                      padding: "14px 28px",
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                      color: "#1e293b",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: 20
                    }}
                  >
                    ⬇️ Download Certificate (PNG)
                  </button>
                </div>
                
                <div style={{ marginBottom: 40 }}>
                  <p style={{ 
                    fontSize: 18, 
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 30,
                    fontWeight: 600
                  }}>
                    You've successfully completed the MIL Modules and earned your certificate!
                  </p>
                  
                  {/* Certificate Display */}
                  <div style={{
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    padding: "40px",
                    borderRadius: "20px",
                    margin: "30px 0",
                    border: "4px solid #ffffff"
                  }}>
                    <div style={{ fontSize: 48, marginBottom: 20 }}>🏆</div>
                    <h3 style={{ 
                      fontSize: 28, 
                      color: "#1e293b", 
                      fontWeight: 800,
                      marginBottom: 10
                    }}>
                      Certificate of Completion
                    </h3>
                    <p style={{ 
                      fontSize: 18, 
                      color: "#1e293b", 
                      fontWeight: 600,
                      marginBottom: 20
                    }}>
                      Media and Information Literacy
                    </p>
                    <p style={{ 
                      fontSize: 16, 
                      color: "#374151", 
                      fontWeight: 500
                    }}>
                      This is to certify that {user?.username} has successfully completed all 7 modules of Media and Information Literacy training.
                    </p>
                    <div style={{ 
                      fontSize: 14, 
                      color: "#6b7280", 
                      marginTop: 20,
                      fontStyle: "italic"
                    }}>
                      Issued on {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  style={{
                    padding: "20px 40px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    color: "#1e293b",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 18
                  }}
                >
                  🚀 Continue to Learning Tree
                </button>
              </>
            ) : (
              <>
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 30px auto",
                  fontSize: 48
                }}>
                  😔
                </div>
                
                <h2 style={{ 
                  fontSize: 36, 
                  marginBottom: 20, 
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800
                }}>
                  Try Again
                </h2>
                
                <div style={{ marginBottom: 40 }}>
                  <div style={{ 
                    fontSize: 24, 
                    marginBottom: 12,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700
                  }}>
                    Your Score: {calculateAssessmentScore().correct}/{calculateAssessmentScore().total}
                  </div>
                </div>

                <button
                  onClick={handleRetryAssessment}
                  style={{
                    padding: "20px 40px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    color: "#1e293b",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 18
                  }}
                >
                  🔄 Retry Assessment
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
