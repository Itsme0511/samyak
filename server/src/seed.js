// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Level from "./models/Level.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gameApp";

const seedLevels = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB ✅");

    // Clear old levels
    await Level.deleteMany();

    // Insert sample levels with quiz questions
    const levels = [
      {
        title: "Basics",
        number: 1,
        questions: [
          {
            question: "What does MIL stand for?",
            options: [
              "Media and Information Literacy",
              "Media and Internet Learning",
              "Media and Information Learning",
              "Media and Internet Literacy"
            ],
            correctAnswer: 0,
            explanation: "MIL stands for Media and Information Literacy, which is the ability to access, analyze, evaluate, and create media and information."
          },
          {
            question: "Which of the following is NOT a component of media literacy?",
            options: [
              "Access to media",
              "Analysis of media content",
              "Creation of media",
              "Ignoring media sources"
            ],
            correctAnswer: 3,
            explanation: "Ignoring media sources is not a component of media literacy. The key components are access, analysis, evaluation, and creation."
          },
          {
            question: "What is the primary purpose of fact-checking?",
            options: [
              "To make information more entertaining",
              "To verify the accuracy of information",
              "To speed up information sharing",
              "To make information more complex"
            ],
            correctAnswer: 1,
            explanation: "Fact-checking is the process of verifying the accuracy of information before sharing or believing it."
          },
          {
            question: "Which of the following is a reliable source of information?",
            options: [
              "Anonymous social media posts",
              "Peer-reviewed academic journals",
              "Unverified rumors",
              "Satirical websites"
            ],
            correctAnswer: 1,
            explanation: "Peer-reviewed academic journals are considered reliable sources because they undergo rigorous review by experts in the field."
          },
          {
            question: "What should you do when you encounter conflicting information online?",
            options: [
              "Believe the first source you see",
              "Ignore all conflicting information",
              "Research multiple sources and compare",
              "Share both versions on social media"
            ],
            correctAnswer: 2,
            explanation: "When encountering conflicting information, it's best to research multiple sources and compare them to find the most accurate information."
          }
        ],
        passingScore: 4,
        totalQuestions: 5
      },
      {
        title: "Deepfake Literacy",
        number: 2,
        questions: [
          {
            question: "What is a deepfake?",
            options: [
              "A type of social media platform",
              "AI-generated fake media content",
              "A cybersecurity tool",
              "A fact-checking website"
            ],
            correctAnswer: 1,
            explanation: "Deepfakes are AI-generated fake media content that can manipulate images, videos, or audio to create convincing but false content."
          },
          {
            question: "Which technology is commonly used to create deepfakes?",
            options: [
              "Virtual Reality (VR)",
              "Artificial Intelligence (AI)",
              "Blockchain",
              "Cloud Computing"
            ],
            correctAnswer: 1,
            explanation: "Deepfakes are created using artificial intelligence, specifically machine learning algorithms that can generate realistic fake content."
          },
          {
            question: "What is a common sign that an image might be a deepfake?",
            options: [
              "High image quality",
              "Inconsistent lighting or shadows",
              "Professional photography",
              "Clear background"
            ],
            correctAnswer: 1,
            explanation: "Inconsistent lighting or shadows are common signs of deepfakes, as AI often struggles with realistic lighting effects."
          },
          {
            question: "How can you verify if a video is a deepfake?",
            options: [
              "Trust the source completely",
              "Look for unnatural facial movements",
              "Ignore any suspicious signs",
              "Share it immediately"
            ],
            correctAnswer: 1,
            explanation: "Looking for unnatural facial movements, inconsistent lighting, or other visual artifacts can help identify deepfakes."
          },
          {
            question: "What should you do if you suspect content is a deepfake?",
            options: [
              "Share it to warn others",
              "Report it to fact-checking organizations",
              "Ignore it completely",
              "Create more deepfakes"
            ],
            correctAnswer: 1,
            explanation: "If you suspect content is a deepfake, report it to fact-checking organizations or platforms to help prevent misinformation."
          }
        ],
        passingScore: 4,
        totalQuestions: 5
      },
      {
        title: "Critical Thinking",
        number: 3,
        questions: [
          {
            question: "What is critical thinking?",
            options: [
              "Thinking negatively about everything",
              "The ability to analyze and evaluate information objectively",
              "Agreeing with popular opinions",
              "Ignoring different perspectives"
            ],
            correctAnswer: 1,
            explanation: "Critical thinking is the ability to analyze and evaluate information objectively, considering evidence and reasoning."
          },
          {
            question: "Which of the following is a critical thinking skill?",
            options: [
              "Accepting information without question",
              "Asking questions and seeking evidence",
              "Following popular trends",
              "Avoiding difficult topics"
            ],
            correctAnswer: 1,
            explanation: "Asking questions and seeking evidence are essential critical thinking skills that help evaluate information."
          },
          {
            question: "What is confirmation bias?",
            options: [
              "A type of fact-checking",
              "The tendency to favor information that confirms existing beliefs",
              "A critical thinking technique",
              "A media literacy tool"
            ],
            correctAnswer: 1,
            explanation: "Confirmation bias is the tendency to favor information that confirms existing beliefs while ignoring contradictory evidence."
          },
          {
            question: "How can you overcome confirmation bias?",
            options: [
              "Only read sources you agree with",
              "Seek out diverse perspectives and evidence",
              "Ignore opposing viewpoints",
              "Trust your instincts completely"
            ],
            correctAnswer: 1,
            explanation: "Seeking out diverse perspectives and evidence helps overcome confirmation bias by exposing you to different viewpoints."
          },
          {
            question: "What is the purpose of asking 'why' questions?",
            options: [
              "To confuse others",
              "To understand reasoning and evidence",
              "To avoid making decisions",
              "To create controversy"
            ],
            correctAnswer: 1,
            explanation: "Asking 'why' questions helps understand the reasoning and evidence behind claims, which is essential for critical thinking."
          }
        ],
        passingScore: 4,
        totalQuestions: 5
      },
      {
        title: "Media Literacy",
        number: 4,
        questions: [
          {
            question: "What is media literacy?",
            options: [
              "The ability to use social media",
              "The ability to access, analyze, and create media",
              "The ability to watch TV shows",
              "The ability to take photos"
            ],
            correctAnswer: 1,
            explanation: "Media literacy is the ability to access, analyze, evaluate, and create media content effectively."
          },
          {
            question: "Who owns most of the media outlets?",
            options: [
              "The government",
              "Large corporations",
              "Individual citizens",
              "Non-profit organizations"
            ],
            correctAnswer: 1,
            explanation: "Most media outlets are owned by large corporations, which can influence the content and perspective presented."
          },
          {
            question: "What is media bias?",
            options: [
              "A type of camera angle",
              "Prejudice or favoritism in media coverage",
              "A technical error",
              "A journalistic style"
            ],
            correctAnswer: 1,
            explanation: "Media bias is prejudice or favoritism in media coverage that can influence how information is presented."
          },
          {
            question: "How can you identify media bias?",
            options: [
              "Trust all media sources equally",
              "Compare coverage across different sources",
              "Only read one news source",
              "Ignore political topics"
            ],
            correctAnswer: 1,
            explanation: "Comparing coverage across different sources helps identify media bias by seeing how the same story is presented differently."
          },
          {
            question: "What is the purpose of media literacy education?",
            options: [
              "To make people distrust all media",
              "To help people become informed media consumers",
              "To promote specific viewpoints",
              "To reduce media consumption"
            ],
            correctAnswer: 1,
            explanation: "Media literacy education helps people become informed media consumers who can critically evaluate media content."
          }
        ],
        passingScore: 4,
        totalQuestions: 5
      },
      {
        title: "Fact Checking",
        number: 5,
        questions: [
          {
            question: "What is fact-checking?",
            options: [
              "A type of social media post",
              "The process of verifying information accuracy",
              "A form of entertainment",
              "A way to create news"
            ],
            correctAnswer: 1,
            explanation: "Fact-checking is the process of verifying the accuracy of information before believing or sharing it."
          },
          {
            question: "Which of the following is a reliable fact-checking source?",
            options: [
              "Anonymous blogs",
              "Established fact-checking organizations",
              "Social media rumors",
              "Unverified websites"
            ],
            correctAnswer: 1,
            explanation: "Established fact-checking organizations like Snopes, FactCheck.org, and PolitiFact are reliable sources for fact-checking."
          },
          {
            question: "What should you check when fact-checking an image?",
            options: [
              "Only the colors",
              "The source, date, and context",
              "Just the file size",
              "Only the resolution"
            ],
            correctAnswer: 1,
            explanation: "When fact-checking an image, check the source, date, context, and whether it has been manipulated."
          },
          {
            question: "What is reverse image search?",
            options: [
              "A type of camera",
              "A tool to find where an image originated",
              "A photo editing technique",
              "A social media feature"
            ],
            correctAnswer: 1,
            explanation: "Reverse image search is a tool that helps find where an image originated and if it has been used elsewhere."
          },
          {
            question: "Why is fact-checking important?",
            options: [
              "To make information more entertaining",
              "To prevent the spread of misinformation",
              "To slow down information sharing",
              "To make information more complex"
            ],
            correctAnswer: 1,
            explanation: "Fact-checking is important to prevent the spread of misinformation and ensure people have accurate information."
          }
        ],
        passingScore: 4,
        totalQuestions: 5
      }
    ];

    await Level.insertMany(levels);

    console.log("Levels seeded successfully 🎉");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding levels:", err);
    mongoose.disconnect();
  }
};

seedLevels();

