import { Outlet } from 'react-router-dom';
import Header from './components/etc/Header';
import { createContext, useEffect, useState } from 'react';
import { supabase } from './client';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user)); // Save user to local storage
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Retrieve user from local storage
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }
    , [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
