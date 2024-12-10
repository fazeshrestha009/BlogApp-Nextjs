import '../styles/globals.css';
import HomeLayout from '../layouts/HomeLayout';

function MyApp({ Component, pageProps }: any) {
  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  );
}

export default MyApp;
