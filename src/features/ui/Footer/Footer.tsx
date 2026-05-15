import { TEXT } from '@/constants/text';
import { LINKS } from '@/constants/links';

import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.credits}>
          <span>{`${TEXT.ui.footer.createdBy} `}</span>
          <a href={LINKS.creatorGitHub} target="_blank">
            {TEXT.ui.footer.creator}
          </a>
          <span>{` ${TEXT.ui.footer.createdIn}`}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
