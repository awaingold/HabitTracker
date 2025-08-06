import {useRouter} from 'next/router';


export default function Home() {

  const router = useRouter();

  router.replace('/dashboard');

  return (
    <a href = '/dashboard'>Go to dashboard</a>
  );

  
}
