'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { ensureArray } from '~/utils'
import {
  useOnClickOutside,
  useBoolean,
  useOnPathnameChange
} from '~/hooks'
import { ChevronArrow } from '~/components/SVG'
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
  const {
    value: dropdownIsOpen,
    setFalse: closeDropdown,
    toggle: toggleDropdown
  } = useBoolean(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(dropdownRef, closeDropdown)

  useOnPathnameChange(() => {
    dropdownIsOpen && closeDropdown()
  })

  const childrenArray = ensureArray(children)

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
          onClick={toggleDropdown}
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
