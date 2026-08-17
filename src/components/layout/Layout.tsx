import * as React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { WhatsAppPopup } from "./WhatsAppPopup"
import { NotificationPopup } from "./NotificationPopup"
import { PromoModal } from "./PromoModal"

export function Layout() {
  const location = useLocation()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col font-sans selection:bg-green-200 selection:text-green-900">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppPopup />
      <NotificationPopup />
      <PromoModal />
    </div>
  )
}

