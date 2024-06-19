import {useEffect} from "react";
import { Helmet } from 'react-helmet-async';

import {paths} from "../routes/paths";
import {useRouter} from "../routes/hooks";

// ----------------------------------------------------------------------

const metadata = {
  title: '관리 페이지 샘플: The starting point for your next project',
  description:
    'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
};

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.dashboard.root);
  }, [router]);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>

      {/* <HomeView /> */}
    </>
  );
}
