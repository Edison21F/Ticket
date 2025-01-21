import Link from 'next/link'
 
// Navigate to /about?name=test
export default function Page() {
  return (
    <Link
      href={{
        pathname: '/admin',
      }}
    >
      About
    </Link>
  )
}