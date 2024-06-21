import {Helmet} from 'react-helmet-async';

import {CONFIG} from 'src/config-global';

import {RUserListView} from "src/sections/ruser/view/ruser-list-view";

// ----------------------------------------------------------------------

const metadata = { title: `사용자 | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RUserListView />
    </>
  );
}
