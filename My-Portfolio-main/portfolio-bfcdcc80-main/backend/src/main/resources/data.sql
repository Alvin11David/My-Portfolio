TRUNCATE TABLE hero_headlines, heroes, profile_stats, profile_skills, profiles,
    project_results, project_technologies, projects,
    category_skills, skill_categories,
    tools
RESTART IDENTITY CASCADE;

-- Hero
INSERT INTO heroes (description) VALUES ('I craft digital experiences that blend clean code with compelling design, turning complex problems into intuitive solutions.');
INSERT INTO hero_headlines (hero_id, text, style) VALUES
    (1, 'Hi', 'normal'),
    (1, 'I''m', 'normal'),
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
    ('MUBS Locator', 'Fintech', 'Mobile Apps',
     'Find buildings quickly using Google Maps, submit feedback to improve campus facilities, and manage your profile effortlessly.',
     'Students, Parents and visitors get problems when they try to navigate Makerere University.',
     'Created a minimalist interface with gesture-based navigation and AI-powered insights.',
     null, 'emerald', '2024', 'https://apps.apple.com/ug/app/mubs-locator/id6755059078', 'https://mubs-locator.web.app/', null, 1),

    ('Mchencuzi Audit', 'Audit Software', 'Enterprise Systems',
     'Mchencuzi Audit Software is a digital audit management system designed to support the planning, execution, documentation, and reporting of audit activities in an efficient and organized manner.',
     'Traditional audit processes were inefficient, prone to errors, and lacked transparency.',
     'Developed a comprehensive digital platform with automated workflows, real-time tracking, and advanced reporting features.',
     null, 'blue', '2025', null, null, null, 2),

    ('C-Helper App', 'Healthcare', 'Mobile Apps',
     'Find trusted help fast or earn more work—match, chat, and get paid in one place.',
     'Unemployement and underemployment were rising, while people struggled to find reliable help for everyday tasks.',
     'Built a mobile app platform that connects people needing help with local helpers, featuring secure payments, real-time chat, and AI-driven matching.',
     null, 'rose', '2026', 'https://apps.apple.com/ug/app/c-helper-app/id6759479834', 'https://c-helper-support.lovable.app/', 'https://play.google.com/store/apps/details?id=com.helperapp.mobile', 3),

    ('Time Sync', 'Education', 'Web Apps',
     'A next-generation education timer that helps students manage their study sessions effectively.',
     'Students often struggle with time management and maintaining focus during study sessions.',
     'Developed an intuitive timer with customizable intervals, progress tracking, and focus mode features.',
     null, 'amber', '2026', null, 'https://timetablesync-d33fc.web.app/', null, 4),

    ('Bible App', 'Spiritual', 'Mobile Apps',
     'A comprehensive Bible application offering multiple translations, daily devotionals, and offline access for spiritual growth.',
     'Many users lacked easy access to scripture and devotionals, especially offline or in regions with limited connectivity.',
     'Developed a user-friendly app with offline Bible versions, daily devotionals, bookmarks, and a powerful search feature.',
     null, 'violet', '2023', null, 'https://church-bible-app.netlify.app/', null, 5),

    ('Veritas Institute', 'Education', 'Web Apps',
     '',
     'Education institutions need a clear, trustworthy web presence that makes it easy for visitors to explore offerings quickly.',
     'Designed a responsive, content-focused website with clear navigation, strong visual hierarchy, and conversion-ready sections.',
     null, 'teal', '2026', null, 'https://institute-demo-site.netlify.app/', null, 6),

    ('Edwin''s Bake House', 'Bakery', 'Web Apps',
     '',
     'Small food brands need a polished online presence that makes browsing products and placing orders feel simple and inviting.',
     'Built a responsive showcase site with clear product presentation, strong branding, and easy access to key business details.',
     null, 'orange', '2026', null, 'https://edwins-bake-house.vercel.app/', null, 7),

    ('JamboPOS', 'Point of Sale', 'Web Apps',
     'A streamlined point-of-sale prototype built to help businesses manage sales, inventory, and daily operations.',
     'Retail and service businesses need a fast, reliable system that simplifies checkout and keeps operations organized.',
     'Created a clean POS experience with structured workflows, intuitive navigation, and clear business-focused presentation.',
     null, 'emerald', '2026', null, 'https://jambo-pos-system-prototype.netlify.app/', null, 8),

    ('Student University Portal', 'Education', 'Web Apps',
     'A student portal designed to bring academic information, services, and university updates into one place with a Firebase backend.',
     'Students need a single destination for academic resources, updates, and everyday university workflows.',
     'Built a clean portal experience that organizes key student actions and information into one accessible interface.',
     null, 'blue', '2026', null, 'https://universityportal2026.web.app/', null, 9),

    ('Sunbird GenAI App', 'AI Platform', 'AI Platforms',
     'A GenAI app that summarizes text, translates it, and generates audio output from both text and audio input pipelines.',
     'Users needed a single tool to handle text and audio workflows across multiple local languages.',
     'Built an AI workflow that supports text summarization, translation, transcription, and audio generation in one interface.',
     null, 'violet', '2026', null, 'https://internship-assessment-steel.vercel.app/', null, 10);

