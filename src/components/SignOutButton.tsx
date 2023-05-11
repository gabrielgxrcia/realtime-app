'use client'

import { Loader2, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { ButtonHTMLAttributes, FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown-Menu'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleMenuClick = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <DropdownMenu>
        <p className="w-full outline-none ml-4" onClick={handleMenuClick}>
          <DropdownMenuTrigger className="flex items-center outline-none">
            {isSigningOut ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <span className="text-center">...</span>
            )}
          </DropdownMenuTrigger>
        </p>
        <DropdownMenuContent className="dark:bg-zinc-800 dark:border-zinc-800 dark:text-zinc-300 mt-1 ">
          <DropdownMenuItem
            className="dark:bg-zinc-800 cursor-pointer"
            onClick={async () => {
              setIsSigningOut(true)
              try {
                await signOut()
              } catch (error) {
                toast.error('Houve um problema ao sair.')
              } finally {
                setIsSigningOut(false)
              }
            }}
          >
            <span className="mr-2">
              <LogOut size={16} />
            </span>
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default SignOutButton
