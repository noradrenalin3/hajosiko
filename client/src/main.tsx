import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '~/context/ThemeContext';
import { AuthProvider } from '~/context/AuthContext';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppProvider from '~/context/AppContext';

//const queryClient = new QueryClient({});
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			retry: 1,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<AppProvider>
						<App />
					</AppProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</AuthProvider>
	</StrictMode>,
);
