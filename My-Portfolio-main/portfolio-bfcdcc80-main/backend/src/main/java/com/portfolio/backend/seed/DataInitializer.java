package com.portfolio.backend.seed;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.model.*;
import com.portfolio.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProfileRepository profileRepository;
    private final SkillCategoryRepository skillCategoryRepository;
    private final ToolRepository toolRepository;
    private final HeroContentRepository heroContentRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    public DataInitializer(UserRepository userRepository,
                           ProjectRepository projectRepository,
                           ProfileRepository profileRepository,
                           SkillCategoryRepository skillCategoryRepository,
                           ToolRepository toolRepository,
                           HeroContentRepository heroContentRepository,
                           PasswordEncoder passwordEncoder,
                           ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.profileRepository = profileRepository;
        this.skillCategoryRepository = skillCategoryRepository;
        this.toolRepository = toolRepository;
        this.heroContentRepository = heroContentRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
        }

        if (projectRepository.count() == 0) {
            seedProjects();
        }

        if (profileRepository.count() == 0) {
            seedProfile();
        }

        if (skillCategoryRepository.count() == 0) {
            seedSkillCategories();
        }

        if (toolRepository.count() == 0) {
            seedTools();
        }

        if (heroContentRepository.count() == 0) {
            seedHeroContent();
        }
    }

    private void seedProjects() throws Exception {
        List<Project> projects = List.of(
            createProject(1, "MUBS Locator", "Fintech", "Mobile Apps",
                "Find buildings quickly using Google Maps, submit feedback to improve campus facilities, and manage your profile effortlessly.",
                "Students, Parents and visitors get problems when they try to navigate Makerere University.",
                "Created a minimalist interface with gesture-based navigation and AI-powered insights.",
                List.of("40% increase in daily active users", "65% reduction in support tickets", "4.9★ App Store rating"),
                "emerald", List.of("Flutter Frame work", "JavaScript", "Firebase", "React Native"),
                "2024", "https://apps.apple.com/ug/app/mubs-locator/id6755059078", "https://mubs-locator.web.app/", null),
            createProject(2, "Mchencuzi Audit", "Audit Software", "Enterprise Systems",
                "Mchencuzi Audit Software is a digital audit management system designed to support the planning, execution, documentation, and reporting of audit activities in an efficient and organized manner.",
                "Traditional audit processes were inefficient, prone to errors, and lacked transparency.",
                "Developed a comprehensive digital platform with automated workflows, real-time tracking, and advanced reporting features.",
                List.of("70% reduction in audit time", "95% increase in accuracy", "Adopted by 50+ organizations"),
                "blue", List.of("Angular", "Affinity", "Supabase", "Express"),
                "2025", null, null, null),
            createProject(3, "C-Helper App", "On-Demand Services", "Mobile Apps",
                "Find trusted help fast or earn more work—match, chat, and get paid in one place.",
                "Unemployement and underemployment were rising, while people struggled to find reliable help for everyday tasks.",
                "Built a mobile app platform that connects people needing help with local helpers, featuring secure payments, real-time chat, and AI-driven matching.",
                List.of("1M+ downloads", "85% user retention", "Featured by Apple"),
                "rose", List.of("Flutter", "Firebase", "Blender", "Affinity", "Relworx", "Figma"),
                "2026", "https://apps.apple.com/ug/app/c-helper-app/id6759479834",
                "https://c-helper-support.lovable.app/",
                "https://play.google.com/store/apps/details?id=com.helperapp.mobile"),
            createProject(4, "Time Sync", "Education", "Web Apps",
                "A next-generation education timer that helps students manage their study sessions effectively.",
                "Students often struggle with time management and maintaining focus during study sessions.",
                "Developed an intuitive timer with customizable intervals, progress tracking, and focus mode features.",
                List.of("35% higher conversion rate", "60% fewer returns"),
                "amber", List.of("Angular", "Three.js", "Supabase", "Figma"),
                "2026", null, "https://timetablesync-d33fc.web.app/", null),
            createProject(5, "Bible App", "Spiritual", "Mobile Apps",
                "A comprehensive Bible application offering multiple translations, daily devotionals, and offline access for spiritual growth.",
                "Many users lacked easy access to scripture and devotionals, especially offline or in regions with limited connectivity.",
                "Developed a user-friendly app with offline Bible versions, daily devotionals, bookmarks, and a powerful search feature.",
                List.of("200K+ downloads worldwide", "4.8★ average rating", "Used in 30+ countries"),
                "violet", List.of("React Native", "Firebase", "TypeScript", "Expo"),
                "2023", null, "https://church-bible-app.netlify.app/", null),
            createProject(6, "Veritas Institute", "Education", "Web Apps",
                "",
                "Education institutions need a clear, trustworthy web presence that makes it easy for visitors to explore offerings quickly.",
                "Designed a responsive, content-focused website with clear navigation, strong visual hierarchy, and conversion-ready sections.",
                List.of("Faster program discovery", "Improved first-visit engagement", "Clearer admissions journey"),
                "teal", List.of("React", "TypeScript", "Tailwind CSS", "Vite"),
                "2026", null, "https://institute-demo-site.netlify.app/", null),
            createProject(7, "Edwin's Bake House", "Bakery", "Web Apps",
                "",
                "Small food brands need a polished online presence that makes browsing products and placing orders feel simple and inviting.",
                "Built a responsive showcase site with clear product presentation, strong branding, and easy access to key business details.",
                List.of("Clearer product visibility", "Improved online ordering flow", "Stronger brand presentation"),
                "orange", List.of("React", "TypeScript", "Tailwind CSS", "Vite"),
                "2026", null, "https://edwins-bake-house.vercel.app/", null),
            createProject(8, "JamboPOS", "Point of Sale", "Web Apps",
                "A streamlined point-of-sale prototype built to help businesses manage sales, inventory, and daily operations.",
                "Retail and service businesses need a fast, reliable system that simplifies checkout and keeps operations organized.",
                "Created a clean POS experience with structured workflows, intuitive navigation, and clear business-focused presentation.",
                List.of("Simplified checkout flow", "Better daily sales tracking", "Clearer inventory management"),
                "emerald", List.of("React", "TypeScript", "Tailwind CSS", "Vite"),
                "2026", null, "https://jambo-pos-system-prototype.netlify.app/", null),
            createProject(9, "Student University Portal", "Education", "Web Apps",
                "A student portal designed to bring academic information, services, and university updates into one place with a Firebase backend.",
                "Students need a single destination for academic resources, updates, and everyday university workflows.",
                "Built a clean portal experience that organizes key student actions and information into one accessible interface.",
                List.of("Centralized student access", "Simplified information discovery", "Clearer university communication"),
                "blue", List.of("React", "TypeScript", "Tailwind CSS", "Vite", "Firebase"),
                "2026", null, "https://universityportal2026.web.app/", null),
            createProject(10, "Sunbird GenAI App", "AI Platform", "AI Platforms",
                "A GenAI app that summarizes text, translates it, and generates audio output from both text and audio input pipelines.",
                "Users needed a single tool to handle text and audio workflows across multiple local languages.",
                "Built an AI workflow that supports text summarization, translation, transcription, and audio generation in one interface.",
                List.of("Text and audio pipelines", "Multi-language support", "End-to-end AI workflow"),
                "violet", List.of("React", "TypeScript", "Firebase", "AI/ML"),
                "2026", null, "https://internship-assessment-steel.vercel.app/", null)
        );

        projectRepository.saveAll(projects);
    }

    private Project createProject(int order, String title, String category, String group,
                                   String description, String challenge, String solution,
                                   List<String> results, String accentColor,
                                   List<String> technologies, String year,
                                   String liveUrl, String webUrl, String playStoreUrl) {
        Project p = new Project();
        p.setDisplayOrder(order);
        p.setTitle(title);
        p.setCategory(category);
        p.setGroupName(group);
        p.setDescription(description);
        p.setChallenge(challenge);
        p.setSolution(solution);
        p.setResults(toJson(results));
        p.setAccentColor(accentColor);
        p.setTechnologies(toJson(technologies));
        p.setYear(year);
        p.setLiveUrl(liveUrl);
        p.setWebUrl(webUrl);
        p.setPlayStoreUrl(playStoreUrl);
        p.setImageUrl("");
        return p;
    }

    private void seedProfile() throws Exception {
        Profile profile = new Profile();
        profile.setBioText("As a seasoned designer and developer with over 2 years of experience, I specialize in crafting impactful digital products that seamlessly integrate thoughtful design with clean, efficient code. My expertise spans modern web technologies, user experience design, and scalable software solutions. Currently pursuing a degree in Computer Science at Makerere University, I remain committed to continuous learning and innovation in the ever-evolving field of technology.");
        profile.setStats(objectMapper.writeValueAsString(List.of(
            Map.of("number", 2, "suffix", "+", "label", "Years Experience"),
            Map.of("number", 5, "suffix", "+", "label", "Projects Delivered"),
            Map.of("number", 5, "suffix", "+", "label", "Happy Clients"),
            Map.of("number", 8, "suffix", "+", "label", "Users Reached")
        )));
        profile.setSkills(objectMapper.writeValueAsString(List.of(
            "React", "TypeScript", "Node.js", "Figma", "UI/UX Design",
            "Motion Design", "Three.js", "GSAP", "Next.js", "Tailwind"
        )));
        profile.setProfileImageUrl("/Alvin.jpeg");
        profileRepository.save(profile);
    }

    private void seedSkillCategories() throws Exception {
        List<SkillCategory> categories = List.of(
            createCategory("Frontend", "Code2", "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
                "shadow-cyan-500/20", 1, List.of(
                    Map.of("name", "React.js / Next.js", "level", 96),
                    Map.of("name", "TypeScript", "level", 94),
                    Map.of("name", "JavaScript", "level", 94),
                    Map.of("name", "Tailwind CSS", "level", 95),
                    Map.of("name", "Three.js / GSAP", "level", 85),
                    Map.of("name", "Framer Motion", "level", 88)
            )),
            createCategory("Backend", "Server", "from-emerald-500/20 via-teal-500/20 to-green-500/20",
                "shadow-emerald-500/20", 2, List.of(
                    Map.of("name", "Node.js", "level", 72),
                    Map.of("name", "Java", "level", 65),
                    Map.of("name", "Python", "level", 60),
                    Map.of("name", "MySQL", "level", 60)
            )),
            createCategory("Infrastructure", "Cloud", "from-purple-500/20 via-fuchsia-500/20 to-pink-500/20",
                "shadow-purple-500/20", 3, List.of(
                    Map.of("name", "Docker", "level", 42),
                    Map.of("name", "Render", "level", 98),
                    Map.of("name", "Netlify", "level", 95),
                    Map.of("name", "Vercel", "level", 88),
                    Map.of("name", "Firebase / Supabase", "level", 87)
            ))
        );
        skillCategoryRepository.saveAll(categories);
    }

    private SkillCategory createCategory(String title, String iconName, String color,
                                          String shadowColor, int order, List<Map<String, Object>> skills) {
        SkillCategory sc = new SkillCategory();
        sc.setTitle(title);
        sc.setIconName(iconName);
        sc.setColor(color);
        sc.setShadowColor(shadowColor);
        sc.setDisplayOrder(order);
        sc.setSkills(toJson(skills));
        return sc;
    }

    private void seedTools() {
        String[][] toolData = {
            {"Git", "GitBranch"}, {"Blender", "Zap"}, {"Affinity", "Palette"},
            {"Vercel", "Globe"}, {"Three.js", "Box"}, {"GSAP", "Sparkles"},
            {"Redis", "Database"}, {"Prisma", "Database"}, {"Supabase", "Database"},
            {"Stripe", "CreditCard"}, {"Figma", "PenTool"}, {"Postman", "Send"}
        };

        for (int i = 0; i < toolData.length; i++) {
            Tool tool = new Tool();
            tool.setName(toolData[i][0]);
            tool.setIconName(toolData[i][1]);
            tool.setDisplayOrder(i + 1);
            toolRepository.save(tool);
        }
    }

    private void seedHeroContent() throws Exception {
        HeroContent hc = new HeroContent();
        hc.setHeadline(objectMapper.writeValueAsString(List.of(
            Map.of("text", "Crafting", "style", "normal"),
            Map.of("text", "Digital", "style", "italic"),
            Map.of("text", "Experiences", "style", "normal"),
            Map.of("text", "That", "style", "normal"),
            Map.of("text", "Inspire", "style", "italic")
        )));
        hc.setDescription("I transform ideas into immersive digital experiences through elegant code and thoughtful design. Let's build something extraordinary together.");
        heroContentRepository.save(hc);
    }

    private String toJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "[]";
        }
    }
}
