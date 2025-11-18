"use client"

import ResetPasswordForm from "@/modules/admin/components/forms/ResetPasswordForm"

export default function AdminResetPasswordPage({
  params
}: {
  params: { token: string }
}) {
  return (
    <ResetPasswordForm token={params.token} />
  )
}
