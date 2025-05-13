import React, { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { User, JobSeeker, JobProvider } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyANB962wvNQEA8T8pQP5L28JXFZ9a6wBKM",
  authDomain: "jobnest-e1527.firebaseapp.com",
  projectId: "jobnest-e1527",
  storageBucket: "jobnest-e1527.firebasestorage.app",
  messagingSenderId: "1092906829332",
  appId: "1:1092906829332:web:3304e2354e49e30dc54901",
  measurementId: "G-WEMPKVBMJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthContextType {
  currentUser: User | JobSeeker | JobProvider | null;
  loading: boolean;
  login: (email: string, password: string, userType: 'seeker' | 'provider') => Promise<void>;
  signup: (userData: Partial<JobSeeker | JobProvider>, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | JobSeeker | JobProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Get user data from localStorage for additional info
        const storedUser = localStorage.getItem('jobNestUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setCurrentUser({
            ...userData,
            id: user.uid,
            email: user.email || '',
            createdAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
          });
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem('jobNestUser');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (userData: Partial<JobSeeker | JobProvider>, password: string) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userData.email!, password);
      
      const newUser = {
        ...userData,
        id: user.uid,
        email: user.email!,
        createdAt: new Date(),
      };
      
      localStorage.setItem('jobNestUser', JSON.stringify(newUser));
      setCurrentUser(newUser as User | JobSeeker | JobProvider);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, userType: 'seeker' | 'provider') => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      // For demo, we'll use mock data based on email
      let userData;
      if (userType === 'seeker') {
        userData = {
          id: user.uid,
          name: 'Alex Johnson',
          email: user.email!,
          userType: 'seeker' as const,
          photoURL: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
          createdAt: new Date(),
          skills: ['JavaScript', 'React', 'CSS', 'HTML'],
          experience: '2 years',
          education: 'Bachelor\'s in Computer Science',
          location: 'San Francisco, CA',
          bio: 'Frontend developer passionate about creating beautiful user experiences.',
          savedJobs: [],
          appliedJobs: []
        };
      } else {
        userData = {
          id: user.uid,
          name: 'Sarah Miller',
          email: user.email!,
          userType: 'provider' as const,
          photoURL: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
          createdAt: new Date(),
          companyName: 'TechCorp Solutions',
          industry: 'Technology',
          companySize: '50-100',
          location: 'San Francisco, CA',
          website: 'https://techcorp-example.com',
          description: 'Innovative tech company specializing in web and mobile applications.',
          postedJobs: []
        };
      }
      
      localStorage.setItem('jobNestUser', JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
      localStorage.removeItem('jobNestUser');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};