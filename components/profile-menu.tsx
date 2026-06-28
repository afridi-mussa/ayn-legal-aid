"use client"

import { useRef, useState } from "react"
import { LogOut, Camera, Loader2, Check } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function initials(name?: string | null, email?: string | null) {
  const src = (name || email || "U").trim()
  const parts = src.split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return src.slice(0, 2).toUpperCase()
}

export function ProfileMenu({ variant = "icon" }: { variant?: "icon" | "row" }) {
  const { user, profile, signOut, updateUsername, uploadAvatar } = useAuth()
  const fileRef = useRef<HTMLInputElement | null>(null)

  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [savingName, setSavingName] = useState(false)
  const [nameSaved, setNameSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // keep the input in sync when the dialog opens
  function handleOpenChange(next: boolean) {
    setOpen(next)
    setError(null)
    setNameSaved(false)
    if (next) setUsername(profile?.username ?? "")
  }

  const displayName = profile?.username || profile?.full_name || user?.email || "Account"
  const avatarUrl = profile?.avatar_url || undefined
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long" })
    : "—"

  async function handleSaveName() {
    setError(null)
    setSavingName(true)
    const { error } = await updateUsername(username.trim())
    setSavingName(false)
    if (error) {
      setError(error)
      return
    }
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 1800)
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = "" // allow re-selecting the same file
    if (!file) return
    setError(null)
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2 MB.")
      return
    }
    setUploading(true)
    const { error } = await uploadAvatar(file)
    setUploading(false)
    if (error) setError(error)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {variant === "row" ? (
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-primary/10 transition-colors focus:outline-none"
            aria-label="Open profile settings"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="bg-primary/15 text-primary text-sm font-semibold">
                {initials(profile?.full_name, user?.email)}
              </AvatarFallback>
            </Avatar>
            <span className="flex flex-col items-start min-w-0">
              <span className="text-sm font-semibold text-foreground truncate max-w-[200px]">{displayName}</span>
              <span className="text-xs text-muted-foreground">Profile &amp; settings</span>
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="rounded-full ring-2 ring-transparent hover:ring-primary/40 focus:outline-none focus-visible:ring-primary transition"
            aria-label="Open profile settings"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="bg-primary/15 text-primary text-sm font-semibold">
                {initials(profile?.full_name, user?.email)}
              </AvatarFallback>
            </Avatar>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profile settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar + name */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="bg-primary/15 text-primary text-xl font-semibold">
                  {initials(profile?.full_name, user?.email)}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow hover:opacity-90 disabled:opacity-60"
                aria-label="Change profile picture"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground break-all">{displayName}</p>
              <p className="text-xs text-muted-foreground break-all">{user?.email}</p>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex gap-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                maxLength={32}
              />
              <Button onClick={handleSaveName} disabled={savingName || username.trim() === (profile?.username ?? "")}>
                {savingName ? <Loader2 className="h-4 w-4 animate-spin" /> : nameSaved ? <Check className="h-4 w-4" /> : "Save"}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-lg border border-border divide-y divide-border">
            <div className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">Plan</span>
              <Badge variant={profile?.plan === "premium" ? "default" : "secondary"}>
                {profile?.plan === "premium" ? "Premium" : "Free"}
              </Badge>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">Member since</span>
              <span className="text-foreground">{memberSince}</span>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Logout */}
          <Button
            className="hidden md:flex w-full bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-900/30 active:bg-red-800 transition-all"
            onClick={async () => {
              await signOut()
              setOpen(false)
            }}
          >
            <LogOut className="h-4 w-4 mr-2" /> Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
