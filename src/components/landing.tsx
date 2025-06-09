'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addPreuser } from "@/app/actions"
import { Mail, MapPin, Send } from "lucide-react"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        "Submitting..."
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Notify Me
        </>
      )}
    </Button>
  )
}

export default function ComingSoonPage() {
  const [state, formAction] = useActionState(addPreuser, { message: "" })

  useEffect(() => {
    if (state?.message) {
      alert(state.message)
    }
  }, [state])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                    NomadLife
                  </span>{" "}
                  is coming soon
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400">
                  We&apos;re building something special for digital nomads and travelers. Stay tuned for an experience that
                  will transform the way you explore the world.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form action={formAction} className="flex space-x-2">
                  <Input 
                    className="max-w-lg flex-1" 
                    placeholder="Enter your email" 
                    type="email" 
                    name="email" 
                    required 
                  />
                  <SubmitButton />
                </form>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Be the first to know when we launch. No spam, we promise.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-slate-900 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-amber-100 p-4 dark:bg-amber-900/20">
                  <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Discover New Places</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Find hidden gems and popular destinations perfect for digital nomads.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-amber-100 p-4 dark:bg-amber-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-amber-600 dark:text-amber-500"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Connect with Nomads</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Build your network of like-minded travelers and remote workers.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-amber-100 p-4 dark:bg-amber-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-amber-600 dark:text-amber-500"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m8 22 4-10 4 10" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Live the Nomad Life</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Resources and tools to help you thrive in your location-independent lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Want to know more?</h2>
              <p className="mx-auto max-w-[600px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                We're working hard to bring NomadLife to you. If you have any questions or would like to collaborate,
                feel free to reach out.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Link
                  href="mailto:hello@nomadlife.live"
                  className="text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-500"
                >
                  hello@nomadlife.live
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-slate-200 py-6 dark:border-slate-800">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} NomadLife. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}