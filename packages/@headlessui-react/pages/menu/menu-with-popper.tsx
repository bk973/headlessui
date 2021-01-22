import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Menu } from '@headlessui/react'

import { usePopper } from '../../playground-utils/hooks/use-popper'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  })

  function resolveClass({ active, disabled }) {
    return classNames(
      'block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700',
      active && 'bg-gray-100 text-gray-900',
      disabled && 'cursor-not-allowed opacity-50'
    )
  }

  return (
    <div className="flex justify-center w-screen h-full p-12 bg-gray-50">
      <div className="inline-block mt-64 text-left">
        <Menu>
          <Menu.Button
            ref={trigger}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            <span>Options</span>
            <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Menu.Button>

          <Portal>
            <Menu.Items
              className="w-56 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              ref={container}
            >
              <div className="px-4 py-3">
                <p className="text-sm leading-5">Signed in as</p>
                <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                  tom@example.com
                </p>
              </div>

              <div className="py-1">
                <Menu.Item as="a" href="#account-settings" className={resolveClass}>
                  Account settings
                </Menu.Item>
                <Menu.Item>
                  {data => (
                    <a href="#support" className={resolveClass(data)}>
                      Support
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item as="a" disabled href="#new-feature" className={resolveClass}>
                  New feature (soon)
                </Menu.Item>
                <Menu.Item as="a" href="#license" className={resolveClass}>
                  License
                </Menu.Item>
              </div>

              <div className="py-1">
                <Menu.Item as="a" href="#sign-out" className={resolveClass}>
                  Sign out
                </Menu.Item>
              </div>
            </Menu.Items>
          </Portal>
        </Menu>
      </div>
    </div>
  )
}

function Portal(props: { children: React.ReactNode }) {
  const { children } = props
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null
  return ReactDOM.createPortal(children, document.body)
}
