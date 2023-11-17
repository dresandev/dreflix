'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useOnClickOutside, useBoolean } from '@hooks'
import { ChevronArrow } from '@components/SVG'
import styles from './Dropdown.module.css'

interface DropdownProps {
  children: React.ReactNode | React.ReactNode[]
  label: string
  optionsInGrid?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  label,
  optionsInGrid,
}) => {
  const pathname = usePathname()
  const {
    value: dropdownIsOpen,
    setFalse: closeDropdown,
    toggle: toggleCloseDropdown
  } = useBoolean(false)

  useEffect(() => {
    dropdownIsOpen && closeDropdown()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const dropdownRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(dropdownRef, closeDropdown)

  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div
      className={styles.dropdownWrapper}
      ref={dropdownRef}
    >
      <label>
        <button
          className={clsx(
            styles.labelBtn,
            dropdownIsOpen && styles.labelBtnOpen
          )}
          onClick={toggleCloseDropdown}
        >
          {label}
          <ChevronArrow
            className={clsx(
              styles.chevronArrow,
              dropdownIsOpen && styles.rotateArrow
            )}
          />
        </button>
      </label>
      <ul className={clsx(
        styles.dropdown,
        dropdownIsOpen && styles.dropdownOpen,
        optionsInGrid && styles.dropdownGrid
      )}>
        {
          childrenArray.map(option => {
            const key = crypto.randomUUID()
            return (
              <li key={key}>
                {option}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
