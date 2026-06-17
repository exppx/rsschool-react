import { TEXT } from '@/constants/text';
import { LINKS } from '@/constants/links';

import styles from './page.module.scss';

function Page() {
  return (
    <div className={styles['about-page']}>
      <h2 className={styles['heading']}>{TEXT.pages.about.heading}</h2>

      <div className={styles['text-container']}>
        <p className={styles['text']}>
          {TEXT.pages.about.description1}
          <a href={LINKS.creatorGitHub}>{TEXT.pages.about.authorName}</a>
          {TEXT.pages.about.description2}
        </p>
        <a
          className={styles['link']}
          href={LINKS.rsSchoolReact}
          target="_blank"
        >
          {TEXT.pages.about.rsSchoolReact}
        </a>
      </div>
    </div>
  );
}

export default Page;
