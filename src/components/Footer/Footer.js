import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

const Footer = ({ ...rest }) => {
  return (
    <footer className='round'{...rest}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="text-center">
          <span className="text-sm text-desert-green-light text-center pb-4">
            <Link href="https://www.instagram.com/deadwest.art?igsh=MWJoNXE1ajczMDE4dw==">
              <div className="font-sans inline">
                <FaInstagram className="inline mr-1" />
                @deadwest.art
              </div>
            </Link>
          </span>
          <span className="font-sans inline text-sm text-desert-green-light text-center pb-4 ml-1">
            | &copy; Dead West, {new Date().getFullYear()}
          </span>
        </div>
      </div>

    </footer>
  )
}

export default Footer;