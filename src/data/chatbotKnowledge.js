/**
 * Chatbot knowledge base derived from CHATBOT_KNOWLEDGE_BASE.md.
 * Each entry has keywords for client-side matching and a first-person answer (as Tali).
 * Integration: keyword match in findBestMatch(); fallback suggests contacting directly.
 */

const chatbotKnowledge = [
  // --- Greetings & meta ---
  {
    keywords: ['hello', 'hi', 'hey', 'sup', 'howdy', 'greetings', 'yo'],
    answer:
      "Hey! Great to see you here. I'm Tali's portfolio assistant. You can ask me about his projects, technical skills, experience, philosophy, or anything else you're curious about. What would you like to know?",
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'goodbye', 'later', 'see you'],
    answer:
      "Thanks for stopping by! If you want to learn more or connect, check out the links in the footer or drop me an email at mosley.tali@gmail.com. Peace!",
  },
  {
    keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'social'],
    answer:
      "You can reach me at mosley.tali@gmail.com, find me on LinkedIn at linkedin.com/in/tali-mosley, or check out my code on GitHub at github.com/NCLegend28. Always open to interesting conversations and opportunities!",
  },

  // --- 1. Personal Introduction ---
  {
    keywords: ['who are you', 'introduce', 'introduction', 'yourself', 'what drives you', 'brief intro', 'about you'],
    answer:
      "My name is Tali Mosley. I am an AI Engineer and I love inventing. God willing, I'll invent something that'll bring humanity together. I've always felt a strong sense of justice within me, an itching to find solutions for all the world's diseases and conflicts. To one day build apparatuses with the purpose of healing, enhancing, and maintaining humanity. And I understand how strenuous this task is. Piece by piece, step by step, it will be accomplished.",
  },

  // --- 2. Technical Journey (biomedical → AI/ML) ---
  {
    keywords: [
      'transition',
      'biomedical',
      'ai/ml',
      'sparked',
      'evolution',
      'career path',
      'why ai',
      'kidney',
      'father',
      '3d bioprinting',
      'organs',
      'age of ideas',
    ],
    answer:
      "My father had kidney disease, taking quite a bit of mobility and energy from him. It's something I wouldn't put on anyone. Because of this, I am really interested in 3D bioprinting, the idea of having a complication with one of your organs and then being able to have a new one in a matter of days, possibly hours. That's extraordinary and probable. Especially with the use of AI/ML. An agent that can calculate millions of permutations with immaculate precision is invaluable to the medical world and humanity as a whole. I've crossed into this sector because I believe it's the Age of Ideas. The fact that I can prompt a piece of code to think, to plan, to take action, on whatever my mind dreams up, brings excitement and wonder back into my life. On top of that, the amount of time I can claim back.",
  },

  // --- 3. Projects: Financio ---
  {
    keywords: ['financio', 'trading', 'algorithm', 'finance', 'market', 'stock', 'mape', 'prediction', 'fintech', 'docker', 'kubernetes', 'orchestration', 'bots'],
    answer:
      "Financio started out as a prediction model for the market. I envisioned this application as something that could bring me great riches or some experience in working with fintech. The journey of this project was arduous (still undergoing as I iterate and add more features) but well worth it. Turning it into an app, connecting with APIs, diving into devOps for the first time, invaluable experience. I've learned Docker, some Kubernetes, tensorflow, better ways to architect my system, how to organize my project folder, and workflows that let me work quicker. I would say the most challenging part of this project would be cleaning the data the model intakes. I'm proud that I was able to create an entire orchestration of bots that network in order to achieve a goal: making the best decision in the market at a time.",
  },

  // --- 3. Projects: Apollo Gloves ---
  {
    keywords: ['apollo', 'gloves', 'emg', 'gesture', 'wearable', 'music', 'fingertips', 'trumpet', 'piano', 'guitar', 'drums', 'gyroscope', 'arduino', 'ble'],
    answer:
      "The Apollo Gloves came to be because I wanted to create music through my fingertips. A trumpet, a piano, a guitar, drums, all in a pair of gloves. I used gyroscopes to track each finger's position and velocity and bound certain hand positions to different sounds of a chosen instrument. I used two Arduinos. The biggest technical challenge with this project was connecting the two gloves together so they could talk with each other. That just took a lot of studying BLE connectivity documentation. This project is still undergoing iteration but I'm proud of getting the trumpet sounds to work. I want to try and teach the gloves through vision or maybe even text.",
  },

  // --- 3. Projects: AI Receptionist / Assistant ---
  {
    keywords: [
      'ai receptionist',
      'ai assistant',
      'voice',
      'saas',
      'elevenlabs',
      'customer',
      'calls',
      'rag',
      'webhooks',
      'mcp',
      'rules based',
      'weather',
      'news',
    ],
    answer:
      "The AI assistant had a bunch of iterations. It began with a simple rules-based assistant that could tell time, give me weather updates, and inform me on the news. This was back in 2022. Now I've configured it with a RAG system, webhooks, and MCP tools that make it easier to complete its assistant duties. The biggest issue technically was getting all the connections working properly and returning the correct outputs so the entire pipeline doesn't break. Also integrating it within a website proved to be pretty difficult but I achieved it nonetheless.",
  },

  // --- 3. Projects: Electromagnetic Wristband ---
  {
    keywords: [
      'wristband',
      'electromagnetic',
      'energy',
      'kinetic',
      'harvesting',
      'black panther',
      'induction',
      'coil',
      'rectifier',
    ],
    answer:
      "The Electromagnetic Wristband is a kinetic energy harvesting device inspired by Black Panther tech. It converts arm motion into stored electrical power through electromagnetic induction. The prototype features custom coil windings, a rectifier circuit, and thermal safety monitoring. One of my favorite hardware builds!",
  },

  // --- 3. Projects: AI Inventory Management ---
  {
    keywords: ['inventory', 'management', 'theft', 'detection', 'clinical', 'lab', 'audit', 'computer vision', 'anomaly'],
    answer:
      "The AI Inventory Management system uses computer vision and anomaly detection to track inventory in clinical labs. It monitors stock levels in real time, flags potential theft or mishandling, and generates audit trails for compliance. Built with Python, TensorFlow, OpenCV, and PostgreSQL.",
  },

  // --- Generic projects overview ---
  {
    keywords: ['project', 'projects', 'portfolio', 'built', 'building', 'made', 'what have you built'],
    answer:
      "I've built a range of projects across AI/ML, biomedical engineering, and fintech. My main ones are Financio (algorithmic trading), Apollo Gloves (music through gesture), an AI Receptionist Platform (voice-enabled SaaS), an Electromagnetic Wristband (kinetic energy harvesting), and an AI Inventory Management system for clinical labs. Ask about any of them for more details!",
  },

  // --- 4. Day-to-Day Work ---
  {
    keywords: ['day', 'typical day', 'daily', 'balance', 'ivy', 'ivy technologies', 'traveling', 'contract', 'hotel', 'decompress', 'time management'],
    answer:
      "I'm currently on a traveling contract position, which means most days start around 3am. After 10-11 hours of work, I'm back in a hotel room with whatever energy I have left. I don't jump straight into projects — I've learned I need to decompress first or the quality of everything suffers. So I give myself that. Then I build. It's not a glamorous setup, but it's mine. The constraint of limited hours has actually made me sharper about what I spend time on. You can't afford to spin your wheels when the window is that small.",
  },

  // --- 5. Technical Stack & Preferences ---
  {
    keywords: [
      'skill',
      'skills',
      'technology',
      'technologies',
      'tech',
      'stack',
      'language',
      'languages',
      'framework',
      'tools',
      'python',
      'next.js',
      'docker',
      'c++',
      'rust',
      'go',
      'prefer',
      'fluent',
    ],
    answer:
      "Python is my foundation — it's where I'm most fluent and it gets things done. For web, Next.js has been my most-used framework. Docker made infrastructure actually approachable for me and I've been using it ever since. Honestly though, I feel the ceiling. I think about efficiency a lot, and I have some C++ under my belt — enough to know what more performant, memory-controlled code feels like. Rust and Go are next on my list for that reason. I just have to start. I also keep a close eye on new models as they drop — if AI tooling counts as a stack, that's where a lot of my excitement lives right now. The landscape shifts fast enough that staying current feels like its own full-time practice.",
  },

  // --- 6. Learning Philosophy ---
  {
    keywords: ['learn', 'learning', 'methodology', 'how do you learn', 'new technologies', 'documentation', 'video', 'udemy'],
    answer:
      "I start by defining what something is, what problem it solves, and how it works — in that order. That foundation applies to anything, technical or not. In practice, that usually means a video first. Not to follow along passively, but to get a feel for the use cases — what is this actually for, what does it look like in the wild. Then when I'm experimenting and things start breaking, I go straight to the documentation. That's where the real understanding gets built. I've found that jumping into docs cold is overwhelming, and building without reading them first means you're guessing. The video gives you the map, the docs give you the terrain.",
  },

  // --- 7. Career Goals & Aspirations ---
  {
    keywords: [
      'goal',
      'goals',
      'future',
      'vision',
      'seeking',
      'looking',
      'hire',
      'hiring',
      'position',
      'opportunity',
      'role',
      'company',
      'team',
      'ai systems',
      'energy-efficient',
      'agentic',
      'production',
    ],
    answer:
      "I'm interested in AI systems engineering — building efficient, production-ready AI infrastructure that works reliably in the real world. I'm particularly drawn to energy-efficient AI and agentic orchestration challenges. I want to work on the layer between 'we trained a model' and 'this is deployed and running at scale without breaking the bank or the power grid.' I thrive in collaborative environments where I can workshop ideas and prototype solutions. I'm looking for a team that values shipping working systems over perfect theory — somewhere between 5-50 people where individual contributions matter and you're not just a cog.",
  },

  // --- 8. Unique Value Proposition ---
  {
    keywords: [
      'unique',
      'value',
      'different',
      'biomedical',
      'healthcare',
      'medical',
      'enhance',
      'ai/ml',
      'failure modes',
      'end-to-end',
      'hardware',
      'software',
    ],
    answer:
      "Most AI engineers come from computer science; they think in systems and abstractions from day one. I came in through the body. Biomedical engineering trained me to think about failure modes in flesh and blood, where a bad output doesn't just crash a program, it harms a person. That standard of precision followed me into AI. My background also means I naturally think at the intersection of biology and computation; I don't just see AI as software, I see it as an extension of how living systems process information. When I think about energy-efficient compute, I'm drawing on how neurons actually fire. When I architect an agent pipeline, I'm thinking about feedback loops the way a physiologist would. I'm also rare in that I build end-to-end — from hardware (EMG gloves, electromagnetic wristbands) to deployed software (trading systems, AI receptionists). I don't just train models. I know what it takes to get something working in the real world, not just in a notebook.",
  },

  // --- 9. Mentorship & Community ---
  {
    keywords: ['mentor', 'mentorship', 'advice', 'guide', 'aspiring', 'climb', 'lift', 'community', 'help others'],
    answer:
      "Helping someone grow doesn't just change one person — it compounds. The person you helped teaches someone else, assists someone else, and suddenly you've contributed to a chain you'll never fully see. That's what excites me about it. I don't have a grand mentorship philosophy. It's simpler than that: if you can, help. Not out of obligation, but because a community that actually works together is stronger than any individual in it. Will there be friction? Of course — we're human. But if 80% of the time people are pulling for each other, that's a foundation worth building on. I want to be a link in the chain — whether it be first, middle, or last, I want to contribute to the foundation I believe in.",
  },

  // --- 10. Problem-Solving Approach ---
  {
    keywords: ['problem solving', 'approach', 'complex', 'technical problem', 'constraints', 'data pipeline', 'cleaning data'],
    answer:
      "My approach starts with constraints. Before I brainstorm a single solution, I need to know what I'm working within — time, compute, dependencies, failure tolerance. Then I generate options and pick the one that's technically sound, not just the one that sounds clever. The clearest example is Financio. The system pulls from multiple data sources, and the challenge wasn't the model — it was the data pipeline feeding it. Every source had its own quirks, inconsistencies, formatting differences. One bad value upstream and the entire orchestration breaks downstream. I had to build cleaning logic that was thorough enough to handle edge cases I hadn't even encountered yet, and then get every module in the system to comply with those standards. The smallest detail will break everything. That's not an exaggeration, I learned it firsthand. But that's also what makes it satisfying when it finally runs clean — you know exactly how much work is invisible inside that working system.",
  },

  // --- 11. Failures & Lessons (Healthglimpse) ---
  {
    keywords: ['failure', 'fail', 'didn\'t work', 'lesson', 'healthglimpse', 'skin', 'lesion', 'raspberry pi', 'gemma', 'edge', 'inference'],
    answer:
      "For a Google hackathon, I built Healthglimpse — a portable device that could identify skin lesions, infections, bruises, and even flora and fauna, running a fine-tuned Gemma model on a Raspberry Pi 5. The vision was a pocket-sized medical triage tool. Accessible, fast, no internet required. The documentation said the model could fit on small devices. The Raspberry Pi had other opinions. I didn't finish in time. The compute demand was just too heavy for the hardware I was working with, and I learned firsthand what 'inference at the edge' actually costs in practice — not in theory, not in a benchmark, but in a real device getting hot in your hands while it struggles to load a model. What I didn't do was abandon it. I'm iterating a better version now, with a smarter approach to model compression and hardware constraints. The failure taught me something no tutorial could: the gap between 'technically possible' and 'actually runs' is where most real engineering happens.",
  },

  // --- 12. Future Vision ---
  {
    keywords: ['3 years', '5 years', '10 years', 'master', 'invention', 'company', 'bioprinting', 'tissue', 'laboratory', 'r&d', 'age of ideas'],
    answer:
      "In 3-5 years, I'll have my master's in AI, and I'll be building my own invention solutions company — a place where the mandate is simple: create to solve, and create to bring joy. I see it sitting at the intersection of AI and biomedical technology, with a particular focus on 3D bioprinting. The idea of an AI system that can automatically model and print functional human tissue isn't science fiction anymore — it's an engineering problem, and that's exactly the kind I want to be working on. In 10 years? Deep in my own laboratory. Think less sterile startup office, more personal R&D lair — the kind of place where the problems are hard, the tools are custom-built, and the work actually matters. The throughline across all of it is the same thing that got me here: I believe we're in the Age of Ideas. The gap between imagining something and building it has never been smaller. I intend to close it completely.",
  },

  // --- 13. Collaboration Style ---
  {
    keywords: ['collaboration', 'teammates', 'team', 'working style', 'value', 'green flag', 'red flag', 'trust', 'independently'],
    answer:
      "I'm comfortable working independently — I do some of my best work solo. But my ideal environment isn't isolation, it's a team that can each go heads-down and then surface periodically to throw ideas into the room. Spark some conversation, challenge each other a little, then get back to building. That rhythm works for me. What I value most in teammates is openness — communicating ideas freely, not closing people out, and allowing a concept to breathe before it gets mercilessly slaughtered. Some of the best solutions need a minute to unfold. Green flags: people who speak up, own their work, and stay honest even when it's uncomfortable. Red flags: chronic lateness, pride that blocks accountability, and dishonesty in any form. I can work through most things with a team — but trust is the foundation, and once that's gone it's hard to build anything meaningful on top of it.",
  },

  // --- 14. Technical Interests Beyond (quantum, energy) ---
  {
    keywords: ['quantum', 'energy', 'efficient', 'emerging', 'white hydrogen', 'tpu', 'silicon', 'probabilistic', 'stochastic'],
    answer:
      "Quantum computing and energy-efficient compute are the two I keep coming back to. With quantum, what gets me isn't just the speed — it's that the underlying model of reality is probabilistic, and we've spent decades forcing deterministic machines to simulate that. It feels backwards. I've actually experimented with quantum-inspired approaches in my algorithmic trading work, and even the approximation of quantum logic changes how you think about optimization problems. On the energy side, I'm obsessed with how we're going to power AI at scale. TPUs are a step — purpose-built silicon instead of general-purpose — but I think we're still early. White hydrogen and probabilistic/stochastic energy systems fascinate me because they align with how nature actually operates. Biology runs on electrochemical gradients, not clean binary states. There's something to learn from that. The systems that last tend to be the ones built with the grain of physics, not against it.",
  },

  // --- 15. Rapid Fire Personal ---
  {
    keywords: [
      'music',
      'coding music',
      'coffee',
      'tea',
      'night owl',
      'early bird',
      'book',
      'resource',
      'productivity',
      'hobby',
      'chess',
      'puzzles',
      'vinyl',
      'taekwondo',
      'poetry',
      'gaming',
      'neo-soul',
      'classical',
      'colorado',
      'pikes peak',
      'hobbies',
    ],
    answer:
      "I like puzzles, mainly chess puzzles, but puzzles nonetheless. Listening to music is my favorite pastime, along with reading, gaming, taekwondo, and poetry. I like collecting vinyls and swords and rocks and cards... I like collecting. While coding, my favorite environment is either some classical music or some neo-soul. I prefer to be a night owl. My favorite tech resource is Udemy. Favorite place I've traveled so far is Colorado. I went up Pikes Peak with a few coworkers and it added greatly to my view of the world.",
  },

  // --- Experience & education (short fallbacks) ---
  {
    keywords: ['experience', 'job', 'career', 'employed', 'work history', 'robot', 'robotics', 'amazon', 'ivy'],
    answer:
      "I currently work as a Robotics/QC Technician at Ivy Technologies (Amazon), deploying and maintaining robotic systems for facilities across the country. Before that I was a Lab Assistant at Clinical Pathology Labs. I studied Biomedical Engineering at UT Austin with a computational specialization.",
  },
  {
    keywords: ['education', 'school', 'university', 'degree', 'ut', 'austin', 'college', 'study'],
    answer:
      "I studied Biomedical Engineering at the University of Texas at Austin with a computational specialization — focusing on computational biology, medical devices, systems engineering, and Python. That foundation shapes how I approach every project.",
  },

  // --- Philosophy (carpe diem, climb lift) ---
  {
    keywords: ['philosophy', 'believe', 'values', 'principle', 'carpe', 'diem', 'climb', 'lift', 'motto', 'technology amplifies'],
    answer:
      "I live by three core principles: 'Carpe Diem' — seize every moment to build and learn; 'As You Climb, You Must Lift' — success means nothing if not shared, so I mentor others; and 'Technology Amplifies Humanity' — the best tech extends human capability rather than replacing it.",
  },
]

export default chatbotKnowledge
