'use client'

import { useEffect, useState } from "react";
import BrowserAlertModal from "./BrowserAlertModal";

const SocialMediaCheck = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()

    const isInApp = /instagram|snapchat|fbav|messenger|tiktok/.test(ua)
    if (isInApp) setShowModal(true)
  }, [])

  return(
  <>
  {showModal && <BrowserAlertModal />}
  </>
)
}

export default SocialMediaCheck