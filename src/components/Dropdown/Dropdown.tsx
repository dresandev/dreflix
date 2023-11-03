'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { useOnClickOutside, useBoolean } from '@hooks'
import { ChevronArrow } from '@components/SVG'
import styles from './Dropdown.module.css'

interface DropdownProps {
  children: React.ReactNode | React.ReactNode[]
  label: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  label,
}) => {
  const {
    value: dropdownIsOpen,
    setFalse: closeDropdown,
    toggle: toggleCloseDropdown
  } = useBoolean(false)

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
        dropdownIsOpen && styles.dropdownOpen
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
