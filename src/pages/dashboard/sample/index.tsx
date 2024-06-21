import { Helmet } from 'react-helmet-async';

import {SampleView} from "../../../sections/sample/view";



// ----------------------------------------------------------------------


export default function Page() {
  return (
    <>
      <Helmet>
        <title>주로 사용하는 예시</title>
      </Helmet>

      <SampleView />
    </>
  );
}
