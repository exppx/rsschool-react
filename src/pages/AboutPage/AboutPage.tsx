import { LINKS } from '@/constants/links';
import { TEXT } from '@/constants/text';

import styles from './AboutPage.module.scss';

function About() {
  return (
    <div className={styles.aboutPage}>
      <h2 className={styles.heading}>{TEXT.pages.about.heading}</h2>

      <div className={styles.textContainer}>
        <p className={styles.text}>
          {TEXT.pages.about.description1}
          <a href={LINKS.creatorGitHub}>{TEXT.pages.about.authorName}</a>
          {TEXT.pages.about.description2}
        </p>
        <a className={styles.link} href={LINKS.rsSchoolReact} target="_blank">
          {TEXT.pages.about.rsSchoolReact}
        </a>
      </div>
    </div>
  );
}

export default About;