INSERT INTO project_technologies (project_id, technology) VALUES
    (1, 'Flutter Frame work'), (1, 'JavaScript'), (1, 'Firebase'), (1, 'React Native'),
    (2, 'Angular'), (2, 'Affinity'), (2, 'Supabase'), (2, 'Express'),
    (3, 'Flutter'), (3, 'Firebase'), (3, 'Blender'), (3, 'Affinity'), (3, 'Relworx'), (3, 'Figma'),
    (4, 'Angular'), (4, 'Three.js'), (4, 'Supabase'), (4, 'Figma'),
    (5, 'React Native'), (5, 'Firebase'), (5, 'TypeScript'), (5, 'Expo'),
    (6, 'React'), (6, 'TypeScript'), (6, 'Tailwind CSS'), (6, 'Vite'),
    (7, 'React'), (7, 'TypeScript'), (7, 'Tailwind CSS'), (7, 'Vite'),
    (8, 'React'), (8, 'TypeScript'), (8, 'Tailwind CSS'), (8, 'Vite'),
    (9, 'React'), (9, 'TypeScript'), (9, 'Tailwind CSS'), (9, 'Vite'), (9, 'Firebase'),
    (10, 'React'), (10, 'TypeScript'), (10, 'Firebase'), (10, 'AI/ML');

INSERT INTO project_results (project_id, result) VALUES
    (1, '40% increase in daily active users'), (1, '65% reduction in support tickets'), (1, '4.9★ App Store rating'),
    (2, '70% reduction in audit time'), (2, '95% increase in accuracy'), (2, 'Adopted by 50+ organizations'),
    (3, '1M+ downloads'), (3, '85% user retention'), (3, 'Featured by Apple'),
    (4, '35% higher conversion rate'), (4, '60% fewer returns'),
    (5, '200K+ downloads worldwide'), (5, '4.8★ average rating'), (5, 'Used in 30+ countries'),
    (6, 'Faster program discovery'), (6, 'Improved first-visit engagement'), (6, 'Clearer admissions journey'),
    (7, 'Clearer product visibility'), (7, 'Improved online ordering flow'), (7, 'Stronger brand presentation'),
    (8, 'Simplified checkout flow'), (8, 'Better daily sales tracking'), (8, 'Clearer inventory management'),
    (9, 'Centralized student access'), (9, 'Simplified information discovery'), (9, 'Clearer university communication'),
    (10, 'Text and audio pipelines'), (10, 'Multi-language support'), (10, 'End-to-end AI workflow');

-- Skill Categories
INSERT INTO skill_categories (title, icon_name, color, shadow_color, display_order) VALUES
    ('Frontend', 'Code2', 'from-blue-500 to-cyan-500', 'shadow-blue-500/50', 1),
    ('Backend', 'Server', 'from-emerald-500 to-teal-500', 'shadow-emerald-500/50', 2),
    ('Mobile', 'Smartphone', 'from-violet-500 to-purple-500', 'shadow-violet-500/50', 3),
    ('DevOps', 'Cloud', 'from-orange-500 to-amber-500', 'shadow-orange-500/50', 4);

INSERT INTO category_skills (category_id, name, level) VALUES
    (1, 'React', 95), (1, 'TypeScript', 94), (1, 'JavaScript', 94), (1, 'Tailwind CSS', 95), (1, 'Three.js / GSAP', 85), (1, 'Framer Motion', 88),
    (2, 'Node.js', 72), (2, 'Java', 65), (2, 'Python', 60), (2, 'MySQL', 60),
    (3, 'Flutter', 85), (3, 'React Native', 80),
    (4, 'Docker', 42), (4, 'Render', 98), (4, 'Netlify', 95), (4, 'Vercel', 88), (4, 'Firebase / Supabase', 87);

-- Tools
INSERT INTO tools (name, icon_name, display_order) VALUES
    ('Git', 'GitBranch', 1),
    ('Blender', 'Blend', 2),
    ('Affinity', 'Pen', 3),
    ('Vercel', 'Triangle', 4),
    ('Three.js', 'Cube', 5),
    ('GSAP', 'Zap', 6),
    ('Redis', 'Database', 7),
    ('Prisma', 'File', 8),
    ('Supabase', 'Server', 9),
    ('Stripe', 'CreditCard', 10),
    ('Figma', 'Pen', 11),
    ('Postman', 'TestTube', 12);
