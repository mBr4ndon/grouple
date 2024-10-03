"use client"

import { useStripeElements } from "@/hooks/payment"
import { Elements } from "@stripe/react-stripe-js"


interface StripeElementsProps {
  children: React.ReactNode
}

export const StripeElements = ({ children }: StripeElementsProps) => {
  const { stripePromise } = useStripeElements()

  const promise = stripePromise()

  return promise && <Elements stripe={promise}>{children}</Elements>
}
