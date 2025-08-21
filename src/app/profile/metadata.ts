import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "User Profile | LearnKana Dashboard",
  description: "View and manage your LearnKana profile, track your Japanese learning progress, and customize your learning experience.",
  keywords: [
    "user profile",
    "learning progress",
    "account settings",
    "personal dashboard",
    "japanese learning stats"
  ],
  alternates: {
    canonical: 'https://learnkana.pro/profile'
  },
  openGraph: {
    title: "Profile | LearnKana",
    description: "Your personalized Japanese learning dashboard with progress tracking and settings.",
    type: "website",
    locale: "en_US",
    siteName: "LearnKana",
    url: "https://learnkana.pro/profile"
  }
}