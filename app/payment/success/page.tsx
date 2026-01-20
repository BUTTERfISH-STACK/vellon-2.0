export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
        <p className="text-gray-600">Your Vellon CV upgrade is being processed. Check your email for the download link.</p>
      </div>
    </div>
  )
}