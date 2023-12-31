import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.isSuccess) {
      router.replace("/log-in");
    } else if (data && data.isSuccess && router.pathname === "/log-in") {
      router.replace("/");
    }
  }, [data]);
  return { user: data?.profile, isLoading: !data && !error };
}
