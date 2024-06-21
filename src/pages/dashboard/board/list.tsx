import {Helmet} from 'react-helmet-async';

import {CONFIG} from 'src/config-global';

import {BoardListView} from "src/sections/board/view/board-list-view";

// ----------------------------------------------------------------------

const metadata = { title: `Post list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BoardListView />
    </>
  );
}
