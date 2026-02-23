const projects = [
  {
    title: 'Financio',
    category: 'fintech',
    description:
      'An algorithmic trading system that leverages advanced predictive modeling to achieve sub-5% mean absolute percentage error on market forecasts. Financio processes real-time market data, generates multi-strategy trading signals, and includes a comprehensive backtesting engine to validate strategies against historical data before live deployment.',
    tools: ['Python', 'TensorFlow', 'pandas', 'NumPy', 'REST APIs'],
    highlights: [
      'Sub-5% prediction error',
      'Real-time trading signals',
      'Multi-strategy backtesting',
    ],
    color: 'biotech-blue',
  },
  {
    title: 'Apollo Gloves',
    category: 'biomedical',
    description:
      'Wearable EMG-based gesture recognition gloves that translate muscle electrical signals into intuitive computer commands. The system uses custom machine learning models trained on electromyography data to classify hand gestures in real time, enabling a natural human-computer interaction layer for accessibility and robotics applications.',
    tools: ['Python', 'EMG Sensors', 'Arduino', 'scikit-learn', 'Signal Processing'],
    highlights: [
      'Real-time EMG sensing',
      'Custom ML models',
      'Wearable hardware design',
    ],
    color: 'tech-purple',
  },
  {
    title: 'AI Receptionist Platform',
    category: 'ai-ml',
    description:
      'A multi-tenant SaaS platform that provides businesses with an intelligent, voice-enabled AI receptionist. The system integrates natural language processing with ElevenLabs voice synthesis to handle customer calls, schedule appointments, and route inquiries — reducing front-desk overhead while maintaining a human-like conversational experience.',
    tools: ['Python', 'React', 'Node.js', 'ElevenLabs', 'NLP', 'SaaS Architecture'],
    highlights: [
      'Voice-to-voice AI',
      'Multi-tenant SaaS',
      'ElevenLabs integration',
    ],
    color: 'neural-orange',
  },
  {
    title: 'Electromagnetic Wristband',
    category: 'biomedical',
    description:
      'A kinetic energy harvesting wristband inspired by Black Panther technology that converts everyday arm motion into stored electrical power through electromagnetic induction. The proof-of-concept prototype includes custom coil windings, a rectifier circuit, and thermal safety monitoring to ensure safe energy capture from human movement.',
    tools: [
      'Electromagnetic Induction',
      'Circuit Design',
      '3D Printing',
      'Prototyping',
      'Thermal Systems',
    ],
    highlights: [
      'Electromagnetic induction',
      'Thermal safety systems',
      'Proof-of-concept build',
    ],
    color: 'clinical-cyan',
  },
  {
    title: 'AI Inventory Management',
    category: 'ai-ml',
    description:
      'An AI-powered inventory tracking and accountability system designed for clinical laboratory environments. Using computer vision and anomaly detection algorithms, the platform monitors stock levels in real time, flags potential theft or mishandling, and generates detailed audit trails to support compliance and operational transparency.',
    tools: ['Python', 'TensorFlow', 'OpenCV', 'Computer Vision', 'PostgreSQL'],
    highlights: [
      'Real-time tracking',
      'Anomaly detection',
      'Audit trail system',
    ],
    color: 'biotech-blue',
  },
]

export default projects
