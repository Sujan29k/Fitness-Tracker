import Link from "next/link";
import styles from "./Footer.module.css"; // Import CSS for footer
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link href="/about" className={styles.footerLink}>
          About Us
        </Link>
        <Link href="/contact" className={styles.footerLink}>
          Contact
        </Link>
        <Link href="/privacy" className={styles.footerLink}>
          Privacy Policy
        </Link>
      </div>

      <div className={styles.socialIcons}>
      <a href="https://www.facebook.com" target="_blank" className={styles.socialIcon} rel="noreferrer">
          <FaFacebookF size={24} />
        </a>
        <a href="https://www.twitter.com" target="_blank" className={styles.socialIcon} rel="noreferrer">
          <FaTwitter size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" className={styles.socialIcon} rel="noreferrer">
          <FaInstagram size={24} />
        </a>
      </div>

      <div className={styles.footerText}>
        <p>&copy; 2025 Fitness Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
