import { ICON_COLORS } from '@app/constants/iconColors';

export function setRandomIconColor(): string {
  const randomIndex = Math.floor(Math.random() * ICON_COLORS.length);
  return ICON_COLORS[randomIndex].color;
}
