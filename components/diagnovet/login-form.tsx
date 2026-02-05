"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

// Usuarios de prueba hardcodeados
const MOCK_USERS = {
  // Usuario con perfil completo - va directo al dashboard
  "valentina@diagnovet.com": {
    password: "demo123",
    name: "Dra. Valentina Ruiz",
    hasCompletedOnboarding: true,
  },
  // Usuario nuevo - necesita completar onboarding
  "nuevo@diagnovet.com": {
    password: "demo123",
    name: "Dr. Usuario Nuevo",
    hasCompletedOnboarding: false,
  },
}

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = MOCK_USERS[formData.email as keyof typeof MOCK_USERS]

    if (user && user.password === formData.password) {
      // Login exitoso
      localStorage.setItem("currentUser", JSON.stringify(user))
      localStorage.setItem("isAuthenticated", "true")

      toast({
        title: "¡Bienvenido!",
        description: `Hola ${user.name}`,
        duration: 3000,
      })

      // Redirigir según si completó onboarding o no
      if (user.hasCompletedOnboarding) {
        router.push("/")
      } else {
        router.push("/onboarding")
      }
    } else {
      // Login fallido
      toast({
        title: "Error de autenticación",
        description: "Email o contraseña incorrectos",
        variant: "destructive",
        duration: 4000,
      })
    }

    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    
    // Simular autenticación con Google
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast({
      title: "Funcionalidad en desarrollo",
      description: "El login con Google estará disponible próximamente",
      duration: 3000,
    })
    
    setIsGoogleLoading(false)
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-2xl">
          <CardHeader className="space-y-3 text-center pb-6">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="relative w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-10 h-10 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Paw print with brain */}
                  <path
                    d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8 9C8.82843 9 9.5 8.32843 9.5 7.5C9.5 6.67157 8.82843 6 8 6C7.17157 6 6.5 6.67157 6.5 7.5C6.5 8.32843 7.17157 9 8 9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 9C16.8284 9 17.5 8.32843 17.5 7.5C17.5 6.67157 16.8284 6 16 6C15.1716 6 14.5 6.67157 14.5 7.5C14.5 8.32843 15.1716 9 16 9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M7 13C7.82843 13 8.5 12.3284 8.5 11.5C8.5 10.6716 7.82843 10 7 10C6.17157 10 5.5 10.6716 5.5 11.5C5.5 12.3284 6.17157 13 7 13Z"
                    fill="currentColor"
                  />
                  <path
                    d="M17 13C17.8284 13 18.5 12.3284 18.5 11.5C18.5 10.6716 17.8284 10 17 10C16.1716 10 15.5 10.6716 15.5 11.5C15.5 12.3284 16.1716 13 17 13Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Inicia sesión en
              </h1>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Diagnovet<span className="text-primary">AI</span>
              </h2>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar con Google
                </>
              )}
            </Button>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-950 px-2 text-xs text-muted-foreground">
                o
              </span>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">Email o nombre de usuario</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="h-10"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Continuar"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">¿No tienes cuenta? </span>
              <Link
                href="/registro"
                className="text-primary hover:text-primary/80 font-medium hover:underline"
              >
                Regístrate
              </Link>
            </div>

            {/* Demo credentials */}
            <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20 dark:border-primary/30">
              <p className="text-xs font-semibold text-foreground mb-1.5">
                👨‍⚕️ Usuarios de prueba:
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="font-mono">
                  <p className="font-semibold">Usuario completo:</p>
                  <p>📧 valentina@diagnovet.com | 🔑 demo123</p>
                </div>
                <div className="font-mono">
                  <p className="font-semibold">Usuario nuevo:</p>
                  <p>📧 nuevo@diagnovet.com | 🔑 demo123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
