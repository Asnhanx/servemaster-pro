import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError, Provider } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string, username: string) => Promise<{ error: AuthError | null }>;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
    sendPhoneOtp: (phone: string) => Promise<{ error: AuthError | null }>;
    verifyPhoneOtp: (phone: string, token: string) => Promise<{ error: AuthError | null }>;
    signUpWithPhone: (phone: string, token: string, username: string) => Promise<{ error: AuthError | null }>;
    signInWithSocial: (provider: Provider) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email: string, password: string, username: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
            },
        });
        return { error };
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const sendPhoneOtp = async (phone: string) => {
        const { error } = await supabase.auth.signInWithOtp({ phone });
        return { error };
    };

    const verifyPhoneOtp = async (phone: string, token: string) => {
        const { error } = await supabase.auth.verifyOtp({
            phone,
            token,
            type: 'sms',
        });
        return { error };
    };

    const signUpWithPhone = async (phone: string, token: string, username: string) => {
        const { error } = await supabase.auth.verifyOtp({
            phone,
            token,
            type: 'sms',
        });
        if (error) return { error };

        // Update user metadata with username after successful verification
        const { error: updateError } = await supabase.auth.updateUser({
            data: { username },
        });
        return { error: updateError };
    };

    const signInWithSocial = async (provider: Provider) => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin,
            },
        });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{
            user, session, loading,
            signUp, signIn, signOut,
            sendPhoneOtp, verifyPhoneOtp, signUpWithPhone,
            signInWithSocial,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
