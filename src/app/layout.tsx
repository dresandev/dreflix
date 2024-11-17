import type { Metadata } from "next"
import { Fira_Sans } from "next/font/google"
import { Header } from "~/components/Header"
import { ProgressBar } from "~/components/ProgressBar"
import { Footer } from "~/components/Footer"
import { Toasts } from "~/components/Toasts"
import "~/styles/reset.css"
import "~/styles/globals.css"

export const metadata: Metadata = {
	metadataBase: new URL(process.env.HOST_URL!),
	title: "Dreflix: Explore and find the movie you want to find so much",
	description:
		"Explore through a large catalog of movies and find the movie you want to find so badly.",
	authors: [{ name: "Dresan - Javier Andres" }],
	creator: "Dresan - Javier Andres",
}

const firaSans = Fira_Sans({
	subsets: ["latin"],
	style: ["normal", "italic"],
	weight: ["400", "500", "700"],
})

interface Props {
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body className={firaSans.className}>
				<ProgressBar />
				<div className="__next">
					<Header />
					<main>{children}</main>
					<Footer />
				</div>
				<Toasts />
			</body>
		</html>
	)
}
