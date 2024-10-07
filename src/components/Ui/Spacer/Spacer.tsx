interface Props {
  flexGrow: number
}

export const Spacer: React.FC<Props> = ({ flexGrow }) => {
  return <div style={{ flexGrow }}></div>
}
