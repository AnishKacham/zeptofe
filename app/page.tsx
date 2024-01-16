import BadgeInput from "@/app/(components)/BadgeInput";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between py-28 px-10 sm:px-28 bg-slate-100 text-black">
      <div className="w-24 min-w-full md:min-w-[800px] h-full bg-slate-300 border rounded-lg flex flex-col items-center p-5">
        <span className="font-bold text-3xl mb-10">Add Users</span>
        <BadgeInput />
      </div>
    </main>
  );
}
