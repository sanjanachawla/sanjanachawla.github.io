export type Project = {
  id: string;
  title: string;
  classification: string;
  summary: string;
  stack: string[];
  signal: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const projects: Project[] = [
  {
    id: "new-venture-design",
    title: "New Venture Design: Pouch",
    classification: "AI Health Product",
    summary:
      "AI-powered infant monitoring concept using video capture, pose tracking, feature selection, and LSTM classification to support earlier movement-disorder screening.",
    stack: ["Python", "MediaPipe", "LSTM", "Jetson Nano", "IR Camera", "ML Validation"],
    signal: "AI",
    image: "/mission-control/projects/pouch_image.png",
    imageAlt: "Pouch baby monitor project preview",
    href: "/old-portfolio/newventure.html",
  },
  {
    id: "met-art-gallery-explorer",
    title: "MET Art Gallery Explorer",
    classification: "Full-Stack Data Platform",
    summary:
      "Browsable MET Museum collection experience with a Streamlit dashboard, FastAPI service layer, MySQL storage, Plotly views, Dockerized services, and AWS deployment.",
    stack: ["Python", "FastAPI", "Streamlit", "MySQL", "Docker", "Plotly", "AWS"],
    signal: "API",
    image: "/mission-control/projects/met-button-pic.jpeg",
    imageAlt: "MET Art Gallery Explorer project preview",
    href: "/old-portfolio/met-art-gallery-explorer.html",
  },
  {
    id: "star-dancing-painting",
    title: "Star-Dancing Painting",
    classification: "Embedded Art System",
    summary:
      "Interactive mixed-media painting with an Arduino-driven 256-pixel LED matrix that samples audio, runs FFT frequency detection, and maps music into light patterns.",
    stack: ["Arduino", "C++", "FastLED", "arduinoFFT", "WS2812B", "Audio Sampling"],
    signal: "LED",
    image: "/mission-control/projects/dancing-lights-painting.jpeg",
    imageAlt: "Star-Dancing Painting project preview",
    href: "/old-portfolio/star-dancing-painting.html",
  },
  {
    id: "davinci-robot",
    title: "The DaVinci Robot",
    classification: "Surgical Robotics",
    summary:
      "Capstone robotics project that automated DaVinci camera motion in simulation by extending an optimization framework for centering, orientation, distance, alignment, velocity, and collision objectives.",
    stack: ["Python", "CoppeliaSim", "Optimization", "Robotics", "Simulation"],
    signal: "OPT",
    image: "/mission-control/projects/davincilogo.jpg",
    imageAlt: "DaVinci robot project preview",
    href: "/old-portfolio/davinci.html",
  },
  {
    id: "simulating-pottery",
    title: "Simulating Pottery",
    classification: "Controls Simulation",
    summary:
      "MATLAB simulation exploring how small wheel and rim irregularities affect pottery geometry, using control and signal-processing ideas to model and correct shape changes.",
    stack: ["MATLAB", "Controls", "Signal Processing", "Simulation"],
    signal: "MAT",
    image: "/mission-control/projects/potterysq.jpg",
    imageAlt: "Simulating Pottery project preview",
    href: "/old-portfolio/pottery.html",
  },
  {
    id: "ubc-solar",
    title: "UBC Solar",
    classification: "Solar Vehicle Team",
    summary:
      "Student engineering team project focused on building a solar car through vehicle systems thinking, electrical design, and collaborative hardware development.",
    stack: ["Solar Vehicle", "Electrical Systems", "Team Design", "Hardware"],
    signal: "SOL",
    image: "/mission-control/projects/solar.jpg",
    imageAlt: "UBC Solar project preview",
    href: "https://sites.google.com/view/portfoliosanjanachawla/ubc-solar?authuser=0",
  },
  {
    id: "machine-learning-robot",
    title: "Machine Learning Robot",
    classification: "Robotics and ML",
    summary:
      "Class robotics project exploring how machine-learning behavior can be integrated into a physical robot workflow for sensing, decision-making, and control.",
    stack: ["Machine Learning", "Robotics", "Sensors", "Controls"],
    signal: "ML",
    image: "/mission-control/projects/mlrobot.jpg",
    imageAlt: "Machine Learning Robot project preview",
    href: "https://sites.google.com/view/portfoliosanjanachawla/machine-learning-robot?authuser=0",
  },
  {
    id: "robot-summer",
    title: "Robot Summer",
    classification: "Autonomous Robotics",
    summary:
      "Engineering Physics Robot Competition project centered on designing, building, and testing an autonomous robot under fast-paced competition constraints.",
    stack: ["Autonomous Robotics", "Embedded Systems", "Sensors", "Controls"],
    signal: "BOT",
    image: "/mission-control/projects/robotsummer.jpg",
    imageAlt: "Robot Summer project preview",
    href: "https://sites.google.com/view/portfoliosanjanachawla/autonomous-robot?authuser=0",
  },
];
