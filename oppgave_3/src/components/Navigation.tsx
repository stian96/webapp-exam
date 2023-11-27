import Link from 'next/link'

// There isn't a valid page in 'src/app/votes'. Therefore the link to the Votes page in
// this navbar will result in a 404 page not found error.
export default function Navigation() {
  return (
    <header className="navigation">
      <div className="wrapper">
        <h3>SuperVote</h3>
        <nav>
          <Link href="/">Hjem</Link>
          <Link href="/about">Om oss</Link>
          <Link href="/contact">Kontakt</Link>
          <Link href="/polls">Polls</Link>
          <Link href="/votes">Votes</Link>
        </nav>
      </div>
    </header>
  )
}
