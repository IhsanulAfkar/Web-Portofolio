"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ID, US } from "country-flag-icons/react/3x2";

const languages = [
  {
    value: "en",
    label: "English",
    flag: <US />,
  },
  {
    value: "id",
    label: "Indonesia",
    flag: <ID />,
  },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const activeLang = (params?.lang as string) || "en";

  const switchLang = (lang: string) => {
    const segments = pathname.split("/");

    // replace lang segment safely
    segments[1] = lang;

    router.push(segments.join("/"));
    router.refresh(); // ensure server components re-fetch dictionary
  };

  return (
    <Select value={activeLang} onValueChange={switchLang}>
      <SelectTrigger className="w-20">
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}