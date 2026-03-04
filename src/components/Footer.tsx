import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-surface-dark border-t border-surface-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold tracking-tighter text-white mb-4 block">
              ServeMaster <span className="text-primary">Pro</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
              {t.footer.slogan}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.product}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-text-secondary hover:text-primary text-sm transition-colors">ServeMaster Pro</Link></li>
              <li><Link to="/app" className="text-text-secondary hover:text-primary text-sm transition-colors">{t.footer.app}</Link></li>
              <li><Link to="/product" className="text-text-secondary hover:text-primary text-sm transition-colors">{t.footer.techSpecs}</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">{t.footer.accessories}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.support}</h4>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-text-secondary hover:text-primary text-sm transition-colors">{t.footer.helpCenter}</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">{t.footer.manual}</a></li>
              <li><a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">{t.footer.warranty}</a></li>
              <li><a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">{t.footer.contactUs}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.followUs}</h4>
            <div className="flex space-x-4">
              <a href="https://x.com/asnhanx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-black transition-all" title="X (Twitter)">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://v.douyin.com/soBx2FQRRCA/ 9@9.com :3pm" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-black transition-all" title="Douyin">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.25 5.531c-3.125 0-5.875-2.031-6.75-5.031h-4.25v14.406c0 1.969-1.594 3.563-3.563 3.563-1.969 0-3.563-1.594-3.563-3.563 0-1.969 1.594-3.563 3.563-3.563.469 0 .906.094 1.344.25v-4.406c-.438-.063-.906-.125-1.344-.125-4.375 0-7.938 3.563-7.938 7.938S1.313 22.938 5.688 22.938s7.938-3.563 7.938-7.938V9.125c1.781 1.719 4.188 2.813 6.844 2.938v-4.156c-.063 0-.156.031-.219.031z" /></svg>
              </a>
              <a href="https://space.bilibili.com/your_id" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-black transition-all" title="Bilibili">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 01-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 01.16-.213l2.84-2.733c.267-.249.573-.373.92-.373a1.232 1.232 0 01.92.373c.249.249.373.551.373.907 0 .356-.124.658-.373.907l-1.133 1.133zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" /></svg>
              </a>
              <a href="https://youtube.com/@your_channel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-black transition-all" title="YouTube">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm mb-4 md:mb-0">
            {t.footer.copyright}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-text-secondary hover:text-white text-sm transition-colors">{t.footer.privacy}</a>
            <a href="#" className="text-text-secondary hover:text-white text-sm transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
