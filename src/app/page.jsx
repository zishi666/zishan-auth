"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  useEffect(() => {
    console.log("Session Data is as ====> ", session);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col w-full h-[100vh]">
      <div className="flex flex-col gap-4 items-start justify-center">
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Facebook</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("facebook")}
          >
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Youtube</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("google")}
          >
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Instagram</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("instagram")}
          >
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Linkdin</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("linkedin")}
          >
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Twitter</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("twitter")}
          >
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Telegram</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("telegram")}
          >
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>TickTok</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("tiktok")}
          >
            verify
          </button>
        </div>
      </div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
