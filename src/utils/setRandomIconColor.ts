import { ICON_COLORS } from '@app/constants/iconColors';

// TODO add localhost saving or DB?
export function setRandomIconColor(): string {
  const randomIndex = Math.floor(Math.random() * ICON_COLORS.length);
  return ICON_COLORS[randomIndex].color;
}
