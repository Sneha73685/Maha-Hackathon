
import { Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeLanguageControls() {
  const { theme, setTheme } = useTheme();
  const { i18n, t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-dome-darker border-dome-purple/20">
          <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
            {t('language.english')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => i18n.changeLanguage('hi')}>
            {t('language.hindi')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => i18n.changeLanguage('mr')}>
            {t('language.marathi')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
