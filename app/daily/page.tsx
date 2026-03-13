import DailyPracticeFlow from '@/components/DailyPracticeFlow';

export default function DailyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">Dagelijkse oefening</h1>
      <p className="text-slate-600">Ongeveer 5 minuten. Kleine stapjes, grote vooruitgang.</p>
      <DailyPracticeFlow />
    </div>
  );
}
