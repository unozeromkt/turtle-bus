'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface AdminMessagesNavLinkProps {
  href: string
  isActive: boolean
}

export default function AdminMessagesNavLink({
  href,
  isActive,
}: AdminMessagesNavLinkProps) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    let isMounted = true

    const loadUnreadCount = async () => {
      try {
        const response = await fetch('/api/admin/messages/unread-count', {
          cache: 'no-store',
        })

        if (!response.ok) {
          return
        }

        const data = await response.json()

        if (isMounted) {
          setUnreadCount(Number(data.count) || 0)
        }
      } catch (error) {
        console.error('Error loading unread messages count:', error)
      }
    }

    loadUnreadCount()

    const intervalId = window.setInterval(loadUnreadCount, 30000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-lg p-3 font-semibold transition-colors ${
        isActive ? 'bg-primary-600' : 'hover:bg-gray-700'
      }`}
    >
      <span>✉️ Mensajes</span>
      {unreadCount > 0 ? (
        <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-xs font-black text-white">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      ) : null}
    </Link>
  )
}