export default function NotFound() {
  return (
    <main style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Page not found</h1>
      <p style={{ marginTop: '1rem' }}>The page you are looking for does not exist.</p>
      <p style={{ marginTop: '1.5rem' }}>
        <a href="/">Go back home</a>
      </p>
    </main>
  )
}
