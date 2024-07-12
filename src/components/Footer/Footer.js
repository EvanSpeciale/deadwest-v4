import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
  return (
    <footer className='round'{...rest}>
      <div classname="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="block text-sm text-gray-200 sm:text-center pb-4">
          &copy; <a href="deadwest.art">Dead West</a>, {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}

export default Footer;