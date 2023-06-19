import { axiosInstance } from '../axios'
import {
  EmailCheckResponseData,
  LoginRequest,
  RegisterEnroll,
  WithdrawalRequest,
} from '../interface/auth'

export const login = async (account: LoginRequest) => {
  const res = await axiosInstance.post(`/login`, account)
  return res
}

export const getUser = async (user: number) => {
  if (!user) return null
  const res = await axiosInstance.get(`/s/user/${user}`)
  return res
}

export const logout = async () => {
  const { data } = await axiosInstance.post('/logout')
  return data
}

export const join = async (user: RegisterEnroll) => {
  try {
    const { data } = await axiosInstance.post('/signup', user)
    console.log(data, '<<<<<<<<<<<<<<data 결과')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const emailCheck = async (email: string) => {
  try {
    const data = await axiosInstance.post<EmailCheckResponseData>('/signup/duplicate', {
      email,
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const withdrawal = async ({ userId, userData }: WithdrawalRequest) => {
  const { email, password } = userData
  const { data } = await axiosInstance.post(`/s/user/${userId}/withdraw`, {
    email,
    password,
  })
  return data
}
