import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Bienvenue sur DailyChallenge</h1>
      <Button className="mt-4" color="primary">Commencer</Button>
    </div>
  );
}
