import { Themer } from '@/components/ui/themer';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <>
      <div className="w-full h-16 border-b">
        <h2 className="font-medium">Guess it!</h2>
        <Themer />
      </div>

      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
