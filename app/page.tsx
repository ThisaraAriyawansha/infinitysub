import Translator from "@/components/Translator";
import HowItWorks from "@/components/HowItWorks";
import LanguageShowcase from "@/components/LanguageShowcase";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="bg-white">
      <Translator />
      <HowItWorks />
      <LanguageShowcase />
      <FAQ />
    </main>
  );
}
