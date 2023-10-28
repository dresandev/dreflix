import { useState, ChangeEvent } from 'react'

interface FormProps<T> {
  initState?: T
}

export const useForm = <T extends { [key: string]: string }>({
  initState = {} as T
}: FormProps<T>) => {
  const [formData, setFormData] = useState<T>(initState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const name = e.target.name
    const value = e.target.value

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData(initState)
  }

  return {
    ...formData,
    formData,
    handleInputChange,
    resetForm
  }
}
