import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export const useUserSupabase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [supabase]);

  return {user, userLoading: loading};
};
