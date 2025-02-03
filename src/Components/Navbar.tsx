import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Avatar } from '@radix-ui/themes';

const Navbar = () => {
  return (
    <NavigationMenu.Root className="fixed w-full bg-white shadow-md z-40">
      <NavigationMenu.List className="flex items-center p-4 space-x-4">
        <div className="flex items-center space-x-2">
          <Avatar size={'2'} fallback="S" src="src/Assets/pngwing.com.png" />
          <span className="text-lg font-semibold">Air Scrapper</span>
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Navbar;
