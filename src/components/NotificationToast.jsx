import React from 'react'
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'
import { useData } from '../context/DataContext'

export default function NotificationToast() {
  const { toasts } = useData()

  if (!toasts || toasts.length === 0) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-500 shrink-0" />
  }

  const borderColors = {
    success: 'border-emerald-200 bg-emerald-50/95 text-emerald-950',
    error: 'border-rose-200 bg-rose-50/95 text-rose-950',
    warning: 'border-amber-200 bg-amber-50/95 text-amber-950',
    info: 'border-brand-200 bg-brand-50/95 text-brand-950'
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md pointer-events-auto transition-all animate-bounce-subtle ${borderColors[toast.type] || borderColors.info}`}
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 text-sm font-medium leading-relaxed">
            {toast.message}
          </div>
        </div>
      ))}
    </div>
  )
}
