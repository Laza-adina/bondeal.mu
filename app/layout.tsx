import './globals.css';
import type {Metadata} from 'next';
import Storefront from '../components/storefront';
export const metadata:Metadata={title:'BonDeal — Le beau, le pratique, le bon prix.',description:'De belles trouvailles pour le quotidien, à Maurice.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="fr" data-scroll-behavior="smooth"><body><Storefront>{children}</Storefront></body></html>}

