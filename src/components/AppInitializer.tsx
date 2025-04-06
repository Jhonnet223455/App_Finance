// src/components/AppInitializer.tsx
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface Props {
  children: React.ReactNode;
}

const AppInitializer: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        // Aquí se hace la llamada al backend con el token
        try {
          await fetch('http://localhost:3001/api/auth/check', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Token enviado correctamente al backend.");
        } catch (error) {
          console.error("Error al enviar el token al backend:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default AppInitializer;
