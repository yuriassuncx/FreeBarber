import "../styles/globals.css";
import { AuthProvider } from "../contexts/AuthContext";

import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <AuthProvider>
            <html lang="pt-br">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body>
                    <div className="bg-black w-full overflow-hidden">
                        <div className="flex justify-center items-center px-6 sm:px-16">
                            <div className="xl:max-w-[1280px] w-full">
                                <Header />
                            </div>
                        </div>
                    </div>
                    <main>{children}</main>
                    <Footer />
                </body>
            </html>
        </AuthProvider>
    )
}