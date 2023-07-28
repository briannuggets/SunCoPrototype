import styles from "./styles.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="flex-center-split">
        <Link className="logo invert flex-center" href="/">
          <img src="/icons/misc/logo.svg" alt="Sun Co. logo" />
          <span>SUN CO.</span>
        </Link>
        <div className={styles.socialLinks}>
          <Link href="https://www.instagram.com">
            <img src="/icons/social/instagram.svg" />
          </Link>
          <Link href="https://www.twitter.com">
            <img src="/icons/social/twitter.svg" />
          </Link>
          <Link href="https://www.youtube.com">
            <img src="/icons/social/youtube.svg" />
          </Link>
        </div>
      </div>
      <p>© 2023 dot.cards text task. All rights reserved</p>
    </footer>
  );
};

export default Footer;
