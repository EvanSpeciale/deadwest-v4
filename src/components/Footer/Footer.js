import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <p>
        &copy; <a href="deadwest.art">Dead West</a>, {new Date().getFullYear()} &amp;
      </p>
    </footer>
  )
}

export default Footer;