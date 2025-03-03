import { useEffect } from "react";

import * as Sentry from "@sentry/react-native";
import { identifyDevice } from "vexo-analytics";

import { supabase } from "~/services/supabase";
import { useAuthStore } from "~/store/auth-store";

export const useOnAuthStateChange = () => {
  const { session, setSession } = useAuthStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session", session);

      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state change", session);

      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  useEffect(() => {
    identifyDevice(session?.user.id || null);

    Sentry.setUser(
      session?.user.id
        ? {
            id: session?.user.id
          }
        : null
    );
  }, [session?.user.id]);
};
