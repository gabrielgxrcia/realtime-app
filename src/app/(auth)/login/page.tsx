'use client'

import Button from '@/components/ui/Button'
import { FC, useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { BsGoogle } from 'react-icons/bs'
import ThemeSwitch from '@/components/ThemeDarkLight'
import Providers from '@/components/Providers'

const Page: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loginWithGoogle() {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast.error('Algo deu errado com seu login.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Providers>
      <div className="flex h-screen items-center">
        <div style={{ position: 'fixed', top: 15, right: 8 }}>
          <ThemeSwitch />
        </div>
        <div className="w-1/2 h-full">
          <img
            src="https://cdn.dribbble.com/users/335922/screenshots/14707725/media/d7eb9e0fc659ff2775da5412b63d2e53.png?compress=1&resize=1600x1200&vertical=top"
            alt="background image"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col items-center max-w-md space-y-8">
            <div className="flex flex-col items-center gap-8">
              <div className="text-center ">
                <div className="text-2xl font-semibold tracking-tight ">
                  <span className="text-gray-800 dark:text-gray-200 ">
                    Crie sua conta
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Digite seu e-mail abaixo para criar sua conta
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-500 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Insira seu e-mail"
                  />
                </div>
                <Button
                  isLoading={isLoading}
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-gray-300 hover:opacity-85 h-10 py-2 px-4 mt-1.5 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  <span key="text">Continuar</span>
                </Button>
                <div className="mt-4 flex items-center gap-4">
                  <div className="border border-gray-300 border-t-0 flex-1 w-1/4" />
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>OU CONTINUE COM</span>
                  </div>
                  <div className="border border-gray-300 border-t-0 flex-1 w-1/4" />
                </div>
                <Button
                  isLoading={isLoading}
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input text-gray-800 bg-white hover:bg-gray-200 hover:text-accent-foreground hover:border-gray-300 h-10 py-2 px-4 mt-5 dark:bg-transparent dark:hover:bg-gray-800 dark:text-white dark:hover:text-white"
                  onClick={loginWithGoogle}
                >
                  <div key="icon" className="mr-2">
                    {isLoading ? null : <BsGoogle className="h-5 w-5" />}
                  </div>
                  <span key="text">Google</span>
                </Button>
                <div className="mt-5 text-sm text-gray-500 text-center">
                  <p>Ao clicar em continuar, você concorda com nossos</p>
                  <p>
                    <a href="#" className="underline">
                      Termos de serviço
                    </a>{' '}
                    e{' '}
                    <a href="#" className="underline">
                      política de privacidade
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Providers>
  )
}

export default Page
