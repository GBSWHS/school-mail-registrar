import { type FC } from 'react'
import style from './style.module.css'

const Footer: FC = () => (
  <p className={style.footer}>
    &copy; 2023. <a href="https://github.com/pmh-only">Minhyeok Park</a>.
    powered by{' '}
    <a href="https://www.cloudflare.com/products/email-routing/">Cloudflare</a>.{' '}
    <a href="https://github.com/GBSWHS/school-mail-registrar">[source]</a>
  </p>
)

export default Footer
