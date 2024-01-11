import SearchPage from '@/components/ui/SearchPage'

export const metadata = {
  title: 'Search',
}

export default function page({ searchParams }) {
  return <SearchPage kw={searchParams.kw} />
}
