import Provider from '@components/Provider';
import Nav from '@components/nav/Nav';
import '@styles/globals.css';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

// Metadata
export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
};

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
