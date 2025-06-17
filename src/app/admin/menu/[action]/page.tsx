// src/app/admin/menu/[action]/page.tsx

import MenuItemFormClient from './MenuItemFormClient';

export default function MenuItemPage({
  params,
}: {
  params: { action: string };
}) {
  return <MenuItemFormClient params={params} />;
}
