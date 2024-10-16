import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/continents/')({
  component: () => <div>Hello /continents/!</div>,
})
