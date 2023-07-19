import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();
  let hasCookie;
  useEffect(() => {
    hasCookie = document.cookie.includes("tweetsession");
    if (!hasCookie) {
      router.replace("/log-in");
    }
    if (data && !data.ok) {
      router.replace("/log-in");
    } else if (data && data.ok) {
      router.replace("/");
    }
  }, [data, router, hasCookie]);
  return { user: data?.profile, isLoading: !data && !error };
}
