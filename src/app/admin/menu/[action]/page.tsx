// src/app/admin/menu/[action]/page.tsx

import MenuItemFormClient from './MenuItemFormClient';
import { FC } from 'react';

interface PageProps {
  params: {
    action: string;
  };
}

const MenuItemPage: FC<PageProps> = ({ params }) => {
  return <MenuItemFormClient params={params} />;
};

export default MenuItemPage;
