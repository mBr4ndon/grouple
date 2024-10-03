
interface Props {
    userId: string;
    affilitate: string
    stripeId?: string
}

const PaymentForm = ({ userId, affilitate, stripeId }: Props) => {
  return (
    <div>PaymentForm</div>
  )
}

export default PaymentForm