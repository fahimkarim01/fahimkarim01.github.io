import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/',
  search: false,
})

export default withNextra({
  reactStrictMode: true,
})
