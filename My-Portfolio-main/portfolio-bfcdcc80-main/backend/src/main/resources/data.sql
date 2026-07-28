-- Hero
INSERT INTO heroes (description) VALUES ('I craft digital experiences that blend clean code with compelling design, turning complex problems into intuitive solutions.');
INSERT INTO hero_headlines (hero_id, text, style) VALUES
    (1, 'Hi', 'normal'),
    (1, "I'm", 'normal'),
    (1, 'Alvin', 'italic'),
    (1, 'David', 'bold');

-- Profile
INSERT INTO profiles (bio_text, profile_image_url) VALUES
    ('I am a passionate software developer with expertise in building full-stack web and mobile applications. I love turning ideas into reality through code and constantly exploring new technologies to solve real-world problems.', '/uploads/profile.jpg');
INSERT INTO profile_stats (profile_id, number, suffix, label) VALUES
    (1, 5, '+', 'Years Experience'),
    (1, 50, '+', 'Projects Completed'),
    (1, 30, '+', 'Happy Clients'),
    (1, 15, '+', 'Technologies');
INSERT INTO profile_skills (profile_id, skill) VALUES
    (1, 'Java / Spring Boot'),
    (1, 'React / TypeScript'),
    (1, 'Flutter / Dart'),
    (1, 'Node.js'),
    (1, 'PostgreSQL'),
    (1, 'AWS / Cloud'),
    (1, 'Docker / K8s'),
    (1, 'REST / GraphQL');

-- Projects
INSERT INTO projects (title, category, group_name, description, challenge, solution, image_url, accent_color, year, live_url, web_url, play_store_url, display_order)
VALUES
    ('E-Commerce Platform', 'Fintech', 'Web Apps', 'A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.',
     'Building a scalable platform that handles thousands of concurrent users while maintaining sub-second response times for product searches and checkout flows.',
     'Implemented microservices architecture with Redis caching, PostgreSQL sharding, and Kafka for event-driven order processing.',
     '/uploads/ecommerce.jpg', 'blue', '2024', 'https://example.com', 'https://example.com', null, 1),
    ('Task Manager App', 'Productivity', 'Mobile Apps', 'Cross-platform mobile application for task management with real-time collaboration and AI-powered prioritization.',
     'Creating an intuitive mobile experience that syncs seamlessly across devices while supporting offline-first functionality.',
     'Built with Flutter and BLoC pattern, using SQLite for offline storage and Firebase Cloud Messaging for real-time updates.',
     '/uploads/taskapp.jpg', 'emerald', '2024', null, null, 'https://play.google.com/store/apps/details?id=com.example.taskapp', 2),
    ('AI Content Analyzer', 'AI/ML', 'AI Platforms', 'An AI-powered content analysis platform that provides sentiment analysis, keyword extraction, and content recommendations.',
     'Processing large volumes of text data efficiently while maintaining high accuracy for multiple languages and content types.',
     'Leveraged transformer models with GPU acceleration, implemented batch processing pipeline with RabbitMQ, and built a React dashboard for visualization.',
     '/uploads/aianalyzer.jpg', 'violet', '2023', 'https://ai-analyzer.example.com', 'https://ai-analyzer.example.com', null, 3),
    ('Healthcare Management System', 'Healthcare', 'Enterprise Systems', 'Comprehensive healthcare management system for hospitals with patient records, appointment scheduling, and billing.',
     'Meeting strict healthcare compliance requirements (HIPAA) while ensuring 99.9% uptime for critical hospital operations.',
     'Designed a role-based access control system with end-to-end encryption, implemented HL7 FHIR standards for interoperability.',
     '/uploads/healthcare.jpg', 'rose', '2024', null, null, null, 4);

INSERT INTO project_technologies (project_id, technology) VALUES
    (1, 'Java'), (1, 'Spring Boot'), (1, 'PostgreSQL'), (1, 'Redis'), (1, 'Kafka'), (1, 'React'),
    (2, 'Flutter'), (2, 'Dart'), (2, 'Firebase'), (2, 'SQLite'), (2, 'BLoC'),
    (3, 'Python'), (3, 'TensorFlow'), (3, 'React'), (3, 'RabbitMQ'), (3, 'Docker'),
    (4, 'Java'), (4, 'Spring Boot'), (4, 'PostgreSQL'), (4, 'Angular'), (4, 'Docker'), (4, 'HL7 FHIR');

INSERT INTO project_results (project_id, result) VALUES
    (1, 'Processed 10,000+ orders in first month'),
    (1, '99.9% uptime achieved'),
    (1, '40% improvement in page load speed'),
    (2, '50,000+ downloads in first quarter'),
    (2, '4.8 star rating on Play Store'),
    (2, 'Real-time sync across 5 devices'),
    (3, '98% accuracy in sentiment analysis'),
    (3, 'Processes 1M+ documents daily'),
    (3, 'Supported 15+ languages'),
    (4, 'Implemented across 3 hospital chains'),
    (4, 'Reduced appointment scheduling time by 60%'),
    (4, 'Compliant with HIPAA and GDPR');

-- Skill Categories
INSERT INTO skill_categories (title, icon_name, color, shadow_color, display_order) VALUES
    ('Frontend', 'Code2', 'from-blue-500 to-cyan-500', 'shadow-blue-500/50', 1),
    ('Backend', 'Server', 'from-emerald-500 to-teal-500', 'shadow-emerald-500/50', 2),
    ('Mobile', 'Smartphone', 'from-violet-500 to-purple-500', 'shadow-violet-500/50', 3),
    ('DevOps', 'Cloud', 'from-orange-500 to-amber-500', 'shadow-orange-500/50', 4);

INSERT INTO category_skills (category_id, name, level) VALUES
    (1, 'React', 95), (1, 'TypeScript', 90), (1, 'Next.js', 85), (1, 'Tailwind CSS', 90),
    (2, 'Java / Spring Boot', 95), (2, 'Node.js', 85), (2, 'Python', 80), (2, 'PostgreSQL', 90),
    (3, 'Flutter', 90), (3, 'React Native', 80), (3, 'Kotlin', 75),
    (4, 'Docker', 85), (4, 'Kubernetes', 75), (4, 'AWS', 80), (4, 'CI/CD', 85);

-- Tools
INSERT INTO tools (name, icon_name, display_order) VALUES
    ('VS Code', 'Terminal', 1),
    ('Git', 'GitBranch', 2),
    ('Figma', 'Pen', 3),
    ('Postman', 'TestTube', 4),
    ('IntelliJ IDEA', 'Brain', 5),
    ('Docker', 'Container', 6),
    ('Linux', 'Terminal', 7);
