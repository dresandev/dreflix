import clsx from 'clsx'
import { ChevronArrow } from '~/components/SVG'
import styles from './Buttons.module.css'

interface ButtonsProps {
  onClickPrev: () => void
  onClickNext: () => void
  showPrevButton: boolean
  showNextButton: boolean
  btnHoverVariant: 'shadowHover' | 'scaleHover'
  forwardBtnRef: React.LegacyRef<HTMLButtonElement>
}

export const Buttons: React.FC<ButtonsProps> = ({
  onClickPrev,
  onClickNext,
  showPrevButton,
  showNextButton,
  btnHoverVariant,
  forwardBtnRef,
}) => {
  return (
    <>
      <button
        aria-label='Previous slide'
        className={clsx(
          styles.btn,
          styles[btnHoverVariant],
          showPrevButton && styles.hideBtn
        )}
        onClick={onClickPrev}
      >
        <ChevronArrow
          className={styles.btnArrowIcon}
          direction='LEFT'
        />
      </button>
      <button
        ref={forwardBtnRef}
        aria-label='Next slide'
        className={clsx(
          styles.btn,
          styles[btnHoverVariant],
          showNextButton && styles.hideBtn
        )}
        onClick={onClickNext}
      >
        <ChevronArrow
          className={styles.btnArrowIcon}
          direction='RIGHT'
        />
      </button>
    </>
  )
}
