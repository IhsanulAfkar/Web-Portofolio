import { AboutMe } from "@/components/pages/AboutMe";
import { Feed } from "@/components/pages/Feed";
import Playground from "@/components/pages/Playground";
import Projects from "@/components/pages/Projects";
import { SocialLink } from "@/components/pages/SocialLink";
import TechStackOrbit from "@/components/pages/TechStackOrbit";
import { Button } from "@/components/ui/button";
import LandingThemeSwitcher from "@/components/ui/custom/landing-theme-switcher";
import SkewButton from "@/components/ui/custom/skew-button";
import { getDictionary } from "@/lib/i18n";
export default async function Home({ params }: {
  params: Promise<{ lang: "en" | "id" }>;
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-4 flex-1 items-center justify-center px-12 min-h-screen">
        <div className="flex-1 lg:pr-24 flex justify-end">
          <div className="max-w-[600px] space-y-4">

            <p className="font-bold text-5xl font-heading leading-tight">
              {dict.landing.introduction_1}
              <span className="text-blue-700 ml-2">
                Muhammad Ihsanul Afkar
              </span>
            </p>

            <div className="text-xl text-muted-foreground mt-3">
              {dict.landing.introduction_2}
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-4 pt-4">
              <SocialLink href="https://github.com/IhsanulAfkar" label="GitHub" icon="github" />
              <SocialLink href="https://www.linkedin.com/in/ihsanul-afkar-876229218/" label="LinkedIn" icon="linkedin" />
              <SocialLink href="mailto:ihsanul2001@mail.com" label="Email" icon="email" />
              <SocialLink href="https://instagram.com/ihsanulafkar01" label="Instagram" icon="instagram" />
            </div>

            {/* CTA */}
            <div className="flex justify-end mt-10">
              <a
                href="mailto:ihsanul2001@mail.com"
              >
                <SkewButton>Contact me</SkewButton>
              </a>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 relative w-full lg:w-1/2 my-20 lg:my-0">
          <div className="absolute inset-0 flex items-center justify-center -z-20">
            <img
              src="/assets/gray-stroke.png"
              className="w-[450px] opacity-30 object-contain mt-12 mr-12"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center -z-10 -top-40">
            <img src="/assets/foto.png" alt="" className="z-10 object-contain h-[50vh] lg:h-[1000px]" />
          </div>
          {/* <TechStackOrbit /> */}
        </div>
      </div>
      {/* <AboutMe dict={dict} /> */}
      <div className="lg:px-20 sm:px-8 px-0">
        <Feed dict={dict} />
      </div>
      <div>
        <Playground dict={dict} />
      </div>
    </>
  );
}
