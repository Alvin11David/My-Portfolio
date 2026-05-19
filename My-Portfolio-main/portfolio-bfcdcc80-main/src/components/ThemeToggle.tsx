import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative h-10 w-10 rounded-full border border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground backdrop-blur-md transition-all duration-300 overflow-hidden group"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === "light" ? 0 : 180,
                    scale: theme === "light" ? 1 : 0,
                    opacity: theme === "light" ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center translate-y-[1px]"
            >
                <Sun className="h-5 w-5" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === "dark" ? 0 : -180,
                    scale: theme === "dark" ? 1 : 0,
                    opacity: theme === "dark" ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center translate-y-[1px]"
            >
                <Moon className="h-5 w-5" />
            </motion.div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
