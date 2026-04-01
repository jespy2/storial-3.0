import { EspyLogo } from '@/images';

export const Footer = () => {
  return (
    <footer className="footer-container">
        <a
          className="flex items-center justify-center"
          href="https://www.jamesespy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
        <EspyLogo />
          Handmade artisanal app by James Espy
        </a>
      </footer>
  )
}